#!/usr/bin/env bash
#
# migrate-images-to-wp.sh
#
# Segunda pasada de la migración: sube a la Biblioteca de medios de WordPress
# las imágenes y vídeos de cada artículo de lib/mockData.ts y los asocia al
# post ya creado por migrate-to-wp.sh (localizándolo por su slug).
#
# Requisito IMPORTANTE: este script necesita acceso de lectura a los ficheros
# de imagen referenciados (los que están en la carpeta public/ del proyecto
# Next.js). Si `wp` se ejecuta en un servidor distinto al que tiene el
# repositorio, copia antes la carpeta public/ (o al menos las imágenes usadas)
# a ese servidor, o ejecuta este script desde una máquina que tenga acceso a
# ambos (el repo y el `wp` de WordPress, p. ej. vía WP-CLI remoto con --ssh).
#
# Para cada artículo:
#   1. Sube su imagen principal y la asigna como imagen destacada
#      (`wp media import --post_id --featured_image`).
#   2. Si tiene vídeo de YouTube, inserta un embed <iframe> al principio
#      del post_content.
#   3. Si tiene galería, sube cada imagen adicional a la Biblioteca de medios
#      y añade un bloque <figure><img></figure> al final del post_content
#      bajo un apartado "Galería" (WP-CLI no tiene un comando de galería
#      nativa, así que se construye el HTML a mano).
#
# El post de WordPress correspondiente a cada artículo se localiza por su
# slug con `wp post list --post_type=post --name=<slug> --field=ID` (más
# simple y sin dependencias que parsear el JSON de --format=json a mano en
# bash puro; hace exactamente el mismo mapeo slug → ID).
#
# Uso:
#   chmod +x migrate-images-to-wp.sh
#   ./migrate-images-to-wp.sh [ruta-a-carpeta-public]
#
# Si no se indica ruta, se usa "public" relativa al directorio desde el que
# se ejecuta el script.

set -uo pipefail

if ! command -v wp >/dev/null 2>&1; then
  echo "Error: no se encuentra el comando 'wp' (WP-CLI). Instálalo o revisa el PATH." >&2
  exit 1
fi

# Carpeta public/ del proyecto Next.js (contiene las imágenes locales referenciadas).
PUBLIC_DIR="${1:-public}"
PUBLIC_DIR="${PUBLIC_DIR%/}"

if [[ ! -d "$PUBLIC_DIR" ]]; then
  echo "Aviso: no existe la carpeta '$PUBLIC_DIR'. Las imágenes locales no se encontrarán." >&2
  echo "       Pasa la ruta correcta como argumento: ./migrate-images-to-wp.sh /ruta/a/public" >&2
fi

# ── Funciones auxiliares ───────────────────────────────────────────────────

# Devuelve el ID del post de WordPress cuyo slug (post_name) coincide.
get_post_id() {
  local slug="$1"
  wp post list --post_type=post --name="$slug" --field=ID --posts_per_page=1
}

# Resuelve el origen de una imagen: si es una URL remota la deja tal cual,
# si es una ruta local (empieza por "/", como vienen en mockData.ts) la
# busca dentro de PUBLIC_DIR. Devuelve la ruta/URL final por stdout,
# o falla (return 1) si el fichero local no existe.
resolve_source() {
  local src="$1"
  if [[ "$src" == http://* || "$src" == https://* ]]; then
    printf '%s' "$src"
    return 0
  fi
  local path="${PUBLIC_DIR}${src}"
  if [[ -f "$path" ]]; then
    printf '%s' "$path"
    return 0
  fi
  return 1
}

# Sube una imagen y la asigna como imagen destacada de un post.
set_featured_image() {
  local src="$1" post_id="$2"
  local source
  if ! source=$(resolve_source "$src"); then
    echo "  Aviso: no se encuentra la imagen '${PUBLIC_DIR}${src}' (o la URL '$src'). Se omite la imagen destacada." >&2
    return 1
  fi
  if ! wp media import "$source" --post_id="$post_id" --featured_image --porcelain >/dev/null; then
    echo "  Aviso: fallo al importar/asignar la imagen destacada '$source'." >&2
    return 1
  fi
  return 0
}

# Convierte una URL de YouTube (youtu.be/ID o watch?v=ID) en su ID de vídeo.
extract_youtube_id() {
  local url="$1"
  if [[ "$url" =~ youtu\.be/([A-Za-z0-9_-]+) ]]; then
    printf '%s' "${BASH_REMATCH[1]}"
  elif [[ "$url" =~ [?\&]v=([A-Za-z0-9_-]+) ]]; then
    printf '%s' "${BASH_REMATCH[1]}"
  fi
}

# Inserta un embed de YouTube al principio del post_content del post.
prepend_video_embed() {
  local post_id="$1" video_url="$2"
  local video_id
  video_id=$(extract_youtube_id "$video_url")

  if [[ -z "$video_id" ]]; then
    echo "  Aviso: no se pudo interpretar la URL de vídeo '$video_url'." >&2
    return 1
  fi

  local embed_html
  embed_html=$(cat <<EOF
<!-- wp:embed {"url":"https://youtu.be/${video_id}","type":"video","providerNameSlug":"youtube"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/${video_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div></figure>
<!-- /wp:embed -->
EOF
)

  local current_content
  current_content=$(wp post get "$post_id" --field=post_content)

  wp post update "$post_id" --post_content="${embed_html}

${current_content}" >/dev/null
}

# Sube las imágenes de la galería y añade un bloque "Galería" al final
# del post_content con un <figure><img></figure> por cada una.
append_gallery_images() {
  local post_id="$1"
  shift
  local images=("$@")

  local gallery_html=""
  local count=0

  for img in "${images[@]}"; do
    local source
    if ! source=$(resolve_source "$img"); then
      echo "  Aviso: no se encuentra la imagen de galería '${PUBLIC_DIR}${img}' (o la URL '$img'). Se omite." >&2
      continue
    fi

    local attachment_id
    if ! attachment_id=$(wp media import "$source" --post_id="$post_id" --porcelain); then
      echo "  Aviso: fallo al importar la imagen de galería '$source'." >&2
      continue
    fi

    local attachment_url
    attachment_url=$(wp post get "$attachment_id" --field=guid)

    gallery_html="${gallery_html}
<!-- wp:image {\"id\":${attachment_id},\"sizeSlug\":\"large\"} -->
<figure class=\"wp-block-image size-large\"><img src=\"${attachment_url}\" alt=\"\" class=\"wp-image-${attachment_id}\"/></figure>
<!-- /wp:image -->"
    count=$((count + 1))
  done

  if [[ $count -eq 0 ]]; then
    return 1
  fi

  local current_content
  current_content=$(wp post get "$post_id" --field=post_content)

  wp post update "$post_id" --post_content="${current_content}

<!-- wp:heading -->
<h2>Galería</h2>
<!-- /wp:heading -->
${gallery_html}" >/dev/null

  echo "$count"
}

# Procesa un artículo completo: imagen destacada + vídeo + galería.
# Uso: process_article <slug> <imagen> <video_url|""> [galeria...]
process_article() {
  local slug="$1" image="$2" video_url="$3"
  shift 3
  local gallery=("$@")

  echo "Procesando: $slug"

  local post_id
  post_id=$(get_post_id "$slug")

  if [[ -z "$post_id" ]]; then
    echo "  Aviso: no existe ningún post con slug '$slug'. ¿Se ejecutó antes migrate-to-wp.sh? Se omite este artículo." >&2
    return
  fi
  echo "  Post ID: $post_id"

  if set_featured_image "$image" "$post_id"; then
    echo "  Imagen destacada asignada: $image"
  fi

  if [[ -n "$video_url" ]]; then
    if prepend_video_embed "$post_id" "$video_url"; then
      echo "  Vídeo insertado: $video_url"
    fi
  fi

  if [[ ${#gallery[@]} -gt 0 ]]; then
    local added
    if added=$(append_gallery_images "$post_id" "${gallery[@]}"); then
      echo "  Galería añadida: $added imagen(es)"
    else
      echo "  Aviso: no se pudo añadir ninguna imagen de la galería." >&2
    fi
  fi

  echo ""
}

# ── Artículos (slug, imagen principal, vídeo, galería...) ─────────────────

process_article \
  "financiacion-empresarial-andalucia-trade-500-millones" \
  "/cartuja-a-fondo.png" \
  "https://youtu.be/FiKcium72ys"

process_article \
  "ariema-enerxia-hidrogeno-verde-huelva" \
  "/ariema-01.png" \
  "https://youtu.be/vHyrxPzxRJ8" \
  "/ariema-02.png" "/ariema-03.png" "/ariema-04.png"

process_article \
  "blanca-torrent-aceitunas-torrent-en-femenino" \
  "/torrent-01.jpg" \
  "https://youtu.be/TxlTedJp6T8" \
  "/torrent-02.jpg" "/torrent-03.jpg" "/torrent-04.jpg" "/torrent-05.jpg"

process_article \
  "entrevista-antonio-castro-director-general-andalucia-trade" \
  "/antonio-castro.jpg" \
  "https://youtu.be/MdkNsxDEEv8"

process_article \
  "toneleria-del-sur-cooperage-year-montilla-cordoba" \
  "/toneleria-01.png" \
  "https://youtu.be/NvHZk0Y1yTY" \
  "/toneleria-01.png" "/toneleria-02.png" "/toneleria-03.png" "/toneleria-04.png"

process_article \
  "adm-sevilla-2026-cifras-record-aeroespacial-andalucia" \
  "/adm-martes-004.jpg" \
  "https://www.youtube.com/watch?v=K6QgSygkJWY" \
  "/adm-martes-004.jpg"

process_article \
  "andalucia-trade-ele-eeuu-canada-ensenanza-espanol" \
  "/EEUU-Canadá.jpeg" \
  ""

process_article \
  "andalucia-trade-mision-comercial-construccion-peru-lima" \
  "/Perú.png" \
  ""

process_article \
  "reto-andalucia-trade-innovacion-vision-europea" \
  "/banner-reto1.png" \
  "https://www.youtube.com/watch?v=yaMVIpQtiCc"

process_article \
  "samafrava-ampliacion-planta-embalajes-rute-cordoba" \
  "/samafrava-01.jpg" \
  "https://www.youtube.com/watch?v=KUkh-s94b9k" \
  "/samafrava-02.jpg" "/samafrava-03.jpg"

process_article \
  "antonio-espana-hijos-residuos-inertes-huelva" \
  "/antonio-espana-01.png" \
  "https://www.youtube.com/watch?v=ZYX-PVn3pO0" \
  "/antonio-espana-02.png" "/antonio-espana-03.png" "/antonio-espana-04.png"

process_article \
  "planho-consultores-internacionalizacion-trade" \
  "/planho-01.jpg" \
  "https://www.youtube.com/watch?v=Fx751OoD9as" \
  "/planho-02.jpg" "/planho-03.jpg" "/planho-04.jpg"

echo "Migración de imágenes y vídeos completada."

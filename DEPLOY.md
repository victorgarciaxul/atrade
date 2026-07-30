# Despliegue

## Variables de entorno

Se definen **antes del `npm run build`**, porque Next.js incrusta estos valores
en el HTML y el JS generados (no se leen en runtime).

| Variable | Para qué | Valor en pre (acceso directo por IP) | Valor en pro (`andaluciatrade.es/impulsa`) |
|---|---|---|---|
| `NEXT_BASE_PATH` | Subruta bajo la que se sirve la web | *(sin definir)* | `/impulsa` |
| `WP_HOST` | Host del WordPress del que se lee el contenido | `10.240.65.30` | `10.240.65.130` |

Si `WP_HOST` apunta a un host inalcanzable, la web **no da error**: cae
silenciosamente al contenido de ejemplo de `lib/mockData.ts`. Si veis
artículos que no coinciden con los de WordPress, revisad esta variable.

## Despliegue en producción (bajo /impulsa)

```bash
git pull origin master
npm ci

export NEXT_BASE_PATH=/impulsa
export WP_HOST=10.240.65.130
npm run build

# reiniciar el proceso Node (pm2 / systemd / lo que corresponda)
```

Conviene dejar esas dos variables fijas en el entorno del servicio (por ejemplo
en el `ecosystem.config.js` de pm2 o en el `[Service]` del unit de systemd) para
que no se olviden en el siguiente despliegue.

## Configuración de nginx (importante)

Con `NEXT_BASE_PATH=/impulsa`, Next.js sirve **todo** bajo `/impulsa`: las
páginas, los enlaces internos y los assets. Por tanto nginx debe reenviar la
ruta **completa**, sin quitar el prefijo:

```nginx
location /impulsa/ {
    proxy_pass http://127.0.0.1:3000;   # ← SIN barra final
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

El detalle crítico es la **barra final del `proxy_pass`**, que decide si nginx
quita el prefijo o no:

- `proxy_pass http://127.0.0.1:3000;` → **sin** barra: reenvía `/impulsa/a-fondo`
  tal cual. ✅ Es lo que necesita esta configuración.
- `proxy_pass http://127.0.0.1:3000/;` → **con** barra: reenvía `/a-fondo`,
  quitando el prefijo. ❌ Con `NEXT_BASE_PATH` definido, Next.js devolvería 404
  en todas las páginas.

Tampoco debe haber un `rewrite ^/impulsa/(.*) /$1 break;` ni similar dentro del
`location`, porque tendría el mismo efecto que la barra final.

## Aviso: peso de las imágenes en producción

Next.js 15.5 tiene un bug con `basePath`: genera las rutas de las imágenes
locales sin el prefijo, así que salen todas roscas (ocurre igual con
`unoptimized: true`). Para sortearlo, cuando `NEXT_BASE_PATH` está definido se
usa un loader propio (`lib/imageLoader.ts`) que sirve los ficheros de `public/`
tal cual, **sin pasar por el optimizador de imágenes**.

Consecuencia: en producción las imágenes se envían a tamaño original. Varias
pesan mucho (`adm-martes-004.jpg` 9 MB, `ariema-01.png` 9,8 MB), así que
conviene **recomprimirlas en `public/`** antes o poco después de publicar. En
preproducción (sin `NEXT_BASE_PATH`) sí actúa el optimizador, por lo que este
problema no se aprecia ahí: la misma imagen baja de 9 MB a ~12 KB.

### Por qué no vale quitar el prefijo en nginx

Si nginx quita `/impulsa` antes de reenviar, hay que desplegar sin
`NEXT_BASE_PATH`, y entonces los enlaces internos del menú se generan como
`/a-fondo` en vez de `/impulsa/a-fondo`: al pulsarlos, el navegador se sale de
`/impulsa` y aterriza fuera de la web. Por eso la ruta debe llegar completa al
backend.

## Comprobaciones tras el despliegue

```bash
# 1. La home responde
curl -I https://www.andaluciatrade.es/impulsa/

# 2. Una sección interna responde (esto falla si nginx quita el prefijo)
curl -I https://www.andaluciatrade.es/impulsa/a-fondo

# 3. El CSS responde 200 (coger el hash real del <link> del HTML)
curl -s https://www.andaluciatrade.es/impulsa/ | grep -o '/impulsa/_next/static/css/[^"]*'
curl -I https://www.andaluciatrade.es/impulsa/_next/static/css/<hash>.css
```

Las tres deben dar `200`. En el navegador, además: los enlaces del menú deben
apuntar a `/impulsa/...` (no a `/...`) y las imágenes deben cargar.

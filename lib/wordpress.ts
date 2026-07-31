import { Article } from "./types";

/**
 * Host del WordPress del que se obtiene el contenido. Configurable con la
 * variable de entorno WP_HOST (el mismo valor que usa next.config.ts para
 * autorizar las imágenes); por defecto, el WordPress de preproducción.
 *
 * En producción hay que definir WP_HOST con el WordPress de esa máquina: si
 * apunta a un host inalcanzable, la web cae silenciosamente al contenido de
 * ejemplo de mockData.ts en vez de mostrar los artículos reales.
 */
const WP_HOSTNAME = process.env.WP_HOST ?? "10.240.65.30";

const WP_API_BASE = `http://${WP_HOSTNAME}/wp-json/wp/v2`;

/** Cuánto tiempo (segundos) cachea Next.js las respuestas antes de revalidar. */
const REVALIDATE_SECONDS = 300;

interface WpRendered {
  rendered: string;
}

interface WpTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface WpEmbedded {
  author?: { name: string }[];
  "wp:featuredmedia"?: { source_url?: string }[];
  "wp:term"?: WpTerm[][];
}

interface WpPost {
  id: number;
  slug: string;
  date: string;
  title: WpRendered;
  excerpt: WpRendered;
  content: WpRendered;
  _embedded?: WpEmbedded;
}

interface WpCategory {
  id: number;
  name: string;
  slug: string;
}

/**
 * Decodifica las entidades HTML que devuelve WordPress (comillas tipográficas,
 * guiones largos, puntos suspensivos…). Cubre todas las numéricas (&#8216;,
 * &#8230;, etc.) y las nombradas más comunes, en vez de ir añadiéndolas una a una.
 */
function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** Busca una URL de YouTube/Vimeo embebida en el contenido (iframe o bloque wp-block-embed). */
function extractVideoUrl(html: string): string | undefined {
  const iframeMatch = html.match(/<iframe[^>]+src="([^"]*(?:youtube\.com|youtu\.be|vimeo\.com)[^"]*)"/i);
  if (iframeMatch) return iframeMatch[1];

  const linkMatch = html.match(
    /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]+|youtu\.be\/[\w-]+|vimeo\.com\/\d+)/i
  );
  return linkMatch?.[0];
}

/** Elimina los bloques de embed de vídeo del HTML para que no queden restos en el cuerpo del artículo. */
function stripVideoEmbeds(html: string): string {
  return html
    .replace(/<figure[^>]*wp-block-embed[^>]*>[\s\S]*?<\/figure>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
}

function htmlToBody(html: string): string {
  const withoutTags = html
    .replace(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/gi, "\n\n## $1\n\n")
    // Bloques de imagen (<figure><img></figure> o <img> suelto): se convierten a
    // "![](url)" ANTES de que el strip genérico de etiquetas los borre sin dejar
    // rastro. El renderer de app/article/[slug]/page.tsx reconoce este marcador.
    .replace(/<figure[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<\/figure>/gi, "\n\n![]($1)\n\n")
    .replace(/<img[^>]+src="([^"]+)"[^>]*\/?>/gi, "\n\n![]($1)\n\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return decodeEntities(withoutTags)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function estimateReadTime(html: string): number {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso: string): string {
  const label = new Date(iso).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function mapPost(post: WpPost): Article {
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Sin categoría";
  const author = post._embedded?.author?.[0]?.name ?? "Redacción";
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
  const videoUrl = extractVideoUrl(post.content.rendered);
  const bodyHtml = videoUrl ? stripVideoEmbeds(post.content.rendered) : post.content.rendered;

  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    body: htmlToBody(bodyHtml),
    category,
    author,
    date: formatDate(post.date),
    readTime: estimateReadTime(post.content.rendered),
    image,
    videoUrl,
    slug: post.slug,
  };
}

/** Máximo tiempo de espera por petición antes de caer al fallback de mockData. */
const FETCH_TIMEOUT_MS = 5000;

async function wpFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_API_BASE}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // API de WordPress no accesible (red privada caída, timeout, etc.)
    return null;
  }
}

const categoryIdCache = new Map<string, number | null>();

async function getCategoryId(categorySlug: string): Promise<number | null> {
  if (categoryIdCache.has(categorySlug)) {
    return categoryIdCache.get(categorySlug)!;
  }
  const categories = await wpFetch<WpCategory[]>(
    `/categories?slug=${encodeURIComponent(categorySlug)}`
  );
  const id = categories?.[0]?.id ?? null;
  categoryIdCache.set(categorySlug, id);
  return id;
}

/** Últimos posts, opcionalmente filtrados por el slug de una categoría de WordPress. */
export async function getPosts(options: {
  categorySlug?: string;
  perPage?: number;
} = {}): Promise<Article[] | null> {
  const { categorySlug, perPage = 10 } = options;

  const params = new URLSearchParams({ _embed: "1", per_page: String(perPage) });

  if (categorySlug) {
    const categoryId = await getCategoryId(categorySlug);
    if (categoryId === null) return null;
    params.set("categories", String(categoryId));
  }

  // Orden manual por menu_order. El endpoint /wp/v2/posts de WordPress no admite
  // "menu_order" como orderby para el tipo "post" salvo que se habilite explícitamente
  // en el backend (ver rest_post_collection_params en migrate-*.sh / WP). Si WordPress
  // rechaza la petición por eso, reintentamos sin ordenar en vez de perder el contenido
  // real y caer al fallback de mockData.
  const orderedParams = new URLSearchParams(params);
  orderedParams.set("orderby", "menu_order");
  orderedParams.set("order", "asc");

  let posts = await wpFetch<WpPost[]>(`/posts?${orderedParams.toString()}`);
  if (!posts) {
    posts = await wpFetch<WpPost[]>(`/posts?${params.toString()}`);
  }
  if (!posts) return null;
  return posts.map(mapPost);
}

/** Busca un post por slug. Devuelve null si no existe o la API no responde. */
export async function getPostBySlug(slug: string): Promise<Article | null> {
  const params = new URLSearchParams({ _embed: "1", slug });
  const posts = await wpFetch<WpPost[]>(`/posts?${params.toString()}`);
  if (!posts || posts.length === 0) return null;
  return mapPost(posts[0]);
}

/** Posts de WordPress por categoría; si la API falla o no hay resultados, usa el fallback de mockData. */
export async function getCategoryArticles(
  categorySlug: string,
  fallback: Article[],
  perPage = 10
): Promise<Article[]> {
  const posts = await getPosts({ categorySlug, perPage });
  return posts && posts.length > 0 ? posts : fallback;
}

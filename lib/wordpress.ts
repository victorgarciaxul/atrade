import { Article } from "./types";

const WP_API_BASE = "http://10.240.65.30/wp-json/wp/v2";

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

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#039;/g, "'")
    .replace(/&#8211;|&#8212;/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToBody(html: string): string {
  return html
    .replace(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/gi, "\n\n## $1\n\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#039;/g, "'")
    .replace(/&#8211;|&#8212;/g, "-")
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

  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    body: htmlToBody(post.content.rendered),
    category,
    author,
    date: formatDate(post.date),
    readTime: estimateReadTime(post.content.rendered),
    image,
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

  const posts = await wpFetch<WpPost[]>(`/posts?${params.toString()}`);
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

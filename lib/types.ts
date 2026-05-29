export interface Article {
  id: number;
  title: string;
  excerpt: string;
  body?: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  slug: string;
  /** URL del vídeo principal (YouTube embed, Vimeo, etc.). Se rellena desde WordPress. */
  videoUrl?: string;
  /** Imágenes adicionales del artículo. Se rellena desde WordPress. */
  gallery?: string[];
}

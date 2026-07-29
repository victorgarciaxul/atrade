import { BASE_PATH } from "./basePath";

/**
 * Loader personalizado para next/image.
 *
 * El endpoint de optimización de imágenes de Next.js (/_next/image) devuelve
 * 404 en Vercel cuando la app se sirve bajo basePath ('/impulsa'), aunque el
 * resto de assets estáticos funcionan bien. Este loader evita por completo
 * ese endpoint: para imágenes locales antepone el basePath a mano (necesario
 * porque, a diferencia del loader por defecto, uno personalizado no lo hace
 * automáticamente) y sirve el fichero original sin redimensionar; las URLs
 * externas (WordPress, YouTube, picsum, etc.) se devuelven tal cual.
 */
export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${BASE_PATH}${src.startsWith("/") ? "" : "/"}${src}`;
}

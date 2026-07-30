import { BASE_PATH } from "./basePath";

/**
 * Loader personalizado para next/image.
 *
 * Existe para sortear un bug de Next.js cuando la web se sirve bajo un basePath:
 * el componente next/image genera la ruta de las imágenes locales SIN el
 * basePath (`/header-logos.webp`), pero los ficheros de public/ se sirven en
 * `/impulsa/header-logos.webp`. Resultado: todas las imágenes locales salen
 * rotas. Ocurre igual con `unoptimized: true` (comprobado en Next.js 15.5).
 *
 * Este loader devuelve la ruta del fichero original con el basePath ya añadido.
 * Nota: al usar un loader personalizado, Next.js no monta el endpoint
 * /_next/image, así que las imágenes se sirven sin redimensionar; es el precio
 * de que funcionen bajo la subruta.
 *
 * Las URLs externas (WordPress, YouTube…) se devuelven tal cual.
 *
 * Si BASE_PATH está vacío (despliegue en la raíz), devuelve la ruta sin tocar.
 */
export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${BASE_PATH}${src.startsWith("/") ? "" : "/"}${src}`;
}

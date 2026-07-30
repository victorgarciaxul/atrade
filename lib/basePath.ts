/**
 * Subruta bajo la que se sirve la web (p. ej. "/impulsa"), o "" si se sirve
 * desde la raíz. Se fija en el momento del build con NEXT_BASE_PATH; ver
 * next.config.ts y DEPLOY.md.
 *
 * Se expone como NEXT_PUBLIC_* además de NEXT_BASE_PATH porque lib/imageLoader.ts
 * se ejecuta también en el navegador, donde solo están disponibles las variables
 * con el prefijo NEXT_PUBLIC_.
 */
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.NEXT_BASE_PATH ?? "";

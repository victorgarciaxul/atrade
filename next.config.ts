import type { NextConfig } from "next";

/**
 * Subruta bajo la que se sirve la web, si la hay (p. ej. "/impulsa" para
 * https://www.andaluciatrade.es/impulsa). Se configura con la variable de
 * entorno NEXT_BASE_PATH en el momento del BUILD (no en runtime: Next.js
 * incrusta este valor en el HTML/JS generado).
 *
 *   - Acceso directo al servidor (pre, por IP o localhost): dejar sin definir
 *     → la web se sirve desde la raíz "/".
 *   - Detrás del nginx de la Junta bajo /impulsa (pro): NEXT_BASE_PATH=/impulsa
 *     → páginas, enlaces internos y assets cuelgan de /impulsa.
 *
 * IMPORTANTE: si se define NEXT_BASE_PATH, el nginx que hace de proxy debe
 * reenviar la ruta COMPLETA (incluyendo /impulsa) al backend, sin quitar el
 * prefijo. Ver DEPLOY.md.
 */
const BASE_PATH = process.env.NEXT_BASE_PATH ?? "";

/**
 * Host de la API/medios de WordPress (sin protocolo). Se configura con la
 * variable de entorno WP_HOST; por defecto, el WordPress de preproducción.
 */
const WP_HOSTNAME = process.env.WP_HOST ?? "10.240.65.30";

const nextConfig: NextConfig = {
  // Solo se aplican si NEXT_BASE_PATH está definido; si no, la web sirve
  // desde la raíz como hasta ahora.
  ...(BASE_PATH ? { basePath: BASE_PATH, assetPrefix: BASE_PATH } : {}),

  // Se expone el basePath al bundle del cliente para que lib/imageLoader.ts
  // pueda construir las URLs de imagen también en el navegador.
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Solo cuando hay basePath: loader propio para sortear el bug de Next.js que
    // rompe las imágenes locales bajo una subruta (ver lib/imageLoader.ts).
    // Sin basePath se usa el loader por defecto, que sí optimiza las imágenes.
    ...(BASE_PATH ? { loader: "custom" as const, loaderFile: "./lib/imageLoader.ts" } : {}),
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "http", hostname: WP_HOSTNAME },
    ],
  },
};

export default nextConfig;

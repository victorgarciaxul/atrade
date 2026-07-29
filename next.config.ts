import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/basePath";

/** Host de la API/medios de WordPress. Cambiar aquí cuando se disponga del dominio final. */
const WP_HOSTNAME = "10.240.65.30";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // El endpoint dinámico de optimización de imágenes (/_next/image) devuelve 404
    // en Vercel cuando la app se sirve bajo basePath ('/impulsa'), aunque el resto
    // de assets estáticos (CSS, JS, ficheros de public/) funcionan bien. Se usa un
    // loader personalizado (lib/imageLoader.ts) que evita ese endpoint por completo.
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "http", hostname: WP_HOSTNAME },
    ],
  },
};

export default nextConfig;

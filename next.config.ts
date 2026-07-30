import type { NextConfig } from "next";

/** Host de la API/medios de WordPress. Cambiar aquí cuando se disponga del dominio final. */
const WP_HOSTNAME = "10.240.65.30";

const nextConfig: NextConfig = {
  // Los assets estáticos (/_next/static/...) deben pedirse con /impulsa/ delante
  // para que el nginx de la Junta (delante de este backend) los capture y
  // reenvíe correctamente. basePath NO se añade: nginx quita /impulsa antes de
  // reenviar al backend, así que Next.js debe seguir enrutando las páginas
  // desde la raíz /.
  assetPrefix: "/impulsa",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "http", hostname: WP_HOSTNAME },
    ],
  },
};

export default nextConfig;

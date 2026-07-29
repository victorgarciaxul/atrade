import type { NextConfig } from "next";

/** Host de la API/medios de WordPress. Cambiar aquí cuando se disponga del dominio final. */
const WP_HOSTNAME = "10.240.65.30";

const nextConfig: NextConfig = {
  basePath: "/impulsa",
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

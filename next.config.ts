import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de proyecto de relleno mientras no hay galería real todavía.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;

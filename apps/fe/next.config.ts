import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@acme/shared"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "wallpapers.com",
      },
      {
        protocol: "https",
        hostname: "e0.pxfuel.com",
      },
    ],
  },
  // If BE is on different domain in prod, handle CORS there.
};

export default nextConfig;

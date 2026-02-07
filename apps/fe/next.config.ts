import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@acme/shared"],
  // If BE is on different domain in prod, handle CORS there.
};

export default nextConfig;

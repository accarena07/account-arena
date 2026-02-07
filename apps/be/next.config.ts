import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@acme/shared"],
  // API-focused: keep it simple
  experimental: {
    // add experimental flags here if needed
  }
};

export default nextConfig;

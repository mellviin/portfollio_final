import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
};

export default nextConfig;

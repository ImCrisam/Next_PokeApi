import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ["raw.githubusercontent.com"],
    unoptimized: true, 
  },
  output: 'export',
};

export default nextConfig;

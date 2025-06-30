import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
    unoptimized: true,
  },
  output: 'export',
  basePath: isProd ? '/Next_PokeApi' : '',
  assetPrefix: isProd ? '/Next_PokeApi/' : '',

  env: {
    NEXT_PUBLIC_ASSET_PREFIX: isProd ? '/Next_PokeApi' : '',
  },
};

export default nextConfig;

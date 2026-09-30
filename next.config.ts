import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/reservation-website', 
  assetPrefix: '/reservation-website',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

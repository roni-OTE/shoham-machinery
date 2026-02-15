import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default nextConfig;

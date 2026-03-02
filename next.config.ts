import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.insanenotes.in',
        pathname: '/**',
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // Cache images for 24 hours
  },
  async redirects() {
    return [
      {
        source: '/tools/couple-name-generator',
        destination: '/stylish-couple-name-maker',
        permanent: true,
      },
      {
        source: '/tools/youtube-tag-extractor',
        destination: '/youtube-tag-extractor',
        permanent: true,
      },
      {
        source: '/mb-to-kb-image-converter',
        destination: '/mb-to-kb-converter',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

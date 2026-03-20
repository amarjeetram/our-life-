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
  async headers() {
    return [
      {
        // Only API routes should never be cached
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
    ];
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
        source: '/signature-resize',
        destination: '/govt-exam-tools/signature-resize',
        permanent: true,
      },
      {
        source: '/tnpsc-photo-compressor',
        destination: '/govt-exam-tools/tnpsc-photo-compressor',
        permanent: true,
      },

    ];
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;

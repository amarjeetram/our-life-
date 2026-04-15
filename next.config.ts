import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.insanenotes.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.smarttoolswala.com',
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
        source: '/love-tools/couple-name-maker',
        destination: '/stylish-couple-name-maker',
        permanent: true,
      },
      {
        source: '/calculators/fun/love-percentage-calculator-by-name',
        destination: '/love-tools/love-calculator',
        permanent: true,
      },
      {
        source: '/calculators/fun/flames-calculator',
        destination: '/love-tools/flames-calculator',
        permanent: true,
      },
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
      {
        source: '/mb-to-kb-converter',
        destination: '/mb-to-kb-image-converter',
        permanent: true,
      },
      {
        source: '/resize-image-to-100kb',
        destination: '/image-tools/resize-image-to-100kb',
        permanent: true,
      },
      {
        source: '/photo-and-image-compression-tools',
        destination: '/image-tools',
        permanent: true,
      },
      {
        source: '/kb-to-mb-image-converter',
        destination: '/image-tools/kb-to-mb-image-converter',
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
    serverActions: {
      bodySizeLimit: '25mb',
    },
  },
};

export default nextConfig;

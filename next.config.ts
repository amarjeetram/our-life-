import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

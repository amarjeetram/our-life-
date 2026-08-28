import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Image Optimization ──────────────────────────────────
  // C-4 FIX: Removed wildcard hostname ('**').
  // Only allow images from trusted sources.
  images: {
    remotePatterns: [
      // Clerk user avatars
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.clerk.dev" },
      // Google OAuth avatars (via Clerk)
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // GitHub OAuth avatars (via Clerk)
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      // Supabase Storage for tool logos/screenshots
      { protocol: "https", hostname: "xhjeegajdsxwviuwrfvb.supabase.co" },
      // Common CDNs for tool logos submitted by users
      { protocol: "https", hostname: "*.supabase.co" },
      // Common safe image CDNs — expand this list as needed
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 hours
  },

  // ─── HTTP Headers ────────────────────────────────────────
  // H-7 FIX: Security headers on all pages + strict API no-cache
  async headers() {
    return [
      {
        // Security headers for ALL pages
        source: "/(.*)",
        headers: [
          // Prevent MIME type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Block clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Control referrer information
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions: disable unnecessary browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Force HTTPS (1 year, include subdomains)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Basic CSP — allows same-origin scripts + CDNs used by the app
          // Tighten this as the app matures
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: added AdSense + GTM domains
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://*.clerk.accounts.dev https://js.clerk.dev https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagmanager.com https://www.googletagservices.com https://adservice.google.com https://*.doubleclick.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              // Images: AdSense serves ad images from these domains
              "img-src 'self' data: blob: https: https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.gstatic.com",
              // Connections: AdSense reporting + Razorpay + Supabase + Clerk
              "connect-src 'self' https://*.supabase.co https://*.clerk.accounts.dev https://api.razorpay.com wss://*.supabase.co https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://adservice.google.com",
              // Frames: AdSense renders ads in iframes from these domains
              "frame-src https://checkout.razorpay.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // API routes: never cache
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        // Admin panel: never cache + extra security
        source: "/manage(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, private",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  // ─── Redirects ───────────────────────────────────────────
  async redirects() {
    return [
      { source: "/love-tools/couple-name-maker", destination: "/stylish-couple-name-maker", permanent: true },
      { source: "/love-tools/love-percentage-calculator-by-name", destination: "/calculators/fun/love-percentage-calculator-by-name", permanent: true },
      { source: "/love-tools/love-calculator", destination: "/calculators/fun/love-percentage-calculator-by-name", permanent: true },
      { source: "/love-tools/flames-calculator", destination: "/calculators/fun/flames-calculator", permanent: true },
      { source: "/tools/couple-name-generator", destination: "/stylish-couple-name-maker", permanent: true },
      { source: "/tools/youtube-tag-extractor", destination: "/youtube-tag-extractor", permanent: true },
      { source: "/signature-resize", destination: "/govt-exam-tools/signature-resize", permanent: true },
      { source: "/tnpsc-photo-compressor", destination: "/govt-exam-tools/tnpsc-photo-compressor", permanent: true },
      { source: "/mb-to-kb-converter", destination: "/mb-to-kb-image-converter", permanent: true },
      { source: "/resize-image-to-100kb", destination: "/image-tools/resize-image-to-100kb", permanent: true },
      { source: "/photo-and-image-compression-tools", destination: "/image-tools", permanent: true },
      { source: "/kb-to-mb-image-converter", destination: "/image-tools/kb-to-mb-image-converter", permanent: true },
      { source: "/rrb-signature-resizer", destination: "/govt-exam-tools/rrb-signature-resizer", permanent: true },
      { source: "/neet-photo-resizer", destination: "/govt-exam-tools/neet-photo-resizer", permanent: true },
      { source: "/uti-photo-resize", destination: "/govt-exam-tools/uti-photo-resize", permanent: true },
      { source: "/image-tools/pan-card-photo-resize", destination: "/govt-exam-tools/pan-card-photo-resize", permanent: true },
      { source: "/sad-bio-for-instagram", destination: "/blog/sad-bio-for-instagram", permanent: true },
      { source: "/instagram-stylish-bio", destination: "/blog/instagram-stylish-bio", permanent: true },
      { source: "/instagram-bio-in-hindi", destination: "/blog/instagram-bio-in-hindi", permanent: true },
      { source: "/instagram-bio-shayari", destination: "/blog/instagram-bio-shayari", permanent: true },
      { source: "/gym-bio-for-instagram", destination: "/blog/gym-bio-for-instagram", permanent: true },
      { source: "/free-fire-bio-for-instagram", destination: "/blog/free-fire-bio-for-instagram", permanent: true },
      { source: "/instagram-bio-me-kya-likhe", destination: "/blog/instagram-bio-me-kya-likhe", permanent: true },
      { source: "/alone-bio-for-instagram", destination: "/blog/alone-bio-for-instagram", permanent: true },
      { source: "/gangster-bio-for-instagram", destination: "/blog/gangster-bio-for-instagram", permanent: true },
      { source: "/badmashi-bio-for-instagram", destination: "/blog/badmashi-bio-for-instagram", permanent: true },
      { source: "/mahakal-bio-for-instagram", destination: "/blog/mahakal-bio-for-instagram", permanent: true },
      { source: "/jai-shree-ram-bio-for-instagram", destination: "/blog/jai-shree-ram-bio-for-instagram", permanent: true },
    ];
  },

  // ─── Experimental ────────────────────────────────────────
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
    serverActions: {
      // M-5 FIX: Reduced from 25mb to 5mb — 25mb is excessive
      // and can exhaust serverless memory.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;

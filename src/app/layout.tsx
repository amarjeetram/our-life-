import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import SiteShell from "../components/SiteShell";
import ClientToaster from "../components/ClientToaster";
import ClientDropZone from "../components/ClientDropZone";
import Script from "next/script";
import DeferredGTM from "../components/DeferredGTM";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://smarttoolswala.com"),
  title: {
    default: "SmartToolsWala - All-in-One Online Image Optimization Hub",
    template: "%s | SmartToolsWala"
  },
  description: "Free, fast, and SEO-optimized image tools. Compress images to 20kb, optimize for web, and convert formats with industrial Sharp engine precision.",
  keywords: ["image optimizer", "compress to 20kb", "png to jpg", "webp converter", "seo image tools", "online image compressor"],
  authors: [{ name: "SmartToolsWala Team" }],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smarttoolswala.com",
    siteName: "SmartToolsWala",
    title: "SmartToolsWala - Professional Image Optimization",
    description: "The fastest Sharp-powered image tool suite on the web.",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartToolsWala - Professional Image Optimization",
    description: "The fastest Sharp-powered image tool suite on the web.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="d8ok06KdnbbIqz7qNwaXMw" async></script>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SmartToolsWala",
              "url": "https://smarttoolswala.com",
              "logo": "https://smarttoolswala.com/logo.png",
              "sameAs": [
                "https://twitter.com/smarttoolswala",
                "https://github.com/smarttoolswala"
              ]
            })
          }}
        />
        <Suspense fallback={null}>
          <ClientToaster />
        </Suspense>
        <Suspense fallback={null}>
          <ClientDropZone />
        </Suspense>
        <SiteShell>
          {/* GTM will be loaded via a client wrapper to defer it completely */}
          {children}
        </SiteShell>
        <DeferredGTM />
      </body>
    </html>
  );
}

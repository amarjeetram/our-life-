import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import SiteShell from "../components/SiteShell";
import ClientToaster from "../components/ClientToaster";
import ClientDropZone from "../components/ClientDropZone";
import Script from "next/script";
import DeferredGTM from "../components/DeferredGTM";
import DeferredAdSense from "../components/DeferredAdSense";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "optional", preload: true });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "optional", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL("https://smarttoolswala.com"),
  title: {
    default: "SmartToolsWala - All-in-One Web Tools & Utilities Platform",
    template: "%s | SmartToolsWala"
  },
  description: "Free, fast, and SEO-optimized online web tools. Generate Instagram bios, compress images, calculate GPA, extract YouTube tags, and use other digital utilities.",
  keywords: ["online utility tools", "instagram bio generator", "image compressor", "gpa calculator", "youtube seo tools", "free web tools"],
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
    title: "SmartToolsWala - All-in-One Web Tools & Utilities Platform",
    description: "Free, fast, and SEO-optimized online web tools and utilities.",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartToolsWala - All-in-One Web Tools & Utilities Platform",
    description: "Free, fast, and SEO-optimized online web tools and utilities.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large",
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
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-7117465882400046" />
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
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
        <Script id="ahrefs-analytics" src="https://analytics.ahrefs.com/analytics.js" data-key="d8ok06KdnbbIqz7qNwaXMw" strategy="lazyOnload" />

        <DeferredGTM />
        <DeferredAdSense />
      </body>
    </html>
  );
}

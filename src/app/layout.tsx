import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import SiteShell from "../components/SiteShell";
import ClientToaster from "../components/ClientToaster";
import ClientDropZone from "../components/ClientDropZone";
import ClientClerkScrollLock from "../components/ClientClerkScrollLock";
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

const clerkLocalization = {
  signIn: {
    start: {
      title: 'Sign in to SmartToolsWala',
      subtitle: 'Welcome back! Please sign in to continue',
    },
  },
  signUp: {
    start: {
      title: 'Create your SmartToolsWala account',
      subtitle: 'Welcome! Please fill in the details to get started',
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
                  var saved = localStorage.getItem('theme');
                  // Dark is the PRIMARY default.
                  // Only switch to light if user explicitly chose light.
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    // Default: always dark (even if no preference saved)
                    document.documentElement.classList.add('dark');
                    if (!saved) {
                      localStorage.setItem('theme', 'dark');
                    }
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ClerkProvider
          localization={clerkLocalization}
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: '#6366f1',
              colorBackground: '#0f172a',
              colorInput: '#1e293b',
              colorInputForeground: '#f8fafc',
              colorForeground: '#f8fafc',
              colorMutedForeground: '#94a3b8',
              borderRadius: '0.85rem',
            },
            elements: {
              card: 'bg-slate-900 border border-slate-800/80 shadow-2xl rounded-3xl overflow-hidden',
              modalBackdrop: 'clerk-active-modal-backdrop bg-black/60 backdrop-blur-[2px]',
              formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200',
              socialButtonsBlockButton: 'bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-white rounded-xl transition-all duration-200 font-medium',
              formFieldInput: 'bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
              footerActionLink: 'text-indigo-400 hover:text-indigo-300 font-semibold',
              headerTitle: 'text-slate-100 font-extrabold text-xl',
              headerSubtitle: 'text-slate-400 font-medium text-sm',
              dividerLine: 'bg-slate-800',
              dividerText: 'text-slate-500 text-xs font-semibold uppercase',
            }
          }}
        >
          <ClientClerkScrollLock />
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
        </ClerkProvider>
      </body>
    </html>
  );
}
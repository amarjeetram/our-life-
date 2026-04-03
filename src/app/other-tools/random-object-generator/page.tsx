import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RandomObjectClient from "@/components/RandomObjectClient";
import ArticleRandomObjectGenerator, { faqsRandomObjectGenerator } from "@/components/articles/ArticleRandomObjectGenerator";

const SITE = "https://smarttoolswala.com";
const PAGE_URL = `${SITE}/other-tools/random-object-generator`;

export const metadata: Metadata = {
    title: "Random Object Generator (With Pictures) – Free & Easy",
    description: "Use our free random object generator with pictures to draw, get character ideas, or play games. Generates 100+ items instantly for kids and object shows.",
    keywords: "random object generator, random object generator to draw, random object generator with pictures, random object generator wheel, random object generator for object show, most random object generator, a random object generator, random object generator for kids",
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: "Random Object Generator (With Pictures)",
        description: "Generate completely random items instantly! Fun, free tool with emojis for drawing, writing, and kids games.",
        url: PAGE_URL,
        siteName: "SmartToolsWala",
        type: "website",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "Random Object Generator",
            "url": PAGE_URL,
            "description": "Generate completely random objects instantly. A fun tool loaded with 100+ unique items and emojis.",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires a modern web browser",
            "isAccessibleForFree": true,
            "featureList": [
                "Generates 1, 3, 5, or 10 objects instantly",
                "Includes visual emojis/pictures for every object",
                "Fun shuffling wheel animation effect",
                "100+ unique, diverse items",
                "Completely free and completely safe for kids"
            ],
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
            }
        },
        {
            "@type": "Article",
            "headline": "Random Object Generator (With Pictures) – Fun, Free, and Fast!",
            "description": "Learn how to use our free random object generator for drawing ideas, vocabulary games for kids, and object shows.",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": PAGE_URL
            },
            "author": {
                "@type": "Organization",
                "name": "SmartToolsWala"
            },
            "publisher": {
                "@type": "Organization",
                "name": "SmartToolsWala",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://smarttoolswala.com/logo.png"
                }
            },
            "datePublished": "2026-03-31",
            "dateModified": "2026-03-31",
            "inLanguage": "en",
            "image": "https://smarttoolswala.com/og-image.png"
        },
        {
            "@type": "FAQPage",
            "mainEntity": faqsRandomObjectGenerator.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                }
            }))
        }
    ]
};

export default function RandomObjectGeneratorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main style={{ minHeight: "100vh", background: "#f8fafc", position: "relative" }}>
                {/* Background Pattern */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.5, background: "radial-gradient(circle at 10% 20%, #eff6ff 0%, transparent 40%), radial-gradient(circle at 90% 80%, #f5f3ff 0%, transparent 40%)", pointerEvents: "none" }} />
                
                <div style={{ maxWidth: 840, margin: "0 auto", padding: "100px 20px 60px", position: "relative", zIndex: 1 }}>
                    <Link href="/other-tools" style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontSize: 14, fontWeight: 700, color: "#6366f1",
                        textDecoration: "none", marginBottom: 28,
                    }}>
                        <ArrowLeft size={16} /> Back to Other Tools
                    </Link>

                    {/* Highly Interactive Tool */}
                    <RandomObjectClient />

                    {/* SEO Rich Article Below */}
                    <div className="mt-12">
                        <ArticleRandomObjectGenerator />
                    </div>
                </div>
            </main>
        </>
    );
}

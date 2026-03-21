import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { Heart, Sparkles, Hash, Type } from 'lucide-react';
import CoupleNameClient from "../../components/CoupleNameClient";
import ArticleCoupleName from '@/components/articles/ArticleCoupleName';


// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "Stylish Couple Name Maker ❤️ Free Name Generator with Fonts & Meaning",
    description: "Create stylish couple names with meaning ❤️ Blend two names into unique, romantic nicknames. Free generator with fonts, emojis & instant download.",
    keywords: "couple name generator, stylish couple name maker, combine two names, couple name with meaning, couple name generator for instagram, wedding hashtag generator, romantic couple name generator, mix couple name generator, combine couple name generator, hashtag couple name generator, ai couple name generator, couple name generator free, ship name generator, couple name creator",
    alternates: {
        canonical: "https://smarttoolswala.com/stylish-couple-name-maker"
    },
    openGraph: {
        title: "Stylish Couple Name Maker ❤️ Free Name Generator with Fonts & Meaning",
        description: "Create stylish couple names with meaning ❤️ Blend two names into unique, romantic nicknames. Free generator with fonts, emojis & instant download.",
        url: "https://smarttoolswala.com/stylish-couple-name-maker",
        type: "website",
        siteName: "SmartToolsWala",
    },
    twitter: {
        card: "summary_large_image",
        title: "Stylish Couple Name Maker ❤️ Free Name Generator with Fonts & Meaning",
        description: "Create stylish couple names with meaning ❤️ Blend two names into unique, romantic nicknames. Free generator with fonts, emojis & instant download.",
    }
};

export default function StylishCoupleNameMakerPage() {

    // ── Structured Data (JSON-LD) ──────────────────────────────────────────────
    const faqs = [
        {
            q: "Is this couple name generator free to use?",
            a: "Yes, completely free! Our romantic couple name generator has no hidden charges, no premium tiers, no daily limits, and absolutely no signup or account creation required. You can use it as many times as you want."
        },
        {
            q: "Can I use the generated couple names on Instagram?",
            a: "Absolutely! This tool was built specifically as a couple name generator for Instagram. All the stylish unicode font styles we generate are fully supported across Instagram, Facebook, Twitter, TikTok, WhatsApp, and Telegram."
        },
        {
            q: "Does this work as a wedding hashtag generator?",
            a: "Yes! Our hashtag couple name generator automatically creates wedding-ready hashtags like #YourNameLovesPartnerName and #YourNameWedPartnerName using popular wedding keywords, ready for your big day."
        },
        {
            q: "How does the AI couple name generator work?",
            a: "Our mix couple name generator uses a custom algorithm that analyses phonemes in each name, identifying strong opening and closing sounds, then blends them in multiple proportions to create names that sound natural and meaningful — not random syllable mashups."
        },
        {
            q: "Does it work with Indian names like Rohit, Priya, Aarav, or Ananya?",
            a: "Yes! Our tool is designed with Indian names in mind. It handles Hindi-origin names written in English beautifully, making it the best couple name generator for Indian couples available online today."
        },
        {
            q: "Can I download the generated couple names?",
            a: "Yes! After generating your couple names, you can download all the generated names, hashtags, and stylish font versions as a plain text file instantly."
        },
        {
            q: "Do I need to create an account or give my email?",
            a: "No accounts, no emails, no passwords. Your names are processed in your browser and are never stored on our servers. Come, type, generate, and go — in under 30 seconds."
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "SmartToolsWala",
                "url": "https://smarttoolswala.com",
                "logo": "https://smarttoolswala.com/logo.svg",
                "sameAs": [
                    "https://twitter.com/smarttoolswala",
                    "https://github.com/smarttoolswala",
                    "https://www.youtube.com/@SmartToolsWala"
                ]
            },
            {
                "@type": "WebApplication",
                "name": "Stylish Couple Name Maker",
                "url": "https://smarttoolswala.com/stylish-couple-name-maker",
                "description": "Create stylish couple names with meaning. Blend two names into unique, romantic nicknames. Free generator with fonts, emojis and instant download.",
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "All",
                "browserRequirements": "Requires JavaScript",
                "featureList": [
                    "Combine two names into romantic couple names",
                    "Generate stylish unicode font styles for Instagram bios",
                    "Automatic wedding hashtag generator",
                    "Emoji-decorated couple names",
                    "One-click copy to clipboard",
                    "Instant text file download",
                    "Supports Indian names and English names"
                ],
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "14800",
                    "bestRating": "5",
                    "worstRating": "1"
                }
            },
            {
                "@type": "HowTo",
                "name": "How to Generate a Stylish Couple Name",
                "description": "Use SmartToolsWala's free couple name generator to blend two names into unique romantic nicknames with stylish fonts, emojis, and wedding hashtags.",
                "totalTime": "PT1M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "position": 1,
                        "name": "Enter the First Name",
                        "text": "Type your name or your partner's name in the first input box on the couple name generator.",
                        "url": "https://smarttoolswala.com/stylish-couple-name-maker#step-enter-names"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 2,
                        "name": "Enter the Second Name",
                        "text": "Type the second person's name in the Partner's Name input field.",
                        "url": "https://smarttoolswala.com/stylish-couple-name-maker#step-second-name"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 3,
                        "name": "Click Generate Spark",
                        "text": "Press the Generate button to instantly create blended couple names, stylish fonts, and romantic hashtags.",
                        "url": "https://smarttoolswala.com/stylish-couple-name-maker#step-generate"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 4,
                        "name": "Copy Your Favourite Name",
                        "text": "Browse the results and click the copy icon next to any name, font style, or hashtag to instantly copy it to your clipboard.",
                        "url": "https://smarttoolswala.com/stylish-couple-name-maker#step-copy"
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://smarttoolswala.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Other Tools",
                        "item": "https://smarttoolswala.com/other-tools"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Stylish Couple Name Maker",
                        "item": "https://smarttoolswala.com/stylish-couple-name-maker"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.a
                    }
                }))
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20">

            {/* JSON-LD Structured Data — All Schemas in One Graph */}
            <Script
                id="schema-couple-name-maker"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* ── Page Header / Hero ─────────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 text-center relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-pink-500" />
                    Free Utility Tool
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 leading-tight">
                    Stylish Couple Name{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                        Maker ❤️
                    </span>
                </h1>

                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                    Blend two names into beautiful, unique nicknames with stylish fonts, wedding hashtags, and emojis — free, instant, and ready for Instagram.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        Stylish Fonts
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                        <Hash className="w-4 h-4 text-purple-400" />
                        Wedding Hashtags
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                        <Type className="w-4 h-4 text-indigo-400" />
                        Unicode Fonts
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                        <Heart className="w-4 h-4 text-rose-400" />
                        100% Free
                    </div>
                </div>
            </div>

            {/* ── Interactive Tool Component ─────────────────────────────────── */}
            <div className="px-4 sm:px-6 relative z-20">
                <CoupleNameClient />
            </div>

            {/* ── SEO Article Section ────────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <ArticleCoupleName />
            </div>

        </div>
    );
}

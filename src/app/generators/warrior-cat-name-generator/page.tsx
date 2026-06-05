import React from 'react';
import { Metadata } from 'next';
import WarriorCatNameClient from '@/components/WarriorCatNameClient';
import ArticleWarriorCatName from '@/components/articles/ArticleWarriorCatName';
import RelatedFunCalculators from '@/components/RelatedFunCalculators';

export const metadata: Metadata = {
    title: 'Warrior Cat Name Generator (2026) – Random Clan & Personality',
    description: 'Use the ultimate free Warrior Cat Name Generator to instantly create thousands of random, unique names with detailed descriptions for ThunderClan, ShadowClan, and more.',
    alternates: {
        canonical: 'https://smarttoolswala.com/generators/warrior-cat-name-generator',
    },
    openGraph: {
        title: 'Warrior Cat Name Generator – With Personality & Clans',
        description: 'Generate unique warrior cat names with lore-accurate prefixes, suffixes, and detailed personality traits instantly.',
        url: 'https://smarttoolswala.com/generators/warrior-cat-name-generator',
        type: 'website',
    },
};

export default function WarriorCatNamePage() {
    return (
        <div className="min-h-screen bg-[#fafbff]">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Warrior Cat Name Generator",
                        "url": "https://smarttoolswala.com/generators/warrior-cat-name-generator",
                        "description": "Free Warrior Cat Name Generator to instantly create unique, randomized names for roleplay OCs with descriptions, clan affiliations, and personality traits.",
                        "applicationCategory": "EntertainmentApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "keywords": "warrior cat name generator, random warrior cat name generator, warrior cat name generator with description, warrior cat name generator perchance, warrior cat name generator based on personality, unique warrior cat name generator, warrior cat name generator wheel, warrior cat name generator quiz, dark forest warrior cat name generator"
                    })
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                            { "@type": "ListItem", "position": 2, "name": "Generators", "item": "https://smarttoolswala.com/generators" },
                            { "@type": "ListItem", "position": 3, "name": "Warrior Cat Name Generator", "item": "https://smarttoolswala.com/generators/warrior-cat-name-generator" }
                        ]
                    })
                }}
            />
            
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Does this generator provide descriptions?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! This is specifically a warrior cat name generator with description. Every time you generate a name, the tool will attach a short personality description to help you build your OC's backstory instantly."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is this better than a Warrior Cat Name Generator Wheel?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "A warrior cat name generator wheel is fun, but it only spins one piece at a time and often results in nonsensical names. Our algorithmic generator pairs lore-accurate prefixes and suffixes instantly, and allows you to generate up to 10 at a time."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I use these names for my fanfiction?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Absolutely! The names generated by our random warrior cat name generator are 100% free for you to use in your roleplays, fanfictions, artwork, and stories."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How can I generate a rogue or loner name?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Rogues and loners usually don't follow the two-part naming system (like Scourge or Bone). While our primary tool focuses on Clan cats, you can easily use just the Prefix generated by our tool to serve as an excellent rogue name."
                                }
                            }
                        ]
                    })
                }}
            />

            <main className="py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-amber-50 border border-amber-100 text-amber-600 font-bold text-xs uppercase tracking-widest mb-4">
                            Fun & Gaming Tool
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                            Warrior Cat Name Generator
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                            Generate thousands of unique, random names based on clan and personality. Perfect for roleplay, fanfiction, and OC creation!
                        </p>
                    </div>

                    {/* Highly Interactive Tool */}
                    <WarriorCatNameClient />

                    {/* SEO Rich Article Below */}
                    <div className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                        <ArticleWarriorCatName />
                    </div>

                    <RelatedFunCalculators />

                </div>
            </main>
        </div>
    );
}

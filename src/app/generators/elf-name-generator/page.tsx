import React from 'react';
import { Metadata } from 'next';
import ElfNameClient from '@/components/ElfNameClient';
import ArticleElfName from '@/components/articles/ArticleElfName';
import RelatedFunCalculators from '@/components/RelatedFunCalculators';

export const metadata: Metadata = {
    title: 'Elf Name Generator (2026) – D&D, Wood, High & Dark Elf',
    description: 'Use our free Elf Name Generator to instantly create authentic names for D&D characters. Generates names for High Elves, Wood Elves, Drow, and Half-Elves.',
    alternates: {
        canonical: 'https://smarttoolswala.com/generators/elf-name-generator',
    },
    openGraph: {
        title: 'Elf Name Generator – Authentic D&D Fantasy Names',
        description: 'Generate the perfect elven name instantly. Specific subrace algorithms for Wood Elf, High Elf, Dark Elf, Night Elf, and Half-Elf.',
        url: 'https://smarttoolswala.com/generators/elf-name-generator',
        type: 'website',
    },
};

export default function ElfNamePage() {
    return (
        <div className="min-h-screen bg-[#fafbff]">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Elf Name Generator",
                        "url": "https://smarttoolswala.com/generators/elf-name-generator",
                        "description": "Free Elf Name Generator to instantly create lore-friendly names for D&D and fantasy writing. Includes High Elf, Wood Elf, Drow, and Half-Elf categories.",
                        "applicationCategory": "EntertainmentApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "keywords": "elf name generator, half elf name generator, wood elf name generator, high elf name generator, dark elf name generator, elf name generator dnd, night elf name generator, dnd elf name generator, high elf name generator dnd"
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
                            { "@type": "ListItem", "position": 3, "name": "Elf Name Generator", "item": "https://smarttoolswala.com/generators/elf-name-generator" }
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
                                "name": "Can I use this for Dungeons & Dragons?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Absolutely. This tool was specifically designed as an elf name generator dnd companion. The names generated for High Elves, Wood Elves, and Drow align perfectly with official Player's Handbook conventions."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How does the half elf name generator work?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Because Half-Elves are raised in either human or elven communities, our half elf name generator pulls from a mixed pool. You might get a traditional Elven first name paired with a common human surname, highlighting their torn heritage."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does this include surnames and family names?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! Unlike simple first-name only tools, our generator provides full names, including lore-accurate surnames (both in Elvish and translated to Common where applicable)."
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
                        <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-4">
                            Fantasy & RPG Tool
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                            Elf Name Generator
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                            Instantly summon authentic, lore-friendly names for your next D&D character. Support for High Elves, Wood Elves, Drow, and Half-Elves!
                        </p>
                    </div>

                    {/* Highly Interactive Tool */}
                    <ElfNameClient />

                    {/* SEO Rich Article Below */}
                    <div className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                        <ArticleElfName />
                    </div>

                    <RelatedFunCalculators />

                </div>
            </main>
        </div>
    );
}

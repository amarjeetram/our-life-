import React from 'react';
import { Metadata } from 'next';
import BandNameClient from '@/components/BandNameClient';
import ArticleBandName from '@/components/articles/ArticleBandName';
import RelatedFunCalculators from '@/components/RelatedFunCalculators';

export const metadata: Metadata = {
    title: 'AI Band Name Generator (2026) – Metal, Rock, Emo & Punk',
    description: 'Use our free AI Band Name Generator to create thousands of unique, random names for rock, metal, punk, emo, and boy bands instantly.',
    alternates: {
        canonical: 'https://smarttoolswala.com/generators/band-name-generator',
    },
    openGraph: {
        title: 'AI Band Name Generator – Free Custom Names',
        description: 'Generate the perfect band name instantly. Specific algorithms for Metal, Rock, Punk, Emo, and Pop groups.',
        url: 'https://smarttoolswala.com/generators/band-name-generator',
        type: 'website',
    },
};

export default function BandNamePage() {
    return (
        <div className="min-h-screen bg-[#fafbff]">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Band Name Generator",
                        "url": "https://smarttoolswala.com/generators/band-name-generator",
                        "description": "Free AI Band Name Generator to instantly create unique, randomized names for musical groups across genres like Rock, Metal, Emo, Punk, and K-Pop.",
                        "applicationCategory": "EntertainmentApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "keywords": "band name generator, random band name generator, metal band name generator, rock band name generator, band name generator ai, ai band name generator, emo band name generator, punk band name generator, boy band name generator"
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
                            { "@type": "ListItem", "position": 3, "name": "Band Name Generator", "item": "https://smarttoolswala.com/generators/band-name-generator" }
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
                                "name": "Is this band name generator really free?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! Our band name generator is 100% free to use. You can generate unlimited names without ever creating an account or paying a fee."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I legally use the names generated here?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Absolutely. The names are generated algorithmically and are yours to use. However, because it is a random band name generator, there is a small chance it might generate a name that is already trademarked by a real band. Always do a quick Google search and trademark check before officially committing to a name!"
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do you have a metal band name generator specifically?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes. Simply select 'Metal' from the genre dropdown menu at the top of the page. The algorithm will switch to the metal band name generator mode, using dark, aggressive vocabulary."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does the AI band name generator create K-Pop names?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, we have specifically included 'K-Pop' and 'Boy Band' categories. The boy band name generator and K-Pop generator create catchy, vibrant names perfectly suited for idol groups."
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
                        <span className="inline-block py-1.5 px-4 rounded-full bg-purple-50 border border-purple-100 text-purple-600 font-bold text-xs uppercase tracking-widest mb-4">
                            Music & Creativity Tool
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                            Band Name Generator
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                            Instantly generate hundreds of unique names for your Metal, Rock, Punk, Emo, or Pop band using our AI-powered engine.
                        </p>
                    </div>

                    {/* Highly Interactive Tool */}
                    <BandNameClient />

                    {/* SEO Rich Article Below */}
                    <div className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                        <ArticleBandName />
                    </div>

                    <RelatedFunCalculators />

                </div>
            </main>
        </div>
    );
}

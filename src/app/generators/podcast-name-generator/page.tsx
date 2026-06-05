import React from 'react';
import { Metadata } from 'next';
import PodcastNameClient from '@/components/PodcastNameClient';
import ArticlePodcastName from '@/components/articles/ArticlePodcastName';
import RelatedFunCalculators from '@/components/RelatedFunCalculators';

export const metadata: Metadata = {
    title: 'Podcast Name Generator (2026) – AI, True Crime & Sports',
    description: 'Use our free AI Podcast Name Generator to instantly create thousands of catchy, random names for True Crime, Sports, Comedy, and Business podcasts.',
    alternates: {
        canonical: 'https://smarttoolswala.com/generators/podcast-name-generator',
    },
    openGraph: {
        title: 'Podcast Name Generator – Free AI Custom Names',
        description: 'Generate the perfect podcast name instantly. Specific algorithms for True Crime, Sports, Funny, and Tech shows.',
        url: 'https://smarttoolswala.com/generators/podcast-name-generator',
        type: 'website',
    },
};

export default function PodcastNamePage() {
    return (
        <div className="min-h-screen bg-[#fafbff]">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Podcast Name Generator",
                        "url": "https://smarttoolswala.com/generators/podcast-name-generator",
                        "description": "Free AI Podcast Name Generator to instantly create unique, randomized names for shows across genres like True Crime, Sports, Comedy, and Business.",
                        "applicationCategory": "EntertainmentApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "keywords": "podcast name generator, random podcast name generator, ai podcast name generator, podcast name generator ai, podcast name generator free, sports podcast name generator, true crime podcast name generator, funny podcast name generator, free podcast name generator"
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
                            { "@type": "ListItem", "position": 3, "name": "Podcast Name Generator", "item": "https://smarttoolswala.com/generators/podcast-name-generator" }
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
                                "name": "Is this podcast name generator free?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! Our free podcast name generator is 100% free to use. You can generate unlimited names without ever creating an account or paying a fee."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I legally use the names generated here?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Absolutely. The names are generated algorithmically and are yours to use. However, because it is a random podcast name generator, there is a chance it might generate a name that is already trademarked by a real show. Always do a quick Google search and Spotify search before officially committing to a name!"
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do you have a true crime podcast name generator specifically?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes. Simply select 'True Crime' from the genre dropdown menu at the top of the page. The algorithm will switch to the true crime podcast name generator mode, using dark, investigative vocabulary."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does the AI generate sports names?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, we have specifically included a Sports category. The sports podcast name generator creates high-energy, competitive names perfectly suited for daily sports talk shows."
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
                        <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4">
                            Creator & Audio Tool
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                            Podcast Name Generator
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                            Instantly generate hundreds of catchy, professional names for your True Crime, Sports, Comedy, or Business podcast using our AI engine.
                        </p>
                    </div>

                    {/* Highly Interactive Tool */}
                    <PodcastNameClient />

                    {/* SEO Rich Article Below */}
                    <div className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                        <ArticlePodcastName />
                    </div>

                    <RelatedFunCalculators />

                </div>
            </main>
        </div>
    );
}

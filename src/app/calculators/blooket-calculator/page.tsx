import React from 'react';
import { Metadata } from 'next';
import BlooketCalculatorWrapper from '@/components/BlooketCalculatorWrapper';
import ArticleBlooketCalculator from '@/components/articles/ArticleBlooketCalculator';
import RelatedFunCalculators from '@/components/RelatedFunCalculators';

export const metadata: Metadata = {
    title: 'Blooket Calculator (2026) – Free Probability & Token Tool',
    description: 'Use the ultimate free Blooket Calculator to calculate your token spending and exact mathematical chances of pulling Legendary or Chroma Blooks. 100% Unblocked.',
    alternates: {
        canonical: 'https://smarttoolswala.com/calculators/blooket-calculator',
    },
    openGraph: {
        title: 'Blooket Calculator – Token & Probability Tool',
        description: 'Calculate your exact chances of pulling rare blooks before you spend your tokens. Unblocked and free for 2026.',
        url: 'https://smarttoolswala.com/calculators/blooket-calculator',
        type: 'website',
    },
};

export default function BlooketCalculatorPage() {
    return (
        <div className="min-h-screen" style={{background: 'var(--bg-secondary)'}}>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Blooket Calculator",
                        "url": "https://smarttoolswala.com/calculators/blooket-calculator",
                        "description": "Free Blooket Calculator to calculate token affordability and exact binomial probability for pulling rare Blooket Chroma, Legendary and Mystical blooks from packs.",
                        "applicationCategory": "GameApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "keywords": "blooket calculator, blooket token calculator, blooket probability calculator, blooket chroma calculator, blooket calculator unblocked, blooket calculator 2026, i blooket calculator, blooket pack calculator, blooket rarity calculator"
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
                            { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://smarttoolswala.com/calculators" },
                            { "@type": "ListItem", "position": 3, "name": "Blooket Calculator", "item": "https://smarttoolswala.com/calculators/blooket-calculator" }
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
                                "name": "Is Blooket calculator accurate?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, our Blooket calculator uses the exact cumulative binomial probability formula to determine your percentage chance of pulling a specific blook. A 99% chance means it's extremely likely, but Blooket pack openings are based on RNG so results can vary."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is this Blooket calculator unblocked at school?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! Our blooket calculator unblocked runs 100% in your browser and never connects to Blooket's game servers. It works on any school or home WiFi network without requiring any login or account access."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How do you calculate Blooket pack chances?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The formula is: Probability = 1 - (1 - drop rate)^number_of_packs. For example, if you open 100 packs with a 0.05% Chroma drop rate, your chance is roughly 4.88%. Our blooket probability calculator does this math instantly."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is a Blooket token calculator?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "A Blooket token calculator is a free online tool that helps you figure out how many packs you can buy with your current tokens and what your mathematical probability of getting a specific Blook is before you spend your tokens."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How to get free Blooket tokens?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "You can earn free Blooket tokens by playing games hosted by your teacher, winning game modes like Gold Quest or Cafe, and completing daily tasks. Our blooket token calculator helps you spend those tokens wisely."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is the rarest Blook in Blooket?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Chroma and Mystical Blooks are the rarest, with drop rates as low as 0.02% to 0.05%. Our blooket chroma calculator helps you see exactly how many packs you'd need to open to have a decent chance of pulling one."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How to make a Blooket?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "To make a Blooket question set, sign up for a free account on Blooket.com, click 'Create', add your cover image, title, and begin adding questions. You can then host games or assign study sets to students."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is i blooket calculator?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Many players search 'i blooket calculator' or 'blooket calculator home' when they want a quick way to check their pull odds before opening packs. Our tool at SmartToolsWala is exactly that — a free, instant, no-login blooket probability calculator for 2026."
                                }
                            }
                        ]
                    })
                }}
            />

            <main className="py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="text-center mb-12 relative">
                        {/* Decorative background glow */}
                        <div className="absolute inset-0 -z-10 flex items-center justify-center">
                            <div className="w-96 h-40 bg-indigo-100/60 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
                        </div>
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest mb-6 shadow-md shadow-indigo-300 dark:shadow-indigo-900">
                            <span>✦</span> Updated for 2026
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
                            <span className="text-slate-900 dark:text-white">Blooket </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">Calculator</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            Calculate exact mathematical box probabilities and manage your tokens like a pro.
                            <span className="block mt-1 text-slate-500 dark:text-slate-500">Never waste your hard-earned tokens guessing again!</span>
                        </p>
                    </div>

                    {/* Highly Interactive Tool */}
                    <BlooketCalculatorWrapper />

                    {/* SEO Rich Article Below */}
                    <div className="mt-16 p-8 md:p-12 rounded-[2rem] shadow-sm border" style={{background: 'var(--bg-primary)', borderColor: 'var(--border-light)'}}>
                        <ArticleBlooketCalculator />
                    </div>

                    <RelatedFunCalculators />

                </div>
            </main>
        </div>
    );
}

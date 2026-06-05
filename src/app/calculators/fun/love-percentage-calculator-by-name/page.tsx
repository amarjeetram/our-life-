import React from 'react';
import { Metadata } from 'next';
import LoveCalculatorClient from '@/components/LoveCalculatorClient';
import ArticleLoveCalculator from '@/components/articles/ArticleLoveCalculator';
import RelatedFunCalculators from '@/components/RelatedFunCalculators';
export const metadata: Metadata = {
    title: 'Love Percentage Calculator by Name – Free Love Match Checker',
    description: 'Use our free Love Percentage Calculator by Name to check your love match instantly. Enter two names and find your love percentage online in seconds.',
    alternates: {
        canonical: 'https://smarttoolswala.com/calculators/fun/love-percentage-calculator-by-name',
    },
    openGraph: {
        title: 'Love Percentage Calculator by Name – Free Love Match Checker',
        description: 'Use our free Love Percentage Calculator by Name to check your love match instantly. Enter two names and find your love percentage online in seconds.',
        url: 'https://smarttoolswala.com/calculators/fun/love-percentage-calculator-by-name',
        type: 'website',
    },
};

export default function LovePercentageCalculatorPage() {
    return (
        <div className="min-h-screen bg-rose-50/30 font-sans pt-24">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Love Percentage Calculator by Name",
                        "url": "https://smarttoolswala.com/calculators/fun/love-percentage-calculator-by-name",
                        "description": "Use our free Love Percentage Calculator by Name to check your love match instantly. Enter two names and find your love percentage online in seconds.",
                        "applicationCategory": "EntertainmentApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "keywords": "love percentage calculator, love percentage by name, calculate love percentage, how to find love percentage, how to calculate love percentage, check love percentage online, love match calculator, name love calculator, couple compatibility checker"
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
                            { "@type": "ListItem", "position": 2, "name": "Fun Calculators", "item": "https://smarttoolswala.com/calculators" },
                            { "@type": "ListItem", "position": 3, "name": "Love Percentage Calculator by Name", "item": "https://smarttoolswala.com/calculators/fun/love-percentage-calculator-by-name" }
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
                                "name": "How to calculate love percentage?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Simply enter your name and your partner's or crush's name into our Love Percentage Calculator by Name. Our tool uses a special algorithm to generate a compatibility percentage instantly."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is love percentage calculator accurate?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The Love Percentage Calculator is designed purely for fun and entertainment purposes. While it generates consistent results based on the names provided, it has no scientific basis and should not be taken seriously for real-life relationship decisions."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How to find love percentage by name?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Finding your love percentage by name is easy! Just type both names in the free online Love Match Checker above, click 'Calculate Love Percentage', and get your fun result within seconds."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I check love percentage for friends too?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! You can enter any two names—whether they belong to friends, family, celebrities, or fictional characters—to see what compatibility score the calculator generates."
                                }
                            }
                        ]
                    })
                }}
            />

            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-rose-900 tracking-tight mb-4 leading-tight">
                        Love Percentage Calculator by Name
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Check your love match instantly! Enter your name and your crush's name to find your real love percentage online.
                    </p>
                </div>

                {/* Highly Interactive Tool */}
                <LoveCalculatorClient />

                {/* SEO Rich Content Below */}
                <ArticleLoveCalculator />

                <RelatedFunCalculators currentRoute="/calculators/fun/love-percentage-calculator-by-name" />

            </main>
        </div>
    );
}

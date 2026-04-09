import React from 'react';
import { Metadata } from 'next';
import FlamesCalculatorClient from '@/components/FlamesCalculatorClient';
import ArticleFlamesCalculator from '@/components/articles/ArticleFlamesCalculator';

const SITE_URL = 'https://smarttoolswala.com';
const PAGE_URL = `${SITE_URL}/calculators/fun/flames-calculator`;

export const metadata: Metadata = {
    title: 'FLAMES Calculator Online – True Love & Marriage Match by Name',
    description: 'Use our free online FLAMES Calculator to find your true love, marriage, or friendship destiny. Enter your names (or date of birth) and get your FLAMES match instantly!',
    keywords: 'flames calculator, flames calculator percentage, flames calculator by name, flames calculator love, love flames calculator, flames calculator online, online flames calculator, flames calculator tamil, flames calculator true, flames calculator by date of birth',
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: 'FLAMES Calculator Online – True Love & Marriage Match by Name',
        description: 'Use our free online FLAMES Calculator to find your true love, marriage, or friendship destiny. Enter your names (or date of birth) and get your FLAMES match instantly!',
        url: PAGE_URL,
        siteName: 'SmartToolsWala',
        type: 'website',
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "FLAMES Calculator Online",
            "url": PAGE_URL,
            "description": "Use our free online FLAMES Calculator to find your true love, marriage, or friendship destiny. Enter your names (or date of birth) and get your FLAMES match instantly!",
            "applicationCategory": "EntertainmentApplication",
            "operatingSystem": "All",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "keywords": "flames calculator, flames calculator percentage, flames calculator by name, flames calculator love"
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Calculators", "item": `${SITE_URL}/calculators` },
                { "@type": "ListItem", "position": 3, "name": "Fun", "item": `${SITE_URL}/calculators/fun` },
                { "@type": "ListItem", "position": 4, "name": "FLAMES Calculator", "item": PAGE_URL }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Is the online FLAMES calculator accurate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The flames calculator uses a fixed deterministic algorithm. This means if you type the same two names, you will always get the same result. However, it is fundamentally a game meant for fun and entertainment, not a real scientific prediction."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How do I use the flames calculator by date of birth?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "While typing your names, you can optionally fill in the 'Advanced Date of Birth' fields. The calculator will extract the digits of your birthdays and add them to the character elimination pool, giving you a custom destiny based on both your names and birthdates."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Does this work as a Flames Calculator Tamil?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes! The universal FLAMES logic works exactly the same across regions, including for those looking for a flames calculator tamil. Please use English letters for standard gameplay."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the Flames calculator percentage?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The standard FLAMES game yields a single relationship status. If you are looking for a flames calculator percentage, try our Love Percentage tool which focuses purely on a 1% to 100% numerical match."
                    }
                }
            ]
        }
    ]
};

export default function FlamesCalculatorPage() {
    return (
        <div className="min-h-screen bg-rose-50/30 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-rose-900 tracking-tight mb-4 leading-tight">
                        FLAMES Calculator Online
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Check your destiny! Enter your name and your crush&apos;s name to play the classic FLAMES game instantly.
                    </p>
                </div>

                <FlamesCalculatorClient />

                <ArticleFlamesCalculator />
            </main>
        </div>
    );
}

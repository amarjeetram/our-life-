import React from 'react';
import { Metadata } from 'next';
import LoveCalculatorClient from '@/components/LoveCalculatorClient';

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
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">What is Love Percentage Calculator?</h2>
                    <p className="mb-6 leading-relaxed">
                        The <strong>Love Percentage Calculator by Name</strong> is a fun and interactive online tool that helps you calculate the compatibility score between two people based purely on their names. Whether you are curious about your relationship with your crush, partner, or just want to have fun checking random celebrity matches, this free tool gives you an instant, engaging result.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-6">How to Calculate Love Percentage by Name?</h2>
                    <p className="mb-4 leading-relaxed">
                        Curious about how to calculate love percentage quickly? The process is extremely simple and requires no math on your end:
                    </p>
                    <ul className="list-decimal pl-6 space-y-3 mb-6 font-medium text-slate-600">
                        <li>Enter your first name in the "Boy / First Name" field.</li>
                        <li>Enter your crush or partner's name in the "Girl / Second Name" field.</li>
                        <li>Click the vibrant <strong>Calculate Love Percentage</strong> button.</li>
                        <li>Watch the magic happen and see your love compatibility score along with a fun custom message!</li>
                    </ul>
                    <p className="mb-6 leading-relaxed">
                        Our tool uses a deterministic character-matching algorithm, meaning if you enter the same two names again, you will always get the same fun result!
                    </p>

                    <div className="bg-rose-50 border-l-4 border-rose-400 p-6 rounded-r-xl my-8">
                        <h3 className="text-xl font-bold text-rose-900 mb-2">💘 Results are for entertainment only</h3>
                        <p className="text-rose-700 font-medium">
                            Please remember that the Love Percentage Calculator is designed strictly for fun and entertainment purposes. It is not scientifically accurate and should not be used to judge or make decisions about your real-life relationships. Have fun and share your smiles!
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">How do you calculate love percentage?</h3>
                            <p className="leading-relaxed">To calculate love percentage, just enter the two names in our free tool above. The calculator instantly evaluates the letters in both names and provides a fun score ranging from 1% to 100%.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Is love percentage calculator accurate?</h3>
                            <p className="leading-relaxed">No, it is not scientifically valid. A true "couple compatibility checker" involves deep human connection, trust, and shared values. This tool is a prank/fun love calculator meant to bring a smile to your face.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">How to find love percentage by name?</h3>
                            <p className="leading-relaxed">Just visit this page on SmartToolsWala, enter both names, and hit calculate. The online name love calculator will do the rest and give you an emoji-based result immediately.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Can I check love percentage for friends too?</h3>
                            <p className="leading-relaxed">Absolutely! You can check the compatibility between any two names. If you want a more detailed destiny result (like Marriage, Enemies, or Siblings), be sure to try out our new <a href="/calculators/fun/flames-calculator" className="text-rose-600 font-bold underline hover:text-rose-800">FLAMES Calculator</a> too!</p>
                        </div>
                    </div>
                </article>

            </main>
        </div>
    );
}

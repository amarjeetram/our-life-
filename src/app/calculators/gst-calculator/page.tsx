import React from 'react';
import { Metadata } from 'next';
import GstCalculatorClient from '@/components/GstCalculatorClient';
import ArticleGstCalculator from '@/components/articles/ArticleGstCalculator';
import RelatedFunCalculators from '@/components/RelatedFunCalculators';

export const metadata: Metadata = {
    title: 'GST Calculator Online – Free India Reverse GST Tool (2026)',
    description: 'Use our free online GST calculator to instantly add or remove GST from any amount. Calculate CGST, SGST, and IGST for all tax slabs (5%, 12%, 18%, 28%).',
    alternates: {
        canonical: 'https://smarttoolswala.com/calculators/gst-calculator',
    },
    openGraph: {
        title: 'GST Calculator – Instantly Add or Remove GST',
        description: 'Free reverse GST calculator online. Find the exact base price, CGST, and SGST breakdown for your invoices in milliseconds.',
        url: 'https://smarttoolswala.com/calculators/gst-calculator',
        type: 'website',
    },
};

export default function GstCalculatorPage() {
    return (
        <div className="min-h-screen bg-[#fafbff]">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "GST Calculator",
                        "url": "https://smarttoolswala.com/calculators/gst-calculator",
                        "description": "Free online GST Calculator to calculate exact tax amounts, base prices, CGST, and SGST for Indian and global tax slabs. Includes reverse GST calculator functionality.",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "keywords": "gst calculator, gst calculator online, gst calculator india, online gst calculator, free gst calculator, reverse gst calculator, zoho gst calculator, easy gst calculator, gst calculator rapid"
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
                            { "@type": "ListItem", "position": 3, "name": "GST Calculator", "item": "https://smarttoolswala.com/calculators/gst-calculator" }
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
                                "name": "How accurate is this online GST calculator?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Our gst calculator online is 100% accurate. It uses exact mathematical formulas up to infinite decimal precision and rounds to two decimal places, mirroring the exact logic required by the Indian Income Tax Department and GST Council."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I use this as a reverse GST calculator?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! Our tool features a dedicated 'Remove GST' mode. By selecting this mode and entering the total inclusive amount, the tool acts as a powerful reverse gst calculator, revealing the base price before tax."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is this tool similar to the Zoho GST calculator?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "While tools like the zoho gst calculator are excellent for integrated enterprise accounting, our calculator is designed for incredibly fast, on-the-fly calculations. It is an easy gst calculator that requires no login, making it perfect for quick checks on your phone or desktop."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What does 'inclusive of GST' mean?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "'Inclusive of GST' means the price you see already contains the tax amount. For example, if a restaurant menu says '₹500 (Inclusive of GST)', you pay exactly ₹500. The restaurant owner will then use our tool to separate the actual food cost from the tax."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Are there any hidden fees to use this calculator?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No, this is a completely free gst calculator. You can use it as many times as you want, every single day, without paying a dime."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How do I calculate 18% GST?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "To add 18% GST: Multiply your base amount by 0.18. For example, 10,000 x 0.18 = 1,800. The total is 11,800. To remove 18% GST from a total: Divide the total by 1.18. For example, 11,800 / 1.18 = 10,000. Or, simply use our gst calculator rapid tool for instant results without doing the math yourself."
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
                        <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4">
                            Premium Financial Tool
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                            GST Calculator Online
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                            Instantly add or remove GST from any amount. Get the exact breakdown of CGST, SGST, and Base Price for flawless invoicing.
                        </p>
                    </div>

                    {/* Highly Interactive Tool */}
                    <GstCalculatorClient />

                    {/* SEO Rich Article Below */}
                    <div className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                        <ArticleGstCalculator />
                    </div>

                    <RelatedFunCalculators />

                </div>
            </main>
        </div>
    );
}

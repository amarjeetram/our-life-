import { Metadata } from 'next';
import LengthConverterClient from '@/components/LengthConverterClient';
import DynamicArticleLengthConverter from '@/components/articles/DynamicArticleLengthConverter';

export const metadata: Metadata = {
    title: 'Inches to Feet Converter - Free Length Calculator',
    description: 'Convert Inches to Feet instantly with our free online calculator. Get accurate in to ft conversions, formulas, and reference tables.',
    keywords: 'inch to feet, inches to feet, convert inches to feet, length converter, unit converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/length/inch-to-feet',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Inches to Feet Converter",
                "url": "https://smarttoolswala.com/unit-converters/length/inch-to-feet",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Inches to Feet instantly with our free online length calculator.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Length", "item": "https://smarttoolswala.com/unit-converters#length" },
                    { "@type": "ListItem", "position": 4, "name": "Inches to Feet", "item": "https://smarttoolswala.com/unit-converters/length/inch-to-feet" }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-green-50/40 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-green-900 tracking-tight mb-4">
                        Inches to Feet Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate inches to feet conversion with a quick reference table.
                    </p>
                </div>
                <LengthConverterClient defaultFrom="inch" defaultTo="feet" />
                <DynamicArticleLengthConverter
                    fromUnitName="Inches"
                    toUnitName="Feet"
                    fromUnitSymbol="in"
                    toUnitSymbol="ft"
                    conversionFactor={12}
                    conversionType="divide"
                    systemFrom="Imperial"
                    systemTo="Imperial"
                />
            </main>
        </div>
    );
}

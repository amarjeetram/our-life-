import { Metadata } from 'next';
import LengthConverterClient from '@/components/LengthConverterClient';
import DynamicArticleLengthConverter from '@/components/articles/DynamicArticleLengthConverter';

export const metadata: Metadata = {
    title: 'Kilometers to Meters Converter - Free Length Calculator',
    description: 'Convert Kilometers to Meters instantly with our free online calculator. Get accurate km to m conversions, formulas, and reference tables.',
    keywords: 'km to meter, kilometers to meters, convert kilometers to meters, length converter, unit converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/length/km-to-meter',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Kilometers to Meters Converter",
                "url": "https://smarttoolswala.com/unit-converters/length/km-to-meter",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Kilometers to Meters instantly with our free online calculator. Accurate metric conversions.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Length", "item": "https://smarttoolswala.com/unit-converters#length" },
                    { "@type": "ListItem", "position": 4, "name": "Kilometers to Meters", "item": "https://smarttoolswala.com/unit-converters/length/km-to-meter" }
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
                        Kilometers to Meters Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate kilometers to meters conversion with a quick reference table.
                    </p>
                </div>
                <LengthConverterClient defaultFrom="km" defaultTo="meter" />
                <DynamicArticleLengthConverter
                    fromUnitName="Kilometers"
                    toUnitName="Meters"
                    fromUnitSymbol="km"
                    toUnitSymbol="m"
                    conversionFactor={1000}
                    conversionType="multiply"
                    systemFrom="Metric"
                    systemTo="Metric"
                />
            </main>
        </div>
    );
}

import { Metadata } from 'next';
import LengthConverterClient from '@/components/LengthConverterClient';
import DynamicArticleLengthConverter from '@/components/articles/DynamicArticleLengthConverter';

export const metadata: Metadata = {
    title: 'Inches to Millimeters Converter - Free Calculator',
    description: 'Convert Inches to Millimeters instantly with our free online calculator. Get accurate in to mm conversions, formulas, and reference tables.',
    keywords: 'inch to mm, inches to millimeters, convert inches to millimeters, length converter, unit converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/length/inch-to-mm',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Inches to Millimeters Converter",
                "url": "https://smarttoolswala.com/unit-converters/length/inch-to-mm",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Inches to Millimeters instantly with our free online length calculator.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Length", "item": "https://smarttoolswala.com/unit-converters#length" },
                    { "@type": "ListItem", "position": 4, "name": "Inches to Millimeters", "item": "https://smarttoolswala.com/unit-converters/length/inch-to-mm" }
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
                        Inches to Millimeters Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate inches to millimeters conversion with a quick reference table.
                    </p>
                </div>
                <LengthConverterClient defaultFrom="inch" defaultTo="mm" />
                <DynamicArticleLengthConverter
                    fromUnitName="Inches"
                    toUnitName="Millimeters"
                    fromUnitSymbol="in"
                    toUnitSymbol="mm"
                    conversionFactor={25.4}
                    conversionType="multiply"
                    systemFrom="Imperial"
                    systemTo="Metric"
                />
            </main>
        </div>
    );
}

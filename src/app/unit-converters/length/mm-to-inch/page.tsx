import { Metadata } from 'next';
import LengthConverterClient from '@/components/LengthConverterClient';
import DynamicArticleLengthConverter from '@/components/articles/DynamicArticleLengthConverter';

export const metadata: Metadata = {
    title: 'Millimeters to Inches Converter - Free Length Calculator',
    description: 'Convert Millimeters to Inches instantly with our free online calculator. Get accurate mm to in conversions, formulas, and reference tables.',
    keywords: 'mm to inch, millimeters to inches, convert millimeters to inches, length converter, unit converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/length/mm-to-inch',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Millimeters to Inches Converter",
                "url": "https://smarttoolswala.com/unit-converters/length/mm-to-inch",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Millimeters to Inches instantly with our free online calculator.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Length", "item": "https://smarttoolswala.com/unit-converters#length" },
                    { "@type": "ListItem", "position": 4, "name": "Millimeters to Inches", "item": "https://smarttoolswala.com/unit-converters/length/mm-to-inch" }
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
                        Millimeters to Inches Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate millimeters to inches conversion with a quick reference table.
                    </p>
                </div>
                <LengthConverterClient defaultFrom="mm" defaultTo="inch" />
                <DynamicArticleLengthConverter
                    fromUnitName="Millimeters"
                    toUnitName="Inches"
                    fromUnitSymbol="mm"
                    toUnitSymbol="in"
                    conversionFactor={25.4}
                    conversionType="divide"
                    systemFrom="Metric"
                    systemTo="Imperial"
                />
            </main>
        </div>
    );
}

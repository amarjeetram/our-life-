import { Metadata } from 'next';
import WeightConverterClient from '@/components/WeightConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'Kilograms to Metric Tons Converter � Free Online Weight Calculator' },
    description: 'Convert Kilograms to Metric Tons instantly with our free online weight converter. Accurate conversions for kg, lbs, grams, ounces, stone and more.',
    keywords: 'kg to tons, kilograms to metric tons, convert kilograms to metric tons, weight converter, mass converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/weight/kg-to-tons',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Kilograms to Metric Tons Converter",
                "url": "https://smarttoolswala.com/unit-converters/weight/kg-to-tons",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Kilograms to Metric Tons instantly with our free online weight converter. Accurate conversions for kg, lbs, grams, ounces, stone and more.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Weight", "item": "https://smarttoolswala.com/unit-converters#weight" },
                    { "@type": "ListItem", "position": 4, "name": "Kilograms to Metric Tons", "item": "https://smarttoolswala.com/unit-converters/weight/kg-to-tons" }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-orange-50/30 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-orange-900 tracking-tight mb-4">
                        Kilograms to Metric Tons Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate kilograms to metric tons conversion with a full quick reference table.
                    </p>
                </div>
                <WeightConverterClient defaultFrom="kg" defaultTo="tons" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">How to Convert Kilograms to Metric Tons</h2>
                    <p className="mb-6 leading-relaxed text-lg">
                        Converting <strong>Kilograms to Metric Tons</strong> is a common need for cooking, fitness tracking, shipping, and scientific work. Our free online tool handles this instantly � just type and get your answer.
                    </p>
                    <p className="mb-8 leading-relaxed text-lg">
                        Use the swap button to flip between kilograms and metric tons conversions at any time. The Quick Reference table below shows conversion values for multiple units simultaneously.
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Why Use Our Kilograms to Metric Tons Converter?</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600 font-medium">
                        <li>Instant results � no clicking required</li>
                        <li>Supports all major weight units: kg, lbs, grams, ounces, stone, mg, mcg, tons</li>
                        <li>Quick Reference table for all units at once</li>
                        <li>Free and works on all devices</li>
                    </ul>
                </article>
            </main>
        </div>
    );
}

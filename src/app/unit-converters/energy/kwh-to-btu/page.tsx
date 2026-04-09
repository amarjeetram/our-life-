import { Metadata } from 'next';
import EnergyConverterClient from '@/components/EnergyConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'kWh to BTU Converter � Free Online Energy Calculator' },
    description: 'Convert kWh to BTU instantly with our free online energy converter. Accurate conversions with a full quick reference table.',
    keywords: 'kwh to btu, kwh to btu, energy converter',
    alternates: { canonical: 'https://smarttoolswala.com/unit-converters/energy/kwh-to-btu' },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "WebApplication", "name": "kWh to BTU Converter", "url": "https://smarttoolswala.com/unit-converters/energy/kwh-to-btu", "applicationCategory": "Utility", "operatingSystem": "All", "description": "Convert kWh to BTU instantly with our free online energy converter. Accurate conversions with a full quick reference table.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } },
            { "@type": "BreadcrumbList", "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                { "@type": "ListItem", "position": 3, "name": "Energy", "item": "https://smarttoolswala.com/unit-converters#energy" },
                { "@type": "ListItem", "position": 4, "name": "kWh to BTU", "item": "https://smarttoolswala.com/unit-converters/energy/kwh-to-btu" }
            ]}
        ]
    };
    return (
        <div className="min-h-screen bg-yellow-50/30 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-yellow-900 tracking-tight mb-4">kWh to BTU Converter</h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">Free instant kwh to btu conversion with a quick reference table for all units.</p>
                </div>
                <EnergyConverterClient defaultFrom="kwh" defaultTo="btu" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">How to Convert kWh to BTU</h2>
                    <p className="mb-6 leading-relaxed text-lg">Converting <strong>kWh to BTU</strong> is instantly handled by our free online tool. Just type your value and see the result � plus all other unit equivalents below.</p>
                    <p className="leading-relaxed text-lg">Use the swap button to flip directions anytime. Works on all devices with zero downloads needed.</p>
                </article>
            </main>
        </div>
    );
}

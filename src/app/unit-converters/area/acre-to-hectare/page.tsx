import { Metadata } from 'next';
import AreaConverterClient from '@/components/AreaConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'Acres to Hectares Converter � Free Online Area Calculator' },
    description: 'Convert Acres to Hectares instantly with our free online area converter. Accurate conversions with a full quick reference table.',
    keywords: 'acre to hectare, acres to hectares, area converter',
    alternates: { canonical: 'https://smarttoolswala.com/unit-converters/area/acre-to-hectare' },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "WebApplication", "name": "Acres to Hectares Converter", "url": "https://smarttoolswala.com/unit-converters/area/acre-to-hectare", "applicationCategory": "Utility", "operatingSystem": "All", "description": "Convert Acres to Hectares instantly with our free online area converter. Accurate conversions with a full quick reference table.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } },
            { "@type": "BreadcrumbList", "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                { "@type": "ListItem", "position": 3, "name": "Area", "item": "https://smarttoolswala.com/unit-converters#area" },
                { "@type": "ListItem", "position": 4, "name": "Acres to Hectares", "item": "https://smarttoolswala.com/unit-converters/area/acre-to-hectare" }
            ]}
        ]
    };
    return (
        <div className="min-h-screen bg-emerald-50/30 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-emerald-900 tracking-tight mb-4">Acres to Hectares Converter</h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">Free instant acres to hectares conversion with a quick reference table for all units.</p>
                </div>
                <AreaConverterClient defaultFrom="acre" defaultTo="hectare" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">How to Convert Acres to Hectares</h2>
                    <p className="mb-6 leading-relaxed text-lg">Converting <strong>Acres to Hectares</strong> is instantly handled by our free online tool. Just type your value and see the result � plus all other unit equivalents below.</p>
                    <p className="leading-relaxed text-lg">Use the swap button to flip directions anytime. Works on all devices with zero downloads needed.</p>
                </article>
            </main>
        </div>
    );
}

import { Metadata } from 'next';
import SpeedConverterClient from '@/components/SpeedConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'mph to km/h Converter � Free Online Speed Calculator' },
    description: 'Convert mph to km/h instantly with our free online speed converter. Accurate conversions with a full quick reference table.',
    keywords: 'mph to kmh, mph to km/h, speed converter',
    alternates: { canonical: 'https://smarttoolswala.com/unit-converters/speed/mph-to-kmh' },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "WebApplication", "name": "mph to km/h Converter", "url": "https://smarttoolswala.com/unit-converters/speed/mph-to-kmh", "applicationCategory": "Utility", "operatingSystem": "All", "description": "Convert mph to km/h instantly with our free online speed converter. Accurate conversions with a full quick reference table.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } },
            { "@type": "BreadcrumbList", "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                { "@type": "ListItem", "position": 3, "name": "Speed", "item": "https://smarttoolswala.com/unit-converters#speed" },
                { "@type": "ListItem", "position": 4, "name": "mph to km/h", "item": "https://smarttoolswala.com/unit-converters/speed/mph-to-kmh" }
            ]}
        ]
    };
    return (
        <div className="min-h-screen bg-blue-50/30 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight mb-4">mph to km/h Converter</h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">Free instant mph to km/h conversion with a quick reference table for all units.</p>
                </div>
                <SpeedConverterClient defaultFrom="mph" defaultTo="kmh" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">How to Convert mph to km/h</h2>
                    <p className="mb-6 leading-relaxed text-lg">Converting <strong>mph to km/h</strong> is instantly handled by our free online tool. Just type your value and see the result � plus all other unit equivalents below.</p>
                    <p className="leading-relaxed text-lg">Use the swap button to flip directions anytime. Works on all devices with zero downloads needed.</p>
                </article>
            </main>
        </div>
    );
}

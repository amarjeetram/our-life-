import { Metadata } from 'next';
import PressureConverterClient from '@/components/PressureConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'Bar to PSI Converter � Free Online Pressure Calculator' },
    description: 'Convert Bar to PSI instantly with our free online pressure converter. Accurate conversions with a full quick reference table.',
    keywords: 'bar to psi, bar to psi, pressure converter',
    alternates: { canonical: 'https://smarttoolswala.com/unit-converters/pressure/bar-to-psi' },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "WebApplication", "name": "Bar to PSI Converter", "url": "https://smarttoolswala.com/unit-converters/pressure/bar-to-psi", "applicationCategory": "Utility", "operatingSystem": "All", "description": "Convert Bar to PSI instantly with our free online pressure converter. Accurate conversions with a full quick reference table.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } },
            { "@type": "BreadcrumbList", "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                { "@type": "ListItem", "position": 3, "name": "Pressure", "item": "https://smarttoolswala.com/unit-converters#pressure" },
                { "@type": "ListItem", "position": 4, "name": "Bar to PSI", "item": "https://smarttoolswala.com/unit-converters/pressure/bar-to-psi" }
            ]}
        ]
    };
    return (
        <div className="min-h-screen bg-cyan-50/30 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-cyan-900 tracking-tight mb-4">Bar to PSI Converter</h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">Free instant bar to psi conversion with a quick reference table for all units.</p>
                </div>
                <PressureConverterClient defaultFrom="bar" defaultTo="psi" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">How to Convert Bar to PSI</h2>
                    <p className="mb-6 leading-relaxed text-lg">Converting <strong>Bar to PSI</strong> is instantly handled by our free online tool. Just type your value and see the result � plus all other unit equivalents below.</p>
                    <p className="leading-relaxed text-lg">Use the swap button to flip directions anytime. Works on all devices with zero downloads needed.</p>
                </article>
            </main>
        </div>
    );
}

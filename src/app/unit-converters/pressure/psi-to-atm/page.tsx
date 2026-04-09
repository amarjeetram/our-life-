import { Metadata } from 'next';
import PressureConverterClient from '@/components/PressureConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'PSI to ATM Converter � Free Online Pressure Calculator' },
    description: 'Convert PSI to ATM instantly with our free online pressure converter. Accurate conversions with a full quick reference table.',
    keywords: 'psi to atm, psi to atm, pressure converter',
    alternates: { canonical: 'https://smarttoolswala.com/unit-converters/pressure/psi-to-atm' },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "WebApplication", "name": "PSI to ATM Converter", "url": "https://smarttoolswala.com/unit-converters/pressure/psi-to-atm", "applicationCategory": "Utility", "operatingSystem": "All", "description": "Convert PSI to ATM instantly with our free online pressure converter. Accurate conversions with a full quick reference table.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } },
            { "@type": "BreadcrumbList", "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                { "@type": "ListItem", "position": 3, "name": "Pressure", "item": "https://smarttoolswala.com/unit-converters#pressure" },
                { "@type": "ListItem", "position": 4, "name": "PSI to ATM", "item": "https://smarttoolswala.com/unit-converters/pressure/psi-to-atm" }
            ]}
        ]
    };
    return (
        <div className="min-h-screen bg-cyan-50/30 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-cyan-900 tracking-tight mb-4">PSI to ATM Converter</h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">Free instant psi to atm conversion with a quick reference table for all units.</p>
                </div>
                <PressureConverterClient defaultFrom="psi" defaultTo="atm" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">How to Convert PSI to ATM</h2>
                    <p className="mb-6 leading-relaxed text-lg">Converting <strong>PSI to ATM</strong> is instantly handled by our free online tool. Just type your value and see the result � plus all other unit equivalents below.</p>
                    <p className="leading-relaxed text-lg">Use the swap button to flip directions anytime. Works on all devices with zero downloads needed.</p>
                </article>
            </main>
        </div>
    );
}

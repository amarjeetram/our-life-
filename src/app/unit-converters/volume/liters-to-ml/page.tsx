import { Metadata } from 'next';
import VolumeConverterClient from '@/components/VolumeConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'Liters to Milliliters Converter � Free Online Volume Calculator' },
    description: 'Convert Liters to Milliliters instantly with our free online volume converter. Accurate conversions between mL, L, gallons, cups, fl oz, and cubic meters.',
    keywords: 'liters to ml, liters to milliliters, volume converter, liquid converter',
    alternates: { canonical: 'https://smarttoolswala.com/unit-converters/volume/liters-to-ml' },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "WebApplication", "name": "Liters to Milliliters Converter", "url": "https://smarttoolswala.com/unit-converters/volume/liters-to-ml", "applicationCategory": "Utility", "operatingSystem": "All", "description": "Convert Liters to Milliliters instantly with our free online volume converter. Accurate conversions between mL, L, gallons, cups, fl oz, and cubic meters.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } },
            { "@type": "BreadcrumbList", "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                { "@type": "ListItem", "position": 3, "name": "Volume", "item": "https://smarttoolswala.com/unit-converters#volume" },
                { "@type": "ListItem", "position": 4, "name": "Liters to Milliliters", "item": "https://smarttoolswala.com/unit-converters/volume/liters-to-ml" }
            ]}
        ]
    };
    return (
        <div className="min-h-screen bg-purple-50/30 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-purple-900 tracking-tight mb-4">Liters to Milliliters Converter</h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">Free instant liters to milliliters conversion with a full quick reference table.</p>
                </div>
                <VolumeConverterClient defaultFrom="liters" defaultTo="ml" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">How to Convert Liters to Milliliters</h2>
                    <p className="mb-6 leading-relaxed text-lg">Converting <strong>Liters to Milliliters</strong> is essential for cooking, science, and engineering tasks. Our converter uses precise multiplication factors based on the international standard for volume measurement.</p>
                    <p className="mb-6 leading-relaxed text-lg">Simply type your value above and the Quick Reference table instantly shows the equivalent in all supported volume units at once, saving you multiple separate conversions.</p>
                </article>
            </main>
        </div>
    );
}

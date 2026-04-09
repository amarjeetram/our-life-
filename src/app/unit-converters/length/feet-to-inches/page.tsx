import { Metadata } from 'next';
import LengthConverterClient from '@/components/LengthConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'Feet to Inches Converter � Free Online Length Calculator' },
    description: 'Convert Feet to Inches instantly with our free online length converter. Accurate metric and imperial unit conversions for everyday use.',
    keywords: 'feet to inches, feet to inches, convert feet to inches, length converter, unit converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/length/feet-to-inches',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Feet to Inches Converter",
                "url": "https://smarttoolswala.com/unit-converters/length/feet-to-inches",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Feet to Inches instantly with our free online length converter. Accurate metric and imperial unit conversions for everyday use.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Length", "item": "https://smarttoolswala.com/unit-converters#length" },
                    { "@type": "ListItem", "position": 4, "name": "Feet to Inches", "item": "https://smarttoolswala.com/unit-converters/length/feet-to-inches" }
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
                        Feet to Inches Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate feet to inches conversion with a quick reference table.
                    </p>
                </div>
                <LengthConverterClient defaultFrom="feet" defaultTo="inch" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">How to Convert Feet to Inches</h2>
                    <p className="mb-6 leading-relaxed text-lg">
                        Converting <strong>Feet to Inches</strong> is one of the most common length conversions needed in daily life, whether for construction, travel, or school assignments. Our free online converter handles this calculation instantly � no formulas needed.
                    </p>
                    <p className="mb-8 leading-relaxed text-lg">
                        Simply type your value in the input above and the result appears automatically. You can also use the swap button to reverse the conversion from Inches back to Feet.
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Popular Feet to Inches Values</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead><tr className="bg-slate-50"><th className="p-3 font-bold border border-slate-200">Feet</th><th className="p-3 font-bold border border-slate-200">Inches</th></tr></thead>
                            <tbody>
                                <tr><td className="p-3 border border-slate-200">1</td><td className="p-3 border border-slate-200 text-green-700 font-semibold">�</td></tr>
                                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">5</td><td className="p-3 border border-slate-200 text-green-700 font-semibold">�</td></tr>
                                <tr><td className="p-3 border border-slate-200">10</td><td className="p-3 border border-slate-200 text-green-700 font-semibold">�</td></tr>
                                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">100</td><td className="p-3 border border-slate-200 text-green-700 font-semibold">�</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-6 text-slate-500 text-sm italic">Use the interactive tool above to get precise values for any feet amount.</p>
                </article>
            </main>
        </div>
    );
}

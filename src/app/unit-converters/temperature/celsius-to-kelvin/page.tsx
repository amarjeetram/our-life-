import { Metadata } from 'next';
import TemperatureConverterClient from '@/components/TemperatureConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'Celsius to Kelvin Converter � Free Online Temperature Calculator' },
    description: 'Convert Celsius to Kelvin instantly. Free online temperature calculator with accurate formulas for �C, �F, and Kelvin.',
    keywords: 'celsius to kelvin, celsius to kelvin, temperature converter, celsius to kelvin',
    alternates: { canonical: 'https://smarttoolswala.com/unit-converters/temperature/celsius-to-kelvin' },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "WebApplication", "name": "Celsius to Kelvin Converter", "url": "https://smarttoolswala.com/unit-converters/temperature/celsius-to-kelvin", "applicationCategory": "Utility", "operatingSystem": "All", "description": "Convert Celsius to Kelvin instantly. Free online temperature calculator with accurate formulas for �C, �F, and Kelvin.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } },
            { "@type": "BreadcrumbList", "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                { "@type": "ListItem", "position": 3, "name": "Temperature", "item": "https://smarttoolswala.com/unit-converters#temperature" },
                { "@type": "ListItem", "position": 4, "name": "Celsius to Kelvin", "item": "https://smarttoolswala.com/unit-converters/temperature/celsius-to-kelvin" }
            ]}
        ]
    };
    return (
        <div className="min-h-screen bg-red-50/30 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-red-900 tracking-tight mb-4">Celsius to Kelvin Converter</h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">Instantly convert celsius to kelvin with the quick reference panel for all three scales.</p>
                </div>
                <TemperatureConverterClient defaultFrom="celsius" defaultTo="kelvin" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">How to Convert Celsius to Kelvin</h2>
                    <p className="mb-6 leading-relaxed text-lg">Converting <strong>Celsius to Kelvin</strong> requires a specific mathematical formula. Our converter applies this formula instantly the moment you type, so you never need to remember complex equations.</p>
                    <p className="mb-6 leading-relaxed text-lg">The Quick Reference panel below the converter shows the equivalent value in all three temperature scales simultaneously � perfect for science homework, cooking, and weather comparison.</p>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Temperature Conversion Formulas</h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-600 font-medium mb-6">
                        <li><strong>�C to �F:</strong> (�C � 9/5) + 32</li>
                        <li><strong>�F to �C:</strong> (�F - 32) � 5/9</li>
                        <li><strong>�C to K:</strong> �C + 273.15</li>
                        <li><strong>K to �C:</strong> K - 273.15</li>
                    </ul>
                </article>
            </main>
        </div>
    );
}

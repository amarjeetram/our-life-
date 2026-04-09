import { Metadata } from 'next';
import CookingConverterClient from '@/components/CookingConverterClient';
import ArticleCookingConverter from '@/components/articles/ArticleCookingConverter';

export const metadata: Metadata = {
    title: { absolute: 'Ounces to Grams Converter � Free Kitchen Calculator' },
    description: 'Convert Ounces to Grams instantly with our free online recipe and ingredient converter. Accurate density-based calculations for cooking and baking.',
    keywords: 'oz to grams, Ounces to Grams, convert Ounces to Grams, kitchen converter, recipe calculator, baking units',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/cooking/oz-to-grams',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Ounces to Grams Converter",
                "url": "https://smarttoolswala.com/unit-converters/cooking/oz-to-grams",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Ounces to Grams instantly with our free online recipe and ingredient converter. Accurate density-based calculations for cooking and baking.",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Cooking", "item": "https://smarttoolswala.com/unit-converters#cooking" },
                    { "@type": "ListItem", "position": 4, "name": "Ounces to Grams", "item": "https://smarttoolswala.com/unit-converters/cooking/oz-to-grams" }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-orange-50/40 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-orange-900 tracking-tight mb-4">
                        Ounces to Grams Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Accurate recipe conversions. Choose your ingredient for perfect volume-to-weight logic.
                    </p>
                </div>

                <CookingConverterClient defaultFrom="oz" defaultTo="grams" />
                <ArticleCookingConverter from="Ounces" to="Grams" />
            </main>
        </div>
    );
}

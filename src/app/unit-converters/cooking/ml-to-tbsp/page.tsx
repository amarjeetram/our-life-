import { Metadata } from 'next';
import CookingConverterClient from '@/components/CookingConverterClient';
import ArticleCookingConverter from '@/components/articles/ArticleCookingConverter';

export const metadata: Metadata = {
    title: { absolute: 'Milliliters to Tablespoons Converter � Free Kitchen Calculator' },
    description: 'Convert Milliliters to Tablespoons instantly with our free online recipe and ingredient converter. Accurate density-based calculations for cooking and baking.',
    keywords: 'ml to tbsp, Milliliters to Tablespoons, convert Milliliters to Tablespoons, kitchen converter, recipe calculator, baking units',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/cooking/ml-to-tbsp',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Milliliters to Tablespoons Converter",
                "url": "https://smarttoolswala.com/unit-converters/cooking/ml-to-tbsp",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Milliliters to Tablespoons instantly with our free online recipe and ingredient converter. Accurate density-based calculations for cooking and baking.",
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
                    { "@type": "ListItem", "position": 4, "name": "Milliliters to Tablespoons", "item": "https://smarttoolswala.com/unit-converters/cooking/ml-to-tbsp" }
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
                        Milliliters to Tablespoons Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Accurate recipe conversions. Choose your ingredient for perfect volume-to-weight logic.
                    </p>
                </div>

                <CookingConverterClient defaultFrom="ml" defaultTo="tbsp" />
                <ArticleCookingConverter from="Milliliters" to="Tablespoons" />
            </main>
        </div>
    );
}

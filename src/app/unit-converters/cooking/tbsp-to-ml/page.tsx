import { Metadata } from 'next';
import CookingConverterClient from '@/components/CookingConverterClient';
import ArticleCookingConverter from '@/components/articles/ArticleCookingConverter';

export const metadata: Metadata = {
    title: { absolute: 'Tablespoons to Milliliters Converter � Free Kitchen Calculator' },
    description: 'Convert Tablespoons to Milliliters instantly with our free online recipe and ingredient converter. Accurate density-based calculations for cooking and baking.',
    keywords: 'tbsp to ml, Tablespoons to Milliliters, convert Tablespoons to Milliliters, kitchen converter, recipe calculator, baking units',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/cooking/tbsp-to-ml',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Tablespoons to Milliliters Converter",
                "url": "https://smarttoolswala.com/unit-converters/cooking/tbsp-to-ml",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Tablespoons to Milliliters instantly with our free online recipe and ingredient converter. Accurate density-based calculations for cooking and baking.",
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
                    { "@type": "ListItem", "position": 4, "name": "Tablespoons to Milliliters", "item": "https://smarttoolswala.com/unit-converters/cooking/tbsp-to-ml" }
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
                        Tablespoons to Milliliters Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Accurate recipe conversions. Choose your ingredient for perfect volume-to-weight logic.
                    </p>
                </div>

                <CookingConverterClient defaultFrom="tbsp" defaultTo="ml" />
                <ArticleCookingConverter from="Tablespoons" to="Milliliters" />
            </main>
        </div>
    );
}

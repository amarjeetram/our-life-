import { Metadata } from 'next';
import LengthConverterClient from '@/components/LengthConverterClient';
import ArticleCmToInch from '@/components/articles/ArticleCmToInch';

export const metadata: Metadata = {
    title: 'CM to Inches Converter - Free Length Calculator',
    description: 'Convert Centimeters to Inches instantly with our free online calculator. Get accurate cm to in conversions, formulas, and reference tables.',
    keywords: 'cm to inch, centimeters to inches, convert centimeters to inches, 1 inch to cm, cm to in converter, how many inches in a cm, cm to inches formula, length converter, unit converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/length/cm-to-inch',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Centimeters to Inches Converter",
                "url": "https://smarttoolswala.com/unit-converters/length/cm-to-inch",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Centimeters to Inches instantly with our free online length converter. Accurate metric and imperial unit conversions for everyday use.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Length", "item": "https://smarttoolswala.com/unit-converters#length" },
                    { "@type": "ListItem", "position": 4, "name": "Centimeters to Inches", "item": "https://smarttoolswala.com/unit-converters/length/cm-to-inch" }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How do you convert 1 cm to an inch?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Because one inch equals 2.54 centimeters, you convert 1 cm to an inch by dividing 1 by 2.54. This results in approximately 0.3937 inches."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How many cm is an inch on a ruler?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "If you examine a standard school ruler, you will clearly see that the 1-inch mark aligns perfectly with the 2.54 cm mark on the metric side of the ruler."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is 1 inch strictly 2.5 cm?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No, this is a common estimation. One inch is exactly 2.54 cm. While 2.5 cm might be fine for a rough mental guess, using it for detailed works like carpentry or engineering will lead to critical measurement errors."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What does CM and IN mean?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "CM stands for Centimeter, which is a unit of length in the International System of Units (metric system). IN stands for Inch, which is a customary unit of length used primarily in the United States and the United Kingdom (imperial system)."
                        }
                    }
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
                        Centimeters to Inches Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate centimeters to inches conversion with a quick reference table.
                    </p>
                </div>
                <LengthConverterClient defaultFrom="cm" defaultTo="inch" />
                <ArticleCmToInch />
            </main>
        </div>
    );
}

import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleTBtoGBUnit from '@/components/articles/ArticleTBtoGBUnit';

export const metadata: Metadata = {
    title: { absolute: 'TB to GB Converter – Convert Terabytes to Gigabytes Online Free' },
    description: 'Convert TB to GB instantly with our free online TB to GB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'tb to gb, tb to gb converter, convert tb to gb, terabytes to gigabytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/tb-to-gb',
    },
};

const faqs = [
    { q: "How do I convert TB to GB?", a: "To convert TB to GB, you can simply use our free calculator above. The mathematical rule is to multiply by 1,024 from the TB value to get the GB equivalent." },
    { q: "Is a TB larger than a GB?", a: "Yes, TB is much larger than GB." },
    { q: "Is this TB to GB calculator free to use?", a: "Yes! All digital storage unit converters on SmartToolsWala are 100% free and don't require any signup." },
];

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebApplication",
                                "name": "TB to GB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/tb-to-gb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online TB to GB converter. Convert terabytes to gigabytes instantly.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(f => ({
                                    "@type": "Question",
                                    "name": f.q,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": f.a
                                    }
                                }))
                            }
                        ]
                    })
                }}
            />
            <DigitalConverterClient
                titleProps={{ highlight: 'TB to GB', suffix: 'Converter' }}
                description="Convert TB to GB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="tb"
                defaultTo="gb"
                examples={[
    {
        "label": "1 TB to GB",
        "from": "tb",
        "to": "gb",
        "value": "1"
    },
    {
        "label": "0.5 TB to GB",
        "from": "tb",
        "to": "gb",
        "value": "0.5"
    },
    {
        "label": "2 TB to GB",
        "from": "tb",
        "to": "gb",
        "value": "2"
    },
    {
        "label": "5 TB to GB",
        "from": "tb",
        "to": "gb",
        "value": "5"
    }
]}
                theme={{
    "heroGradient": "linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #5eead4 100%)",
    "textGradient": "linear-gradient(90deg, #99f6e4, #ccfbf1)",
    "primaryBg": "#f0fdfa",
    "primaryText": "#0f766e",
    "primaryBorder": "#ccfbf1",
    "secondaryBg": "#f8fafc",
    "secondaryText": "#0ea5e9",
    "secondaryBorder": "#bae6fd",
    "buttonGradient": "linear-gradient(135deg, #14b8a6, #0f766e)"
}}
                infoCards={[{ label: 'Conversion Math', value: 'MULTIPLY BY 1,024' }]}
            >
                <SEOBottomSection
                    keyword="tb to gb converter"
                    heading="TB to GB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleTBtoGBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}

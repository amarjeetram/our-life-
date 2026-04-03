import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleMBtoGBUnit from '@/components/articles/ArticleMBtoGBUnit';

export const metadata: Metadata = {
    title: { absolute: 'MB to GB Converter – Convert Megabytes to Gigabytes Online Free' },
    description: 'Convert MB to GB instantly with our free online MB to GB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'mb to gb, mb to gb converter, convert mb to gb, megabytes to gigabytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/mb-to-gb',
    },
};

const faqs = [
    { q: "How do I convert MB to GB?", a: "To convert MB to GB, you can simply use our free calculator above. The mathematical rule is to divide by 1,024 from the MB value to get the GB equivalent." },
    { q: "Is a MB larger than a GB?", a: "No, GB is larger than MB." },
    { q: "Is this MB to GB calculator free to use?", a: "Yes! All digital storage unit converters on SmartToolsWala are 100% free and don't require any signup." },
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
                                "name": "MB to GB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/mb-to-gb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online MB to GB converter. Convert megabytes to gigabytes instantly.",
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
                titleProps={{ highlight: 'MB to GB', suffix: 'Converter' }}
                description="Convert MB to GB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="mb"
                defaultTo="gb"
                examples={[
    {
        "label": "100 MB to GB",
        "from": "mb",
        "to": "gb",
        "value": "100"
    },
    {
        "label": "500 MB to GB",
        "from": "mb",
        "to": "gb",
        "value": "500"
    },
    {
        "label": "1000 MB to GB",
        "from": "mb",
        "to": "gb",
        "value": "1000"
    },
    {
        "label": "2048 MB to GB",
        "from": "mb",
        "to": "gb",
        "value": "2048"
    }
]}
                theme={{
    "heroGradient": "linear-gradient(135deg, #831843 0%, #be185d 50%, #f472b6 100%)",
    "textGradient": "linear-gradient(90deg, #fbcfe8, #fdf2f8)",
    "primaryBg": "#fdf2f8",
    "primaryText": "#9d174d",
    "primaryBorder": "#fbcfe8",
    "secondaryBg": "#fff1f2",
    "secondaryText": "#be123c",
    "secondaryBorder": "#fecdd3",
    "buttonGradient": "linear-gradient(135deg, #be185d, #9d174d)"
}}
                infoCards={[{ label: 'Conversion Math', value: 'DIVIDE BY 1,024' }]}
            >
                <SEOBottomSection
                    keyword="mb to gb converter"
                    heading="MB to GB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleMBtoGBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}

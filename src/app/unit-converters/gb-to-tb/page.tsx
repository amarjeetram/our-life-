import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleGBtoTBUnit from '@/components/articles/ArticleGBtoTBUnit';

export const metadata: Metadata = {
    title: { absolute: 'GB to TB Converter – Convert Gigabytes to Terabytes Online Free' },
    description: 'Convert GB to TB instantly with our free online GB to TB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'gb to tb, gb to tb converter, convert gb to tb, gigabytes to terabytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/gb-to-tb',
    },
};

const faqs = [
    { q: "How do I convert GB to TB?", a: "To convert GB to TB, you can simply use our free calculator above. The mathematical rule is to divide by 1,024 from the GB value to get the TB equivalent." },
    { q: "Is a GB larger than a TB?", a: "No, TB is larger than GB." },
    { q: "Is this GB to TB calculator free to use?", a: "Yes! All digital storage unit converters on SmartToolsWala are 100% free and don't require any signup." },
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
                                "name": "GB to TB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/gb-to-tb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online GB to TB converter. Convert gigabytes to terabytes instantly.",
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
                titleProps={{ highlight: 'GB to TB', suffix: 'Converter' }}
                description="Convert GB to TB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="gb"
                defaultTo="tb"
                examples={[
    {
        "label": "100 GB to TB",
        "from": "gb",
        "to": "tb",
        "value": "100"
    },
    {
        "label": "500 GB to TB",
        "from": "gb",
        "to": "tb",
        "value": "500"
    },
    {
        "label": "1000 GB to TB",
        "from": "gb",
        "to": "tb",
        "value": "1000"
    },
    {
        "label": "2048 GB to TB",
        "from": "gb",
        "to": "tb",
        "value": "2048"
    }
]}
                theme={{
    "heroGradient": "linear-gradient(135deg, #4c1d95 0%, #8b5cf6 50%, #c4b5fd 100%)",
    "textGradient": "linear-gradient(90deg, #ede9fe, #f5f3ff)",
    "primaryBg": "#f5f3ff",
    "primaryText": "#5b21b6",
    "primaryBorder": "#ddd6fe",
    "secondaryBg": "#fdf4ff",
    "secondaryText": "#86198f",
    "secondaryBorder": "#f5d0fe",
    "buttonGradient": "linear-gradient(135deg, #8b5cf6, #6d28d9)"
}}
                infoCards={[{ label: 'Conversion Math', value: 'DIVIDE BY 1,024' }]}
            >
                <SEOBottomSection
                    keyword="gb to tb converter"
                    heading="GB to TB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleGBtoTBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}

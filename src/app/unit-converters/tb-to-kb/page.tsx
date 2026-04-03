import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleTBtoKBUnit from '@/components/articles/ArticleTBtoKBUnit';

export const metadata: Metadata = {
    title: { absolute: 'TB to KB Converter – Convert Terabytes to Kilobytes Online Free' },
    description: 'Convert TB to KB instantly with our free online TB to KB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'tb to kb, tb to kb converter, convert tb to kb, terabytes to kilobytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/tb-to-kb',
    },
};

const faqs = [
    { q: "How do I convert TB to KB?", a: "To convert TB to KB, you can simply use our free calculator above. The mathematical rule is to multiply by 1,073,741,824 from the TB value to get the KB equivalent." },
    { q: "Is a TB larger than a KB?", a: "Yes, TB is much larger than KB." },
    { q: "Is this TB to KB calculator free to use?", a: "Yes! All digital storage unit converters on SmartToolsWala are 100% free and don't require any signup." },
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
                                "name": "TB to KB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/tb-to-kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online TB to KB converter. Convert terabytes to kilobytes instantly.",
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
                titleProps={{ highlight: 'TB to KB', suffix: 'Converter' }}
                description="Convert TB to KB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="tb"
                defaultTo="kb"
                examples={[
    {
        "label": "1 TB to KB",
        "from": "tb",
        "to": "kb",
        "value": "1"
    },
    {
        "label": "0.5 TB to KB",
        "from": "tb",
        "to": "kb",
        "value": "0.5"
    },
    {
        "label": "2 TB to KB",
        "from": "tb",
        "to": "kb",
        "value": "2"
    },
    {
        "label": "5 TB to KB",
        "from": "tb",
        "to": "kb",
        "value": "5"
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
                infoCards={[{ label: 'Conversion Math', value: 'MULTIPLY BY 1,073,741,824' }]}
            >
                <SEOBottomSection
                    keyword="tb to kb converter"
                    heading="TB to KB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleTBtoKBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}

import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleGBtoKBUnit from '@/components/articles/ArticleGBtoKBUnit';

export const metadata: Metadata = {
    title: { absolute: 'GB to KB Converter – Convert Gigabytes to Kilobytes Online Free' },
    description: 'Convert GB to KB instantly with our free online GB to KB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'gb to kb, gb to kb converter, convert gb to kb, gigabytes to kilobytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/gb-to-kb',
    },
};

const faqs = [
    { q: "How do I convert GB to KB?", a: "To convert GB to KB, you can simply use our free calculator above. The mathematical rule is to multiply by 1,048,576 from the GB value to get the KB equivalent." },
    { q: "Is a GB larger than a KB?", a: "Yes, GB is much larger than KB." },
    { q: "Is this GB to KB calculator free to use?", a: "Yes! All digital storage unit converters on SmartToolsWala are 100% free and don't require any signup." },
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
                                "name": "GB to KB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/gb-to-kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online GB to KB converter. Convert gigabytes to kilobytes instantly.",
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
                titleProps={{ highlight: 'GB to KB', suffix: 'Converter' }}
                description="Convert GB to KB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="gb"
                defaultTo="kb"
                examples={[
    {
        "label": "1 GB to KB",
        "from": "gb",
        "to": "kb",
        "value": "1"
    },
    {
        "label": "0.5 GB to KB",
        "from": "gb",
        "to": "kb",
        "value": "0.5"
    },
    {
        "label": "2 GB to KB",
        "from": "gb",
        "to": "kb",
        "value": "2"
    },
    {
        "label": "5 GB to KB",
        "from": "gb",
        "to": "kb",
        "value": "5"
    }
]}
                theme={{
    "heroGradient": "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #93c5fd 100%)",
    "textGradient": "linear-gradient(90deg, #dbeafe, #eff6ff)",
    "primaryBg": "#eff6ff",
    "primaryText": "#1e40af",
    "primaryBorder": "#bfdbfe",
    "secondaryBg": "#f8fafc",
    "secondaryText": "#0369a1",
    "secondaryBorder": "#bae6fd",
    "buttonGradient": "linear-gradient(135deg, #3b82f6, #1d4ed8)"
}}
                infoCards={[{ label: 'Conversion Math', value: 'MULTIPLY BY 1,048,576' }]}
            >
                <SEOBottomSection
                    keyword="gb to kb converter"
                    heading="GB to KB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleGBtoKBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}

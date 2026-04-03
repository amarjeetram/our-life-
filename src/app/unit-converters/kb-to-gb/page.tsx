import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleKBtoGBUnit from '@/components/articles/ArticleKBtoGBUnit';

export const metadata: Metadata = {
    title: { absolute: 'KB to GB Converter – Convert Kilobytes to Gigabytes Online Free' },
    description: 'Convert KB to GB instantly with our free online KB to GB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'kb to gb, kb to gb converter, convert kb to gb, kilobytes to gigabytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/kb-to-gb',
    },
};

const faqs = [
    { q: "How do I convert KB to GB?", a: "To convert KB to GB, you can simply use our free calculator above. The mathematical rule is to divide by 1,048,576 from the KB value to get the GB equivalent." },
    { q: "Is a KB larger than a GB?", a: "No, GB is larger than KB." },
    { q: "Is this KB to GB calculator free to use?", a: "Yes! All digital storage unit converters on SmartToolsWala are 100% free and don't require any signup." },
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
                                "name": "KB to GB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/kb-to-gb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online KB to GB converter. Convert kilobytes to gigabytes instantly.",
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
                titleProps={{ highlight: 'KB to GB', suffix: 'Converter' }}
                description="Convert KB to GB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="kb"
                defaultTo="gb"
                examples={[
    {
        "label": "100 KB to GB",
        "from": "kb",
        "to": "gb",
        "value": "100"
    },
    {
        "label": "500 KB to GB",
        "from": "kb",
        "to": "gb",
        "value": "500"
    },
    {
        "label": "1000 KB to GB",
        "from": "kb",
        "to": "gb",
        "value": "1000"
    },
    {
        "label": "2048 KB to GB",
        "from": "kb",
        "to": "gb",
        "value": "2048"
    }
]}
                theme={{
    "heroGradient": "linear-gradient(135deg, #064e3b 0%, #10b981 50%, #6ee7b7 100%)",
    "textGradient": "linear-gradient(90deg, #d1fae5, #ecfdf5)",
    "primaryBg": "#ecfdf5",
    "primaryText": "#047857",
    "primaryBorder": "#a7f3d0",
    "secondaryBg": "#f0fdfa",
    "secondaryText": "#0f766e",
    "secondaryBorder": "#ccfbf1",
    "buttonGradient": "linear-gradient(135deg, #10b981, #059669)"
}}
                infoCards={[{ label: 'Conversion Math', value: 'DIVIDE BY 1,048,576' }]}
            >
                <SEOBottomSection
                    keyword="kb to gb converter"
                    heading="KB to GB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleKBtoGBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}

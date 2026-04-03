import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleKBtoTBUnit from '@/components/articles/ArticleKBtoTBUnit';

export const metadata: Metadata = {
    title: { absolute: 'KB to TB Converter – Convert Kilobytes to Terabytes Online Free' },
    description: 'Convert KB to TB instantly with our free online KB to TB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'kb to tb, kb to tb converter, convert kb to tb, kilobytes to terabytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/kb-to-tb',
    },
};

const faqs = [
    { q: "How do I convert KB to TB?", a: "To convert KB to TB, you can simply use our free calculator above. The mathematical rule is to divide by 1,073,741,824 from the KB value to get the TB equivalent." },
    { q: "Is a KB larger than a TB?", a: "No, TB is larger than KB." },
    { q: "Is this KB to TB calculator free to use?", a: "Yes! All digital storage unit converters on SmartToolsWala are 100% free and don't require any signup." },
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
                                "name": "KB to TB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/kb-to-tb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online KB to TB converter. Convert kilobytes to terabytes instantly.",
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
                titleProps={{ highlight: 'KB to TB', suffix: 'Converter' }}
                description="Convert KB to TB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="kb"
                defaultTo="tb"
                examples={[
    {
        "label": "100 KB to TB",
        "from": "kb",
        "to": "tb",
        "value": "100"
    },
    {
        "label": "500 KB to TB",
        "from": "kb",
        "to": "tb",
        "value": "500"
    },
    {
        "label": "1000 KB to TB",
        "from": "kb",
        "to": "tb",
        "value": "1000"
    },
    {
        "label": "2048 KB to TB",
        "from": "kb",
        "to": "tb",
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
                infoCards={[{ label: 'Conversion Math', value: 'DIVIDE BY 1,073,741,824' }]}
            >
                <SEOBottomSection
                    keyword="kb to tb converter"
                    heading="KB to TB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleKBtoTBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}

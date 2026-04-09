import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleKBtoGBUnit from '@/components/articles/ArticleKBtoGBUnit';

export const metadata: Metadata = {
    title: { absolute: 'KB to GB Converter – Convert Kilobytes to Gigabytes Online Free' },
    description: 'Convert KB to GB instantly with our free online KB to GB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'kb to gb, kb to gb converter, convert kb to gb, kilobytes to gigabytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/digital-storage/',
    },
};

const faqs = [
    {
        "q": "How many Gigabytes are in 1 Kilobyte?",
        "a": "In the standard binary system used by computers, 1 KB is equal to 9.5367e-7 GB. In the decimal system, it is 0.000001 GB."
    },
    {
        "q": "What is the difference between KB and GB?",
        "a": "Kilobyte (KB) is a smaller unit of digital storage than Gigabyte (GB). It takes many KBs to equal one GB."
    },
    {
        "q": "How do I convert KB to GB online?",
        "a": "Simply type your KB value into our calculator box above. The exact GB calculation will immediately display without clicking any buttons."
    },
    {
        "q": "Is this KB to GB conversion tool free?",
        "a": "Yes! Our digital unit converter is incredibly fast, 100% free, and requires no downloads or sign-ups."
    }
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
                                "url": "https://smarttoolswala.com/unit-converters/digital-storage/kb-to-gb",
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


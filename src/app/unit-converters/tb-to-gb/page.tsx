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
    {
        "q": "How many Gigabytes are in 1 Terabyte?",
        "a": "In the standard binary system used by computers, 1 TB is equal to 1,024 GB. In the decimal system, it is 1,000 GB."
    },
    {
        "q": "What is the difference between TB and GB?",
        "a": "Terabyte (TB) is a much larger unit of digital storage than Gigabyte (GB). Files measured in TBs are significantly heavier."
    },
    {
        "q": "How do I convert TB to GB online?",
        "a": "Simply type your TB value into our calculator box above. The exact GB calculation will immediately display without clicking any buttons."
    },
    {
        "q": "Is this TB to GB conversion tool free?",
        "a": "Yes! Our digital unit converter is incredibly fast, 100% free, and requires no downloads or sign-ups."
    }
];

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {

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
                    },
                        {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How many Gigabytes are in 1 Terabyte?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In the standard binary system used by computers, 1 TB is equal to 1,024 GB. In the decimal system, it is 1,000 GB."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between TB and GB?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Terabyte (TB) is a much larger unit of digital storage than Gigabyte (GB). Files measured in TBs are significantly heavier."
            }
        },
        {
            "@type": "Question",
            "name": "How do I convert TB to GB online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply type your TB value into our calculator box above. The exact GB calculation will immediately display without clicking any buttons."
            }
        },
        {
            "@type": "Question",
            "name": "Is this TB to GB conversion tool free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our digital unit converter is incredibly fast, 100% free, and requires no downloads or sign-ups."
            }
        }
    ]
}
                    ])
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

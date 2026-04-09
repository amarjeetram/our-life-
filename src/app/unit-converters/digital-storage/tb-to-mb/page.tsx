import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleTBtoMBUnit from '@/components/articles/ArticleTBtoMBUnit';

export const metadata: Metadata = {
    title: { absolute: 'TB to MB Converter – Convert Terabytes to Megabytes Online Free' },
    description: 'Convert TB to MB instantly with our free online TB to MB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'tb to mb, tb to mb converter, convert tb to mb, terabytes to megabytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/digital-storage/',
    },
};

const faqs = [
    {
        "q": "How many Megabytes are in 1 Terabyte?",
        "a": "In the standard binary system used by computers, 1 TB is equal to 1,048,576 MB. In the decimal system, it is 1,000,000 MB."
    },
    {
        "q": "What is the difference between TB and MB?",
        "a": "Terabyte (TB) is a much larger unit of digital storage than Megabyte (MB). Files measured in TBs are significantly heavier."
    },
    {
        "q": "How do I convert TB to MB online?",
        "a": "Simply type your TB value into our calculator box above. The exact MB calculation will immediately display without clicking any buttons."
    },
    {
        "q": "Is this TB to MB conversion tool free?",
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
                                "name": "TB to MB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/digital-storage/tb-to-mb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online TB to MB converter. Convert terabytes to megabytes instantly.",
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
                titleProps={{ highlight: 'TB to MB', suffix: 'Converter' }}
                description="Convert TB to MB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="tb"
                defaultTo="mb"
                examples={[
    {
        "label": "1 TB to MB",
        "from": "tb",
        "to": "mb",
        "value": "1"
    },
    {
        "label": "0.5 TB to MB",
        "from": "tb",
        "to": "mb",
        "value": "0.5"
    },
    {
        "label": "2 TB to MB",
        "from": "tb",
        "to": "mb",
        "value": "2"
    },
    {
        "label": "5 TB to MB",
        "from": "tb",
        "to": "mb",
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
                    keyword="tb to mb converter"
                    heading="TB to MB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleTBtoMBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}


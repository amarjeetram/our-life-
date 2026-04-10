import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleMBtoTBUnit from '@/components/articles/ArticleMBtoTBUnit';

export const metadata: Metadata = {
    title: { absolute: 'MB to TB Converter – Convert Megabytes to Terabytes Online Free' },
    description: 'Convert MB to TB instantly with our free online MB to TB calculator. Get precise digital storage size results flawlessly.',
    keywords: 'mb to tb, mb to tb converter, convert mb to tb, megabytes to terabytes calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/digital-storage/mb-to-tb',
    },
};

const faqs = [
    {
        "q": "How many Terabytes are in 1 Megabyte?",
        "a": "In the standard binary system used by computers, 1 MB is equal to 9.5367e-7 TB. In the decimal system, it is 0.000001 TB."
    },
    {
        "q": "What is the difference between MB and TB?",
        "a": "Megabyte (MB) is a smaller unit of digital storage than Terabyte (TB). It takes many MBs to equal one TB."
    },
    {
        "q": "How do I convert MB to TB online?",
        "a": "Simply type your MB value into our calculator box above. The exact TB calculation will immediately display without clicking any buttons."
    },
    {
        "q": "Is this MB to TB conversion tool free?",
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
                                "name": "MB to TB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/digital-storage/mb-to-tb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online MB to TB converter. Convert megabytes to terabytes instantly.",
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
                titleProps={{ highlight: 'MB to TB', suffix: 'Converter' }}
                description="Convert MB to TB instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="mb"
                defaultTo="tb"
                examples={[
    {
        "label": "100 MB to TB",
        "from": "mb",
        "to": "tb",
        "value": "100"
    },
    {
        "label": "500 MB to TB",
        "from": "mb",
        "to": "tb",
        "value": "500"
    },
    {
        "label": "1000 MB to TB",
        "from": "mb",
        "to": "tb",
        "value": "1000"
    },
    {
        "label": "2048 MB to TB",
        "from": "mb",
        "to": "tb",
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
                infoCards={[{ label: 'Conversion Math', value: 'DIVIDE BY 1,048,576' }]}
            >
                <SEOBottomSection
                    keyword="mb to tb converter"
                    heading="MB to TB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleMBtoTBUnit />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}


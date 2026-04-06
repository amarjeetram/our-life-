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
    {
        "q": "How many Terabytes are in 1 Gigabyte?",
        "a": "In the standard binary system used by computers, 1 GB is equal to 0.000977 TB. In the decimal system, it is 0.001 TB."
    },
    {
        "q": "What is the difference between GB and TB?",
        "a": "Gigabyte (GB) is a smaller unit of digital storage than Terabyte (TB). It takes many GBs to equal one TB."
    },
    {
        "q": "How do I convert GB to TB online?",
        "a": "Simply type your GB value into our calculator box above. The exact TB calculation will immediately display without clicking any buttons."
    },
    {
        "q": "Is this GB to TB conversion tool free?",
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
                    },
                        {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How many Terabytes are in 1 Gigabyte?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In the standard binary system used by computers, 1 GB is equal to 0.000977 TB. In the decimal system, it is 0.001 TB."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between GB and TB?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Gigabyte (GB) is a smaller unit of digital storage than Terabyte (TB). It takes many GBs to equal one TB."
            }
        },
        {
            "@type": "Question",
            "name": "How do I convert GB to TB online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply type your GB value into our calculator box above. The exact TB calculation will immediately display without clicking any buttons."
            }
        },
        {
            "@type": "Question",
            "name": "Is this GB to TB conversion tool free?",
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

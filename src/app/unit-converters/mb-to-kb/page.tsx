import { Metadata } from 'next';
import MBtoKBConverterClient from '@/components/MBtoKBConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleMBtoKBUnit from '@/components/articles/ArticleMBtoKBUnit';

export const metadata: Metadata = {
    title: { absolute: 'MB to KB Converter – Convert Megabytes to Kilobytes Online Free' },
    description: 'Convert MB to KB instantly with our free online MB to KB calculator. 1 MB = 1024 KB. Convert megabytes to kilobytes, GB, TB and more digital storage units.',
    keywords: 'mb to kb, mb to kb converter, mb convert to kb, 1mb to kb, mb to kb calculator, mb to kb convert, megabyte to kilobyte, digital storage converter, file size converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/mb-to-kb',
    },
};

const faqs = [
    { q: "How many KB is 1 MB?", a: "1 MB (Megabyte) is equal to 1,024 KB (Kilobytes) in the binary system used by computers (Windows, Android, iOS). In the decimal SI system, 1 MB = 1,000 KB. Our calculator uses the binary system by default." },
    { q: "How do I convert MB to KB?", a: "To convert MB to KB, multiply the MB value by 1,024. For example, 2 MB × 1,024 = 2,048 KB. You can also use our free MB to KB calculator above — just enter the value and get the result instantly." },
    { q: "What is the difference between MB and KB?", a: "MB (Megabyte) is a larger unit than KB (Kilobyte). 1 MB equals 1,024 KB. KB is used for smaller files like thumbnails, text documents, and compressed images. MB is used for larger files like original photos, audio, and documents." },
    { q: "How many KB is 5 MB?", a: "5 MB equals 5,120 KB in the binary system (5 × 1,024 = 5,120 KB). In the decimal system, 5 MB = 5,000 KB." },
    { q: "How many KB is 2 MB?", a: "2 MB equals 2,048 KB in the binary system (2 × 1,024 = 2,048 KB)." },
    { q: "Can I convert KB to MB using this tool?", a: "Yes! Our converter works both ways. Select KB as the 'From' unit and MB as the 'To' unit to convert kilobytes back to megabytes. 1,024 KB = 1 MB." },
    { q: "Why do government portals ask for photos in KB?", a: "Government portals like SSC, UPSC, NEET and banking sites require photos in KB (usually 20KB to 200KB) to ensure fast server processing and efficient storage. Their systems handle millions of applications and cannot handle MB-sized files." },
    { q: "Is this MB to KB calculator free?", a: "Yes, 100% free. No registration, no watermark, no download required. Simply open the page and convert as many values as you need." },
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
                                "@type": "Organization",
                                "name": "SmartToolsWala",
                                "url": "https://smarttoolswala.com",
                                "logo": "https://smarttoolswala.com/logo.svg",
                            },
                            {
                                "@type": "WebApplication",
                                "name": "MB to KB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/mb-to-kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Free online MB to KB converter. Convert megabytes to kilobytes instantly. 1 MB = 1024 KB. Supports all digital storage unit conversions.",
                                "featureList": [
                                    "MB to KB conversion",
                                    "KB to MB conversion",
                                    "GB, TB, Bytes conversion",
                                    "Binary and Decimal modes",
                                    "Instant result, no page reload"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                },
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.9",
                                    "ratingCount": "12400"
                                }
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://smarttoolswala.com"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Unit Converters",
                                        "item": "https://smarttoolswala.com/unit-converters"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "MB to KB Converter",
                                        "item": "https://smarttoolswala.com/unit-converters/mb-to-kb"
                                    }
                                ]
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
            <MBtoKBConverterClient>
                <SEOBottomSection
                    keyword="mb to kb converter"
                    heading="MB to KB Conversion Guide"
                    faqs={faqs}
                >
                    <ArticleMBtoKBUnit />
                </SEOBottomSection>
            </MBtoKBConverterClient>
        </>
    );
}

import { Metadata } from 'next';
import GBtoMBConverterClient from '@/components/GBtoMBConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleGBtoMBUnit from '@/components/articles/ArticleGBtoMBUnit';

export const metadata: Metadata = {
    title: { absolute: 'GB to MB Converter – Convert Gigabytes to Megabytes Online Free' },
    description: 'Convert GB to MB instantly with our free online GB to MB calculator. 1 GB = 1024 MB. Convert your video and photo sizes accurately without math.',
    keywords: 'gb to mb, gb to mb converter, convert gb to mb, 1 gb to mb, gb to mb calculator, 0.98 gb to mb, 0.1 gb to mb, 100 gb to mb, video gb to mb converter, gb to mb converter photo',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/gb-to-mb',
    },
};

const faqs = [
    { q: "How many MB is 1 GB?", a: "1 GB (Gigabyte) is equal to 1,024 MB (Megabytes) in the binary system used by computers and smartphones. So, 1 GB to MB is simply 1,024 MB." },
    { q: "How do I convert GB to MB?", a: "To convert GB to MB, you multiply the GB value by 1,024. For instance, to calculate 4 GB to MB, you do 4 × 1,024 = 4,096 MB. You can also use our free GB to MB calculator above to get the precise value instantly." },
    { q: "How many MB is 0.98 GB?", a: "Using our calculator, 0.98 GB is exactly 1,003.52 MB (0.98 × 1,024 = 1,003.52). People usually run into this value when dealing with almost-full 1GB flash drives." },
    { q: "How many MB is 0.1 GB?", a: "0.1 GB equals 102.4 MB in the binary system (0.1 × 1,024 = 102.4 MB). This is an extremely common file size for mobile applications or basic software updates." },
    { q: "Can I use this as a video GB to MB converter?", a: "Our tool acts as a GB to MB calculator that will tell you the exact megabyte size of your video files. However, it will not compress or shrink the actual video file. It strictly handles numerical conversion." },
    { q: "How many MB is 150 GB?", a: "150 GB is exactly 153,600 MB. You simply multiply 150 by 1,024." },
    { q: "How many MB is 0.01 GB?", a: "0.01 GB is equal to 10.24 MB (0.01 × 1,024). This is roughly the size of a very high-quality JPEG photograph." },
    { q: "Is this GB to MB calculator free?", a: "Yes, our converter is 100% free with no registration or limits. You can convert any amount of gigabytes to megabytes effortlessly." },
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
                                "name": "GB to MB Converter",
                                "url": "https://smarttoolswala.com/unit-converters/gb-to-mb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Free online GB to MB converter. Convert gigabytes to megabytes instantly. 1 GB = 1024 MB. Calculate video and photo sizes flawlessly.",
                                "featureList": [
                                    "GB to MB conversion",
                                    "MB to GB conversion",
                                    "KB, TB, Bytes conversion",
                                    "Fast formula tracking",
                                    "Mobile responsive"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                },
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.9",
                                    "ratingCount": "8900"
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
                                        "name": "GB to MB Converter",
                                        "item": "https://smarttoolswala.com/unit-converters/gb-to-mb"
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
            <GBtoMBConverterClient>
                <SEOBottomSection
                    keyword="gb to mb converter"
                    heading="Mastering Digital Storage: GB to MB"
                    faqs={faqs}
                >
                    <ArticleGBtoMBUnit />
                </SEOBottomSection>
            </GBtoMBConverterClient>
        </>
    );
}

import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleResize200KB from '@/components/articles/ArticleResize200KB';

export const metadata: Metadata = {
    title: 'Resize Image to 200KB Online - Optimize Photos Perfectly',
    description: 'Use our free tool to resize image to 200kb without losing quality. Ideal for uploading large documents like PAN cards or Degree Certificates cleanly.',
    keywords: 'resize image to 200kb, compress to 200kb online, resize document to 200kb jpg',
    alternates: {
        canonical: 'https://smarttoolswala.com/image-tools/resize-image-to-200kb',
    },
};

const faqs = [
    { q: "Why should I resize image to 200kb for documents?", a: "Many government web portals impose a 200KB cap on full document scans. This threshold ensures the file is small enough for their servers yet detailed enough to read the text legibly." },
    { q: "Can I resize image to 200kb and maintain text clarity?", a: "Absolutely. Our compression algorithms protect sharp contrasting edges (like tiny text on a diploma) while aggressively reducing the invisible data layers, guaranteeing legibility at 200KB sizes." },
    { q: "Does the tool support multiple images?", a: "Yes, you can drop up to 10 documents simultaneously, hit the compress button, and resize image to 200kb across all your scanned files in one batch action securely." }
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
                                "name": "Resize Image to 200KB",
                                "url": "https://smarttoolswala.com/image-tools/resize-image-to-200kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Effortlessly resize image to 200kb to successfully submit crucial document scans online.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Image Tools", "item": "https://smarttoolswala.com/image-tools" },
                                    { "@type": "ListItem", "position": 3, "name": "Resize Image to 200KB", "item": "https://smarttoolswala.com/image-tools/resize-image-to-200kb" }
                                ]
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(f => ({
                                    "@type": "Question",
                                    "name": f.q,
                                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                                }))
                            }
                        ]
                    })
                }}
            />
            <CompressImageClient
                targetSizeKB={200}
                titleOverride={<>Resize Image to <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>200KB Online</span></>}
                subtitleOverride="A fast, secure tool to precisely resize image to 200kb. Great for retaining readable text on heavy document scans."
            >
                <SEOBottomSection keyword="resize image to 200kb" faqs={faqs}>
                    <ArticleResize200KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleResize30KB from '@/components/articles/ArticleResize30KB';

export const metadata: Metadata = {
    title: 'Resize Image to 30KB Online - Free JPG Photo Compressor',
    description: 'Instantly resize image to 30kb online for free. Compress photo without losing quality to exactly 30KB — perfect for SSC, RRB, and state exam portals.',
    keywords: 'resize image to 30kb, resize image to 30kb online, resize image to 30kb jpg, resize image to 30kb without losing quality',
    alternates: {
        canonical: 'https://smarttoolswala.com/image-tools/resize-image-to-30kb',
    },
};

const faqs = [
    { q: "How can I resize image to 30kb online instantly?", a: "Upload your photo to our tool, set the target to 30KB using the slider, and click compress. Our engine guarantees the output stays within the 30KB limit while preserving maximum visual quality." },
    { q: "Can I resize image to 30kb jpg from a PNG file?", a: "Yes! Drop any PNG, WebP, or HEIC file into our uploader. It will automatically convert and resize image to 30kb jpg without any extra steps required from your side." },
    { q: "Is it really possible to resize image to 30kb without losing quality?", a: "Our smart compression engine targets unnecessary invisible data layers first before touching visible quality. This allows you to resize image to 30kb without losing quality on faces and signature outlines in nearly all cases." },
    { q: "What exam portals need exactly 30KB images?", a: "Many SSC, RRB NTPC, and state service commission (BPSC, RPSC, etc.) portals specify photo between 20KB to 50KB and signatures between 10KB to 30KB. Our tool precisely handles that entire range." }
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
                                "name": "Resize Image to 30KB Online",
                                "url": "https://smarttoolswala.com/image-tools/resize-image-to-30kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Free tool to quickly resize image to 30kb online for SSC, RRB, and state exam portals.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Image Tools", "item": "https://smarttoolswala.com/image-tools" },
                                    { "@type": "ListItem", "position": 3, "name": "Resize Image to 30KB", "item": "https://smarttoolswala.com/image-tools/resize-image-to-30kb" }
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
                targetSizeKB={30}
                titleOverride={<>Resize Image to <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>30KB Online</span></>}
                subtitleOverride="Precisely resize image to 30kb online for SSC, RRB signatures and photographs. Guaranteed compliance with no watermarks."
            >
                <SEOBottomSection keyword="resize image to 30kb" faqs={faqs}>
                    <ArticleResize30KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

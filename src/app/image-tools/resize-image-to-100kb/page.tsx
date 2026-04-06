import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleResize100KB from '@/components/articles/ArticleResize100KB';

export const metadata: Metadata = {
    title: 'Resize Image to 100KB Online - Fast & Free JPG Tool',
    description: 'Instantly resize image to 100kb online for free. Safely download high-quality JPGs. Reduce size to 100kb perfectly for registration portals.',
    keywords: 'resize image to 100kb, resize image to 100kb download, resize image to 100kb online, resize image to 100kb pdf, resize image to 100kb jpeg, resize image to 100kb jpg',
    alternates: {
        canonical: 'https://smarttoolswala.com/image-tools/resize-image-to-100kb',
    },
};

const faqs = [
    { q: "How do I resize image to 100kb online quickly?", a: "Just drop your photo onto our drag-and-drop zone. Drag the slider to 100 or rely on our native smart detection, and then click to download your compressed file immediately." },
    { q: "Can I safely resize image to 100kb download it directly to my phone?", a: "Yes, our web tool works perfectly on mobile phones too. Drop the picture from your camera roll, compress it, and safely resize image to 100kb download it straight back to your device." },
    { q: "If my form needs a PDF, does the resize image to 100kb pdf feature exist?", a: "Our tool outputs highly optimized, lightweight JPGs. This allows you to effortlessly embed the tiny photo into a blank document and print-to-PDF while guaranteeing the entire scanned document hits that 100KB threshold flawlessly." },
    { q: "How to perfectly resize image to 100kb jpeg without artifacts?", a: "Our compressor engine utilizes the same high-end algorithms deployed by major modern browsers. We cleverly balance pixel quality so when you resize image to 100kb jpeg format, no distinct color-blocking appears on your face." },
    { q: "Can I resize image to 100kb jpg format from a PNG file?", a: "Absolutely. Simply drop your oversized PNG file into our compressor, select exactly 100KB, and our system automatically converts and shrinks it natively rendering a flawless JPG copy matching requirements exactly." }
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
                                "name": "Resize Image to 100KB",
                                "url": "https://smarttoolswala.com/image-tools/resize-image-to-100kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Easily resize image to 100kb online with strict compression ceilings.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Image Tools", "item": "https://smarttoolswala.com/image-tools" },
                                    { "@type": "ListItem", "position": 3, "name": "Resize Image to 100KB", "item": "https://smarttoolswala.com/image-tools/resize-image-to-100kb" }
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
                targetSizeKB={100}
                titleOverride={<>Resize Image to <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>100KB Online</span></>}
                subtitleOverride="Free browser-based utility to instantly resize image to 100kb download it safely. Guaranteed high quality with no visible pixelation."
            >
                <SEOBottomSection keyword="resize image to 100kb" faqs={faqs}>
                    <ArticleResize100KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

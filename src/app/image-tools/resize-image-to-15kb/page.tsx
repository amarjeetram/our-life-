import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleResize15KB from '@/components/articles/ArticleResize15KB';

export const metadata: Metadata = {
    title: 'Resize Image to 15KB Online - Free Photo & Signature Compressor',
    description: 'Instantly resize image to 15kb online. Easily compress photos to 15kb without losing quality for signatures, thumbprints, and applicant portals.',
    keywords: 'resize image to 15kb, resize image to 15kb online, resize image to 15kb jpg, resize image to 15kb with height and width, resize image to 15kb width and height, resize image to 15kb without losing quality',
    alternates: {
        canonical: 'https://smarttoolswala.com/image-tools/resize-image-to-15kb',
    },
};

const faqs = [
    { q: "How can I easily resize image to 15kb online?", a: "To immediately resize image to 15kb online, upload your photograph to our drag-and-drop tool. The engine automatically crushes the file down while preserving the necessary face or signature details." },
    { q: "Is it possible to resize image to 15kb without losing quality completely?", a: "Yes. While dropping to 15KB requires removing substantial hidden data, our smart algorithms preserve high-contrast edges natively. This ensures you resize image to 15kb without losing quality—keeping your signature and facial features brilliantly legible." },
    { q: "Can I resize image to 15kb with height and width specified?", a: "Our web application primarily targets the strict file size weight limit. We recommend cropping your photo natively to your portal's exact dimensions, then using our engine to strictly crush the memory to 15KB." },
    { q: "If the form only accepts JPGs, do you output that format?", a: "Yes. You can upload any format, and we securely process it inside the browser to automatically resize image to 15kb jpg standard output effortlessly." }
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
                                "name": "Resize Image to 15KB Online",
                                "url": "https://smarttoolswala.com/image-tools/resize-image-to-15kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Highly accurate utility to resize image to 15kb online without losing quality.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Image Tools", "item": "https://smarttoolswala.com/image-tools" },
                                    { "@type": "ListItem", "position": 3, "name": "Resize Image to 15KB", "item": "https://smarttoolswala.com/image-tools/resize-image-to-15kb" }
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
                targetSizeKB={15}
                titleOverride={<>Resize Image to <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>15KB Online</span></>}
                subtitleOverride="A fast, private tool to precisely resize image to 15kb online. Retain vital detail correctly optimized for signature uploads."
            >
                <SEOBottomSection keyword="resize image to 15kb" faqs={faqs}>
                    <ArticleResize15KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

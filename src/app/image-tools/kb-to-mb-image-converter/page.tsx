import { Metadata } from 'next';
import KBtoMBClient from '@/components/KBtoMBClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleKBtoMB from '@/components/articles/ArticleKBtoMB';

export const metadata: Metadata = {
    title: { absolute: 'KB to MB Image Converter — Check Image & Photo Size Online Free' },
    description: 'Free KB to MB converter online. Instantly check photo KB to MB, PDF KB to MB, image KB to MB, and JPG KB to MB. Simple calculator + file upload.',
    keywords: 'kb to mb converter, kb to mb converter pdf, pdf kb to mb converter, photo kb to mb converter, image kb to mb converter, kb to mb converter image, kb to mb converter jpg, kb to mb converter photo',
    alternates: {
        canonical: 'https://smarttoolswala.com/image-tools/kb-to-mb-image-converter',
    },
};

const faqs = [
    { q: "How does the KB to MB converter work?", a: "Our KB to MB converter divides the file size in Kilobytes by 1024 to give you the exact Megabyte equivalent. You can either type a number in the calculator or upload an actual image/PDF to read its size automatically in both KB and MB." },
    { q: "Is this tool a photo KB to MB converter?", a: "Yes! You can upload any JPG, PNG, or WebP photograph and instantly see its size in both KB and MB. It's the fastest way to check if your photo fits within a portal's MB size limit." },
    { q: "Can I use this as a PDF KB to MB converter?", a: "Absolutely. Upload any PDF document and the tool immediately displays its exact KB and MB size. This helps you verify if your merged PDF submission is within the portal's stated MB ceiling before uploading." },
    { q: "What is the formula for KB to MB conversion?", a: "The formula is: MB = KB ÷ 1024. This is because 1 MB equals 1,024 KB in the binary system all computers use. For example, 512 KB = 0.5 MB, and 2048 KB = 2 MB." },
    { q: "Is the KB to MB converter image upload private?", a: "100% private. When you upload a file, it never leaves your device. Our tool reads the file size using your browser's built-in File API — no data is sent to any server. Your documents, IDs, and certificates remain completely secure." },
    { q: "What formats support kb to mb converter image?", a: "We support JPG, JPEG, PNG, WebP images and also PDF documents. The tool reads the raw file size from your local device, so any file format will work for size detection." },
    { q: "How many KB equals 1 MB?", a: "Exactly 1,024 KB equals 1 MB. So 500 KB = 0.488 MB, 750 KB = 0.732 MB, and 1500 KB = 1.465 MB." },
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
                                "logo": "https://smarttoolswala.com/logo.svg"
                            },
                            {
                                "@type": "WebApplication",
                                "name": "KB to MB Converter",
                                "url": "https://smarttoolswala.com/kb-to-mb-image-converter",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Free online KB to MB converter for images, PDFs, and photos. Instantly check file size in KB and MB with a built-in calculator.",
                                "featureList": [
                                    "KB to MB manual calculator",
                                    "Photo KB to MB upload check",
                                    "PDF KB to MB verification",
                                    "Image KB to MB detection",
                                    "JPG KB to MB converter"
                                ],
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Image Tools", "item": "https://smarttoolswala.com/image-tools" },
                                    { "@type": "ListItem", "position": 3, "name": "KB to MB Converter", "item": "https://smarttoolswala.com/image-tools/kb-to-mb-image-converter" }
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
            <KBtoMBClient>
                <SEOBottomSection keyword="kb to mb converter" faqs={faqs}>
                    <ArticleKBtoMB />
                </SEOBottomSection>
            </KBtoMBClient>
        </>
    );
}

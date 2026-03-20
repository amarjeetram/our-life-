import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import Article200KB from '@/components/articles/Article200KB';



export const metadata: Metadata = {
    title: 'Compress Image to 200KB Online Free – Reduce Image Size',
    description: 'Easily compress image to 200kb online. Free tool to reduce image size to 200kb without losing quality. Fast, secure, and accurate 200KB photo compressor.',
    keywords: 'compress image to 200kb, reduce image size to 200kb, 200kb photo converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/compress-image-to-200kb',
    },
};

const faqs = [
    { q: "How does the tool compress image to 200kb without making text blurry?", a: "By intelligently allocating data. Unlike generic tools, our 200kb photo converter protects edge luma (contrast), ensuring that scanned text, intricate details, and faces remain remarkably sharp while the file size drops." },
    { q: "Is this 200kb photo converter really free?", a: "Yes, our algorithm is completely free to use. You can reduce image size to 200kb for as many documents or photos as you need without any hidden subscription fees." },
    { q: "What should I do if my original file is a massive 15MB panorama?", a: "No problem. Our backend easily handles large, high-resolution original files. Just drag and drop, and the server will methodically compress image to 200kb for you automatically." },
    { q: "Can I reduce image size to 200kb on my iPhone or Android?", a: "Yes, entirely! Our system operates securely in the browser. You don't need to install any heavy, ad-filled applications to use our 200kb photo converter on mobile devices." },
    { q: "Will you store my sensitive documents?", a: "Never. As soon as you finish using the tool to compress image to 200kb, both the original document and the final output are permanently and immediately wiped from our secure servers." },
    { q: "Can I compress PNG documents?", a: "Yes. When you reduce image size to 200kb, if you upload a thick PNG file, the system optimally reformats it to an acceptable JPG standard to guarantee a small footprint." },
    { q: "Why do some websites insist I reduce image size to 200kb?", a: "Administrators mandate a 200KB limit to optimize server storage costs and guarantee their website loads incredibly fast for end-users operating on slow mobile networks." },
    { q: "Will the physical dimensions (width and height) change drastically?", a: "Our 200kb photo converter aims to preserve dimensions where possible. Sometimes, to guarantee the file hits the strict 200KB threshold, it will perform a proportional intelligent scale-down without distorting the picture." }
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
                                "sameAs": [
                                    "https://twitter.com/smarttoolswala",
                                    "https://github.com/smarttoolswala",
                                    "https://www.youtube.com/@SmartToolsWala"
                                ]
                            },
                            {
                                "@type": "WebApplication",
                                "name": "200KB Image Compressor",
                                "url": "https://smarttoolswala.com/compress-image-to-200kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Precision image compressor to exactly 200KB for high-resolution document processing.",
                                "featureList": [
                                    "Compress image to 200kb",
                                    "resize large images",
                                    "high-quality document compression"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                },
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.9",
                                    "ratingCount": "10550"
                                }
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to compress an image to exactly 200KB",
                                "description": "Follow these simple steps to safely reduce massive photos down to precisely 200KB for online document portals.",
                                "step": [
                                    {
                                        "@type": "HowToStep",
                                        "name": "Upload your large image",
                                        "text": "Click or drag your heavy photo into the upload area. The tool will parse your image securely in your browser.",
                                        "url": "https://smarttoolswala.com/compress-image-to-200kb#upload"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Confirm Target Size",
                                        "text": "The target KB size is automatically set to 200KB. You can securely compress heavy multi-megabyte files down to this threshold.",
                                        "url": "https://smarttoolswala.com/compress-image-to-200kb#target"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Download resulting image",
                                        "text": "The tool will instantly compress your image under 200KB while preserving visual layout. Once ready, click the download button to save your file.",
                                        "url": "https://smarttoolswala.com/compress-image-to-200kb#download"
                                    }
                                ]
                            },
                            {
                                "@context": "https://schema.org",
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
                                        "name": "Photo & Image Tools",
                                        "item": "https://smarttoolswala.com/photo-and-image-compression-tools"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "200KB Image Compressor",
                                        "item": "https://smarttoolswala.com/compress-image-to-200kb"
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
            <CompressImageClient
                targetSizeKB={200}
                subtitleOverride="Compress image to 200KB online free for large high resolution files. Reduce image size to 200KB easily for HD documents, websites, and portal upload requirements."
            >
                <SEOBottomSection
                    keyword="compress image to 200kb"
                    faqs={faqs}
                >
                    <Article200KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

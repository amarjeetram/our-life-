import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleTNPSC from '@/components/articles/ArticleTNPSC';



export const metadata: Metadata = {
    title: 'TNPSC Photo Compressor – Compress Photo & Signature to 20KB/50KB Free',
    description: 'Free TNPSC photo compressor tool. Compress your TNPSC photo to 20-50KB and signature to 10-20KB as per official TNPSC requirements. Fast, secure, and no signup needed.',
    keywords: 'tnpsc photo compressor, tnpsc photo size reducer, tnpsc photo resize, tnpsc signature compressor, compress tnpsc photo to 50kb, tnpsc image size reducer online',
    alternates: {
        canonical: 'https://smarttoolswala.com/tnpsc-photo-compressor',
    },
};

const faqs = [
    { q: "What is the TNPSC photo size requirement?", a: "TNPSC requires your photograph to be between 20KB and 50KB in JPG format. The dimensions should be passport size. Our tool compresses your photo to meet this exact requirement." },
    { q: "What is the TNPSC signature size requirement?", a: "TNPSC requires the signature image to be between 10KB and 20KB in JPG format. Use this tool and set the target to 15KB to be safely within the allowed range." },
    { q: "How do I compress my photo to 50KB for TNPSC?", a: "Simply upload your photo, select 50KB as the target size from the dropdown, and click compress. Our tool will deliver a JPG image under 50KB that is directly uploadable to the TNPSC portal." },
    { q: "Is this TNPSC photo compressor free?", a: "Yes, this tool is completely free. There are no hidden charges, no daily limits, and no need to create an account. You can compress as many photos as you need." },
    { q: "Will my photo dimensions change after compression?", a: "Our tool primarily reduces the file size. If necessary to reach the target KB, dimensions are scaled proportionally while maintaining the correct aspect ratio, ensuring your face is never distorted." },
    { q: "Is it safe to upload my TNPSC photo here?", a: "Absolutely. Your privacy is our top priority. Images are processed instantly and are never stored on our servers. They are deleted from memory immediately after processing." },
    { q: "Can I use this tool on my mobile phone?", a: "Yes, our TNPSC photo compressor is fully mobile-responsive and works perfectly on Android and iPhone browsers. No app download is required." },
    { q: "What image formats are supported?", a: "You can upload JPG, PNG, and WEBP images. The output is always a JPG file, which is the format accepted by the TNPSC official portal." },
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
                                "name": "TNPSC Photo Compressor",
                                "url": "https://smarttoolswala.com/tnpsc-photo-compressor",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Free online tool to compress TNPSC photos to 20-50KB and signatures to 10-20KB as per official TNPSC requirements.",
                                "featureList": [
                                    "Compress TNPSC photo",
                                    "TNPSC signature resize",
                                    "20-50KB photo",
                                    "10-20KB signature"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                },
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.9",
                                    "ratingCount": "19400"
                                }
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to compress your Photo and Signature for TNPSC Exams",
                                "description": "Follow these simple steps to prepare your scanned photograph and signature perfectly for TNPSC online exam portals.",
                                "step": [
                                    {
                                        "@type": "HowToStep",
                                        "name": "Upload your file",
                                        "text": "Select your scanned photo or signature and upload it to the tool's dropzone area securely.",
                                        "url": "https://smarttoolswala.com/tnpsc-photo-compressor#upload"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Select Document Type and Target Size",
                                        "text": "For your TNPSC profile photo, select 50KB as the target. For your TNPSC signature, select 20KB or 15KB as the target.",
                                        "url": "https://smarttoolswala.com/tnpsc-photo-compressor#target"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Download Validated File",
                                        "text": "Click compress. The tool guarantees the final output file strictly satisfies TNPSC's size and format constraints instantly. Download and upload to the TNPSC portal securely.",
                                        "url": "https://smarttoolswala.com/tnpsc-photo-compressor#download"
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
                                        "name": "TNPSC Photo Compressor",
                                        "item": "https://smarttoolswala.com/tnpsc-photo-compressor"
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
                targetSizeKB={50}
                titleOverride="TNPSC Photo Compressor"
                subtitleOverride="Compress your TNPSC photo to 20-50KB and signature to 10-20KB online free. Meets official Tamil Nadu Public Service Commission requirements. No signup, no watermark."
            >
                <SEOBottomSection
                    keyword="tnpsc photo compressor"
                    faqs={faqs}
                >
                    <ArticleTNPSC />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

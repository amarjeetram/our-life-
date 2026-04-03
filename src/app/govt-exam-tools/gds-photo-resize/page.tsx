import { Metadata } from 'next';
import SignatureResizeClient from '@/components/SignatureResizeClient';
import ArticleGdsPhotoResize from '@/components/articles/ArticleGdsPhotoResize';

export const metadata: Metadata = {
    title: 'GDS Photo Resize & Signature Compressor Tool (20KB - 50KB)',
    description: 'Instantly resize your photo and signature for India Post GDS. Crop to gds photo resize to 20kb, 50kb and set correct pixel dimensions easily online for free.',
    keywords: 'gds photo resize, gds photo resize to 20kb, gds photo dimension tool, india post gds photo resizer, gds signature crop, gds photo compress 50kb',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/gds-photo-resize',
    },
    openGraph: {
        title: 'GDS Photo Resizer & Signature Tool',
        description: 'Compress and resize photos (50KB) and signatures (20KB) for India Post GDS applications securely in your browser.',
        url: 'https://smarttoolswala.com/govt-exam-tools/gds-photo-resize',
        type: 'website',
    },
};

export default function GdsPhotoResizePage() {
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
                                "name": "GDS Photo Resize",
                                "url": "https://smarttoolswala.com/govt-exam-tools/gds-photo-resize",
                                "description": "Adjust your photo and signature file sizes to meet 50KB and 20KB India Post GDS strict guidelines.",
                                "applicationCategory": "DesignApplication",
                                "operatingSystem": "All",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
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
                                        "name": "Govt Exam Tools",
                                        "item": "https://smarttoolswala.com/govt-exam-tools"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "GDS Photo Resize",
                                        "item": "https://smarttoolswala.com/govt-exam-tools/gds-photo-resize"
                                    }
                                ]
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "How do I resize my photo to 50KB for India Post GDS?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "It is incredibly simple. Just upload your picture at the top of this page, use our pre-built cropper to select just your face and shoulders, and move the Target Size slider exactly to 50 KB. When you click download, our algorithm ensures the image file is 50 KB or under."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How to do a GDS photo resize to 20KB for my signature?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "You use the exact same tool! Just upload the picture of your dark black ink signature. Crop out the empty lines of the paper, drag the Target Size slider down to 20 KB, and hit download."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Does this tool set the 200 x 230 pixel dimensions automatically?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes! When you crop your photo, the final output image is mathematically compressed. As long as you keep your face centered in a rectangle frame, it inherently aligns with the standard passport pixel aspect ratios."
                                        }
                                    }
                                ]
                            }
                        ]
                    })
                }}
            />

            <SignatureResizeClient>
                <div style={{ marginTop: '40px' }}>
                    <ArticleGdsPhotoResize />
                </div>
            </SignatureResizeClient>
        </>
    );
}

import { Metadata } from 'next';
import SignatureResizeClient from '@/components/SignatureResizeClient';
import ArticleSscSignatureResize from '@/components/articles/ArticleSscSignatureResize';

export const metadata: Metadata = {
    title: 'SSC Signature Resize (10KB to 20KB, 4x2 cm) – Fast & Free',
    description: 'Use our free SSC signature resize tool to instantly compress your signature to exactly 10KB-20KB and adjust the 4cm x 2cm dimensions for SSC CGL, CHSL, GD exams.',
    keywords: 'ssc signature resize, ssc signature crop tool online, ssc signature resize in kb, signature resize 10 to 20 kb, signature resize width and height in cm, ssc photo signature resizer',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/ssc-signature-resize',
    },
    openGraph: {
        title: 'SSC Signature Resizer Tool',
        description: 'Easily crop and compress your signature (10kb-20kb) according to strict SSC dimension guidelines.',
        url: 'https://smarttoolswala.com/govt-exam-tools/ssc-signature-resize',
        type: 'website',
    },
};

export default function SscSignatureResizePage() {
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
                                "name": "SSC Signature Resize Tool",
                                "url": "https://smarttoolswala.com/govt-exam-tools/ssc-signature-resize",
                                "description": "Resize your signature to 10KB-20KB and adjust dimensions precisely for the SSC portal.",
                                "applicationCategory": "Utility",
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
                                        "name": "SSC Signature Resize",
                                        "item": "https://smarttoolswala.com/govt-exam-tools/ssc-signature-resize"
                                    }
                                ]
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "How do I resize my signature for SSC?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Simply upload your photo to our free tool at the top of the page, use the crop feature to cut out empty paper, move the target slider to exactly 20 KB (or exactly what your specific exam requires), and hit download. It perfectly fits the SSC portal rules automatically!"
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How to convert signature layout into 4.0 cm x 2.0 cm?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Our tool has an automatic cropping box that is pre-designed to mimic the perfect rectangular ratio needed by the SSC (which is a 2:1 width-to-height ratio). As long as you crop tight to your handwriting, the final downloaded image will inherently meet the physical dimension requirement when printed on your admit card."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Why is my signature blurring after going from 1MB to 20KB?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Compressing a massive 1MB phone photo down to 20KB means you are deleting 98% of the data. To ensure your ink stays dark, always write with a very thick, dark black marker or pen on bright white paper before snapping the original photo."
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
                    <ArticleSscSignatureResize />
                </div>
            </SignatureResizeClient>
        </>
    );
}

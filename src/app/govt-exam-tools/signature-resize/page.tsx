import { Metadata } from 'next';
import SignatureResizeClient from '@/components/SignatureResizeClient';
import ArticleSignatureResize from '@/components/articles/ArticleSignatureResize';

export const metadata: Metadata = {
    title: 'Free Signature Resize Tool (10-20KB) for SSC, RRB & PAN Card',
    description: 'Easily do signature resize in kb (10 to 20 kb, 20kb) and adjust width and height in cm. Best free tool for SSC, RRB, PAN Card, GDS, and GATE forms.',
    keywords: 'signature resize, signature resize 10 to 20 kb, ssc signature resize, signature resize width and height in cm, rrb signature resize, signature resize 20kb, signature resize in kb, pan card signature resize, gds signature resize, gate signature resize',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/signature-resize',
    },
};

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
                                "name": "Signature Resize Tool",
                                "url": "https://smarttoolswala.com/govt-exam-tools/signature-resize",
                                "description": "Easily do signature resize in kb (10 to 20 kb, 20kb) and adjust width and height in cm. Best free tool for SSC, RRB, PAN Card, GDS, and GATE forms.",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "featureList": [
                                    "Signature resize to exact KB",
                                    "Resize width and height in cm",
                                    "SSC & RRB document compliance"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                }
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
                                        "name": "Image Tools",
                                        "item": "https://smarttoolswala.com/image-tools"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "Signature Resize Tool",
                                        "item": "https://smarttoolswala.com/govt-exam-tools/signature-resize"
                                    }
                                ]
                            }
                        ]
                    })
                }}
            />
            <SignatureResizeClient>
                <div style={{ marginTop: '40px' }}>
                    <ArticleSignatureResize />
                </div>
            </SignatureResizeClient>
        </>
    );
}

import { Metadata } from 'next';
import SignatureResizeClient from '@/components/SignatureResizeClient';
import ArticleSignatureResize from '@/components/articles/ArticleSignatureResize';

export const metadata: Metadata = {
    title: 'Resize Signature to 10KB, 20KB for SSC & RRB – Free Online Tool',
    description: 'Resize your signature to 10KB, 20KB or any size online. Perfect for SSC & RRB exams. Adjust size, width & height instantly. Free, fast, no signup.',
    keywords: 'signature resize, signature resize 10 to 20 kb, ssc signature resize, signature resize width and height in cm, rrb signature resize, signature resize 20kb, signature resize in kb',
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
                                "description": "Resize your signature to 10KB, 20KB or any size online. Perfect for SSC & RRB exams. Adjust size, width & height instantly. Free, fast, no signup.",
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

import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleResize20KB from '@/components/articles/ArticleResize20KB';


export const metadata: Metadata = {
    title: 'Resize Image to 20KB JPG Online - Free Tool to Compress Photo',
    description: 'Easily resize image to 20kb jpg online for free. Compress and resize image to 20kb to 50kb without software installation. Perfect for passport dimensions.',
    keywords: 'resize image to 20kb, resize image to 20kb to 50kb, resize image to 20kb jpg, resize image to 20kb jpg online, resize image to 20kb to 30kb, resize image to 20kb pdf, resize image to 20kb width and height, resize image to 20kb to 100kb',
    alternates: {
        canonical: 'https://smarttoolswala.com/image-tools/resize-image-to-20kb',
    },
};

const faqs = [
    { q: "How can I effortlessly resize image to 20kb jpg online?", a: "To easily resize image to 20kb jpg online, simply upload your high-resolution original image into our smart compressor. Drag the slider or leave it on default to force a strict compression output matching your 20KB target naturally." },
    { q: "Does this tool let me resize image to 20kb to 50kb range?", a: "Yes, exactly! Some exam portals provide versatile boundaries like 20kb to 50kb limitations. You can set your slider manually anywhere within that spectrum to ensure it validates successfully in the portal backend." },
    { q: "Can I use this tool to resize image to 20kb width and height?", a: "While this specific tool dynamically scales file weight (KB mass), most users who need precise constraints crop their profile pictures beforehand using native tools, then dump the image here to hit the specific byte size restrictions effortlessly." },
    { q: "Does the system support resize image to 20kb pdf conversions?", a: "No direct PDF export, but we shrink your image memory so successfully that inserting our resulting fast JPG inside a blank Word or PDF program perfectly achieves your document limits without bloat!" },
    { q: "Can I resize image to 20kb to 100kb simultaneously?", a: "If your target varies widely between 20kb and 100kb across different forms, you can repeatedly use our slider up and down completely free without page reloads to match multiple targets separately." },
    { q: "Is it safe to upload personal ID cards here?", a: "100% yes. Privacy is guaranteed. Resizing executes smoothly inside your web browser using HTML5 features. Your ID proof never actually uploads permanently to any cloud server." }
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
                                "name": "Resize Image to 20KB Online",
                                "url": "https://smarttoolswala.com/image-tools/resize-image-to-20kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Quickly resize image to 20kb to 50kb automatically to pass photo requirements perfectly.",
                                "featureList": [
                                    "resize image to 20kb",
                                    "resize image to 20kb jpg online",
                                    "resize image to 20kb width and height",
                                    "resize image to 20kb to 100kb"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                }
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to easily resize image to 20kb",
                                "description": "Scale down your photo bytes securely using this dedicated online application tailored for SSC and passport specifications.",
                                "step": [
                                    {
                                        "@type": "HowToStep",
                                        "name": "Upload Document",
                                        "text": "Locate and drop your image file into the dashed box zone.",
                                        "url": "https://smarttoolswala.com/image-tools/resize-image-to-20kb#upload"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Adjust Slider Size",
                                        "text": "Configure the compression value to specifically resize image to 20kb to 50kb, or pin it accurately at 20 KB.",
                                        "url": "https://smarttoolswala.com/image-tools/resize-image-to-20kb#target"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Download Target",
                                        "text": "The engine seamlessly renders a lightweight JPG copy. Hit the download button once conversion displays 100% completion.",
                                        "url": "https://smarttoolswala.com/image-tools/resize-image-to-20kb#download"
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
                                        "name": "Image Tools",
                                        "item": "https://smarttoolswala.com/image-tools"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "Resize Image to 20KB",
                                        "item": "https://smarttoolswala.com/image-tools/resize-image-to-20kb"
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
                targetSizeKB={20}
                titleOverride={<>Resize Image to <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>20KB Online</span></>}
                subtitleOverride="Free online browser utility to accurately resize image to 20kb jpg online. Perfectly balance quality compression strictly under compliance ceilings without hassle or watermarks."
            >
                <SEOBottomSection
                    keyword="resize image to 20kb"
                    faqs={faqs}
                >
                    <ArticleResize20KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

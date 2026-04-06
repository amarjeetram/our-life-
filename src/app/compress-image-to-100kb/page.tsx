import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import Article100KB from '@/components/articles/Article100KB';



export const metadata: Metadata = {
    title: 'Compress Image to 100KB Online Free – High Quality Photo Resizer',
    description: 'Resize image to 100kb online for free. Fast image resizer 100kb tool to compress your photos. Resize image to 100kb download ready in seconds.',
    keywords: 'compress image to 100kb online, image resizer 100kb, resize image to 100kb, resize image to 100kb download, resize image to 50kb to 100kb',
    alternates: {
        canonical: 'https://smarttoolswala.com/compress-image-to-100kb',
    },
};

const faqs = [
    { q: "How can I effortlessly compress image to 100kb online without making it blurry?", a: "By using our custom compression sequence. We intricately alter the entropy inside the actual binary data of the photo via NodeJS streams, which accurately targets the 100KB limit effortlessly while keeping documents, text, and faces perfectly sharp." },
    { q: "Does this image resizer 100kb add any watermarks to my photos?", a: "No, absolutely not. Our image resizer 100kb is a 100% free tool that processes your images cleanly without attaching any watermarks or premium logos." },
    { q: "What should I do if the portal asks me to resize image to 50kb to 100kb?", a: "To accurately resize image to 50kb to 100kb, you simply use this very tool! It targets a maximum size under 100KB and practically always lands right in that 50KB to 95KB sweet spot for maximum quality." },
    { q: "Is the resize image to 100kb download available immediately?", a: "Yes. The moment you upload the file, it takes our servers approx 2 seconds to optimize the file. The resize image to 100kb download is then instantly available to save." },
    { q: "Can I use this tool to compress scanned documents and ID cards?", a: "Yes. The algorithm is highly effective at maintaining text legibility, making it the perfect choice to resize image to 100kb when dealing with PAN cards, Aadhar cards, and transcripts." },
    { q: "Is it safe and private to compress image to 100kb online here?", a: "100% Safe. Our server automatically deletes your photos immediately after you compress image to 100kb online. A zero-storage data policy is strictly enforced." },
    { q: "Do I need to install an app on my phone to use this?", a: "No app installation is required. You can operate this image resizer 100kb seamlessly on any mobile browser, saving you time and phone storage space." },
    { q: "Will this change my PNG files to JPG?", a: "If the target portal requires it, our backend will compress and format the image properly so you can successfully resize image to 100kb regardless of the original file type." }
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
                                "name": "100KB Image Compressor",
                                "url": "https://smarttoolswala.com/compress-image-to-100kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Precision image compressor to exactly 100KB for high-quality document portals.",
                                "featureList": [
                                    "Compress image to 100kb",
                                    "resize image to exactly 100kb download",
                                    "fast processing"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                }
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to compress an image to exactly 100KB",
                                "description": "Follow these simple steps to reduce your photo or document size to precisely 100KB for online form submissions.",
                                "step": [
                                    {
                                        "@type": "HowToStep",
                                        "name": "Upload your image",
                                        "text": "Click or drag your photo into the upload area. The tool will parse your image securely in your browser.",
                                        "url": "https://smarttoolswala.com/compress-image-to-100kb#upload"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Confirm Target Size",
                                        "text": "The target KB size is automatically set to 100KB. You can keep it as is or adjust it to any size like 80KB or 90KB.",
                                        "url": "https://smarttoolswala.com/compress-image-to-100kb#target"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Download resulting image",
                                        "text": "The tool will instantly compress your image under 100KB while preserving visual layout. Once ready, click the download button to save it locally.",
                                        "url": "https://smarttoolswala.com/compress-image-to-100kb#download"
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
                                        "name": "100KB Image Compressor",
                                        "item": "https://smarttoolswala.com/compress-image-to-100kb"
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
                targetSizeKB={100}
                subtitleOverride="Compress image to 100KB online while maintaining high clarity and detail. Image resizer 100KB tool helps resize image to 100KB for professional and web uploads."
            >
                <SEOBottomSection
                    keyword="compress image to 100kb online"
                    faqs={faqs}
                >
                    <Article100KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import Article30KB from '@/components/articles/Article30KB';



export const metadata: Metadata = {
    title: 'Compress Image to 30KB Without Losing Quality – Free Online Tool',
    description: 'Compress image to 30kb online quickly and securely. Free online tool to precisely compress your photos and images under 30KB without losing quality.',
    keywords: 'compress image to 30kb, compress photo 30kb, image reducer 30kb',
    alternates: {
        canonical: 'https://smarttoolswala.com/compress-image-to-30kb',
    },
};

const faqs = [
    { q: "How can I effortlessly compress image to 30kb without making it blurry?", a: "By using our custom compression sequence. We do not just blindly lower resolution. We alter entropy inside the actual binary data of the photo via NodeJS streams, which accurately targets the 30KB limit effortlessly while keeping it sharp." },
    { q: "What should I do if my photo size is extremely huge?", a: "Our image reducer 30kb tool can handle photos up to 20 Megabytes in original size. Just upload it, and we will do the heavy lifting to compress photo 30kb instantly." },
    { q: "Is it safe to compress image to 30kb on this specific platform?", a: "Yes. Our server automatically deletes your photos right after you compress image to 30kb. A zero-storage policy is strictly enforced to protect your privacy." },
    { q: "Do I need to download an app to use this image reducer 30kb?", a: "No, you don't need any app. Our website is completely browser-based. You can compress photo 30kb seamlessly on any device directly from Chrome or Safari." },
    { q: "Will this tool change the actual physical dimensions (width and height) of my picture?", a: "It prioritizes file size first. If the image is extremely large, the image reducer 30kb may slightly lower the physical dimensions to guarantee it hits the 30KB threshold, but it will never distort the aspect ratio." },
    { q: "Why do government exam portals force me to compress photo 30kb?", a: "Government servers receive millions of applications. By making candidates compress image to 30kb, they save server space and ensure their website does not crash under heavy load." },
    { q: "Is there any hidden fee or watermark when I want to compress image to 30kb?", a: "No, our service is 100% free forever. It does not add any watermarks or logos to your photos when you compress photo 30kb." },
    { q: "Which file formats does the image reducer 30kb accept?", a: "We accept JPEG, JPG, PNG, and WebP. Regardless of your input, the final output will be a highly optimized file perfectly formatted to pass the 30KB test." }
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
                                "name": "30KB Image Compressor",
                                "url": "https://smarttoolswala.com/compress-image-to-30kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Precision image compressor to exactly 30KB for forms and compliance portals.",
                                "featureList": [
                                    "Compress image to 30kb",
                                    "resize image to exactly 30kb",
                                    "fast processing",
                                    "no watermark"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                }
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to compress an image to exactly 30KB",
                                "description": "Follow these simple steps to reduce your photo or signature size to precisely 30KB for online form submissions.",
                                "step": [
                                    {
                                        "@type": "HowToStep",
                                        "name": "Upload your image",
                                        "text": "Click or drag your photo into the upload area. The tool will parse your image securely in your browser.",
                                        "url": "https://smarttoolswala.com/compress-image-to-30kb#upload"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Confirm Target Size",
                                        "text": "The target KB size is automatically set to 30KB. You can keep it as is or slightly adjust it based on your form rules.",
                                        "url": "https://smarttoolswala.com/compress-image-to-30kb#target"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Download resulting image",
                                        "text": "The tool will instantly compress your image under 30KB while preserving visual layout. Once ready, click the download button to save it locally.",
                                        "url": "https://smarttoolswala.com/compress-image-to-30kb#download"
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
                                        "name": "30KB Image Compressor",
                                        "item": "https://smarttoolswala.com/compress-image-to-30kb"
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
                targetSizeKB={30}
                subtitleOverride="Compress image to 30KB online quickly with precise control. Reduce image size to 30KB for state exams, compliance uploads, and secure official document submissions."
            >
                <SEOBottomSection
                    keyword="compress image to 30kb"
                    faqs={faqs}
                >
                    <Article30KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

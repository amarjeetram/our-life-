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

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "200KB Image Compressor",
                        "url": "https://smarttoolswala.com/compress-image-to-200kb",
                        "description": "Precision image compressor to exactly 200KB.",
                        "applicationCategory": "Utility",
                        "operatingSystem": "All",
                        "browserRequirements": "Requires JavaScript",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }}
            />
            <CompressImageClient
                targetSizeKB={200}
                subtitleOverride="Compress image to 200KB online free for large high resolution files. Reduce image size to 200KB easily for HD documents, websites, and portal upload requirements."
            >
                <SEOBottomSection
                    keyword="compress image to 200kb"
                    faqs={[
                        { q: "How does the tool compress image to 200kb without making text blurry?", a: "By intelligently allocating data. Unlike generic tools, our 200kb photo converter protects edge luma (contrast), ensuring that scanned text, intricate details, and faces remain remarkably sharp while the file size drops." },
                        { q: "Is this 200kb photo converter really free?", a: "Yes, our algorithm is completely free to use. You can reduce image size to 200kb for as many documents or photos as you need without any hidden subscription fees." },
                        { q: "What should I do if my original file is a massive 15MB panorama?", a: "No problem. Our backend easily handles large, high-resolution original files. Just drag and drop, and the server will methodically compress image to 200kb for you automatically." },
                        { q: "Can I reduce image size to 200kb on my iPhone or Android?", a: "Yes, entirely! Our system operates securely in the browser. You don't need to install any heavy, ad-filled applications to use our 200kb photo converter on mobile devices." },
                        { q: "Will you store my sensitive documents?", a: "Never. As soon as you finish using the tool to compress image to 200kb, both the original document and the final output are permanently and immediately wiped from our secure servers." },
                        { q: "Can I compress PNG documents?", a: "Yes. When you reduce image size to 200kb, if you upload a thick PNG file, the system optimally reformats it to an acceptable JPG standard to guarantee a small footprint." },
                        { q: "Why do some websites insist I reduce image size to 200kb?", a: "Administrators mandate a 200KB limit to optimize server storage costs and guarantee their website loads incredibly fast for end-users operating on slow mobile networks." },
                        { q: "Will the physical dimensions (width and height) change drastically?", a: "Our 200kb photo converter aims to preserve dimensions where possible. Sometimes, to guarantee the file hits the strict 200KB threshold, it will perform a proportional intelligent scale-down without distorting the picture." }
                    ]}
                >
                    <Article200KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

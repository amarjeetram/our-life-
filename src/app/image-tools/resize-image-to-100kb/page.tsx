import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleResize100KB from '@/components/articles/ArticleResize100KB';

export const metadata: Metadata = {
    title: 'Resize Image to 100KB Online Free – JPG & JPEG',
    description: 'Resize image to 100KB online free. Compress photo to 100KB for SSC, UPSC, jobs & university portals. Download JPG instantly, no watermark.',
    keywords: 'resize image to 100kb, resize image to 100kb online, resize image to 100kb download, resize image to 100kb jpg, resize image to 100kb jpeg, resize image to 100kb pdf, 100kb photo size, photo resizer 100kb, increase image size to 100kb',
    alternates: {
        canonical: 'https://smarttoolswala.com/image-tools/resize-image-to-100kb',
    },
};

const faqs = [
    {
        q: "How do I resize image to 100KB online for free?",
        a: "Upload your photo to our free tool, set the target size to 100KB using the input field, and click Download. The entire process takes less than 3 seconds with no signup, no watermark, and no cost."
    },
    {
        q: "Can I resize image to 100KB download it on mobile?",
        a: "Yes, our tool works perfectly on Android and iPhone browsers like Chrome and Safari. Upload from your camera roll, compress to 100KB, and download the file directly to your device in seconds."
    },
    {
        q: "What is the best 100KB photo size for government forms?",
        a: "For most Indian government exam portals like SSC, UPSC, and RRB, a 100KB photo size in JPEG format with dimensions around 200x230 pixels (passport size) is the accepted standard. Our tool targets this profile automatically."
    },
    {
        q: "How does the photo resizer 100KB handle quality?",
        a: "Our photo resizer 100KB tool uses intelligent content-aware compression. It prioritizes facial features in portraits and text sharpness in document scans, ensuring the compressed image looks professional and passes visual verification."
    },
    {
        q: "Can I increase image size to 100KB if my photo is too small?",
        a: "Yes. If your current image is below 100KB and the portal requires a minimum size, upload your photo and set the target to 100KB. Our tool will optimize the file size upward while maintaining image quality."
    },
    {
        q: "How do I resize image to 100KB jpeg from a PNG file?",
        a: "Simply upload your PNG file to our tool. The system automatically converts it to the JPEG format during compression. You will download a clean, optimized resize image to 100KB jpeg file ready for portal submission."
    },
    {
        q: "What if I need to resize image to 100KB pdf submission?",
        a: "First use our tool to compress your photo to 100KB and download the JPG. Then insert that compressed JPG into Word or Google Docs and export it as PDF. Since the image is already 100KB, the resulting PDF stays light and compliant."
    },
    {
        q: "Is there any limit on how many photos I can compress?",
        a: "You can upload and compress up to 10 images simultaneously in a single session. There is no daily limit. Return and compress as many batches as you need — always free."
    },
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
                                "@type": "WebApplication",
                                "name": "Resize Image to 100KB Online",
                                "url": "https://smarttoolswala.com/image-tools/resize-image-to-100kb",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Free online tool to resize image to 100KB. Compress JPG, JPEG, PNG photos to exactly 100KB for SSC, UPSC, and other government portals. No watermark, no signup.",
                                "featureList": [
                                    "Resize image to 100KB online free",
                                    "Resize image to 100KB jpg and jpeg",
                                    "Increase image size to 100KB",
                                    "Photo resizer 100KB with preview",
                                    "Batch image compression"
                                ],
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to Resize Image to 100KB Online",
                                "description": "Step-by-step guide to resize and compress any image to exactly 100KB for government and university portal submissions.",
                                "step": [
                                    {
                                        "@type": "HowToStep",
                                        "name": "Upload Your Image",
                                        "text": "Click or drag your photo into the upload area. Supports JPG, JPEG, PNG, WEBP up to 20MB.",
                                        "url": "https://smarttoolswala.com/image-tools/resize-image-to-100kb#upload"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Set Target to 100KB",
                                        "text": "Type 100 in the KB field or use the slider to set the compression target to exactly 100KB.",
                                        "url": "https://smarttoolswala.com/image-tools/resize-image-to-100kb#compress"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Download the Compressed Image",
                                        "text": "Preview the result and click Download to save the resize image to 100KB download file to your device instantly.",
                                        "url": "https://smarttoolswala.com/image-tools/resize-image-to-100kb#download"
                                    }
                                ]
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Image Tools", "item": "https://smarttoolswala.com/image-tools" },
                                    { "@type": "ListItem", "position": 3, "name": "Resize Image to 100KB", "item": "https://smarttoolswala.com/image-tools/resize-image-to-100kb" }
                                ]
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(f => ({
                                    "@type": "Question",
                                    "name": f.q,
                                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                                }))
                            }
                        ]
                    })
                }}
            />
            <CompressImageClient
                targetSizeKB={100}
                titleOverride={<>Resize Image to <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>100KB Online</span></>}
                subtitleOverride="Free browser-based tool to resize image to 100KB instantly. Download compressed JPG or JPEG — no watermark, no signup, 100% free."
            >
                <SEOBottomSection keyword="resize image to 100kb" faqs={faqs}>
                    <ArticleResize100KB />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

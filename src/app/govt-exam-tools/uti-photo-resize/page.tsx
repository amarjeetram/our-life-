import { Metadata } from 'next';
import UtiPhotoResizerClient from '@/components/UtiPhotoResizerClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleUtiPhotoResize from '@/components/articles/ArticleUtiPhotoResize';

export const metadata: Metadata = {
    title: 'UTI Photo Resizer (Free) – Crop, Resize & Convert PAN Image to Exact KB & Size',
    description: 'Resize UTI PAN photo instantly with crop, compress & convert options. Get exact KB and dimensions as per UTI guidelines. 100% free tool, no signup required.',
    keywords: 'uti photo resize, uti photo resize online, uti pan photo resize, uti photo resize tool, uti pan resize, uti crop tool, pan uti photo resize, uti photo resize online free, how to resize photo for uti pan, uti photo size in kb and pixels',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/uti-photo-resize',
    },
};

const faqs = [
    {
        q: "How to resize photo for UTI PAN online?",
        a: "Upload your photo to our UTI Photo Resizer. The tool will automatically crop, resize to 213x213 pixels, and compress the file to under 30KB as per UTIITSL guidelines."
    },
    {
        q: "What is the exact UTI PAN photo size in pixels?",
        a: "The exact size for UTI PAN photos is 213 x 213 pixels with a resolution of 300 DPI. Our tool sets these dimensions perfectly with one click."
    },
    {
        q: "What is the file size limit for UTI photo upload?",
        a: "The photograph must be less than 30 KB in size and saved in JPEG or JPG format. We target 25KB to ensure your photo is never rejected."
    },
    {
        q: "Can I use this tool to crop a photo for UTI PAN?",
        a: "Yes, our tool includes a smart 'uti crop tool' that automatically centers your face and crops the image into the required 213x213 square format."
    },
    {
        q: "Is any registration needed to use the UTI photo resizer?",
        a: "No, our tool is free, private, and works directly in your browser without any signup or account creation."
    }
];

export default function Page() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebApplication",
                                "name": "UTI PAN Photo & Crop Resizer",
                                "url": "https://smarttoolswala.com/govt-exam-tools/uti-photo-resize",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online tool to crop and resize photo for UTI PAN applications. Automatic 213x213 pixels and 30KB compression.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                                
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to Resize Photo for UTI PAN Online",
                                "step": [
                                    { "@type": "HowToStep", "text": "Upload your photograph." },
                                    { "@type": "HowToStep", "text": "The tool automatically crops it to 213x213 pixels." },
                                    { "@type": "HowToStep", "text": "The engine compresses the image to stay below 30KB." },
                                    { "@type": "HowToStep", "text": "Download the optimized JPEG file." }
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

            <h1 className="text-4xl md:text-6xl font-black text-center text-slate-900 mb-12 tracking-tight leading-tight px-4">
                UTI PAN Photo <span className="text-orange-600 underline decoration-orange-200">Resizer Online</span>
            </h1>

            <UtiPhotoResizerClient>
                <SEOBottomSection keyword="uti photo resize" faqs={faqs}>
                    <ArticleUtiPhotoResize />
                </SEOBottomSection>
            </UtiPhotoResizerClient>
        </main>
    );
}

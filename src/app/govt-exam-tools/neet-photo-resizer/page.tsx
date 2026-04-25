import { Metadata } from 'next';
import NeetPhotoResizerClient from '@/components/NeetPhotoResizerClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleNeetPhotoResize from '@/components/articles/ArticleNeetPhotoResize';

export const metadata: Metadata = {
    title: 'NEET Photo Resizer 2026 (Free) – Passport & Postcard Size in Exact KB & Dimensions',
    description: 'Resize your NEET 2026 photo instantly to exact passport & postcard size. Adjust image in KB, pixels & dimensions as per official guidelines. 100% free online NEET photo resizer tool.',
    keywords: 'neet photo resizer online, neet photo size 2026, neet photo requirements, neet photo editor, resize photo for neet, postcard size photo for neet, passport size photo for neet, neet postcard size photo, postcard size photo dimensions, neet photo instructions 2026',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/neet-photo-resizer',
    },
};

const faqs = [
    {
        q: "How to resize photo for NEET 2026 online?",
        a: "Upload your photo to our NEET Photo Resizer, select 'Passport' or 'Postcard' size, and the tool will automatically adjust the dimensions to 3.5x4.5cm or 4x6 inches and compress it to under 200KB as per NTA guidelines."
    },
    {
        q: "What is the postcard size for NEET photo in pixels?",
        a: "The standard postcard size for NEET (4x6 inches) is approximately 1200 x 1800 pixels at 300 DPI. Our tool sets these dimensions automatically for you."
    },
    {
        q: "What is the file size limit for NEET photo upload?",
        a: "The photo (both passport and postcard) must be between 10 KB to 200 KB in JPG or JPEG format. We recommend targeting 50-100 KB for the best balance of quality and size."
    },
    {
        q: "Can I use any background for my NEET photo?",
        a: "No, NTA guidelines strictly require a white background for the NEET application photo. The face must cover about 80% of the area, and ears should be clearly visible."
    },
    {
        q: "Is this NEET photo resizer tool free?",
        a: "Yes, our NEET Photo Resizer tool is 100% free, requires no signup, and processes all images locally on your device for maximum privacy."
    }
];

export default function Page() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebApplication",
                                "name": "NEET Photo & Postcard Resizer",
                                "url": "https://smarttoolswala.com/govt-exam-tools/neet-photo-resizer",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online tool to resize passport and postcard size photos for NEET 2026. Automated NTA standard dimensions and 10KB-200KB compression.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                                
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to Resize Photo for NEET Application",
                                "step": [
                                    { "@type": "HowToStep", "text": "Upload your scanned photograph." },
                                    { "@type": "HowToStep", "text": "Select the required size: Passport or Postcard." },
                                    { "@type": "HowToStep", "text": "Our tool will automatically resize to exact NTA dimensions." },
                                    { "@type": "HowToStep", "text": "Download the optimized JPEG image for direct upload." }
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

            <h1 className="text-3xl md:text-5xl font-black text-center text-slate-900 mb-12 tracking-tight leading-tight">
                NEET Photo Resizer Online <span className="text-red-600">Free 2026</span>
            </h1>

            <NeetPhotoResizerClient>
                <SEOBottomSection keyword="neet photo resizer" faqs={faqs}>
                    <ArticleNeetPhotoResize />
                </SEOBottomSection>
            </NeetPhotoResizerClient>
        </main>
    );
}

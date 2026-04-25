import { Metadata } from 'next';
import PanCardResizerClient from '@/components/PanCardResizerClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticlePanCardResize from '@/components/articles/ArticlePanCardResize';

export const metadata: Metadata = {
    title: 'PAN Card Photo & Signature Resizer Online Free (10KB-20KB) 2026',
    description: 'Resize photo and signature for PAN card online free. UTI & NSDL compliant resizer. Compress image to 10kb-20kb with exact pixel dimensions (213x213).',
    keywords: 'pan card photo resize, pan card resizer, pan signature resize, uti pan photo size, nsdl pan photo resize, pan card photo size in kb, pan card photo resize online, pan card signature resize online, pan card photo resizer online free, pan card upload photo size requirements',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/pan-card-photo-resize',
    },
};

const faqs = [
    {
        q: "How to resize photo for PAN card online to 10KB-20KB?",
        a: "Upload your photo to our PAN Card Resizer tool, select the 'UTI' or 'NSDL' preset, and click Resize. The tool will automatically adjust the dimensions to 213x213 pixels (for UTI) and compress the file to exactly 10KB-20KB."
    },
    {
        q: "What is the exact UTI PAN photo and signature size?",
        a: "For UTI PAN card applications, the photo must be 213 x 213 pixels (300 DPI) and under 30KB. The signature must be 1023 x 680 pixels (600 DPI) and under 60KB. Our tool handles these dimensions automatically."
    },
    {
        q: "How can I resize my signature for NSDL PAN card?",
        a: "Choose 'NSDL' portal and 'Signature Resize' mode in our tool. Upload your signature scan, and we will resize it to 2cm x 4.5cm (NSDL standard) and keep the file size under 50KB for easy upload."
    },
    {
        q: "Is it safe to upload my photo and signature to this tool?",
        a: "Yes, our tool processes all images locally in your browser. Your sensitive photos and signatures are never uploaded to our servers, ensuring 100% privacy and security for your government documents."
    },
    {
        q: "How do I convert my image to exact KB size for PAN card?",
        a: "Our advanced compression algorithm uses binary search to find the highest possible quality that fits within your target KB limit. Just set the target KB, and the tool does the math for you."
    }
];

export default function Page() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebApplication",
                                "name": "PAN Card Photo & Signature Resizer",
                                "url": "https://smarttoolswala.com/govt-exam-tools/pan-card-photo-resize",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online tool to resize photo and signature for PAN card (UTI/NSDL). Target 10KB-20KB size with exact dimensions. Professional image compression for government portals.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to Resize Photo for PAN Card Online",
                                "step": [
                                    { "@type": "HowToStep", "text": "Upload your photo or signature scan." },
                                    { "@type": "HowToStep", "text": "Select either UTI or NSDL portal preset." },
                                    { "@type": "HowToStep", "text": "Click 'Resize Now' to get exact dimensions and KB size." },
                                    { "@type": "HowToStep", "text": "Download the PAN-ready JPEG file." }
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

            <PanCardResizerClient>
                <SEOBottomSection keyword="pan card photo resize" faqs={faqs}>
                    <ArticlePanCardResize />
                </SEOBottomSection>
            </PanCardResizerClient>
        </main>
    );
}

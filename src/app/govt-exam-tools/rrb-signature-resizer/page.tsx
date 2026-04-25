import { Metadata } from 'next';
import RrbSignatureResizerClient from '@/components/RrbSignatureResizerClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleRrbSignatureResize from '@/components/articles/ArticleRrbSignatureResize';

export const metadata: Metadata = {
    title: 'RRB Signature Resizer (Free) – 140×60 Pixels, Exact KB Size Online Tool',
    description: 'Resize your RRB signature to exact 140×60 pixels and required KB size instantly. Free online RRB signature resizer, compressor & converter – no signup needed.',
    keywords: 'rrb signature size, rrb signature resize, rrb signature resizer, rrb signature size in kb, ibps rrb signature size, 140x60 pixels signature, rrb signature size converter, rrb signature compressor, resize signature for rrb form, how to resize signature for rrb',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/rrb-signature-resizer',
    },
};

const faqs = [
    {
        q: "How to resize signature for RRB to 140x60 pixels?",
        a: "Upload your signature scan to our RRB Signature Resizer. The tool will automatically crop and resize it to the exact 140x60 pixel dimensions and compress it to between 10KB and 20KB as required by the Railway Recruitment Board."
    },
    {
        q: "What is the official RRB signature size in KB?",
        a: "The official signature size for RRB and IBPS RRB exams is between 10 KB to 20 KB. Our tool targets a 15 KB size to ensure it is always accepted by the portal."
    },
    {
        q: "Can I upload a signature in blue ink for RRB?",
        a: "No, RRB guidelines strictly require the signature to be in black ink on a white background. After signing, you can use our tool to resize it to the exact 140x60 pixels."
    },
    {
        q: "What format should the RRB signature be?",
        a: "The RRB signature must be in JPG or JPEG format. Our resizer automatically converts other formats (like PNG or PNG) into an optimized, portal-ready JPEG file."
    },
    {
        q: "Does this tool work for IBPS RRB as well?",
        a: "Yes, the 140x60 pixel and 10-20KB requirements are the same for IBPS RRB PO and Clerk exams. You can use this tool for all banking and railway exams."
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
                                "name": "RRB Signature Resizer",
                                "url": "https://smarttoolswala.com/govt-exam-tools/rrb-signature-resizer",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online tool to resize signature for RRB & IBPS RRB exams. Automatic 140x60 pixels and 10KB-20KB compression.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                                
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to Resize Signature for RRB Form",
                                "step": [
                                    { "@type": "HowToStep", "text": "Upload your signature scan (Black ink on White background)." },
                                    { "@type": "HowToStep", "text": "The tool automatically sets the size to 140x60 pixels." },
                                    { "@type": "HowToStep", "text": "Compress the file to stay within the 10KB-20KB range." },
                                    { "@type": "HowToStep", "text": "Download the optimized JPEG signature." }
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
                RRB Signature Resizer <span className="text-blue-600">Free Online</span>
            </h1>

            <RrbSignatureResizerClient>
                <SEOBottomSection keyword="rrb signature resizer" faqs={faqs}>
                    <ArticleRrbSignatureResize />
                </SEOBottomSection>
            </RrbSignatureResizerClient>
        </main>
    );
}

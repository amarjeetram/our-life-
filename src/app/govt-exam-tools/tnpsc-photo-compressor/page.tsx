import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleTNPSC from '@/components/articles/ArticleTNPSC';
import { GraduationCap, Award, Building2, ShieldCheck, Check, Lock, ImageIcon, Type } from 'lucide-react';



export const metadata: Metadata = {
    title: 'TNPSC Photo Compressor Online – Resize & Compress Photo Fast',
    description: 'Compress and resize TNPSC photos & signatures online instantly. Free, fast, exact size output for TNPSC applications – no signup, 100% safe!',
    keywords: 'tnpsc photo compressor, tnpsc photo size reducer, tnpsc photo resize, tnpsc signature compressor, compress tnpsc photo to 50kb, tnpsc image size reducer online',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/tnpsc-photo-compressor',
    },
};

const faqs = [
    { q: "What is the TNPSC photo size requirement?", a: "TNPSC requires your photograph to be between 20KB and 50KB in JPG format. The dimensions should be passport size. Our tool compresses your photo to meet this exact requirement." },
    { q: "What is the TNPSC signature size requirement?", a: "TNPSC requires the signature image to be between 10KB and 20KB in JPG format. Use this tool and set the target to 15KB to be safely within the allowed range." },
    { q: "How do I compress my photo to 50KB for TNPSC?", a: "Simply upload your photo, select 50KB as the target size from the dropdown, and click compress. Our tool will deliver a JPG image under 50KB that is directly uploadable to the TNPSC portal." },
    { q: "Is this TNPSC photo compressor free?", a: "Yes, this tool is completely free. There are no hidden charges, no daily limits, and no need to create an account. You can compress as many photos as you need." },
    { q: "Will my photo dimensions change after compression?", a: "Our tool primarily reduces the file size. If necessary to reach the target KB, dimensions are scaled proportionally while maintaining the correct aspect ratio, ensuring your face is never distorted." },
    { q: "Is it safe to upload my TNPSC photo here?", a: "Absolutely. Your privacy is our top priority. Images are processed instantly and are never stored on our servers. They are deleted from memory immediately after processing." },
    { q: "Can I use this tool on my mobile phone?", a: "Yes, our TNPSC photo compressor is fully mobile-responsive and works perfectly on Android and iPhone browsers. No app download is required." },
    { q: "What image formats are supported?", a: "You can upload JPG, PNG, and WEBP images. The output is always a JPG file, which is the format accepted by the TNPSC official portal." },
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
                                "name": "TNPSC Photo Compressor",
                                "url": "https://smarttoolswala.com/govt-exam-tools/tnpsc-photo-compressor",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Free online tool to compress TNPSC photos to 20-50KB and signatures to 10-20KB as per official TNPSC requirements.",
                                "featureList": [
                                    "Compress TNPSC photo",
                                    "TNPSC signature resize",
                                    "20-50KB photo",
                                    "10-20KB signature"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                }
                            },
                            {
                                "@type": "HowTo",
                                "name": "How to compress your Photo and Signature for TNPSC Exams",
                                "description": "Follow these simple steps to prepare your scanned photograph and signature perfectly for TNPSC online exam portals.",
                                "step": [
                                    {
                                        "@type": "HowToStep",
                                        "name": "Upload your file",
                                        "text": "Select your scanned photo or signature and upload it to the tool's dropzone area securely.",
                                        "url": "https://smarttoolswala.com/govt-exam-tools/tnpsc-photo-compressor#upload"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Select Document Type and Target Size",
                                        "text": "For your TNPSC profile photo, select 50KB as the target. For your TNPSC signature, select 20KB or 15KB as the target.",
                                        "url": "https://smarttoolswala.com/govt-exam-tools/tnpsc-photo-compressor#target"
                                    },
                                    {
                                        "@type": "HowToStep",
                                        "name": "Download Validated File",
                                        "text": "Click compress. The tool guarantees the final output file strictly satisfies TNPSC's size and format constraints instantly. Download and upload to the TNPSC portal securely.",
                                        "url": "https://smarttoolswala.com/govt-exam-tools/tnpsc-photo-compressor#download"
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
                                        "name": "TNPSC Photo Compressor",
                                        "item": "https://smarttoolswala.com/govt-exam-tools/tnpsc-photo-compressor"
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
                targetSizeKB={50}
                titleOverride="TNPSC Photo & Signature Compressor Online"
                hideTopBadge={true}
                subtitleOverride={
                    <span className="flex flex-col items-center">
                        <span className="text-[17px] text-[#64748b] max-w-[600px] text-center leading-relaxed">
                            Compress and resize TNPSC photos & signatures online instantly. Free, fast, exact size output for TNPSC applications.
                        </span>
                        <span className="mt-5 flex flex-wrap justify-center gap-3 text-[12px] font-bold tracking-wide">
                            <span className="flex items-center gap-1.5 bg-[#f0fdf4] text-[#16a34a] px-3.5 py-0.5 rounded-full border border-[#bbf7d0]">
                                <Check size={13} strokeWidth={3} /> Trusted by 6.25 Lakh+ Aspirants
                            </span>
                            <span className="flex items-center gap-1.5 bg-[#f0fdf4] text-[#16a34a] px-3.5 py-0.5 rounded-full border border-[#bbf7d0]">
                                <Lock size={12} strokeWidth={2.5} /> Privacy Certified
                            </span>
                        </span>
                    </span>
                }
                belowUseCasesContent={
                    <div className="flex flex-row items-center justify-center gap-1 sm:gap-2 bg-white p-1 sm:p-1.5 rounded-2xl border border-slate-200 shadow-sm mx-auto max-w-fit pointer-events-auto relative z-10">
                        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-[13px] sm:text-[14px] shadow-sm cursor-default whitespace-nowrap">
                            <ImageIcon size={16} /> TNPSC Compress
                        </div>
                        <a href="/govt-exam-tools/add-name-date" className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-bold text-[13px] sm:text-[14px] transition-colors whitespace-nowrap" style={{ textDecoration: 'none' }}>
                            <Type size={16} /> Add Name & Date
                        </a>
                    </div>
                }
                useCasesOverride={[
                    { icon: <GraduationCap size={18} />, label: 'TNPSC Group I-IV', color: '#7c3aed' },
                    { icon: <Award size={18} />, label: 'TNPSC VAO', color: '#0ea5e9' },
                    { icon: <Building2 size={18} />, label: 'TNPSC Assistant', color: '#059669' },
                    { icon: <ShieldCheck size={18} />, label: 'Technical Posts', color: '#d97706' }
                ]}
            >
                <SEOBottomSection
                    keyword="tnpsc photo compressor"
                    faqs={faqs}
                >
                    <ArticleTNPSC />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

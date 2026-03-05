import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleTNPSC from '@/components/articles/ArticleTNPSC';

export const metadata: Metadata = {
    title: 'TNPSC Photo Compressor – Compress Photo & Signature to 20KB/50KB Free',
    description: 'Free TNPSC photo compressor tool. Compress your TNPSC photo to 20-50KB and signature to 10-20KB as per official TNPSC requirements. Fast, secure, and no signup needed.',
    keywords: 'tnpsc photo compressor, tnpsc photo size reducer, tnpsc photo resize, tnpsc signature compressor, compress tnpsc photo to 50kb, tnpsc image size reducer online',
    alternates: {
        canonical: 'https://smarttoolswala.com/tnpsc-photo-compressor',
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
                        "name": "TNPSC Photo Compressor",
                        "url": "https://smarttoolswala.com/tnpsc-photo-compressor",
                        "description": "Free online tool to compress TNPSC photos to 20-50KB and signatures to 10-20KB as per official TNPSC requirements.",
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
                targetSizeKB={50}
                titleOverride="TNPSC Photo Compressor"
                subtitleOverride="Compress your TNPSC photo to 20-50KB and signature to 10-20KB online free. Meets official Tamil Nadu Public Service Commission requirements. No signup, no watermark."
            >
                <SEOBottomSection
                    keyword="tnpsc photo compressor"
                    faqs={[
                        { q: "What is the TNPSC photo size requirement?", a: "TNPSC requires your photograph to be between 20KB and 50KB in JPG format. The dimensions should be passport size. Our tool compresses your photo to meet this exact requirement." },
                        { q: "What is the TNPSC signature size requirement?", a: "TNPSC requires the signature image to be between 10KB and 20KB in JPG format. Use this tool and set the target to 15KB to be safely within the allowed range." },
                        { q: "How do I compress my photo to 50KB for TNPSC?", a: "Simply upload your photo, select 50KB as the target size from the dropdown, and click compress. Our tool will deliver a JPG image under 50KB that is directly uploadable to the TNPSC portal." },
                        { q: "Is this TNPSC photo compressor free?", a: "Yes, this tool is completely free. There are no hidden charges, no daily limits, and no need to create an account. You can compress as many photos as you need." },
                        { q: "Will my photo dimensions change after compression?", a: "Our tool primarily reduces the file size. If necessary to reach the target KB, dimensions are scaled proportionally while maintaining the correct aspect ratio, ensuring your face is never distorted." },
                        { q: "Is it safe to upload my TNPSC photo here?", a: "Absolutely. Your privacy is our top priority. Images are processed instantly and are never stored on our servers. They are deleted from memory immediately after processing." },
                        { q: "Can I use this tool on my mobile phone?", a: "Yes, our TNPSC photo compressor is fully mobile-responsive and works perfectly on Android and iPhone browsers. No app download is required." },
                        { q: "What image formats are supported?", a: "You can upload JPG, PNG, and WEBP images. The output is always a JPG file, which is the format accepted by the TNPSC official portal." },
                    ]}
                >
                    <ArticleTNPSC />
                </SEOBottomSection>
            </CompressImageClient>
        </>
    );
}

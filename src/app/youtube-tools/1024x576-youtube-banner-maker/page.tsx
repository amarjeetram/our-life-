import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import YoutubeBannerClient from '@/components/YoutubeBannerClient';
import ArticleYoutubeBanner from '@/components/articles/ArticleYoutubeBanner';
import SEOBottomSection from '@/components/SEOBottomSection';
import RelatedYoutubeTools from '@/components/RelatedYoutubeTools';
import AdBanner from '@/components/AdBanner';

const SITE = 'https://smarttoolswala.com';
const PAGE_URL = `${SITE}/youtube-tools/1024x576-youtube-banner-maker`;

export const metadata: Metadata = {
    title: '1024x576 YouTube Banner Maker Free – Create & Download HD Banners',
    description: 'Create a 1024x576 YouTube banner online free. Choose gaming, subscribe, comedy and custom templates, edit text, preview instantly, and download in HD',
    keywords: '1024x576 youtube banner, youtube banner maker, youtube channel art, youtube banner size, 1024 576 youtube banner maker free, youtube banner creator online, channel art maker',
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: '1024×576 YouTube Banner Maker – Free Online Tool',
        description: 'Resize any photo to the perfect 1024×576 YouTube banner size instantly. Free, no watermark, no signup.',
        url: PAGE_URL,
        siteName: 'SmartToolsWala',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '1024×576 YouTube Banner Maker – Free',
        description: 'Create YouTube channel art at exact 1024×576 px. Free online tool, instant PNG download.',
    },
};

const faqs = [
    {
        q: "What is the correct YouTube banner size in pixels?",
        a: "The recommended YouTube channel art size is 2560×1440 pixels. However, the safe area that shows on all devices — desktops, TVs, and mobiles — is 1546×423 px. For a universally compatible banner that looks great on all screens, 1024×576 px is the most widely used standard."
    },
    {
        q: "Can I use any image as my YouTube banner?",
        a: "Yes! Our tool accepts JPG, PNG, and WEBP images of any size. It automatically resizes and crops your image to the ideal 1024×576 px YouTube banner dimensions."
    },
    {
        q: "Will my banner have a watermark?",
        a: "Absolutely not. SmartToolsWala is 100% free and never adds any watermark, logo, or branding to your YouTube banner output."
    },
    {
        q: "What file format does the tool download?",
        a: "The tool downloads your banner as a high-quality PNG file, which is the best format for YouTube channel art as it supports transparency and lossless quality."
    },
    {
        q: "Is my image uploaded to any server?",
        a: "No. All processing happens locally inside your browser using the HTML5 Canvas API. Your image never leaves your device, ensuring complete privacy."
    },
    {
        q: "What does 'Fill (Crop)' vs 'Fit (Letterbox)' mean?",
        a: "Fill mode stretches the image to fill the entire 1024×576 canvas, cropping any overflow — perfect for background photos. Fit mode shows your entire image with colored bars on the sides or top — useful for logos or portraits you don't want cropped."
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "1024x576 YouTube Banner Maker",
            "url": PAGE_URL,
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript",
            "description": "Free online tool to create and resize images to 1024×576 YouTube banner size instantly.",
            "featureList": [
                "Resize image to 1024x576",
                "YouTube banner maker free",
                "Canvas-based local processing",
                "No watermark",
                "Instant PNG download"
            ],
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
            "@type": "HowTo",
            "name": "How to make a 1024×576 YouTube banner online",
            "description": "Follow these 3 simple steps to create a perfect YouTube channel art banner.",
            "step": [
                { "@type": "HowToStep", "name": "Upload your image", "text": "Click the upload area or drag-and-drop any JPG, PNG, or WEBP image.", "url": `${PAGE_URL}#upload` },
                { "@type": "HowToStep", "name": "Choose fit mode and background", "text": "Select Fill, Fit, or Stretch mode and pick a background color for letterbox areas.", "url": `${PAGE_URL}#settings` },
                { "@type": "HowToStep", "name": "Generate and download", "text": "Click Generate Banner and download the 1024×576 PNG file instantly.", "url": `${PAGE_URL}#download` }
            ]
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE },
                { "@type": "ListItem", "position": 2, "name": "YouTube Tools", "item": `${SITE}/youtube-tools` },
                { "@type": "ListItem", "position": 3, "name": "1024×576 YouTube Banner Maker", "item": PAGE_URL }
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
};

export default function YoutubeBannerMakerPage() {
    return (
        <div className="page-bg min-h-screen pb-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-6">
                <Link href="/youtube-tools" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors font-medium mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to YouTube Tools
                </Link>

                <h1 className="sr-only">1024×576 YouTube Banner Maker – Free Online Channel Art Creator</h1>

                <YoutubeBannerClient />

                <AdBanner dataAdSlot="slot_yt_banner_2" className="mt-8" />

                <div className="mt-10">
                    <SEOBottomSection keyword="1024x576 youtube banner maker" faqs={faqs}>
                        <ArticleYoutubeBanner />
                    </SEOBottomSection>
                </div>
                
                <RelatedYoutubeTools currentRoute={PAGE_URL.replace(SITE, '')} />
            </div>
        </div>
    );
}

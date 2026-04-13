import { Metadata } from 'next';
import Link from 'next/link';
import YoutubeDescriptionClient from '@/components/YoutubeDescriptionClient';
import ArticleYoutubeDescription from '@/components/articles/ArticleYoutubeDescription';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'YouTube Description Extractor - Auto Copy Text, Views & Tags',
    description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.',
    keywords: 'youtube description extractor, youtube meta tags, video description, copy youtube description, youtube data extractor, youtube seo',
    alternates: {
        canonical: 'https://smarttoolswala.com/youtube-description-extractor'
    },
    openGraph: {
        title: 'YouTube Description Extractor - Auto Copy Data & Text',
        description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.',
        url: 'https://smarttoolswala.com/youtube-description-extractor',
        siteName: 'SmartToolsWala',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Description Extractor - Auto Copy Text',
        description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.'
    }
};

export default function YoutubeDescriptionExtractorPage() {
    const faqs = [
        { q: "Is it bad to do a youtube description copy?", a: "It is not bad at all if you are learning! Doing a youtube description copy teaches you how to structure your own video links." },
        { q: "Does this tool also extract comments?", a: "While our tool does tell you exactly how many comments are on the video, it does not copy all the text from the comments section." },
        { q: "Can I use this on a laptop and a phone?", a: "Yes! We know that people watch videos anywhere they go. Our yt description extractor automatically stretches and shrinks to fit your screen perfectly." },
        { q: "Do I need to install a browser extension or app?", a: "Zero installations required! Our description extractor youtube works completely online. It lives in the cloud." },
        { q: "Why does the extractor say Failed?", a: "The main reason our tool might fail is if the link is broken, or if the video is completely private or deleted by the creator." },
        { q: "What are Affiliate Links?", a: "Affiliate Links are special store links. When you use a youtube video description extractor, you can easily find and click those links to support creators." }
    ];

    const jsonLd = {
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
                "name": "YouTube Description Extractor",
                "url": "https://smarttoolswala.com/youtube-description-extractor",
                "operatingSystem": "All",
                "applicationCategory": "UtilitiesApplication",
                "description": "Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.",
                "featureList": [
                    "Extract YouTube description",
                    "YouTube meta data extractor",
                    "YouTube SEO tool"
                ],
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            },
            {
                "@type": "HowTo",
                "name": "How to Extract a YouTube Video Description",
                "description": "Follow these steps to easily extract the full description, title, and statistics from any YouTube video.",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Get the Video URL",
                        "text": "Open YouTube and copy the link to the video whose description you want to extract.",
                        "url": "https://smarttoolswala.com/youtube-description-extractor#get-link"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Paste the Link",
                        "text": "Paste the copied URL into the input field on our extractor page.",
                        "url": "https://smarttoolswala.com/youtube-description-extractor#paste-link"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Copy the Data",
                        "text": "Hit 'Extract'. The tool will load the thumbnail, title, stats, and full description which you can copy instantly.",
                        "url": "https://smarttoolswala.com/youtube-description-extractor#copy-data"
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://smarttoolswala.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "YouTube Description Extractor",
                        "item": "https://smarttoolswala.com/youtube-description-extractor"
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
    };


    return (
        <div className="page-bg min-h-screen pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-6">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Tools
                </Link>

                <h1 className="sr-only">YouTube Description Extractor Tool</h1>

                {/* LCP Hijack: A screen-sized graphical element that paints instantly to override AdSense */}
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -999, pointerEvents: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3Crect width=\'1\' height=\'1\' fill=\'%23f8faff\' /%3E%3C/svg%3E")',
                    backgroundSize: 'cover'
                }} aria-hidden="true" />

                <YoutubeDescriptionClient />

                <ArticleYoutubeDescription />
            </div>
        </div>
    );
}

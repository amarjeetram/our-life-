import { Metadata } from 'next';
import Link from 'next/link';
import YoutubeDescriptionClient from '@/components/YoutubeDescriptionClient';
import ArticleYoutubeDescription from '@/components/articles/ArticleYoutubeDescription';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: 'YouTube Description Extractor - Auto Copy Text, Views & Tags',
    description: 'Instantly extract YouTube video titles, descriptions, views, likes, and comments for free. Improve your video SEO and content research using our online YouTube description extractor tool.',
    keywords: 'youtube description extractor, youtube meta tags, video description, copy youtube description, youtube data extractor, youtube seo',
    alternates: {
        canonical: 'https://smarttoolswala.com/youtube-description-extractor'
    },
    openGraph: {
        title: 'YouTube Description Extractor - Auto Copy Data & Text',
        description: 'Instantly extract titles, detailed descriptions, and video stats from any YouTube video. Free tool for creators and researchers.',
        url: 'https://smarttoolswala.com/youtube-description-extractor',
        siteName: 'SmartToolsWala',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Description Extractor - Auto Copy Text',
        description: 'Instantly extract titles, detailed descriptions, and video stats from any YouTube video.'
    }
};

export default function YoutubeDescriptionExtractorPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "YouTube Description Extractor",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "Instantly extract YouTube video titles, descriptions, views, likes, and comments for free.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com/" },
            { "@type": "ListItem", "position": 2, "name": "YouTube Description Extractor", "item": "https://smarttoolswala.com/youtube-description-extractor" }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Is it bad to do a youtube description copy?", "acceptedAnswer": { "@type": "Answer", "text": "It is not bad at all if you are learning! Doing a youtube description copy teaches you how to structure your own video links." } },
            { "@type": "Question", "name": "Does this tool also extract comments?", "acceptedAnswer": { "@type": "Answer", "text": "While our tool does tell you exactly how many comments are on the video, it does not copy all the text from the comments section." } },
            { "@type": "Question", "name": "Can I use this on a laptop and a phone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We know that people watch videos anywhere they go. Our yt description extractor automatically stretches and shrinks to fit your screen perfectly." } },
            { "@type": "Question", "name": "Do I need to install a browser extension or app?", "acceptedAnswer": { "@type": "Answer", "text": "Zero installations required! Our description extractor youtube works completely online. It lives in the cloud." } },
            { "@type": "Question", "name": "Why does the extractor say Failed?", "acceptedAnswer": { "@type": "Answer", "text": "The main reason our tool might fail is if the link is broken, or if the video is completely private or deleted by the creator." } },
            { "@type": "Question", "name": "What are Affiliate Links?", "acceptedAnswer": { "@type": "Answer", "text": "Affiliate Links are special store links. When you use a youtube video description extractor, you can easily find and click those links to support creators." } }
        ]
    };

    return (
        <div className="page-bg min-h-screen pb-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-6">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Tools
                </Link>

                <h1 className="sr-only">YouTube Description Extractor Tool</h1>

                <YoutubeDescriptionClient />

                <ArticleYoutubeDescription />
            </div>
        </div>
    );
}

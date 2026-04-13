import YoutubeTitleClient from '@/components/YoutubeTitleClient';
import ArticleYoutubeTitle from '@/components/articles/ArticleYoutubeTitle';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'YouTube Title Extractor & Copier Online - Free Tool',
    description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.',
    keywords: 'youtube title extractor, youtube title copy, youtube video title copy, extract youtube title, copy youtube video title, youtube seo tool',
    alternates: {
        canonical: 'https://smarttoolswala.com/youtube-title-extractor',
    },
    openGraph: {
        title: 'YouTube Title Extractor - Copy Any Video Title',
        description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.',
        url: 'https://smarttoolswala.com/youtube-title-extractor',
        type: 'website',
        siteName: 'SmartToolsWala',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Title Extractor & Copier',
        description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.',
    }
};

export default function YoutubeTitleExtractorPage() {
    // Schema SoftwareApplication
    const faqs = [
        { q: "Is it legal to doing a youtube title copy?", a: "Yes, absolutely! Copying a title is just like reading the cover of a book. Titles are public text meant for everyone to read." },
        { q: "Does this tool cost any money?", a: "No! This tool is completely free. We will never ask you for your credit card. We will never ask you for money." },
        { q: "Can I also extract descriptions here?", a: "On this specific page, we only extract the title. But do not worry! If you need the full description, you can just click on 'YouTube Description Extractor'." },
        { q: "Why not just copy from the YouTube app?", a: "If you try to press your finger on the title to copy it on the app, it often just plays the video instead. Our tool removes all that frustration." },
        { q: "Does this work for YouTube Shorts?", a: "Yes! Our tool is smart enough to read the link of a YouTube Short and fetch the correct title for it too." }
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
                "name": "YouTube Title Extractor",
                "url": "https://smarttoolswala.com/youtube-title-extractor",
                "operatingSystem": "All",
                "applicationCategory": "UtilitiesApplication",
                "description": "Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.",
                "featureList": [
                    "YouTube title copy",
                    "Extract YouTube title",
                    "YouTube video title copy"
                ],
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            },
            {
                "@type": "HowTo",
                "name": "How to Copy a YouTube Video Title",
                "description": "Easily extract and copy the exact title of any YouTube video without accidentally clicking it.",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Find the YouTube Video",
                        "text": "Locate the video on the YouTube app or website and copy its shareable link.",
                        "url": "https://smarttoolswala.com/youtube-title-extractor#find"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Paste URL",
                        "text": "Paste the YouTube link into our title extractor's input box.",
                        "url": "https://smarttoolswala.com/youtube-title-extractor#paste"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Extract and Copy",
                        "text": "Click exactly to extract the title, then use the 1-click copy button to save it to your clipboard.",
                        "url": "https://smarttoolswala.com/youtube-title-extractor#copy"
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
                        "name": "YouTube Title Extractor",
                        "item": "https://smarttoolswala.com/youtube-title-extractor"
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
        <main className="min-h-screen bg-slate-50 flex flex-col pt-24">

            {/* JSON-LD Schemas */}
            <Script
                id="schema-graph"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <YoutubeTitleClient />

            {/* The massive 2000-word SEO article for Title Extractor */}
            <div className="max-w-4xl mx-auto px-4 pb-20 w-full">
                <ArticleYoutubeTitle />
            </div>

        </main>
    );
}

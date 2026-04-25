import { Metadata } from 'next';
import Link from 'next/link';
import YoutubeTagClient from '@/components/YoutubeTagClient';
import ArticleYoutubeTags from '@/components/articles/ArticleYoutubeTags';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'YouTube Tag Extractor - Get Hidden SEO Tags from Any Video',
    description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.',
    keywords: 'youtube tag extractor, youtube tags, seo tags, video tags, find youtube tags, youtube keyword tool, youtube seo',
    alternates: {
        canonical: 'https://smarttoolswala.com/youtube-tag-extractor'
    },
    openGraph: {
        title: 'YouTube Tag Extractor - Free SEO Keyword Tool',
        description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.',
        url: 'https://smarttoolswala.com/youtube-tag-extractor',
        siteName: 'SmartToolsWala',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Tag Extractor - Free SEO Keyword Tool',
        description: 'Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.'
    }
};

export default function YoutubeTagExtractorPage() {
    const faqs = [
        { q: "Is it illegal to copy tags?", a: "No, it is not illegal at all! Tags are meant to tell search engines what a video is about. You are free to use any tags you want." },
        { q: "How many tags should I use?", a: "YouTube gives you 500 characters worth of space for tags. That means you can fit maybe 15 to 20 tags depending on how long the words are." },
        { q: "Will tags alone make my video go viral?", a: "The short answer is no. Tags are just one piece of the puzzle. You still need to film a good video and make a great thumbnail." },
        { q: "Why did the tool find zero tags?", a: "If our tool tells you there are zero tags, it means the creator actually left their tag box completely blank." },
        { q: "What are long-tail tags?", a: "A long-tail tag is a tag that has many words in a sentence. Long-tail tags are much easier to rank for." },
        { q: "Does this work on other websites like TikTok?", a: "No! TikTok uses hashtags inside the text. YouTube uses a special invisible meta box just for tags. This tool is built specifically to look through YouTube code." }
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
                "name": "YouTube Tag Extractor",
                "url": "https://smarttoolswala.com/youtube-tag-extractor",
                "operatingSystem": "All",
                "applicationCategory": "UtilitiesApplication",
                "description": "Instantly extract and copy YouTube video descriptions, titles, views & tags for free. Boost your SEO research with our 1-click text extractor tool.",
                "featureList": [
                    "Extract YouTube tags",
                    "Find hidden SEO tags",
                    "YouTube keyword tool"
                ],
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            },
            {
                "@type": "HowTo",
                "name": "How to Extract Tags from a YouTube Video",
                "description": "Learn how to instantly find and copy the hidden SEO tags used by any YouTube video.",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Copy the Video Link",
                        "text": "Go to YouTube, find the video you want to analyze, and copy its URL.",
                        "url": "https://smarttoolswala.com/youtube-tag-extractor#copy"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Paste the Link",
                        "text": "Paste the copied YouTube link into the search box on our tool.",
                        "url": "https://smarttoolswala.com/youtube-tag-extractor#paste"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Extract & Copy Tags",
                        "text": "Click 'Extract Tags'. The tool will reveal all hidden tags. You can copy them individually or all at once.",
                        "url": "https://smarttoolswala.com/youtube-tag-extractor#extract"
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
                        "name": "YouTube Tag Extractor",
                        "item": "https://smarttoolswala.com/youtube-tag-extractor"
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

                <h1 className="text-3xl md:text-6xl font-black text-center text-slate-900 mb-12 tracking-tight leading-tight">
                    Extract Video <span className="text-blue-600">SEO Tags</span>
                </h1>

                <YoutubeTagClient />

                <ArticleYoutubeTags />
            </div>
        </div>
    );
}

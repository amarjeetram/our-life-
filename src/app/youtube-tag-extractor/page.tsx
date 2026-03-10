import { Metadata } from 'next';
import Link from 'next/link';
import YoutubeTagClient from '@/components/YoutubeTagClient';
import ArticleYoutubeTags from '@/components/articles/ArticleYoutubeTags';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


export const metadata: Metadata = {
    title: 'YouTube Tag Extractor - Get Hidden SEO Tags from Any Video',
    description: 'Instantly extract hidden YouTube video tags and keywords for free. Improve your video SEO and rank higher using our online YouTube tag generator and extractor tool.',
    keywords: 'youtube tag extractor, youtube tags, seo tags, video tags, find youtube tags, youtube keyword tool, youtube seo',
    alternates: {
        canonical: 'https://smarttoolswala.com/youtube-tag-extractor'
    },
    openGraph: {
        title: 'YouTube Tag Extractor - Free SEO Keyword Tool',
        description: 'Instantly extract hidden SEO tags from any YouTube video. No API keys or signup required. Free tool for creators.',
        url: 'https://smarttoolswala.com/youtube-tag-extractor',
        siteName: 'SmartToolsWala',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Tag Extractor - Free SEO Keyword Tool',
        description: 'Instantly extract hidden SEO tags from any YouTube video. No API keys or signup required.'
    }
};

export default function YoutubeTagExtractorPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "YouTube Tag Extractor",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "Instantly extract hidden YouTube video tags and keywords for free.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com/" },
            { "@type": "ListItem", "position": 2, "name": "YouTube Tag Extractor", "item": "https://smarttoolswala.com/youtube-tag-extractor" }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Is it illegal to copy tags?", "acceptedAnswer": { "@type": "Answer", "text": "No, it is not illegal at all! Tags are meant to tell search engines what a video is about. You are free to use any tags you want." } },
            { "@type": "Question", "name": "How many tags should I use?", "acceptedAnswer": { "@type": "Answer", "text": "YouTube gives you 500 characters worth of space for tags. That means you can fit maybe 15 to 20 tags depending on how long the words are." } },
            { "@type": "Question", "name": "Will tags alone make my video go viral?", "acceptedAnswer": { "@type": "Answer", "text": "The short answer is no. Tags are just one piece of the puzzle. You still need to film a good video and make a great thumbnail." } },
            { "@type": "Question", "name": "Why did the tool find zero tags?", "acceptedAnswer": { "@type": "Answer", "text": "If our tool tells you there are zero tags, it means the creator actually left their tag box completely blank." } },
            { "@type": "Question", "name": "What are long-tail tags?", "acceptedAnswer": { "@type": "Answer", "text": "A long-tail tag is a tag that has many words in a sentence. Long-tail tags are much easier to rank for." } },
            { "@type": "Question", "name": "Does this work on other websites like TikTok?", "acceptedAnswer": { "@type": "Answer", "text": "No! TikTok uses hashtags inside the text. YouTube uses a special invisible meta box just for tags. This tool is built specifically to look through YouTube code." } }
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

                <h1 className="sr-only">YouTube Tag Extractor Tool</h1>

                <YoutubeTagClient />

                <ArticleYoutubeTags />
            </div>
        </div>
    );
}

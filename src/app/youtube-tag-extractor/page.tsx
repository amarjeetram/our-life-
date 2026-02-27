import { Metadata } from 'next';
import Link from 'next/link';
import YoutubeTagClient from '@/components/YoutubeTagClient';
import ArticleYoutubeTags from '@/components/articles/ArticleYoutubeTags';
import { ArrowLeft } from 'lucide-react';

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
    return (
        <div className="page-bg min-h-screen pb-16">
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

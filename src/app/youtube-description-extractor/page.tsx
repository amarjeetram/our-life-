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
    return (
        <div className="page-bg min-h-screen pb-16">
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

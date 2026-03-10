import YoutubeTitleClient from '@/components/YoutubeTitleClient';
import ArticleYoutubeTitle from '@/components/articles/ArticleYoutubeTitle';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'YouTube Title Extractor & Copier Online - Free Tool',
    description: 'Instantly extract and copy YouTube video titles with our free YouTube Title Extractor. Best tool for youtube title copy, youtube video title copy, and SEO research.',
    keywords: 'youtube title extractor, youtube title copy, youtube video title copy, extract youtube title, copy youtube video title, youtube seo tool',
    alternates: {
        canonical: 'https://smarttoolswala.com/youtube-title-extractor',
    },
    openGraph: {
        title: 'YouTube Title Extractor - Copy Any Video Title',
        description: 'Free online tool to extract and copy the exact title of any YouTube video instantly.',
        url: 'https://smarttoolswala.com/youtube-title-extractor',
        type: 'website',
        siteName: 'SmartToolsWala',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Title Extractor & Copier',
        description: 'Free online tool to extract and copy the exact title of any YouTube video instantly.',
    }
};

export default function YoutubeTitleExtractorPage() {
    // Schema SoftwareApplication
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "YouTube Title Extractor",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "A free online tool to instantly extract and copy the title from any YouTube video.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
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
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Is it legal to doing a youtube title copy?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, absolutely! Copying a title is just like reading the cover of a book. Titles are public text meant for everyone to read." } },
            { "@type": "Question", "name": "Does this tool cost any money?", "acceptedAnswer": { "@type": "Answer", "text": "No! This tool is completely free. We will never ask you for your credit card. We will never ask you for money." } },
            { "@type": "Question", "name": "Can I also extract descriptions here?", "acceptedAnswer": { "@type": "Answer", "text": "On this specific page, we only extract the title. But do not worry! If you need the full description, you can just click on 'YouTube Description Extractor'." } },
            { "@type": "Question", "name": "Why not just copy from the YouTube app?", "acceptedAnswer": { "@type": "Answer", "text": "If you try to press your finger on the title to copy it on the app, it often just plays the video instead. Our tool removes all that frustration." } },
            { "@type": "Question", "name": "Does this work for YouTube Shorts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our tool is smart enough to read the link of a YouTube Short and fetch the correct title for it too." } }
        ]
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col pt-24">

            {/* JSON-LD Schemas */}
            <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <YoutubeTitleClient />

            {/* The massive 2000-word SEO article for Title Extractor */}
            <div className="max-w-4xl mx-auto px-4 pb-20 w-full">
                <ArticleYoutubeTitle />
            </div>

        </main>
    );
}

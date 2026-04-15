import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { Heart, Anchor, Sparkles } from 'lucide-react';
import ShipNameClient from '@/components/ShipNameClient';
import ArticleShipName from '@/components/articles/ArticleShipName';

const SITE_URL = 'https://smarttoolswala.com';
const PAGE_URL = `${SITE_URL}/love-tools/ship-name-generator`;

export const metadata: Metadata = {
    title: 'Ship Name Generator ❤️ Create Cute Couple & Nickname Mixes Online',
    description: 'Use our free Ship Name Generator to blend two names into unique, cute nicknames. Perfect for couples, fandoms, and social media hashtags. Instant & fun!',
    keywords: 'ship name generator, couple name combiner, name mixer for couples, ship name maker, fandom name generator, couple nickname maker, ship names for characters',
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: 'Ship Name Generator ❤️ Create Cute Couple & Nickname Mixes Online',
        description: 'Use our free Ship Name Generator to blend two names into unique, cute nicknames. Perfect for couples, fandoms, and social media hashtags. Instant & fun!',
        url: PAGE_URL,
        siteName: 'SmartToolsWala',
        type: 'website',
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "Ship Name Generator",
            "url": PAGE_URL,
            "description": "Blends two names into cute, unique ship names for couples and fandoms.",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Love Tools", "item": `${SITE_URL}/love-tools` },
                { "@type": "ListItem", "position": 3, "name": "Ship Name Generator", "item": PAGE_URL }
            ]
        }
    ]
};

export default function ShipNameGeneratorPage() {
    return (
        <div className="min-h-screen bg-[#FFF5F7] pt-24 pb-20 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-200/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <Script
                id="schema-ship-name"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-pink-100 text-pink-600 text-xs font-black uppercase tracking-widest mb-6">
                        <Anchor size={14} className="animate-bounce" />
                        Relationship Utility
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                        Ship Name{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">
                            Generator ❤️
                        </span>
                    </h1>
                    
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                        Mix two names to create perfect, cute, and catchy ship names. Ready to copy for Instagram, TikTok, and wedding hashtags.
                    </p>
                </div>

                <ShipNameClient />

                <ArticleShipName />
            </main>
        </div>
    );
}

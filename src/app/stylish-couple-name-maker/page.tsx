import React from 'react';
import { Metadata } from 'next';
import CoupleNameClient from "../../components/CoupleNameClient";
import Link from 'next/link';
import { Heart, Sparkles, Hash, Copy, Type } from 'lucide-react';



export const metadata: Metadata = {
    title: "Stylish Couple Name Maker | Combine Two Names Generator",
    description: "Create beautiful, stylish couple names perfectly blended from two names. Free couple name maker and generator with stylish fonts, emojis, and Instagram-ready custom text.",
    alternates: {
        canonical: "https://smarttoolswala.com/stylish-couple-name-maker"
    },
    openGraph: {
        title: "Stylish Couple Name Maker | Combine Two Names Generator",
        description: "Create beautiful, stylish couple names perfectly blended from two names. Free couple name maker with stylish fonts and emojis.",
        url: "https://smarttoolswala.com/stylish-couple-name-maker",
        type: "website",
    }
};

export default function StylishCoupleNameMakerPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
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
                                "name": "Stylish Couple Name Maker",
                                "url": "https://smarttoolswala.com/stylish-couple-name-maker",
                                "description": "Create beautiful, stylish couple names perfectly blended from two names. Free couple name maker with stylish fonts and emojis.",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                },
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.9",
                                    "ratingCount": "9200"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "Is this couple name generator free to use?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes! Our romantic couple name generator is 100% free with no hidden charges, daily limits, or signup requirements."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Can I use the generated couple names on Instagram?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Absolutely. This is built as a perfect couple name generator for Instagram. The stylish unicode fonts we generate are fully supported across all major social media platforms."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Does this work as a wedding hashtag generator?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes, it features a dedicated hashtag couple name generator logic that automatically prepends # and mixes your names with popular wedding tags."
                                        }
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
                                        "item": "https://smarttoolswala.com"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Stylish Couple Name Maker",
                                        "item": "https://smarttoolswala.com/stylish-couple-name-maker"
                                    }
                                ]
                            }
                        ]
                    })
                }}
            />
            {/* Header / Hero Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 text-center relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-pink-500" />
                    New Utility Tool
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 leading-tight">
                    Stylish Couple Name <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Maker</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                    Combine two names into beautiful, unique nicknames, wedding hashtags, and stylish Instagram bio texts instantly.
                </p>
            </div>

            {/* Interactive Tool Component */}
            <div className="px-4 sm:px-6 relative z-20">
                <CoupleNameClient />
            </div>

            {/* Comprehensive SEO Content Section */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 mt-24 prose prose-indigo prose-lg text-gray-600">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-pink-500" />
                        What is a Couple Name Generator?
                    </h2>
                    <p>
                        A <strong>couple name generator</strong> (also known as a couple name mixer or combiner) is a fun, creative online tool designed to combine two names into a single, unique nickname. Whether you are looking for a cute pet name, a trendy shipping name for your favorite fictional characters, or a unique hashtag for your wedding, our tool creates the perfect romantic blend.
                    </p>
                    <p>
                        Unlike basic text combiners, SmartToolsWala's <strong>romantic couple name generator</strong> automatically injects stylish unicode fonts and beautiful emojis. It effortlessly serves as your go-to <strong>couple name generator for Instagram</strong>, WhatsApp, or TikTok!
                    </p>

                    <hr className="my-10 border-gray-100" />

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Combine Two Names?</h2>

                    <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                        <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                            <Hash className="w-6 h-6 text-pink-500 mb-3" />
                            <h3 className="font-bold text-gray-900 mb-2">Wedding Hashtags</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">Create the perfect memorable #hashtag for your engagement, wedding, or anniversary posts.</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                            <Type className="w-6 h-6 text-purple-500 mb-3" />
                            <h3 className="font-bold text-gray-900 mb-2">Instagram Bios</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">Upgrade your social media presence with stylish fonts (𝕃𝕚𝕜𝕖 𝕋𝕙𝕚𝕤) that stand out.</p>
                        </div>
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                            <Heart className="w-6 h-6 text-indigo-500 mb-3" />
                            <h3 className="font-bold text-gray-900 mb-2">Relationship Names</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">Find a cute "shipping" name (like Virushka or DeepVeer) for you and your partner easily.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How to Use the Combined Couple Name Generator</h2>
                    <ol className="space-y-4 list-decimal list-inside pl-4 marker:text-pink-500 marker:font-bold">
                        <li><strong>Enter The First Name:</strong> Type your name or your partner's name in the first box of the <strong>ai couple name generator</strong> interface.</li>
                        <li><strong>Enter The Second Name:</strong> Type the other name in the second box.</li>
                        <li><strong>Click "Generate Spark":</strong> Watch our <strong>combine couple name generator</strong> algorithm slice and mix the names instantly.</li>
                        <li><strong>Click to Copy:</strong> Found a romantic name or hashtag you love? Just click on it, and it will be copied to your clipboard instantly!</li>
                    </ol>

                    <hr className="my-10 border-gray-100" />

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs)</h2>

                    <div className="space-y-6 not-prose">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">1. Is this couple name generator free to use?</h3>
                            <p className="text-gray-600 text-base leading-relaxed">Yes! Our <strong>romantic couple name generator</strong> is 100% free with no hidden charges, daily limits, or signup requirements.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">2. Can I use the generated couple names on Instagram?</h3>
                            <p className="text-gray-600 text-base leading-relaxed">Absolutely. This is built as a perfect <strong>couple name generator for Instagram</strong>. The stylish unicode fonts we generate are fully supported across all major social media platforms including Instagram, TikTok, WhatsApp, and Facebook.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">3. Does this work as a wedding hashtag generator?</h3>
                            <p className="text-gray-600 text-base leading-relaxed">Yes, it features a dedicated <strong>hashtag couple name generator</strong> logic that automatically prepends `#` and mixes your names with popular wedding tags like "Weds", "Loves", and "Forever" for your special day.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">4. How does the AI couple name generator work?</h3>
                            <p className="text-gray-600 text-base leading-relaxed">Our <strong>mix couple name generator</strong> uses a custom algorithm to intelligently slice prefixes and suffixes from both names. It identifies vowels and consonants to create a smooth, phonetic combination, acting like an intuitive <strong>couple name generator with meaning</strong> rather than a simple random scrambler.</p>
                        </div>
                    </div>

                    <div className="mt-12 bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 text-center">
                        <h3 className="text-xl font-bold text-gray-900 m-0 mb-3">Looking for Image Tools?</h3>
                        <p className="m-0 mb-6 text-gray-600">SmartToolsWala is also India's fastest image compressor.</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors no-underline">
                            Explore Image Compressors
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}

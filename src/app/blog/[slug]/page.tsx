import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import FloatingCTA from '@/components/FloatingCTA';
import CoupleNameClient from '@/components/CoupleNameClient';

// EXPLICIT FORCE STATIC - Critical for fast indexing and crawling
export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';

// Tag → CTA mapping: intent-based — each tag points to the most relevant tool
const TAG_CTA: Record<string, { title: string; badge: string; buttonLink: string; gradient: string }> = {
    'cta-mb-to-kb': {
        title: 'Free MB to KB Converter – Try Now!',
        badge: '🚀 Free Tool',
        buttonLink: '/mb-to-kb-image-converter',
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    },
    'cta-compress-50kb': {
        title: 'Compress Image to 50KB – Free & Instant!',
        badge: '✅ Free Tool',
        buttonLink: '/compress-image-to-50kb',
        gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    },
    'cta-compress-100kb': {
        title: 'Compress Image to 100KB – High Quality!',
        badge: '⚡ Free Tool',
        buttonLink: '/compress-image-to-100kb',
        gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    },
    'cta-compress-20kb': {
        title: 'Compress Image to 20KB – Exams Ready!',
        badge: '📝 Free Tool',
        buttonLink: '/compress-image-to-20kb',
        gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
    },
    'cta-compress-30kb': {
        title: 'Compress Image to 30KB – Exact Size!',
        badge: '🎯 Free Tool',
        buttonLink: '/compress-image-to-30kb',
        gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    },
    'cta-compress-200kb': {
        title: 'Compress Image to 200KB – Best Quality!',
        badge: '🖼️ Free Tool',
        buttonLink: '/compress-image-to-200kb',
        gradient: 'linear-gradient(135deg, #14b8a6, #0f766e)',
    },
    'cta-resize-100kb': {
        title: 'Resize Image to 100KB – Online Forms!',
        badge: '📐 Free Tool',
        buttonLink: '/resize-image-to-100kb',
        gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    },
    'cta-tnpsc': {
        title: 'TNPSC Photo Compressor – Auto Size!',
        badge: '💯 Free Tool',
        buttonLink: '/govt-exam-tools/tnpsc-photo-compressor',
        gradient: 'linear-gradient(135deg, #f43f5e, #be123c)',
    },
    'cta-youtube-tags': {
        title: 'Extract YouTube Tags – Boost Views!',
        badge: '📈 Free Tool',
        buttonLink: '/youtube-tag-extractor',
        gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    'cta-youtube-title': {
        title: 'Generate Viral YouTube Titles – Try Now!',
        badge: '🔥 Free Tool',
        buttonLink: '/youtube-title-generator',
        gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)',
    },
    'cta-youtube-description': {
        title: 'Extract YouTube Descriptions – Rank High!',
        badge: '✨ Free Tool',
        buttonLink: '/youtube-description-extractor',
        gradient: 'linear-gradient(135deg, #8b5cf6, #4c1d95)',
    },
    'cta-couple-name': {
        title: 'Stylish Couple Name Maker – Try Now!',
        badge: '💖 Free Tool',
        buttonLink: '/stylish-couple-name-maker',
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    },
};

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | SmartToolsWala',
        };
    }

    const canonical = `${SITE}/blog/${post.slug}`;
    const publishedTime = post.date || new Date().toISOString();
    const ogImage = post.image ? `${SITE}${post.image}` : `${SITE}/og-image.png`;

    return {
        title: `${post.title}`,
        description: post.description,
        alternates: { canonical },
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            url: canonical,
            publishedTime: publishedTime,
            authors: [post.author],
            images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [ogImage],
        },
    };
}

// Reusable CTA button to inject via MDX components
const MDXInlineCTA = ({ config }: { config?: { title: string; badge: string; buttonLink: string; gradient: string } }) => {
    if (!config) return null;
    return (
        <Link href={config.buttonLink} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "16px", background: config.gradient,
            borderRadius: "16px", padding: "16px 20px", margin: "36px 0",
            textDecoration: "none", boxShadow: "0 4px 24px rgba(99,102,241,0.25)"
        }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {config.badge}
                </span>
                <span style={{ fontSize: "15px", fontWeight: 800, color: "#ffffff" }}>
                    {config.title}
                </span>
            </span>
            <span style={{
                flexShrink: 0, background: "rgba(255,255,255,0.2)", color: "#fff",
                padding: "8px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.3)", whiteSpace: "nowrap"
            }}>
                Open Tool →
            </span>
        </Link>
    );
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Get 3 related/recent posts (excluding the current one)
    const allPosts = getAllPosts();
    const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);

    const canonical = `${SITE}/blog/${post.slug}`;
    const datePublishedStr = new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    // Auto-calculate reading time based on word count
    const wordCount = post.content.split(/\s+/g).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    let schemaImageUrl = `${SITE}/og-image.png`;
    if (post.image) {
        schemaImageUrl = post.image.startsWith('http') ? post.image : `${SITE}${post.image}`;
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonical
        },
        "headline": post.title,
        "description": post.description,
        "image": [schemaImageUrl],
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
            "@type": "Person",
            "name": post.author,
            "url": SITE
        },
        "publisher": {
            "@type": "Organization",
            "name": "SmartToolsWala",
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE}/logo.png`
            }
        }
    };

    // Auto-extract FAQ schema from MDX content (looks for ### questions under ## FAQ section)
    const faqInFaqSection = (() => {
        const faqSectionStart = post.content.search(/##.*FAQ/i);
        if (faqSectionStart === -1) return [];
        const faqSection = post.content.slice(faqSectionStart);
        const nextH2 = faqSection.slice(4).search(/^## /m);
        const faqContent = nextH2 > 0 ? faqSection.slice(0, nextH2 + 4) : faqSection;
        const pairs = [...faqContent.matchAll(/###\s+\d*\.?\s*(.+?)\n([\s\S]*?)(?=###|$)/g)];
        return pairs.map(m => ({
            "@type": "Question",
            "name": m[1].trim(),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": m[2].replace(/[*`_#]/g, '').trim().slice(0, 500)
            }
        })).filter(q => q.name.length > 5 && q.acceptedAnswer.text.length > 10);
    })();

    const faqJsonLd = faqInFaqSection.length >= 2 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqInFaqSection
    } : null;

    const ctaConfig = post.tags?.map((t) => TAG_CTA[t]).find(Boolean) ?? null;

    // Define custom MDX components corresponding to the tags injected in MDX files
    const mdxComponents = {
        CTAMBToKB: () => <MDXInlineCTA config={TAG_CTA['cta-mb-to-kb']} />,
        CTACompress50KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-50kb']} />,
        CTACompress100KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-100kb']} />,
        CTACompress20KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-20kb']} />,
        CTACompress30KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-30kb']} />,
        CTACompress200KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-200kb']} />,
        CTAResize100KB: () => <MDXInlineCTA config={TAG_CTA['cta-resize-100kb']} />,
        CTATnpsc: () => <MDXInlineCTA config={TAG_CTA['cta-tnpsc']} />,
        CTAYoutubeTags: () => <MDXInlineCTA config={TAG_CTA['cta-youtube-tags']} />,
        CTAYoutubeTitle: () => <MDXInlineCTA config={TAG_CTA['cta-youtube-title']} />,
        CTAYoutubeDescription: () => <MDXInlineCTA config={TAG_CTA['cta-youtube-description']} />,
        CTACoupleName: () => <MDXInlineCTA config={TAG_CTA['cta-couple-name']} />,
        InteractiveCoupleName: () => (
            <span className="block my-12 not-prose border border-pink-100 rounded-3xl bg-white shadow-xl overflow-hidden relative z-50">
                <span className="block bg-pink-50/50 p-4 text-center border-b border-pink-100">
                    <span className="text-sm font-bold text-pink-600 uppercase tracking-widest">Interactive Tool</span>
                </span>
                <span className="block p-2 sm:p-6">
                    <CoupleNameClient />
                </span>
            </span>
        )
    };

    return (
        <>
            <article className="min-h-screen bg-slate-50 pb-20">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {faqJsonLd && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                    />
                )}

                {/* Header Section */}
                <header className="bg-white border-b border-slate-200/60 pt-28 pb-16 relative">
                    <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>

                    <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-10">
                            <ArrowLeft className="w-4 h-4" /> Back to Blog
                        </Link>

                        {/* Title (H1 First) */}
                        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
                            {post.title}
                        </h1>

                        {/* Metadata Header Row */}
                        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-medium mb-6">
                            <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                                <User className="w-4 h-4 text-indigo-500" /> {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {datePublishedStr}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" /> {readingTime} min read
                            </span>
                        </div>

                        {/* Interactive Tool Injection (Before Content/Description) */}
                        {post.slug === 'stylish-couple-name-maker-with-meaning-find-unique-names-with-romantic-significance' && (
                            <div className="my-10 w-full bg-white border border-pink-100 rounded-[2rem] shadow-xl overflow-hidden relative z-50 ring-4 ring-pink-50/50">
                                <div className="bg-pink-50/80 p-5 text-center border-b border-pink-100 flex items-center justify-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                                    <span className="text-sm font-black text-pink-600 uppercase tracking-widest">Stylish Couple Name Maker</span>
                                </div>
                                <div className="p-4 sm:p-8 bg-gradient-to-b from-white to-pink-50/20">
                                    <CoupleNameClient />
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <p className="text-xl text-slate-600 leading-relaxed font-medium mb-8">
                            {post.description}
                        </p>

                        {/* Featured Image */}
                        {post.image && (
                            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-8 aspect-video">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={1200}
                                    height={675}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* CTA Button Immediately After Image */}
                        {ctaConfig && (
                            <div className="mb-2 w-full">
                                <MDXInlineCTA config={ctaConfig} />
                            </div>
                        )}
                    </div>
                </header>

                {/* Content Section */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
                    <div className="blog-content prose prose-slate prose-lg md:prose-xl max-w-none 
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                    prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-medium
                    prose-a:text-indigo-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-li:text-slate-700 marker:text-indigo-500
                    prose-img:rounded-3xl prose-img:border prose-img:border-slate-200 prose-img:shadow-lg
                ">
                        <MDXRemote source={post.content} components={mdxComponents} />
                        
                        {/* Contextual Internal Linking (SEO: "Also Read") */}
                        {relatedPosts.length > 0 && (
                            <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-[2rem] border border-indigo-100/60 shadow-sm not-prose">
                                <h3 className="text-[17px] font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
                                    <span className="text-indigo-600">📚</span> Recommended Reading
                               </h3>
                                <ul className="space-y-3 m-0 p-0 list-none">
                                    {relatedPosts.map(rp => (
                                        <li key={rp.slug} className="flex items-start gap-3">
                                            <span className="text-indigo-400 font-bold mt-0.5 select-none">→</span>
                                            <Link href={`/blog/${rp.slug}`} className="text-indigo-700 font-semibold text-[17px] leading-tight hover:text-indigo-900 hover:underline transition-colors decoration-indigo-300 underline-offset-4">
                                                {rp.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Written by</p>
                                <p className="font-bold text-slate-900">{post.author}</p>
                            </div>
                        </div>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline">
                            <ArrowLeft className="w-4 h-4" /> More Articles
                        </Link>
                    </div>
                </div>

                {/* Related Articles Section for improved crawling/indexing */}
                {relatedPosts.length > 0 && (
                    <div className="bg-white border-t border-slate-200 mt-20 py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map(rp => (
                                    <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-3">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(rp.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                            {rp.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 line-clamp-2">
                                            {rp.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                            <div className="text-center mt-12">
                                <Link href="/blog" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors">
                                    View All Articles
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </article>

            {/* Floating CTA — shown only when post has a matching tool tag */}
            {ctaConfig && (
                <FloatingCTA
                    title={ctaConfig.title}
                    badge={ctaConfig.badge}
                    buttonLink={ctaConfig.buttonLink}
                    gradient={ctaConfig.gradient}
                />
            )}
        </>
    );
}

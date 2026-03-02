import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import DynamicBlogCTA from '@/components/DynamicBlogCTA';
import {
    fetchPostBySlug,
    fetchAllPostSlugs,
    stripHtml,
    readingTime,
    type WPPost,
} from '@/lib/wordpress';

// ─── Static Params (SSG at build time) ────────────────────────────────────────

export async function generateStaticParams() {
    const slugs = await fetchAllPostSlugs();
    return slugs.map(s => ({ slug: s.slug }));
}

// ─── Metadata (SSR per slug) ───────────────────────────────────────────────────

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = await fetchPostBySlug(slug);
    if (!post) return { title: 'Post Not Found | SmartToolsWala' };

    const title = stripHtml(post.title.rendered);
    const description = stripHtml(post.excerpt.rendered).slice(0, 160);
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const canonical = `https://smarttoolswala.com/blog/${post.slug}`;

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.modified,
            ...(featuredImage ? { images: [{ url: featuredImage }] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(featuredImage ? { images: [featuredImage] } : {}),
        },
    };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post: WPPost | null = await fetchPostBySlug(slug);

    if (!post) notFound();

    const authorName = post._embedded?.author?.[0]?.name ?? 'SmartToolsWala';
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const featuredImageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text
        || stripHtml(post.title.rendered);
    const categories = post._embedded?.['wp:term']?.[0] ?? [];

    const datePublishedStr = new Date(post.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
    const mins = readingTime(post.content.rendered);
    const canonical = `https://smarttoolswala.com/blog/${post.slug}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: stripHtml(post.title.rendered),
        datePublished: post.date,
        dateModified: post.modified,
        description: stripHtml(post.excerpt.rendered).slice(0, 200),
        url: canonical,
        author: { '@type': 'Person', name: authorName },
        publisher: {
            '@type': 'Organization',
            name: 'SmartToolsWala',
            logo: { '@type': 'ImageObject', url: 'https://smarttoolswala.com/logo.png' },
        },
        ...(featuredImage ? { image: featuredImage } : {}),
    };

    return (
        <div className="page-bg min-h-screen pb-16">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Back button */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>
            </div>

            <article className="max-w-3xl mx-auto px-4 sm:px-6">

                {/* Categories */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map(cat => (
                            <span
                                key={cat.slug}
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold"
                            >
                                {cat.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h1
                    className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                    <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" /> {authorName}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {datePublishedStr}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {mins} min read
                    </span>
                </div>

                {/* Featured Image */}
                {featuredImage && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-sm">
                        <Image
                            src={featuredImage}
                            alt={featuredImageAlt}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 768px"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}

                {/* Top CTA */}
                <DynamicBlogCTA categories={categories.length > 0
                    ? categories.map(c => ({ name: c.name, slug: c.slug }))
                    : [{ name: 'Tools', slug: 'tools' }]}
                />

                {/* Article Content */}
                <div
                    className="blog-content prose prose-gray prose-base max-w-none mt-8"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-sm text-gray-500">
                                Written by <span className="font-semibold text-gray-800">{authorName}</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">Last updated: {datePublishedStr}</p>
                        </div>
                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" /> More articles
                        </Link>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 mb-8">
                    <DynamicBlogCTA categories={categories.length > 0
                        ? categories.map(c => ({ name: c.name, slug: c.slug }))
                        : [{ name: 'Tools', slug: 'tools' }]}
                    />
                </div>
            </article>

            {/* Floating CTA */}
            <DynamicBlogCTA
                categories={categories.length > 0
                    ? categories.map(c => ({ name: c.name, slug: c.slug }))
                    : [{ name: 'Tools', slug: 'tools' }]}
                variant="floating"
            />
        </div>
    );
}

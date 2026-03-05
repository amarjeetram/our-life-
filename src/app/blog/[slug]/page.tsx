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
import { STATIC_POSTS, getStaticPostBySlug, type StaticPost } from '@/lib/static-posts';

const SITE = 'https://smarttoolswala.com';

// ─── Static Params (SSG at build time) ────────────────────────────────────────

export async function generateStaticParams() {
    const cmsSlugs = await fetchAllPostSlugs();
    const staticSlugs = STATIC_POSTS.map(p => ({ slug: p.slug }));
    return [...cmsSlugs.map(s => ({ slug: s.slug })), ...staticSlugs];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;

    const post = await fetchPostBySlug(slug);
    if (post) {
        const rawTitle = stripHtml(post.title.rendered);
        // Keep title 50-60 chars — append brand if short enough
        const title = rawTitle.length <= 52 ? `${rawTitle} | SmartToolsWala` : rawTitle;
        const description = stripHtml(post.excerpt.rendered).slice(0, 158);
        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        const canonical = `${SITE}/blog/${post.slug}`;
        return {
            title,
            description,
            robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
            alternates: { canonical },
            openGraph: {
                title: rawTitle,
                description,
                url: canonical,
                type: 'article',
                publishedTime: post.date,
                modifiedTime: post.modified,
                siteName: 'SmartToolsWala',
                ...(featuredImage ? { images: [{ url: featuredImage, width: 1200, height: 630 }] } : {}),
            },
            twitter: {
                card: 'summary_large_image',
                title: rawTitle,
                description,
                ...(featuredImage ? { images: [featuredImage] } : {}),
            },
        };
    }

    const staticPost = getStaticPostBySlug(slug);
    if (staticPost) {
        const rawTitle = staticPost.title.rendered;
        const title = rawTitle.length <= 52 ? `${rawTitle} | SmartToolsWala` : rawTitle;
        const description = stripHtml(staticPost.excerpt.rendered).slice(0, 158);
        const canonical = `${SITE}/blog/${staticPost.slug}`;
        return {
            title,
            description,
            robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
            alternates: { canonical },
            openGraph: { title: rawTitle, description, url: canonical, type: 'article', publishedTime: staticPost.date, siteName: 'SmartToolsWala' },
            twitter: { card: 'summary_large_image', title: rawTitle, description },
        };
    }

    return {
        title: 'Post Not Found | SmartToolsWala',
        robots: { index: false, follow: false },
    };
}

// ─── Shared JSON-LD builders ──────────────────────────────────────────────────

function buildArticleJsonLd(opts: {
    headline: string;
    datePublished: string;
    dateModified: string;
    description: string;
    url: string;
    authorName: string;
    image?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: opts.headline,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified,
        description: opts.description,
        url: opts.url,
        inLanguage: 'en-IN',
        author: { '@type': 'Person', name: opts.authorName },
        publisher: {
            '@type': 'Organization',
            name: 'SmartToolsWala',
            url: SITE,
            logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
        ...(opts.image ? { image: { '@type': 'ImageObject', url: opts.image } } : {}),
    };
}

function buildBreadcrumbJsonLd(postTitle: string, postSlug: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
            { '@type': 'ListItem', position: 3, name: postTitle, item: `${SITE}/blog/${postSlug}` },
        ],
    };
}

// ─── Breadcrumb UI component (server) ────────────────────────────────────────

function Breadcrumb({ title }: { title: string }) {
    return (
        <nav aria-label="breadcrumb" className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-2 text-sm text-gray-500 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700 font-medium line-clamp-1">{title}</span>
        </nav>
    );
}

// ─── Static Article Renderer ──────────────────────────────────────────────────

function StaticArticlePage({ post }: { post: StaticPost }) {
    const authorName = post._embedded?.author?.[0]?.name ?? 'SmartToolsWala';
    const categories = post._embedded?.['wp:term']?.[0] ?? [];
    const dateStr = new Date(post.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
    const mins = Math.max(1, Math.ceil(stripHtml(post.content.rendered).split(/\s+/).length / 200));
    const canonical = `${SITE}/blog/${post.slug}`;
    const rawTitle = post.title.rendered;

    const articleJsonLd = buildArticleJsonLd({
        headline: rawTitle,
        datePublished: post.date,
        dateModified: post.modified,
        description: stripHtml(post.excerpt.rendered).slice(0, 200),
        url: canonical,
        authorName,
    });
    const breadcrumbJsonLd = buildBreadcrumbJsonLd(rawTitle, post.slug);

    const catList = categories.length > 0
        ? categories.map(c => ({ name: c.name, slug: c.slug }))
        : [{ name: 'Tools', slug: 'tools' }];

    return (
        <div className="page-bg min-h-screen pb-20">
            {/* Structured data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            {/* Breadcrumb */}
            <Breadcrumb title={rawTitle} />

            {/* Back link */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </div>

            <article className="max-w-3xl mx-auto px-4 sm:px-6">
                {/* Category pills */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map(cat => (
                            <span key={cat.slug} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">
                                {cat.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* H1 */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
                    {rawTitle}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {authorName}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> <time dateTime={post.date}>{dateStr}</time></span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {mins} min read</span>
                </div>

                {/* In-article CTA (server rendered) */}
                <DynamicBlogCTA categories={catList} />

                {/* Article body — fully server rendered, visible to Googlebot */}
                <div
                    className="blog-content prose prose-gray prose-base max-w-none mt-8"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                {/* Footer meta */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Written by <span className="font-semibold text-gray-800">{authorName}</span></p>
                            <p className="text-xs text-gray-400 mt-0.5">Last updated: {dateStr}</p>
                        </div>
                        <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
                            <ArrowLeft className="w-4 h-4" /> More articles
                        </Link>
                    </div>
                </div>

                {/* Bottom CTA (server rendered) */}
                <div className="mt-8 mb-8">
                    <DynamicBlogCTA categories={catList} />
                </div>
            </article>

            {/* Floating CTA (client component — does NOT block SSR of article content) */}
            <DynamicBlogCTA categories={catList} variant="floating" />
        </div>
    );
}

// ─── Page (SSG / ISR) ─────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // 1. Try WordPress CMS
    const post: WPPost | null = await fetchPostBySlug(slug);
    if (post) {
        const authorName = post._embedded?.author?.[0]?.name ?? 'SmartToolsWala';
        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        const featuredImageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || stripHtml(post.title.rendered);
        const categories = post._embedded?.['wp:term']?.[0] ?? [];
        const datePublishedStr = new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        const mins = readingTime(post.content.rendered);
        const canonical = `${SITE}/blog/${post.slug}`;
        const rawTitle = stripHtml(post.title.rendered);

        const articleJsonLd = buildArticleJsonLd({
            headline: rawTitle,
            datePublished: post.date,
            dateModified: post.modified,
            description: stripHtml(post.excerpt.rendered).slice(0, 200),
            url: canonical,
            authorName,
            image: featuredImage,
        });
        const breadcrumbJsonLd = buildBreadcrumbJsonLd(rawTitle, post.slug);

        const catList = categories.length > 0
            ? categories.map(c => ({ name: c.name, slug: c.slug }))
            : [{ name: 'Tools', slug: 'tools' }];

        return (
            <div className="page-bg min-h-screen pb-20">
                {/* Structured data */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

                {/* Breadcrumb */}
                <Breadcrumb title={rawTitle} />

                {/* Back link */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>

                <article className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Category pills */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map(cat => (
                                <span key={cat.slug} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">{cat.name}</span>
                            ))}
                        </div>
                    )}

                    {/* H1 */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {authorName}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> <time dateTime={post.date}>{datePublishedStr}</time></span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {mins} min read</span>
                    </div>

                    {/* Featured image */}
                    {featuredImage && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-sm">
                            <Image src={featuredImage} alt={featuredImageAlt} fill priority sizes="(max-width: 768px) 100vw, 768px" style={{ objectFit: 'cover' }} />
                        </div>
                    )}

                    {/* In-article CTA (server rendered) */}
                    <DynamicBlogCTA categories={catList} />

                    {/* Article content — fully server rendered */}
                    <div className="blog-content prose prose-gray prose-base max-w-none mt-8"
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

                    {/* Footer meta */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Written by <span className="font-semibold text-gray-800">{authorName}</span></p>
                                <p className="text-xs text-gray-400 mt-0.5">Last updated: {datePublishedStr}</p>
                            </div>
                            <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
                                <ArrowLeft className="w-4 h-4" /> More articles
                            </Link>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-8 mb-8">
                        <DynamicBlogCTA categories={catList} />
                    </div>
                </article>

                {/* Floating CTA — client component, does NOT affect SSR of article content */}
                <DynamicBlogCTA categories={catList} variant="floating" />
            </div>
        );
    }

    // 2. Static posts registry
    const staticPost = getStaticPostBySlug(slug);
    if (staticPost) {
        return <StaticArticlePage post={staticPost} />;
    }

    // 3. Not found
    notFound();
}

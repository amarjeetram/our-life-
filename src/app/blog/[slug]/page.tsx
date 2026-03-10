import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import DynamicBlogCTA from '@/components/DynamicBlogCTA';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

const SITE = 'https://smarttoolswala.com';

function stripHtml(html: string) {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, '').replace(/\[&hellip;\]/g, '...').replace(/&#8230;/g, '...').trim();
}

function readingTime(text: string) {
    const cleanText = stripHtml(text);
    const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}

// ISR: regenerate each blog post page at most once per hour
// This allows generateStaticParams to work correctly at build time
export const revalidate = 3600;

// ─── Static Params (SSG at build time) ────────────────────────────────────────

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map(post => ({ slug: post.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | SmartToolsWala',
            robots: { index: false, follow: false },
        };
    }

    const rawTitle = post.title;
    const title = rawTitle.length <= 52 ? `${rawTitle} | SmartToolsWala` : rawTitle;
    const description = post.description.slice(0, 158);
    const canonical = `${SITE}/blog/${post.slug}`;
    const featuredImage = post.image;

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

// ─── Shared JSON-LD builders ──────────────────────────────────────────────────

function buildArticleJsonLd(opts: {
    headline: string;
    datePublished: string;
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
        dateModified: opts.datePublished,
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

// ─── Page (SSG / ISR) ─────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const authorName = post.author || 'SmartToolsWala';
    const featuredImage = post.image;
    const featuredImageAlt = post.title;
    const datePublishedStr = post.date ? new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const mins = readingTime(post.content);
    const canonical = `${SITE}/blog/${post.slug}`;
    const rawTitle = post.title;

    const articleJsonLd = buildArticleJsonLd({
        headline: rawTitle,
        datePublished: post.date,
        description: post.description.slice(0, 200),
        url: canonical,
        authorName,
        image: featuredImage || undefined,
    });
    const breadcrumbJsonLd = buildBreadcrumbJsonLd(rawTitle, post.slug);

    const catList = post.tags && post.tags.length > 0
        ? post.tags.map(t => ({ name: t, slug: t.toLowerCase().replace(/\s+/g, '-') }))
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
                {catList.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {catList.map(cat => (
                            <span key={cat.slug} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">{cat.name}</span>
                        ))}
                    </div>
                )}

                {/* H1 */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5"
                    dangerouslySetInnerHTML={{ __html: post.title }} />

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {authorName}</span>
                    {datePublishedStr && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> <time dateTime={post.date}>{datePublishedStr}</time></span>}
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

                {/* Article content — fully server rendered using MDXRemote */}
                <div className="blog-content prose prose-gray prose-base max-w-none mt-8">
                    <MDXRemote source={post.content} />
                </div>

                {/* Footer meta */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Written by <span className="font-semibold text-gray-800">{authorName}</span></p>
                            {datePublishedStr && <p className="text-xs text-gray-400 mt-0.5">Last updated: {datePublishedStr}</p>}
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

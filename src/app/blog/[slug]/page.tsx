import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import DynamicBlogCTA from '@/components/DynamicBlogCTA';
import { getPostBySlug, getPublishedPosts } from '@/lib/firebase/firestore';

export const dynamicParams = true;
export const revalidate = 7200; // Cache for 2 hours

const WP_API = 'https://api.insanenotes.in/wp-json/wp/v2';

interface WPPost {
    id: number | string;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    modified: string;
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
        author?: Array<{ name: string; description: string }>;
        'wp:term'?: Array<Array<{ name: string; slug: string }>>;
    };
}

interface Props {
    params: Promise<{ slug: string }>;
}

function mapFirebaseToWP(fbPost: any): WPPost {
    const dateStr = fbPost.createdAt && fbPost.createdAt.seconds
        ? new Date(fbPost.createdAt.seconds * 1000).toISOString()
        : new Date().toISOString();
    return {
        id: fbPost.id || fbPost.slug,
        slug: fbPost.slug,
        title: { rendered: fbPost.title },
        content: { rendered: fbPost.content },
        excerpt: { rendered: fbPost.metaDescription || fbPost.content.substring(0, 150) },
        date: dateStr,
        modified: dateStr,
        featured_media: 0,
        _embedded: {
            'wp:featuredmedia': fbPost.thumbnailUrl ? [{ source_url: fbPost.thumbnailUrl, alt_text: fbPost.title }] : undefined,
            author: [{ name: 'SmartToolsWala', description: 'Admin' }],
            'wp:term': [fbPost.tags ? fbPost.tags.map((t: string) => ({ name: t, slug: t.toLowerCase() })) : []],
        }
    };
}

async function getPost(slug: string): Promise<WPPost | null> {
    // 1. Try Firebase First
    try {
        const fbPost = await getPostBySlug(slug);
        if (fbPost && fbPost.status === 'PUBLISHED') {
            return mapFirebaseToWP(fbPost);
        }
    } catch (e) {
        console.error('Error fetching fb post', e);
    }

    // 2. Fallback to WP API
    try {
        const res = await fetch(`${WP_API}/posts?_embed=1&slug=${slug}`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const posts = await res.json();
        return posts[0] || null;
    } catch {
        return null;
    }
}

async function getAllSlugs(): Promise<{ slug: string }[]> {
    let slugs: { slug: string }[] = [];
    try {
        const fbPosts = await getPublishedPosts();
        slugs = fbPosts.map(p => ({ slug: p.slug }));
    } catch (e) { }

    try {
        const res = await fetch(`${WP_API}/posts?per_page=50&_fields=slug`, { next: { revalidate: 3600 } });
        if (res.ok) {
            const wpSlugs = await res.json();
            slugs = [...slugs, ...wpSlugs];
        }
    } catch (e) { }

    return slugs;
}

async function getLatestPosts(excludeSlug: string): Promise<WPPost[]> {
    let fbPosts: WPPost[] = [];
    try {
        const rawFb = await getPublishedPosts();
        fbPosts = rawFb.filter(p => p.slug !== excludeSlug).map(mapFirebaseToWP);
    } catch (e) { }

    let wpPosts: WPPost[] = [];
    try {
        const res = await fetch(`${WP_API}/posts?_embed=1&per_page=7`, { next: { revalidate: 3600 } });
        if (res.ok) {
            const posts = await res.json();
            wpPosts = posts.filter((p: WPPost) => p.slug !== excludeSlug);
        }
    } catch (e) { }

    const all = [...fbPosts, ...wpPosts];
    all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return all.slice(0, 6);
}

export async function generateStaticParams() {
    const posts = await getAllSlugs();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: 'Post Not Found' };

    // Decode HTML entities in title if WP sends them (e.g. &#8211; for dash)
    let originalTitle = post.title.rendered.replace(/<[^>]+>/g, '');
    const isTruncated = originalTitle.endsWith('[&amp;hellip;]') || originalTitle.endsWith('[...]');
    if (isTruncated) {
        // Fallback: If WP API is already truncating it, try to fetch full from somewhere else or just clean it up
        originalTitle = originalTitle.replace(/\[&amp;hellip;\]/g, '').replace(/\[\.\.\.\]/g, '').trim();
    }

    // Sometimes yoast/rankmath puts the full title in the yoast_head or similar. 
    // But working with standard WP REST API, title shouldn't be truncated unless it's the excerpt.
    // Let's make sure we are definitely using title, not excerpt.

    const description = post.excerpt.rendered
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/\[&hellip;\]/g, '...') // Replace WP's [&hellip;] with standard ellipsis
        .slice(0, 160);

    const keywords = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];

    return {
        title: originalTitle, // Layout auto-appends " | SmartToolsWala"
        description,
        keywords,
        alternates: { canonical: `https://smarttoolswala.com/blog/${slug}` },
        openGraph: {
            title: originalTitle, // Use full title for OG
            description,
            images: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                ? [post._embedded['wp:featuredmedia'][0].source_url]
                : [],
        },
    };
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
}

function readingTime(html: string) {
    const words = html.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    const latestPosts = await getLatestPosts(slug);

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const authorName = post._embedded?.author?.[0]?.name || 'SmartToolsWala';
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const mins = readingTime(post.content.rendered);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title.rendered.replace(/<[^>]+>/g, ''),
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.modified).toISOString(),
        "author": {
            "@type": "Person",
            "name": authorName,
        },
        "publisher": {
            "@type": "Organization",
            "name": "SmartToolsWala",
            "logo": {
                "@type": "ImageObject",
                "url": "https://smarttoolswala.com/logo.png"
            }
        },
        "image": featuredImage ? [featuredImage] : [],
    };

    return (
        <div className="page-bg min-h-screen pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Back button */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-6">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>
            </div>

            <article className="max-w-3xl mx-auto px-4 sm:px-6">
                {/* Categories */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.slice(0, 3).map((cat) => (
                            <span key={cat.slug} className="badge text-xs">
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
                        <Calendar className="w-4 h-4" /> {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {mins} min read
                    </span>
                </div>

                {/* Featured Image */}
                {featuredImage && (
                    <div className="rounded-2xl overflow-hidden mb-8 shadow-sm relative w-full" style={{ aspectRatio: '16/9' }}>
                        <Image
                            src={featuredImage}
                            alt={post.title.rendered.replace(/<[^>]+>/g, '')}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Top Dynamic CTA Banner */}
                <DynamicBlogCTA categories={categories} />

                {/* Blog Content */}
                <div
                    className="blog-content prose prose-gray prose-base max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Written by <span className="font-semibold text-gray-800">{authorName}</span></p>
                            <p className="text-xs text-gray-400 mt-0.5">Last updated: {formatDate(post.modified)}</p>
                        </div>
                        <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
                            <ArrowLeft className="w-4 h-4" /> More articles
                        </Link>
                    </div>
                </div>

                {/* Bottom Dynamic CTA Banner */}
                <div className="mt-8 mb-8">
                    <DynamicBlogCTA categories={categories} />
                </div>
            </article>

            {/* Latest Posts Section */}
            {latestPosts.length > 0 && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 my-16 border-t border-gray-100 pt-12">
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">Read Latest Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestPosts.map((relatedPost) => {
                            const relatedImage = relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                            const relatedDate = formatDate(relatedPost.date);

                            return (
                                <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="group flex flex-col bg-white rounded-2xl p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
                                    {relatedImage ? (
                                        <div className="w-full aspect-[16/10] rounded-xl bg-gray-50 overflow-hidden mb-4 relative">
                                            <Image
                                                src={relatedImage}
                                                alt={relatedPost.title.rendered.replace(/<[^>]+>/g, '')}
                                                fill
                                                loading="lazy"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-[16/10] rounded-xl bg-gray-50 mb-4 flex items-center justify-center text-gray-400">
                                            <span className="text-sm font-medium">No image</span>
                                        </div>
                                    )}
                                    <h4 className="font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors" dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }} />
                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500 w-full mt-auto pt-2">
                                        <span className="flex items-center gap-1.5 font-medium"><Calendar className="w-3.5 h-3.5 text-gray-400" /> {relatedDate}</span>
                                        <span className="text-blue-600 font-medium group-hover:underline">Read →</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Sticky Floating CTA */}
            <DynamicBlogCTA categories={categories} variant="floating" />
        </div>
    );
}

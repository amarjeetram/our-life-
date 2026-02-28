import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import DynamicBlogCTA from '@/components/DynamicBlogCTA';

export const dynamicParams = true;
export const revalidate = 3600;

const WP_API = 'https://api.insanenotes.in/wp-json/wp/v2';

interface WPPost {
    id: number;
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

async function getPost(slug: string): Promise<WPPost | null> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(
            `${WP_API}/posts?_embed=1&slug=${slug}`,
            { next: { revalidate: 3600 }, signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (!res.ok) return null;
        const posts = await res.json();
        return posts[0] || null;
    } catch {
        return null;
    }
}

async function getAllSlugs(): Promise<{ slug: string }[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(`${WP_API}/posts?per_page=50&_fields=slug`, {
            next: { revalidate: 3600 },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export async function generateStaticParams() {
    const posts = await getAllSlugs();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: 'Post Not Found' };

    const title = post.title.rendered.replace(/<[^>]+>/g, '');
    const description = post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160);

    return {
        title: `${title} | SmartToolsWala Blog`,
        description,
        alternates: { canonical: `https://smarttoolswala.com/blog/${slug}` },
        openGraph: {
            title,
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

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const authorName = post._embedded?.author?.[0]?.name || 'SmartToolsWala';
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const mins = readingTime(post.content.rendered);

    return (
        <div className="page-bg min-h-screen pb-16">
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
                    <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={featuredImage}
                            alt={post.title.rendered.replace(/<[^>]+>/g, '')}
                            className="w-full h-auto max-h-96 object-cover"
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

            {/* Sticky Floating CTA */}
            <DynamicBlogCTA categories={categories} variant="floating" />
        </div>
    );
}

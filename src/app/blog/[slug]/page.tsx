import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';

// EXPLICIT FORCE STATIC - Critical for fast indexing and crawling
export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Next.js 16: params must be awaited before accessing properties
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
        title: `${post.title} | SmartToolsWala Guides`,
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

// Next.js 16: params must be awaited before accessing properties
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const canonical = `${SITE}/blog/${post.slug}`;
    const datePublishedStr = new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    // Auto-calculate reading time based on word count
    const wordCount = post.content.split(/\s+/g).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Determine Absolute URL for Schema (Fixing previous validation bug)
    let schemaImageUrl = `${SITE}/og-image.png`;
    if (post.image) {
        schemaImageUrl = post.image.startsWith('http') ? post.image : `${SITE}${post.image}`;
    }

    // Comprehensive Schema
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

    return (
        <article className="min-h-screen bg-slate-50 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Section */}
            <header className="bg-white border-b border-slate-200/60 pt-28 pb-16 relative">
                <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-10">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

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

                    <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
                        {post.title}
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed font-medium mb-8">
                        {post.description}
                    </p>
                </div>
            </header>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
                <div className="blog-content prose prose-slate prose-lg md:prose-xl max-w-none 
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                    prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-medium
                    prose-a:text-indigo-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-li:text-slate-700 marker:text-indigo-500
                    prose-img:rounded-3xl prose-img:border prose-img:border-slate-200 prose-img:shadow-lg
                ">
                    <MDXRemote source={post.content} />
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
        </article>
    );
}

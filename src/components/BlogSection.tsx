// Server Component — NO "use client"
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, Clock, User } from 'lucide-react';
import { getAllPosts } from '@/lib/mdx';

function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
}

function stripHtml(html: string) {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, '').replace(/\[&hellip;\]/g, '...').replace(/&#8230;/g, '...').trim();
}

function readTime(excerpt: string) {
    if (!excerpt) return '2 min read';
    const cleanText = stripHtml(excerpt);
    const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
    const time = Math.max(1, Math.ceil(wordCount / 200));
    return time + ' min read';
}

const ACCENTS = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
    'linear-gradient(135deg, #0ea5e9, #6366f1)',
    'linear-gradient(135deg, #ec4899, #8b5cf6)',
];

export default function BlogSection() {
    // Fetch live posts and slice to latest 3
    const posts = getAllPosts().slice(0, 3);

    // Fallback if no posts
    if (posts.length === 0) return null;

    return (
        <section className="py-20 px-4 bg-gray-50/50">
            <div className="max-w-6xl mx-auto">

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="inline-flex items-center gap-1.5 text-indigo-600 font-bold tracking-wider uppercase text-xs mb-3">
                            <BookOpen className="w-3.5 h-3.5" />
                            From the Blog
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Tips & Guides
                        </h2>
                        <p className="text-gray-500 text-base mt-2 max-w-md">
                            Resources to help you compress and optimize images like a pro.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 text-sm font-semibold rounded-xl transition-all shadow-sm flex-shrink-0"
                    >
                        View all articles <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Simple 3-column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, i) => {
                        const img = post.image;
                        const author = post.author || 'SmartToolsWala';
                        const excerpt = stripHtml(post.description).slice(0, 110);
                        const accent = ACCENTS[i % ACCENTS.length];

                        return (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                {/* Thumbnail */}
                                <div className="h-48 relative overflow-hidden flex-shrink-0" style={{ background: img ? undefined : accent }}>
                                    {img ? (
                                        <Image
                                            src={img}
                                            alt={post.title.replace(/<[^>]+>/g, '')}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <BookOpen className="w-12 h-12 text-white/50" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {readTime(post.description)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 font-medium">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" /> {formatDate(post.date)}
                                        </span>
                                    </div>
                                    <h3
                                        className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2 line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: post.title }}
                                    />
                                    <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                                        {excerpt}...
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                                        <span className="font-semibold text-gray-800 flex items-center gap-1.5"><User className="w-4 h-4 text-gray-400" /> {author}</span>
                                        <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            Read <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

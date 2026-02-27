// Server Component — NO "use client"
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';

interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
    };
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function BlogSection() {
    let posts: WPPost[] = [];
    try {
        const res = await fetch(
            'https://api.insanenotes.in/wp-json/wp/v2/posts?_embed=1&per_page=3&_fields=id,slug,title,excerpt,date,featured_media,_links',
            { next: { revalidate: 3600 } }
        );
        if (res.ok) posts = await res.json();
    } catch { /* silently fail */ }

    if (posts.length === 0) return null;

    return (
        <section className="py-20 px-4">
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

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {posts.map((post, idx) => {
                        const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                        const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 110) + '...';
                        const isFeatured = idx === 0;

                        return (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className={`group flex flex-col bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/8 hover:-translate-y-1 transition-all duration-300 ${isFeatured ? 'sm:col-span-1 ring-1 ring-indigo-100' : ''}`}
                            >
                                {/* Image */}
                                <div className="relative h-44 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden flex-shrink-0">
                                    {img ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={img}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpen className="w-10 h-10 text-indigo-200" />
                                        </div>
                                    )}
                                    {/* Gradient overlay at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/30 to-transparent" />
                                    {isFeatured && (
                                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wide shadow">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col gap-3">
                                    {/* Date */}
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {formatDate(post.date)}
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                    />

                                    {/* Excerpt */}
                                    <p className="text-sm text-gray-500 flex-1 line-clamp-3 leading-relaxed">
                                        {excerpt}
                                    </p>

                                    {/* Read More */}
                                    <div className="mt-1 inline-flex items-center gap-1.5 text-indigo-600 text-sm font-bold group-hover:gap-2.5 transition-all">
                                        Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

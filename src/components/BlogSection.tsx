// Server Component — NO "use client"
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getAllPosts } from '@/lib/mdx';
import { BlogCards, FeaturedCard } from '@/components/BlogCards';

export default function BlogSection() {
    // Fetch live posts and slice to latest 3
    const posts = getAllPosts().slice(0, 3);

    // Fallback if no posts
    if (posts.length === 0) return null;

    // Pick a featured post (latest) and the rest
    const featured = posts[0];
    const rest = posts.slice(1);

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

                {/* Responsive Grid with Featured Card */}
                <div className="flex flex-col gap-6">
                    {/* The main featured card, matching the /blog page aesthetic */}
                    <div className="w-full">
                        <FeaturedCard post={featured} />
                    </div>

                    {/* Rest of the recent posts */}
                    {rest.length > 0 && (
                        <div className="mt-2">
                            <BlogCards posts={rest} />
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

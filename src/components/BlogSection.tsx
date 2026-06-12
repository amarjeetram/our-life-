import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import BlogCards from './BlogCards';
import { getAllPosts } from '@/lib/mdx';
import { getLatestWPPosts } from '@/lib/wordpress';

export default async function BlogSection() {
    const localPosts = getAllPosts();
    const wpPosts = await getLatestWPPosts(10); // Fetch top 10 recent WordPress posts

    // Merge and sort all posts by date descending, taking the top 3 latest posts
    const posts = [...wpPosts, ...localPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Minimal Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-50/50 to-transparent rounded-full blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header Sequence matching User's requested style */}
                <div className="text-center max-w-2xl mx-auto mb-16 relative">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50 text-indigo-700 text-sm font-black uppercase tracking-widest mb-6">
                        <Sparkles className="w-4 h-4" /> Optimization Guides
                    </span>
                    <h2 className="text-4xl md:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                        Learn Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Mastery</span>
                    </h2>
                    <p className="text-[1.1rem] text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
                        In-depth tutorials, tool guides, and step-by-step documentation to perfectly reduce file size safely.
                    </p>
                </div>

                <BlogCards posts={posts} />

                <div className="mt-16 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-600 hover:border-indigo-200 font-bold text-[15px] transition-all duration-300 shadow-sm hover:shadow group"
                    >
                        <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                        View the Archive
                        <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

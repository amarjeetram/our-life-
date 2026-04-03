import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { getAllPosts } from '@/lib/mdx';
import { getLatestWPPosts } from '@/lib/wordpress';
import BlogCards from '@/components/BlogCards';

// EXPLICIT REVALIDATE - Critical for fast indexing while staying updated via ISR
export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Blog | Image Optimization Guides & Tutorials | SmartToolsWala',
    description: 'Expert guides, tutorials, and tips on image compression, resizing, and format conversion. Learn how to optimize your photos for web, applications, and documents.',
    alternates: { canonical: 'https://smarttoolswala.com/blog' },
    openGraph: {
        title: 'Blog | Image Optimization Guides & Tutorials',
        description: 'Expert guides, tutorials, and tips on image compression, resizing, and format conversion.',
        url: 'https://smarttoolswala.com/blog',
        type: 'website',
    }
};

export default async function BlogArchivePage() {
    const localPosts = getAllPosts();
    const wpPosts = await getLatestWPPosts(20); // Fetch top 20 recent WordPress posts

    // Merge and sort all posts by date descending
    const posts = [...wpPosts, ...localPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
            {/* Header / Hero Section */}
            <div className="bg-white border-b border-slate-200/60 pt-28 pb-20 relative">
                {/* Minimal Background Decor */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-indigo-50/80 to-transparent rounded-full blur-[80px] -z-10 -translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-12">
                        <ArrowLeft className="w-4 h-4" /> Back to Tools
                    </Link>

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[13px] font-black uppercase tracking-widest mb-6 shadow-sm">
                            <BookOpen className="w-4 h-4" /> Official Blog
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Insights</span> & Guides
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                            Master the art of digital optimization. Step-by-step tutorials on shrinking photos to exact KB sizes without losing quality.
                        </p>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
                <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-indigo-500" />
                        All Articles ({posts.length})
                    </h2>
                </div>

                <BlogCards posts={posts} />
            </div>
        </div>
    );
}

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
            <div className="bg-white border-b border-slate-200/60 pt-32 pb-24 relative overflow-hidden">
                {/* Visual Accent Backgrounds */}
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-50 via-purple-50/40 to-transparent rounded-full blur-[100px] -z-10 -translate-y-1/2"></div>
                <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-gradient-to-tr from-pink-50/60 to-transparent rounded-full blur-[80px] -z-10"></div>
                <div className="absolute inset-0 opacity-[0.03] -z-10" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors mb-10 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/60 px-4 py-2 rounded-2xl shadow-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Tools
                    </Link>

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-700 text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
                            <BookOpen className="w-4 h-4 text-indigo-600" /> SmartToolsWala Hub
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-black text-slate-900 tracking-tight leading-[1.08] mb-8">
                            Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Guides</span>, Tips & Ideas
                        </h1>

                        <p className="text-[17px] md:text-[19px] text-slate-600 font-medium leading-relaxed max-w-2xl">
                            Step-by-step tutorials and creative content to help you make the most of our digital tools. Learn how to design viral Instagram bios, extract YouTube tags, perform website audits, and compress images safely.
                        </p>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
                <BlogCards posts={posts} />
            </div>
        </div>
    );
}

"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Calendar, 
    User, 
    ArrowRight, 
    Play, 
    FileText, 
    Image as ImageIcon, 
    Search, 
    Compass, 
    Instagram, 
    Cpu, 
    Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '@/lib/mdx';

const getPostCategory = (post: Post) => {
    const title = post.title.toLowerCase();
    const slug = post.slug.toLowerCase();
    const tags = post.tags?.map(t => t.toLowerCase()) || [];

    if (
        title.includes('bio') || 
        slug.includes('bio') || 
        title.includes('instagram') || 
        slug.includes('instagram') ||
        title.includes('insta') ||
        slug.includes('insta') ||
        tags.some(t => t.includes('bio') || t.includes('instagram'))
    ) {
        return 'instagram-bio';
    }

    if (
        title.includes('prompt') || 
        slug.includes('prompt') || 
        title.includes('ai') || 
        slug.includes('ai') || 
        title.includes('gemini') || 
        slug.includes('gemini') ||
        tags.some(t => t.includes('prompt') || t.includes('ai') || t.includes('gemini'))
    ) {
        return 'ai-prompts';
    }

    if (
        title.includes('kb') || 
        slug.includes('kb') || 
        title.includes('mb') || 
        slug.includes('mb') || 
        title.includes('compress') || 
        slug.includes('compress') || 
        title.includes('resize') || 
        slug.includes('resize') || 
        title.includes('photo') || 
        slug.includes('photo') || 
        title.includes('image') || 
        slug.includes('image') ||
        title.includes('quality') ||
        title.includes('converter') ||
        tags.some(t => t.includes('compress') || t.includes('resize') || t.includes('photo') || t.includes('image'))
    ) {
        return 'image-tools';
    }

    return 'others';
};

export default function BlogCards({ posts }: { posts: Post[] }) {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Precompute categories counts
    const counts = useMemo(() => {
        const countsMap: Record<string, number> = {
            all: posts.length,
            'instagram-bio': 0,
            'ai-prompts': 0,
            'image-tools': 0,
            others: 0,
        };
        
        posts.forEach(post => {
            const cat = getPostCategory(post);
            countsMap[cat] += 1;
        });
        
        return countsMap;
    }, [posts]);

    const categories = [
        { id: 'all', label: 'All Articles', icon: Compass },
        { id: 'instagram-bio', label: 'Instagram Bio', icon: Instagram },
        { id: 'ai-prompts', label: 'AI Prompts', icon: Cpu },
        { id: 'image-tools', label: 'Image Tools', icon: ImageIcon },
        { id: 'others', label: 'Other Guides', icon: Sparkles },
    ];

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesCategory = activeTab === 'all' || getPostCategory(post) === activeTab;
            
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch = !query || 
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.author.toLowerCase().includes(query);
                
            return matchesCategory && matchesSearch;
        });
    }, [posts, activeTab, searchQuery]);

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">No tools or articles found</h3>
                <p className="text-gray-500 mt-2 text-sm">Check back soon for new photo optimization guides.</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Dynamic Title / Header Block */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                    <span>
                        {activeTab === 'all' ? 'All Articles' :
                         activeTab === 'instagram-bio' ? 'Instagram Bios' :
                         activeTab === 'ai-prompts' ? 'AI Prompts' :
                         activeTab === 'image-tools' ? 'Image Optimization' :
                         'Other Guides'}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </span>
                    <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full select-none">
                        {filteredPosts.length}
                    </span>
                </h2>
            </div>

            {/* Filter Tabs and Search Bar - Premium Layout */}
            <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-3xl p-4 sm:p-5 shadow-sm">
                
                {/* Scrollable Categories Row */}
                <div className="flex flex-wrap gap-2.5 items-center w-full xl:w-auto overflow-x-auto pb-1 xl:pb-0">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeTab === cat.id;
                        
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                suppressHydrationWarning
                                className={`relative px-4 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 cursor-pointer select-none border whitespace-nowrap
                                    ${isActive 
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100' 
                                        : 'bg-white/80 hover:bg-indigo-50/50 border-slate-200 text-slate-600 hover:text-indigo-600'
                                    }
                                `}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                <span>{cat.label}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black transition-colors
                                    ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}
                                `}>
                                    {counts[cat.id]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Search input field */}
                <div className="relative w-full xl:w-80">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        suppressHydrationWarning
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm"
                    />
                    <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            suppressHydrationWarning
                            className="absolute right-3.5 top-2.5 text-[11px] font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Empty State for results */}
            <AnimatePresence mode="wait">
                {filteredPosts.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-sm"
                    >
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">No articles matched your filter</h3>
                        <p className="text-slate-500 mt-2 text-sm">Try resetting your filters or search criteria.</p>
                        <button 
                            onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
                            suppressHydrationWarning
                            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-sm transition-all cursor-pointer"
                        >
                            Reset All Filters
                        </button>
                    </motion.div>
                ) : (
                    /* Animating grid of cards */
                    <motion.div 
                        layout="position"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence>
                            {filteredPosts.map((post, index) => {
                                return (
                                    <motion.div
                                        key={post.slug}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full"
                                    >
                                        <Link href={post.externalLink || `/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                            
                                            {/* Image Container with matching aesthetic */}
                                            <div className="aspect-video relative overflow-hidden bg-slate-50 flex items-center justify-center border-b border-slate-100">
                                                {post.image ? (
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 group-hover:scale-105 transition-transform duration-500">
                                                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <ImageIcon className="w-16 h-16 text-indigo-400/50" />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Floating Category Badge */}
                                                <div className="absolute top-4 left-4 z-10">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm border
                                                        ${getPostCategory(post) === 'instagram-bio' ? 'bg-pink-50 border-pink-100 text-pink-600' :
                                                          getPostCategory(post) === 'ai-prompts' ? 'bg-purple-50 border-purple-100 text-purple-600' :
                                                          getPostCategory(post) === 'image-tools' ? 'bg-sky-50 border-sky-100 text-sky-600' :
                                                          'bg-slate-50 border-slate-200 text-slate-600'}
                                                    `}>
                                                        {getPostCategory(post) === 'instagram-bio' ? 'Instagram Bio' :
                                                         getPostCategory(post) === 'ai-prompts' ? 'AI Prompt' :
                                                         getPostCategory(post) === 'image-tools' ? 'Image Tool' :
                                                         'Guide'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow relative">
                                                {/* Meta Info */}
                                                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1.5 text-indigo-600/80">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 shrink-0">
                                                        <User className="w-3.5 h-3.5" />
                                                        {post.author}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-[1.2rem] leading-[1.4] font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-3">
                                                    {post.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm leading-relaxed text-gray-600 mb-6 line-clamp-3 font-medium">
                                                    {post.description}
                                                </p>

                                                {/* Action Button */}
                                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1.5 group-hover:gap-2 transition-all">
                                                        Read Article
                                                        <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 transition-colors shadow-sm">
                                                        <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

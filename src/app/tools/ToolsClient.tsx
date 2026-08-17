"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    SlidersHorizontal,
    Sparkles,
    ArrowRight,
    Zap,
    Grid,
    Check,
    X,
    Filter,
    ArrowUpDown,
    ShieldCheck,
    Youtube,
    Instagram,
    Calculator,
    ArrowLeftRight,
    Calendar,
    Heart,
    ImageIcon,
} from "lucide-react";
import { ALL_TOOLS, CATEGORIES, Tool, ToolCategory } from "@/data/toolsData";

export default function ToolsClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [sortBy, setSortBy] = useState<"popular" | "new" | "alphabetical">("popular");
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    // Dynamic Filter & Sorting Logic
    const filteredTools = useMemo(() => {
        return ALL_TOOLS.filter((tool) => {
            const matchesSearch =
                tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory =
                selectedCategory === "All" || tool.category === selectedCategory;

            return matchesSearch && matchesCategory;
        }).sort((a, b) => {
            if (sortBy === "popular") {
                return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
            }
            if (sortBy === "new") {
                return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            }
            if (sortBy === "alphabetical") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-32 pb-24 relative overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none z-0">
                <div className="absolute top-0 left-1/3 w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[130px]" />
                <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-pink-500/15 rounded-full blur-[130px]" />
            </div>

            {/* Header Hero */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-xl bg-white/70 dark:bg-slate-900/80 border border-indigo-500/30 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-extrabold mb-6 shadow-sm">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span>Explore 100+ Free Online Utility Tools</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                        All Web & Utility Tools
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 font-medium">
                        Fast, free, and privacy-focused online utility tools. No signup, watermarks, or limits.
                    </p>

                    {/* Main Search Input */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative flex items-center rounded-2xl backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
                            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tools by name, tag, or topic (e.g. compress 20kb, youtube tags)..."
                                className="w-full px-3 py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="px-4 text-slate-400 hover:text-slate-600 text-xs font-bold"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sticky Sidebar Filter */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-28 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-6">
                            <div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-indigo-500" /> Categories
                                </h3>
                                <div className="space-y-1.5">
                                    <button
                                        onClick={() => setSelectedCategory("All")}
                                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                                            selectedCategory === "All"
                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                                        }`}
                                    >
                                        <span>All Tools</span>
                                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-current font-bold">
                                            {ALL_TOOLS.length}
                                        </span>
                                    </button>

                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                                                selectedCategory === cat.id
                                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25"
                                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                                            }`}
                                        >
                                            <span>{cat.label}</span>
                                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                                                {ALL_TOOLS.filter((t) => t.category === cat.id).length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Drawer Filter Trigger & Sort Bar */}
                    <main className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsMobileDrawerOpen(true)}
                                    className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                                >
                                    <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                                    Filter Categories ({selectedCategory})
                                </button>
                                <p className="text-sm font-semibold text-slate-500">
                                    Showing <span className="font-extrabold text-slate-900 dark:text-white">{filteredTools.length}</span> tools
                                </p>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                                <span className="text-xs font-bold text-slate-400">Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs px-3 py-2 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="popular">Popular First</option>
                                    <option value="new">Newest First</option>
                                    <option value="alphabetical">A – Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Tool Cards Grid */}
                        {filteredTools.length === 0 ? (
                            <div className="text-center py-16 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-white/10 p-8 shadow-sm">
                                <Zap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tools found</h3>
                                <p className="text-slate-500 text-sm mb-6">
                                    Try searching for a different keyword or select another category filter.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("All");
                                    }}
                                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md hover:bg-indigo-700"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {filteredTools.map((tool) => (
                                    <Link
                                        key={tool.id}
                                        href={tool.route}
                                        className="group relative flex flex-col justify-between backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 text-decoration-none overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/40 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 text-[11px] font-extrabold">
                                                    {tool.category}
                                                </span>
                                                {tool.isPopular && (
                                                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 text-[10px] font-black">
                                                        ★ POPULAR
                                                    </span>
                                                )}
                                                {tool.isNew && (
                                                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-black">
                                                        ✦ NEW
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                                                {tool.title}
                                            </h3>

                                            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                                                {tool.description}
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {tool.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 rounded-md bg-slate-100/70 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 text-[10px] font-bold"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-indigo-600 dark:text-indigo-400 text-xs font-extrabold group-hover:translate-x-1 transition-transform">
                                                <span>Try Tool Now</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileDrawerOpen && (
                <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-md lg:hidden">
                    <div className="w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Select Category</h3>
                                <button
                                    onClick={() => setIsMobileDrawerOpen(false)}
                                    className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-1.5">
                                <button
                                    onClick={() => {
                                        setSelectedCategory("All");
                                        setIsMobileDrawerOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold ${
                                        selectedCategory === "All"
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    <span>All Tools</span>
                                    <span>{ALL_TOOLS.length}</span>
                                </button>

                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setSelectedCategory(cat.id);
                                            setIsMobileDrawerOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold ${
                                            selectedCategory === cat.id
                                                ? "bg-indigo-600 text-white"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        }`}
                                    >
                                        <span>{cat.label}</span>
                                        <span>{ALL_TOOLS.filter((t) => t.category === cat.id).length}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

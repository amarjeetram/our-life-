"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Calendar,
    User,
    ArrowRight,
    FileText,
    Image as ImageIcon,
    Search,
    Compass,
    Instagram,
    Cpu,
    Sparkles,
    Clock,
    Flame,
    X,
    BookOpen,
    Zap,
    Star,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '@/lib/mdx';

/* ─── Constants ─── */
const POSTS_PER_PAGE = 9;

/* ─── Category Detection ─── */
const getPostCategory = (post: Post) => {
    const title = post.title.toLowerCase();
    const slug = post.slug.toLowerCase();
    const tags = post.tags?.map(t => t.toLowerCase()) || [];
    if (title.includes('bio') || slug.includes('bio') || title.includes('instagram') || slug.includes('instagram') || title.includes('insta') || slug.includes('insta') || tags.some(t => t.includes('bio') || t.includes('instagram'))) return 'instagram-bio';
    if (title.includes('prompt') || slug.includes('prompt') || title.includes('ai') || slug.includes('ai') || title.includes('gemini') || slug.includes('gemini') || tags.some(t => t.includes('prompt') || t.includes('ai') || t.includes('gemini'))) return 'ai-prompts';
    if (title.includes('kb') || slug.includes('kb') || title.includes('mb') || slug.includes('mb') || title.includes('compress') || slug.includes('compress') || title.includes('resize') || slug.includes('resize') || title.includes('photo') || slug.includes('photo') || title.includes('image') || slug.includes('image') || title.includes('quality') || title.includes('converter') || tags.some(t => t.includes('compress') || t.includes('resize') || t.includes('photo') || t.includes('image'))) return 'image-tools';
    if (title.includes('flames') || slug.includes('flames') || title.includes('love') || slug.includes('love') || title.includes('couple') || slug.includes('couple') || tags.some(t => t.includes('flames') || t.includes('love'))) return 'fun-tools';
    return 'others';
};

const CATEGORY_CONFIG: Record<string, {
    label: string; accent: string; glow: string; gradient: string;
    pillBg: string; pillText: string; pillBorder: string; icon: any;
}> = {
    'instagram-bio': { label: 'Instagram Bio', accent: '#ec4899', glow: 'rgba(236,72,153,0.25)', gradient: 'linear-gradient(135deg,#ec4899,#f43f5e)', pillBg: 'rgba(236,72,153,0.12)', pillText: '#f472b6', pillBorder: 'rgba(236,72,153,0.3)', icon: Instagram },
    'ai-prompts':    { label: 'AI Prompts',    accent: '#8b5cf6', glow: 'rgba(139,92,246,0.25)',  gradient: 'linear-gradient(135deg,#8b5cf6,#6366f1)', pillBg: 'rgba(139,92,246,0.12)',  pillText: '#a78bfa', pillBorder: 'rgba(139,92,246,0.3)',  icon: Cpu },
    'image-tools':   { label: 'Image Tools',   accent: '#0ea5e9', glow: 'rgba(14,165,233,0.25)',   gradient: 'linear-gradient(135deg,#0ea5e9,#06b6d4)', pillBg: 'rgba(14,165,233,0.12)',   pillText: '#38bdf8', pillBorder: 'rgba(14,165,233,0.3)',   icon: ImageIcon },
    'fun-tools':     { label: 'Fun Tools',     accent: '#f97316', glow: 'rgba(249,115,22,0.25)',   gradient: 'linear-gradient(135deg,#f97316,#ef4444)', pillBg: 'rgba(249,115,22,0.12)',   pillText: '#fb923c', pillBorder: 'rgba(249,115,22,0.3)',   icon: Flame },
    'others':        { label: 'Guide',         accent: '#64748b', glow: 'rgba(100,116,139,0.18)',  gradient: 'linear-gradient(135deg,#64748b,#475569)', pillBg: 'rgba(100,116,139,0.12)',  pillText: '#94a3b8', pillBorder: 'rgba(100,116,139,0.25)', icon: BookOpen },
};

const getReadingTime = (desc: string) => Math.max(2, Math.ceil(desc.split(/\s+/).length * 15 / 200));

/* ─── Featured Card ─── */
function FeaturedCard({ post }: { post: Post }) {
    const cfg = CATEGORY_CONFIG[getPostCategory(post)];
    const CategoryIcon = cfg.icon;
    const readTime = getReadingTime(post.description);
    return (
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bp-featured-root">
            <Link href={post.externalLink || `/blog/${post.slug}`} className="block h-full">
                <div className="bp-featured-inner" style={{ '--cat-glow': cfg.glow } as React.CSSProperties}>
                    <div className="bp-featured-glow" style={{ background: cfg.gradient }} />
                    <div className="bp-featured-layout">
                        {/* Left */}
                        <div className="bp-featured-left">
                            <div className="bp-feat-pills">
                                <span className="bp-pill bp-pill-star"><Star className="w-3 h-3" style={{ color: '#fbbf24' }} />Featured</span>
                                <span className="bp-pill" style={{ background: cfg.pillBg, color: cfg.pillText, border: `1px solid ${cfg.pillBorder}` }}>
                                    <CategoryIcon className="w-3 h-3" />{cfg.label}
                                </span>
                            </div>
                            <h2 className="bp-feat-title">{post.title}</h2>
                            <p className="bp-feat-desc">{post.description}</p>
                            <div className="bp-feat-footer">
                                <div className="bp-feat-meta">
                                    <span className="bp-meta-chip"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    <span className="bp-meta-chip"><Clock className="w-3 h-3" />{readTime} min read</span>
                                    <span className="bp-meta-chip"><User className="w-3 h-3" />{post.author}</span>
                                </div>
                                <span className="bp-feat-cta" style={{ background: cfg.gradient }}>Read Article <ArrowRight className="w-4 h-4 bp-feat-arrow" /></span>
                            </div>
                        </div>
                        {/* Right — image */}
                        <div className="bp-featured-right">
                            {post.image
                                ? <Image src={post.image} alt={post.title} fill sizes="(max-width:1024px) 100vw,45vw" className="bp-feat-img" priority />
                                : <div className="bp-feat-img-empty" style={{ background: cfg.gradient }}><CategoryIcon className="w-20 h-20" style={{ color: 'rgba(255,255,255,0.15)' }} /></div>
                            }
                            <div className="bp-feat-overlay" />
                            <div className="bp-feat-overlay2" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─── Regular Card ─── */
function RegularCard({ post, index }: { post: Post; index: number }) {
    const cfg = CATEGORY_CONFIG[getPostCategory(post)];
    const CategoryIcon = cfg.icon;
    const readTime = getReadingTime(post.description);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.35) }}
            className="bp-reg-root"
        >
            <Link href={post.externalLink || `/blog/${post.slug}`} className="block h-full">
                <div className="bp-reg-inner" style={{ '--cat-glow': cfg.glow } as React.CSSProperties}>
                    <div className="bp-reg-topline" style={{ background: cfg.gradient }} />
                    {/* Image */}
                    <div className="bp-reg-img-wrap">
                        {post.image
                            ? <><Image src={post.image} alt={post.title} fill sizes="(max-width:768px) 100vw,33vw" className="bp-reg-img" /><div className="bp-reg-img-fade" /></>
                            : <div className="bp-reg-img-empty" style={{ background: cfg.gradient }}><CategoryIcon className="w-12 h-12" style={{ color: 'rgba(255,255,255,0.2)' }} /></div>
                        }
                        <span className="bp-reg-pill" style={{ background: cfg.pillBg, color: cfg.pillText, border: `1px solid ${cfg.pillBorder}` }}>
                            <CategoryIcon className="w-2.5 h-2.5" />{cfg.label}
                        </span>
                        <span className="bp-reg-readtime"><Clock className="w-2.5 h-2.5" />{readTime} min</span>
                    </div>
                    {/* Body */}
                    <div className="bp-reg-body">
                        <div className="bp-reg-meta">
                            <span className="bp-reg-meta-item"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                            <span className="bp-reg-meta-dot" />
                            <span className="bp-reg-meta-item"><User className="w-3 h-3" />{post.author}</span>
                        </div>
                        <h3 className="bp-reg-title">{post.title}</h3>
                        <p className="bp-reg-desc">{post.description}</p>
                        <div className="bp-reg-cta">
                            <span className="bp-reg-cta-text" style={{ color: cfg.accent }}>Read Article</span>
                            <span className="bp-reg-cta-icon" style={{ background: cfg.gradient }}><ArrowRight className="w-3.5 h-3.5" /></span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─── Pagination Component ─── */
function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const getPages = (): (number | '…')[] => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages: (number | '…')[] = [];
        if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, '…', totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages);
        }
        return pages;
    };

    return (
        <div className="bp-pagination">
            {/* Left controls */}
            <div className="bp-pag-controls">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="bp-pag-btn bp-pag-icon-btn"
                    aria-label="First page"
                >
                    <ChevronsLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bp-pag-btn bp-pag-icon-btn"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
            </div>

            {/* Page numbers */}
            <div className="bp-pag-numbers">
                {getPages().map((page, idx) =>
                    page === '…' ? (
                        <span key={`ellipsis-${idx}`} className="bp-pag-ellipsis">…</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`bp-pag-btn bp-pag-num-btn ${currentPage === page ? 'bp-pag-active' : ''}`}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Right controls */}
            <div className="bp-pag-controls">
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bp-pag-btn bp-pag-icon-btn"
                    aria-label="Next page"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="bp-pag-btn bp-pag-icon-btn"
                    aria-label="Last page"
                >
                    <ChevronsRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

/* ─── Main BlogPageClient Component ─── */
export default function BlogPageClient({ posts }: { posts: Post[] }) {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const gridRef = useRef<HTMLDivElement>(null);

    const counts = useMemo(() => {
        const m: Record<string, number> = { all: posts.length, 'instagram-bio': 0, 'ai-prompts': 0, 'image-tools': 0, 'fun-tools': 0, others: 0 };
        posts.forEach(p => { m[getPostCategory(p)] += 1; });
        return m;
    }, [posts]);

    const categories = [
        { id: 'all',          label: 'All',         icon: Compass,   gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
        { id: 'instagram-bio',label: 'Instagram',   icon: Instagram,  gradient: 'linear-gradient(135deg,#ec4899,#f43f5e)' },
        { id: 'ai-prompts',   label: 'AI Prompts',  icon: Cpu,        gradient: 'linear-gradient(135deg,#8b5cf6,#6366f1)' },
        { id: 'image-tools',  label: 'Image Tools', icon: ImageIcon,  gradient: 'linear-gradient(135deg,#0ea5e9,#06b6d4)' },
        { id: 'fun-tools',    label: 'Fun Tools',   icon: Flame,      gradient: 'linear-gradient(135deg,#f97316,#ef4444)' },
        { id: 'others',       label: 'Guides',      icon: BookOpen,   gradient: 'linear-gradient(135deg,#64748b,#475569)' },
    ];

    /* Reset to page 1 when filter/search changes */
    const handleTabChange = useCallback((id: string) => {
        setActiveTab(id);
        setCurrentPage(1);
    }, []);

    const handleSearchChange = useCallback((q: string) => {
        setSearchQuery(q);
        setCurrentPage(1);
    }, []);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchCat = activeTab === 'all' || getPostCategory(post) === activeTab;
            const q = searchQuery.toLowerCase().trim();
            const matchSearch = !q || post.title.toLowerCase().includes(q) || post.description.toLowerCase().includes(q) || post.author.toLowerCase().includes(q);
            return matchCat && matchSearch;
        });
    }, [posts, activeTab, searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

    /* clamp page when filter changes */
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1);
    }, [totalPages, currentPage]);

    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(start, start + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        /* Smooth scroll to the grid area */
        setTimeout(() => {
            gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
    }, []);

    const featuredPost = paginatedPosts[0];
    const regularPosts = currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts;
    const showFeatured = currentPage === 1 && !!featuredPost;

    const startItem = (currentPage - 1) * POSTS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length);

    return (
        <div className="bp-root">
            {/* ── Filter Bar ── */}
            <div className="bp-filterbar">
                <div className="bp-filterbar-inner">
                    <div className="bp-tabs">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const isActive = activeTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => handleTabChange(cat.id)}
                                    suppressHydrationWarning
                                    className={`bp-tab-btn${isActive ? ' bp-tab-active' : ''}`}
                                    style={isActive ? {
                                        background: cat.gradient,
                                        borderColor: 'transparent',
                                        boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
                                    } : undefined}
                                >
                                    <Icon className="w-3.5 h-3.5" style={{ color: isActive ? '#fff' : '#475569' }} />
                                    {cat.label}
                                    {counts[cat.id] > 0 && (
                                        <span className="bp-tab-count" style={{
                                            background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                                            color: isActive ? '#fff' : '#475569',
                                        }}>{counts[cat.id]}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    {/* Search */}
                    <div className="bp-search-wrap">
                        <Search className="bp-search-icon w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={e => handleSearchChange(e.target.value)}
                            suppressHydrationWarning
                            className="bp-search-input"
                        />
                        {searchQuery && (
                            <button onClick={() => handleSearchChange('')} suppressHydrationWarning className="bp-search-clear">
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Count + Page Info ── */}
            <div ref={gridRef} className="bp-count-row">
                <span className="bp-count-badge">
                    <Zap className="w-3.5 h-3.5" />
                    {filteredPosts.length === 0
                        ? 'No articles found'
                        : `Showing ${startItem}–${endItem} of ${filteredPosts.length} articles`
                    }
                    {searchQuery && <span style={{ color: '#818cf8' }}> · "{searchQuery}"</span>}
                </span>
                {totalPages > 1 && (
                    <span className="bp-page-indicator">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        Page {currentPage} of {totalPages}
                    </span>
                )}
                <div className="bp-count-line" />
            </div>

            {/* ── Cards ── */}
            <AnimatePresence mode="wait">
                {filteredPosts.length === 0 ? (
                    <motion.div key="empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bp-empty">
                        <div className="bp-empty-icon"><FileText className="w-8 h-8" style={{ color: '#334155' }} /></div>
                        <h3 className="bp-empty-title">No articles found</h3>
                        <p className="bp-empty-sub">Try different keywords or reset your filters.</p>
                        <button onClick={() => { handleTabChange('all'); handleSearchChange(''); }} suppressHydrationWarning className="bp-empty-btn">
                            Reset Filters
                        </button>
                    </motion.div>
                ) : (
                    <motion.div key={`page-${currentPage}-${activeTab}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                        {/* Featured (only on page 1) */}
                        {showFeatured && <FeaturedCard post={featuredPost} />}

                        {/* Regular grid */}
                        {(showFeatured ? regularPosts : paginatedPosts).length > 0 && (
                            <div className="bp-grid">
                                {(showFeatured ? regularPosts : paginatedPosts).map((post, i) => (
                                    <RegularCard key={post.slug} post={post} index={i} />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Pagination ── */}
            {totalPages > 1 && filteredPosts.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {/* ══ Styles ══ */}
            <style>{`
                /* ═══════════════════════════════════════════════
                   BLOG PAGE CLIENT — Dark SaaS Design
                ═══════════════════════════════════════════════ */

                .bp-root { display: flex; flex-direction: column; gap: 1.25rem; }

                /* ── Filter Bar ── */
                .bp-filterbar {
                    position: sticky; top: 68px; z-index: 40;
                    background: rgba(10,12,20,0.92);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 18px; padding: 0.75rem 0.85rem;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                }
                .bp-filterbar-inner { display: flex; flex-direction: column; gap: 0.65rem; }
                /* Tabs: horizontal scroll on all sizes */
                .bp-tabs {
                    display: flex; flex-direction: row;
                    gap: 0.4rem; align-items: center;
                    overflow-x: auto; -webkit-overflow-scrolling: touch;
                    scroll-snap-type: x mandatory;
                    scrollbar-width: none; -ms-overflow-style: none;
                    padding-bottom: 2px;
                }
                .bp-tabs::-webkit-scrollbar { display: none; }
                .bp-tab-btn {
                    display: inline-flex; align-items: center; gap: 0.35rem;
                    padding: 0.42rem 0.8rem; border-radius: 10px;
                    font-size: 12px; font-weight: 700; border: 1px solid rgba(255,255,255,0.07);
                    color: #64748b;
                    background: rgba(255,255,255,0.04); cursor: pointer;
                    transition: all 0.22s ease; white-space: nowrap;
                    scroll-snap-align: start; flex-shrink: 0;
                    -webkit-tap-highlight-color: transparent;
                }
                /* Hover ONLY applies to non-active buttons */
                .bp-tab-btn:not(.bp-tab-active):hover {
                    background: rgba(99,102,241,0.1);
                    border-color: rgba(99,102,241,0.3);
                    color: #a5b4fc;
                }
                /* Active state via class — NOT overridden by hover */
                .bp-tab-btn.bp-tab-active {
                    color: #fff;
                }
                .bp-tab-count { font-size: 10px; font-weight: 800; padding: 0.1rem 0.4rem; border-radius: 6px; }

                /* ── Search ── */
                .bp-search-wrap { position: relative; width: 100%; flex-shrink: 0; }
                .bp-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #475569; pointer-events: none; }
                .bp-search-input {
                    width: 100%; background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
                    padding: 0.52rem 2.5rem 0.52rem 2.4rem; font-size: 13px;
                    font-weight: 500; color: #e2e8f0; outline: none; transition: all 0.25s;
                }
                .bp-search-input::placeholder { color: #334155; }
                .bp-search-input:focus { background: rgba(99,102,241,0.07); border-color: rgba(99,102,241,0.4); box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
                .bp-search-clear {
                    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
                    width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;
                    border-radius: 50%; background: rgba(255,255,255,0.08); color: #94a3b8;
                    cursor: pointer; border: none; transition: background 0.2s;
                }
                .bp-search-clear:hover { background: rgba(255,255,255,0.15); }

                /* ── Count Row ── */
                .bp-count-row { display: flex; align-items: center; gap: 0.75rem; scroll-margin-top: 90px; flex-wrap: wrap; }
                .bp-count-badge {
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    font-size: 11px; font-weight: 800; color: #64748b; white-space: nowrap;
                }
                .bp-count-badge svg { color: #6366f1; }
                .bp-page-indicator {
                    display: inline-flex; align-items: center; gap: 0.35rem;
                    font-size: 10px; font-weight: 700; color: #334155;
                    background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.15);
                    padding: 0.2rem 0.6rem; border-radius: 99px; white-space: nowrap;
                }
                .bp-page-indicator svg { color: #6366f1; }
                .bp-count-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(99,102,241,0.3), transparent); min-width: 20px; }

                /* ── Card Grid ── */
                .bp-grid {
                    display: grid; grid-template-columns: 1fr; gap: 1rem;
                }
                @media (min-width: 540px)  { .bp-grid { grid-template-columns: repeat(2,1fr); gap: 1rem; } }
                @media (min-width: 1024px) { .bp-grid { grid-template-columns: repeat(3,1fr); gap: 1.25rem; } }

                /* ════ FEATURED CARD ════ */
                .bp-featured-root { margin-bottom: 0.5rem; }
                .bp-featured-inner {
                    position: relative; border-radius: 20px; overflow: hidden;
                    background: #0d1117; border: 1px solid rgba(255,255,255,0.08);
                    transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s; min-height: 280px;
                }
                .bp-featured-inner:hover {
                    border-color: rgba(255,255,255,0.14);
                    box-shadow: 0 8px 48px var(--cat-glow,rgba(99,102,241,0.2)), 0 2px 12px rgba(0,0,0,0.5);
                    transform: translateY(-3px);
                }
                .bp-featured-glow {
                    position: absolute; top: -80px; left: -80px; width: 280px; height: 280px;
                    border-radius: 50%; filter: blur(80px); opacity: 0.18; pointer-events: none; z-index: 0;
                }
                .bp-featured-layout { position: relative; z-index: 1; display: flex; flex-direction: column; min-height: 280px; }
                @media (min-width: 1024px) { .bp-featured-layout { flex-direction: row; align-items: stretch; } }

                .bp-featured-left { display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; flex: 1; }
                @media (min-width: 768px) { .bp-featured-left { padding: 2.5rem; } }
                @media (min-width: 1024px) { .bp-featured-left { width: 55%; padding: 3rem; } }

                .bp-feat-pills { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.85rem; flex-wrap: wrap; }
                .bp-pill {
                    display: inline-flex; align-items: center; gap: 0.3rem;
                    padding: 0.25rem 0.65rem; border-radius: 999px;
                    font-size: 9px; font-weight: 800; letter-spacing: 0.06em;
                    text-transform: uppercase; backdrop-filter: blur(8px);
                }
                .bp-pill-star { background: rgba(251,191,36,0.12); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }

                .bp-feat-title {
                    font-size: clamp(1.15rem,3.5vw,1.9rem); font-weight: 900; color: #f1f5f9;
                    line-height: 1.25; letter-spacing: -0.02em; margin-bottom: 0.75rem;
                    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
                    transition: color 0.25s;
                }
                .bp-featured-inner:hover .bp-feat-title { color: #e0e7ff; }
                .bp-feat-desc {
                    font-size: 0.82rem; color: #475569; line-height: 1.65;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                    overflow: hidden; margin-bottom: 1.25rem; font-weight: 500;
                }
                @media (min-width: 768px) { .bp-feat-desc { -webkit-line-clamp: 3; margin-bottom: 2rem; font-size: 0.9rem; } }

                .bp-feat-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; }
                .bp-feat-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; }
                .bp-meta-chip {
                    display: inline-flex; align-items: center; gap: 0.3rem;
                    font-size: 10px; font-weight: 600; color: #334155;
                    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
                    padding: 0.2rem 0.5rem; border-radius: 8px;
                }
                .bp-feat-cta {
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    padding: 0.55rem 1.1rem;
                    border-radius: 10px; font-size: 12px; font-weight: 800; color: #fff;
                    transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.3); white-space: nowrap;
                }
                .bp-featured-inner:hover .bp-feat-cta { transform: scale(1.04); }
                .bp-feat-arrow { transition: transform 0.3s; }
                .bp-featured-inner:hover .bp-feat-arrow { transform: translateX(3px); }

                .bp-featured-right { position: relative; overflow: hidden; min-height: 190px; flex-shrink: 0; }
                @media (min-width: 1024px) { .bp-featured-right { width: 45%; min-height: unset; } }
                .bp-feat-img { object-fit: cover; transition: transform 0.7s, opacity 0.4s; opacity: 0.6; }
                .bp-featured-inner:hover .bp-feat-img { transform: scale(1.05); opacity: 0.75; }
                .bp-feat-img-empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.25; }
                .bp-feat-overlay { position: absolute; inset: 0; background: linear-gradient(180deg,rgba(13,17,23,0) 0%,rgba(13,17,23,0.6) 100%); pointer-events: none; }
                @media (min-width: 1024px) { .bp-feat-overlay { background: linear-gradient(90deg,#0d1117 0%,rgba(13,17,23,.7) 40%,rgba(13,17,23,.1) 100%); } }
                .bp-feat-overlay2 { position: absolute; inset: 0; background: rgba(7,9,15,0.35); pointer-events: none; }

                /* ════ REGULAR CARD ════ */
                .bp-reg-root { height: 100%; }
                .bp-reg-inner {
                    position: relative; display: flex; flex-direction: column; height: 100%;
                    border-radius: 18px; overflow: hidden; background: #0d1117;
                    border: 1px solid rgba(255,255,255,0.07); transition: all 0.3s;
                }
                .bp-reg-inner:hover {
                    border-color: rgba(255,255,255,0.13);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 40px var(--cat-glow,rgba(99,102,241,0.18)), 0 2px 12px rgba(0,0,0,0.5);
                }
                .bp-reg-topline {
                    position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    transform: scaleX(0); transform-origin: left; transition: transform 0.4s; z-index: 10;
                }
                .bp-reg-inner:hover .bp-reg-topline { transform: scaleX(1); }

                .bp-reg-img-wrap { position: relative; aspect-ratio: 16/9; overflow: hidden; background: #13161f; }
                .bp-reg-img { object-fit: cover; transition: transform 0.6s, opacity 0.4s; opacity: 0.7; }
                .bp-reg-inner:hover .bp-reg-img { transform: scale(1.06); opacity: 0.85; }
                .bp-reg-img-fade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,17,23,.55) 0%, transparent 60%); }
                .bp-reg-img-empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.2; }

                .bp-reg-pill {
                    position: absolute; top: 8px; left: 8px;
                    display: inline-flex; align-items: center; gap: 0.3rem;
                    padding: 0.22rem 0.55rem; border-radius: 999px;
                    font-size: 9px; font-weight: 800; letter-spacing: 0.06em;
                    text-transform: uppercase; backdrop-filter: blur(8px); z-index: 5;
                }
                .bp-reg-readtime {
                    position: absolute; bottom: 8px; right: 8px;
                    display: inline-flex; align-items: center; gap: 0.3rem;
                    padding: 0.22rem 0.55rem; border-radius: 999px;
                    font-size: 9px; font-weight: 800; color: #fff;
                    background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(8px); opacity: 0; transition: opacity 0.3s; z-index: 5;
                }
                .bp-reg-inner:hover .bp-reg-readtime { opacity: 1; }

                .bp-reg-body { padding: 1.1rem 1.2rem 1.2rem; display: flex; flex-direction: column; flex: 1; }
                .bp-reg-meta { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.6rem; }
                .bp-reg-meta-item { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 10px; font-weight: 600; color: #334155; }
                .bp-reg-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: #1e293b; }

                .bp-reg-title {
                    font-size: 0.9rem; font-weight: 800; color: #e2e8f0;
                    line-height: 1.4; letter-spacing: -0.01em; margin-bottom: 0.5rem;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                    transition: color 0.25s;
                }
                @media (min-width: 768px) { .bp-reg-title { font-size: 1rem; } }
                .bp-reg-inner:hover .bp-reg-title { color: #c7d2fe; }
                .bp-reg-desc {
                    font-size: 12px; color: #334155; line-height: 1.6;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                    overflow: hidden; margin-bottom: 1rem; flex: 1; font-weight: 500;
                }
                @media (min-width: 768px) { .bp-reg-desc { font-size: 13px; -webkit-line-clamp: 3; margin-bottom: 1.25rem; } }
                .bp-reg-cta { display: flex; align-items: center; justify-content: space-between; padding-top: 0.85rem; border-top: 1px solid rgba(255,255,255,0.05); }
                .bp-reg-cta-text { font-size: 10px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; transition: letter-spacing 0.25s; }
                .bp-reg-inner:hover .bp-reg-cta-text { letter-spacing: 0.07em; }
                .bp-reg-cta-icon {
                    width: 28px; height: 28px; border-radius: 7px;
                    display: flex; align-items: center; justify-content: center; color: #fff;
                    opacity: 0; transform: scale(0.75); transition: opacity 0.3s, transform 0.3s;
                }
                .bp-reg-inner:hover .bp-reg-cta-icon { opacity: 1; transform: scale(1); }

                /* On touch devices always show CTA icon */
                @media (hover: none) {
                    .bp-reg-cta-icon { opacity: 1; transform: scale(1); }
                    .bp-reg-readtime { opacity: 1; }
                }

                /* ══ PAGINATION ══ */
                .bp-pagination {
                    display: flex; align-items: center; justify-content: center;
                    gap: 0.4rem; padding: 2rem 0 0.5rem;
                    flex-wrap: wrap;
                }
                .bp-pag-controls { display: flex; align-items: center; gap: 0.3rem; }
                .bp-pag-numbers { display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap; justify-content: center; }

                .bp-pag-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    border: 1px solid rgba(255,255,255,0.08);
                    background: rgba(255,255,255,0.04);
                    color: #64748b; cursor: pointer;
                    font-size: 13px; font-weight: 700;
                    border-radius: 10px;
                    transition: all 0.22s ease;
                    -webkit-tap-highlight-color: transparent;
                }
                .bp-pag-btn:disabled { opacity: 0.28; cursor: not-allowed; pointer-events: none; }
                .bp-pag-btn:not(:disabled):hover {
                    background: rgba(99,102,241,0.12);
                    border-color: rgba(99,102,241,0.35);
                    color: #a5b4fc;
                }

                .bp-pag-icon-btn { width: 36px; height: 36px; }

                .bp-pag-num-btn { min-width: 36px; height: 36px; padding: 0 0.3rem; }

                .bp-pag-active {
                    background: linear-gradient(135deg,#6366f1,#8b5cf6) !important;
                    border-color: transparent !important;
                    color: #fff !important;
                    box-shadow: 0 4px 16px rgba(99,102,241,0.4);
                    transform: scale(1.05);
                }
                .bp-pag-ellipsis {
                    width: 36px; height: 36px;
                    display: inline-flex; align-items: center; justify-content: center;
                    color: #334155; font-size: 15px; font-weight: 700;
                    pointer-events: none; user-select: none;
                }

                /* ── Empty ── */
                .bp-empty {
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    padding: 4rem 1.5rem; background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px; text-align: center;
                }
                .bp-empty-icon { width: 52px; height: 52px; border-radius: 13px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
                .bp-empty-title { font-size: 1rem; font-weight: 800; color: #475569; margin-bottom: 0.35rem; }
                .bp-empty-sub { font-size: 13px; color: #1e293b; margin-bottom: 1.25rem; font-weight: 500; }
                .bp-empty-btn {
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    padding: 0.6rem 1.4rem; border-radius: 10px;
                    background: linear-gradient(135deg,#6366f1,#8b5cf6); color: #fff;
                    font-size: 13px; font-weight: 700; border: none; cursor: pointer;
                    transition: all 0.25s; box-shadow: 0 4px 16px rgba(99,102,241,0.3);
                }
                .bp-empty-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.45); }

                /* ── Mobile tweaks ── */
                @media (max-width: 480px) {
                    .bp-filterbar { padding: 0.65rem 0.75rem; border-radius: 16px; top: 60px; }
                    .bp-tab-btn { padding: 0.38rem 0.7rem; font-size: 11px; }
                    .bp-featured-left { padding: 1.25rem; }
                    .bp-feat-title { -webkit-line-clamp: 2; }
                    .bp-feat-cta { padding: 0.48rem 0.9rem; font-size: 11px; }
                    .bp-pag-icon-btn { width: 32px; height: 32px; }
                    .bp-pag-num-btn  { min-width: 32px; height: 32px; }
                    .bp-pag-ellipsis { width: 32px; height: 32px; }
                    .bp-count-badge { font-size: 10px; }
                }
            `}</style>
        </div>
    );
}

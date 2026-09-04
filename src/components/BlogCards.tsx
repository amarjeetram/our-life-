"use client";

import { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '@/lib/mdx';
import { getAuthorAvatar } from '@/lib/authors';

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
    label: string;
    accent: string;
    glow: string;
    gradient: string;
    pillBg: string;
    pillText: string;
    pillBorder: string;
    icon: any;
}> = {
    'instagram-bio': {
        label: 'Instagram Bio',
        accent: '#ec4899',
        glow: 'rgba(236,72,153,0.25)',
        gradient: 'linear-gradient(135deg,#ec4899,#f43f5e)',
        pillBg: 'rgba(236,72,153,0.12)',
        pillText: '#f472b6',
        pillBorder: 'rgba(236,72,153,0.3)',
        icon: Instagram,
    },
    'ai-prompts': {
        label: 'AI Prompts',
        accent: '#8b5cf6',
        glow: 'rgba(139,92,246,0.25)',
        gradient: 'linear-gradient(135deg,#8b5cf6,#6366f1)',
        pillBg: 'rgba(139,92,246,0.12)',
        pillText: '#a78bfa',
        pillBorder: 'rgba(139,92,246,0.3)',
        icon: Cpu,
    },
    'image-tools': {
        label: 'Image Tools',
        accent: '#0ea5e9',
        glow: 'rgba(14,165,233,0.25)',
        gradient: 'linear-gradient(135deg,#0ea5e9,#06b6d4)',
        pillBg: 'rgba(14,165,233,0.12)',
        pillText: '#38bdf8',
        pillBorder: 'rgba(14,165,233,0.3)',
        icon: ImageIcon,
    },
    'fun-tools': {
        label: 'Fun Tools',
        accent: '#f97316',
        glow: 'rgba(249,115,22,0.25)',
        gradient: 'linear-gradient(135deg,#f97316,#ef4444)',
        pillBg: 'rgba(249,115,22,0.12)',
        pillText: '#fb923c',
        pillBorder: 'rgba(249,115,22,0.3)',
        icon: Flame,
    },
    'others': {
        label: 'Guide',
        accent: '#64748b',
        glow: 'rgba(100,116,139,0.18)',
        gradient: 'linear-gradient(135deg,#64748b,#475569)',
        pillBg: 'rgba(100,116,139,0.12)',
        pillText: '#94a3b8',
        pillBorder: 'rgba(100,116,139,0.25)',
        icon: BookOpen,
    },
};

const getReadingTime = (description: string) => {
    const words = description.split(/\s+/).length * 15;
    return Math.max(2, Math.ceil(words / 200));
};

/* ─── Featured (Hero) Card ─── */
function FeaturedCard({ post }: { post: Post }) {
    const category = getPostCategory(post);
    const cfg = CATEGORY_CONFIG[category];
    const CategoryIcon = cfg.icon;
    const readTime = getReadingTime(post.description);
    const authorAvatar = getAuthorAvatar(post.author);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="featured-card-root"
        >
            <Link href={post.externalLink || `/blog/${post.slug}`} className="block h-full">
                <div className="featured-card-inner" style={{ '--cat-glow': cfg.glow } as React.CSSProperties}>
                    {/* glow halo */}
                    <div className="featured-card-glow" style={{ background: cfg.gradient }} />

                    <div className="featured-card-layout">
                        {/* Left — text */}
                        <div className="featured-card-left">
                            {/* pills */}
                            <div className="featured-card-pills">
                                <span className="pill pill-featured">
                                    <Star className="w-3 h-3" style={{ color: '#fbbf24' }} />
                                    Featured
                                </span>
                                <span className="pill" style={{
                                    background: cfg.pillBg,
                                    color: cfg.pillText,
                                    border: `1px solid ${cfg.pillBorder}`,
                                }}>
                                    <CategoryIcon className="w-3 h-3" />
                                    {cfg.label}
                                </span>
                            </div>

                            {/* title */}
                            <h2 className="featured-card-title">{post.title}</h2>

                            {/* description */}
                            <p className="featured-card-desc">{post.description}</p>

                            {/* meta + cta */}
                            <div className="featured-card-footer">
                                <div className="featured-card-meta">
                                    <span className="meta-chip">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                    <span className="meta-chip">
                                        <Clock className="w-3 h-3" />
                                        {readTime} min read
                                    </span>
                                    <span className="meta-chip">
                                        {authorAvatar ? (
                                            <Image src={authorAvatar} alt={post.author} width={14} height={14} className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-indigo-400/40 inline-block -ml-0.5" />
                                        ) : (
                                            <User className="w-3 h-3" />
                                        )}
                                        {post.author}
                                    </span>
                                </div>

                                <span className="featured-cta-btn" style={{ background: cfg.gradient }}>
                                    Read Article
                                    <ArrowRight className="w-4 h-4 featured-cta-arrow" />
                                </span>
                            </div>
                        </div>

                        {/* Right — image */}
                        <div className="featured-card-right">
                            {post.image ? (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width:1024px) 100vw, 45vw"
                                    className="featured-card-img"
                                    priority
                                />
                            ) : (
                                <div className="featured-card-img-placeholder" style={{ background: cfg.gradient }}>
                                    <CategoryIcon className="w-20 h-20" style={{ color: 'rgba(255,255,255,0.15)' }} />
                                </div>
                            )}
                            {/* strong overlay so image text doesn't bleed */}
                            <div className="featured-card-img-overlay" />
                            <div className="featured-card-img-overlay-2" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─── Regular Card ─── */
function RegularCard({ post, index }: { post: Post; index: number }) {
    const category = getPostCategory(post);
    const cfg = CATEGORY_CONFIG[category];
    const CategoryIcon = cfg.icon;
    const readTime = getReadingTime(post.description);
    const authorAvatar = getAuthorAvatar(post.author);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className="reg-card-root"
        >
            <Link href={post.externalLink || `/blog/${post.slug}`} className="block h-full">
                <div className="reg-card-inner" style={{ '--cat-accent': cfg.accent, '--cat-glow': cfg.glow } as React.CSSProperties}>
                    {/* top accent line */}
                    <div className="reg-card-topline" style={{ background: cfg.gradient }} />

                    {/* image */}
                    <div className="reg-card-img-wrap">
                        {post.image ? (
                            <>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width:768px) 100vw, 33vw"
                                    className="reg-card-img"
                                />
                                <div className="reg-card-img-gradient" />
                            </>
                        ) : (
                            <div className="reg-card-img-empty" style={{ background: cfg.gradient }}>
                                <CategoryIcon className="w-12 h-12" style={{ color: 'rgba(255,255,255,0.2)' }} />
                            </div>
                        )}

                        {/* pill on image */}
                        <span className="reg-card-pill" style={{
                            background: cfg.pillBg,
                            color: cfg.pillText,
                            border: `1px solid ${cfg.pillBorder}`,
                        }}>
                            <CategoryIcon className="w-2.5 h-2.5" />
                            {cfg.label}
                        </span>

                        {/* read time badge */}
                        <span className="reg-card-readtime">
                            <Clock className="w-2.5 h-2.5" />
                            {readTime} min
                        </span>
                    </div>

                    {/* body */}
                    <div className="reg-card-body">
                        {/* date + author */}
                        <div className="reg-card-meta">
                            <span className="reg-meta-item">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                            </span>
                            <span className="reg-meta-dot" />
                            <span className="reg-meta-item">
                                {authorAvatar ? (
                                    <Image src={authorAvatar} alt={post.author} width={14} height={14} className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-indigo-400/40 inline-block -ml-0.5" />
                                ) : (
                                    <User className="w-3 h-3" />
                                )}
                                {post.author}
                            </span>
                        </div>

                        {/* title */}
                        <h3 className="reg-card-title">{post.title}</h3>

                        {/* desc */}
                        <p className="reg-card-desc">{post.description}</p>

                        {/* cta */}
                        <div className="reg-card-cta">
                            <span className="reg-cta-text" style={{ color: cfg.accent }}>
                                Read Article
                            </span>
                            <span className="reg-cta-icon" style={{ background: cfg.gradient }}>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </div>

                    {/* glow border on hover */}
                    <div className="reg-card-glow-border" style={{ '--glow': cfg.glow } as React.CSSProperties} />
                </div>
            </Link>
        </motion.div>
    );
}

/* ─── BlogCards Main ─── */
export default function BlogCards({ posts }: { posts: Post[] }) {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const counts = useMemo(() => {
        const m: Record<string, number> = { all: posts.length, 'instagram-bio': 0, 'ai-prompts': 0, 'image-tools': 0, 'fun-tools': 0, others: 0 };
        posts.forEach(p => { m[getPostCategory(p)] += 1; });
        return m;
    }, [posts]);

    const categories = [
        { id: 'all', label: 'All', icon: Compass, gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
        { id: 'instagram-bio', label: 'Instagram', icon: Instagram, gradient: 'linear-gradient(135deg,#ec4899,#f43f5e)' },
        { id: 'ai-prompts', label: 'AI Prompts', icon: Cpu, gradient: 'linear-gradient(135deg,#8b5cf6,#6366f1)' },
        { id: 'image-tools', label: 'Image Tools', icon: ImageIcon, gradient: 'linear-gradient(135deg,#0ea5e9,#06b6d4)' },
        { id: 'fun-tools', label: 'Fun Tools', icon: Flame, gradient: 'linear-gradient(135deg,#f97316,#ef4444)' },
        { id: 'others', label: 'Guides', icon: BookOpen, gradient: 'linear-gradient(135deg,#64748b,#475569)' },
    ];

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesCategory = activeTab === 'all' || getPostCategory(post) === activeTab;
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.description.toLowerCase().includes(q) || post.author.toLowerCase().includes(q);
            return matchesCategory && matchesSearch;
        });
    }, [posts, activeTab, searchQuery]);

    const featuredPost = filteredPosts[0];
    const regularPosts = filteredPosts.slice(1);

    return (
        <div className="bc-root">
            {/* ── Filter Bar ── */}
            <div className="bc-filterbar">
                <div className="bc-filterbar-inner">
                    {/* category tabs */}
                    <div className="bc-tabs">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const isActive = activeTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    suppressHydrationWarning
                                    className={`bc-tab-btn${isActive ? ' bc-tab-active' : ''}`}
                                    style={isActive ? {
                                        background: cat.gradient,
                                        borderColor: 'transparent',
                                        boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
                                    } : undefined}
                                >
                                    <Icon className="w-3.5 h-3.5" style={{ color: isActive ? '#fff' : '#475569' }} />
                                    {cat.label}
                                    {counts[cat.id] > 0 && (
                                        <span className="bc-tab-count" style={{
                                            background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                                            color: isActive ? '#fff' : '#475569',
                                        }}>
                                            {counts[cat.id]}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* search */}
                    <div className="bc-search-wrap">
                        <Search className="bc-search-icon w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            suppressHydrationWarning
                            className="bc-search-input"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                suppressHydrationWarning
                                className="bc-search-clear"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Count label ── */}
            <div className="bc-count-row">
                <span className="bc-count-badge">
                    <Zap className="w-3.5 h-3.5" />
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
                    {searchQuery && <span style={{ color: '#818cf8' }}> · "{searchQuery}"</span>}
                </span>
                <div className="bc-count-line" />
            </div>

            {/* ── Cards ── */}
            <AnimatePresence mode="wait">
                {filteredPosts.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bc-empty"
                    >
                        <div className="bc-empty-icon">
                            <FileText className="w-8 h-8" style={{ color: '#334155' }} />
                        </div>
                        <h3 className="bc-empty-title">No articles found</h3>
                        <p className="bc-empty-sub">Try different keywords or reset your filters.</p>
                        <button
                            onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
                            suppressHydrationWarning
                            className="bc-empty-btn"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Featured */}
                        {featuredPost && <FeaturedCard post={featuredPost} />}

                        {/* Regular grid */}
                        {regularPosts.length > 0 && (
                            <div className="bc-regular-grid">
                                {regularPosts.map((post, i) => (
                                    <RegularCard key={post.slug} post={post} index={i} />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                /* ═══════════════════════════════════════════════
                   BLOG CARDS — SaaS Dark Design System
                ═══════════════════════════════════════════════ */

                /* ── Filter Bar ── */
                .bc-root { display: flex; flex-direction: column; gap: 1.25rem; }

                .bc-filterbar {
                    position: sticky;
                    top: 68px;
                    z-index: 40;
                    background: rgba(10, 12, 20, 0.92);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 18px;
                    padding: 0.75rem 0.85rem;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                }
                .bc-filterbar-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 0.65rem;
                }
                /* Tabs: horizontal scroll on all sizes */
                .bc-tabs {
                    display: flex;
                    flex-direction: row;
                    gap: 0.4rem;
                    align-items: center;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scroll-snap-type: x mandatory;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding-bottom: 2px;
                }
                .bc-tabs::-webkit-scrollbar { display: none; }
                .bc-tab-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    padding: 0.42rem 0.8rem;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: 700;
                    border: 1px solid rgba(255,255,255,0.07);
                    color: #64748b;
                    background: rgba(255,255,255,0.04);
                    cursor: pointer;
                    transition: all 0.22s ease;
                    white-space: nowrap;
                    scroll-snap-align: start;
                    flex-shrink: 0;
                    -webkit-tap-highlight-color: transparent;
                }
                /* Hover ONLY applies to non-active buttons */
                .bc-tab-btn:not(.bc-tab-active):hover {
                    background: rgba(99,102,241,0.08);
                    border-color: rgba(99,102,241,0.25);
                    color: #a5b4fc;
                }
                /* Active state via class — NOT overridden by hover */
                .bc-tab-btn.bc-tab-active {
                    color: #fff;
                }
                .bc-tab-count {
                    font-size: 10px;
                    font-weight: 800;
                    padding: 0.1rem 0.4rem;
                    border-radius: 6px;
                }

                /* ── Search ── */
                .bc-search-wrap {
                    position: relative;
                    width: 100%;
                    flex-shrink: 0;
                }
                .bc-search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #475569;
                    pointer-events: none;
                }
                .bc-search-input {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 0.55rem 2.5rem 0.55rem 2.4rem;
                    font-size: 13px;
                    font-weight: 500;
                    color: #e2e8f0;
                    outline: none;
                    transition: all 0.25s ease;
                }
                .bc-search-input::placeholder { color: #334155; }
                .bc-search-input:focus {
                    background: rgba(99,102,241,0.07);
                    border-color: rgba(99,102,241,0.4);
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
                }
                .bc-search-clear {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px; height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.08);
                    color: #94a3b8;
                    cursor: pointer;
                    border: none;
                    transition: background 0.2s;
                }
                .bc-search-clear:hover { background: rgba(255,255,255,0.15); }

                /* ── Count row ── */
                .bc-count-row {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                }
                .bc-count-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 12px;
                    font-weight: 800;
                    color: #64748b;
                    white-space: nowrap;
                }
                .bc-count-badge svg { color: #6366f1; }
                .bc-count-line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, rgba(99,102,241,0.3), transparent);
                }

                /* ════ FEATURED CARD ════ */
                .featured-card-root { margin-bottom: 0.5rem; }
                .featured-card-inner {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    background: #0d1117;
                    border: 1px solid rgba(255,255,255,0.08);
                    transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
                    min-height: 280px;
                }
                .featured-card-inner:hover {
                    border-color: rgba(255,255,255,0.14);
                    box-shadow: 0 8px 48px var(--cat-glow, rgba(99,102,241,0.2)), 0 2px 12px rgba(0,0,0,0.5);
                    transform: translateY(-3px);
                }
                .featured-card-glow {
                    position: absolute;
                    top: -80px; left: -80px;
                    width: 280px; height: 280px;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.18;
                    pointer-events: none;
                    z-index: 0;
                }
                .featured-card-layout {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    min-height: 280px;
                }
                @media (min-width: 1024px) {
                    .featured-card-layout { flex-direction: row; }
                }

                /* left */
                .featured-card-left {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 1.5rem;
                    flex: 1;
                }
                @media (min-width: 768px) {
                    .featured-card-left { padding: 2.5rem; }
                }
                @media (min-width: 1024px) {
                    .featured-card-left { width: 55%; padding: 3rem; }
                }

                .featured-card-pills {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-bottom: 1.25rem;
                    flex-wrap: wrap;
                }
                .pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    padding: 0.3rem 0.75rem;
                    border-radius: 999px;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    backdrop-filter: blur(8px);
                }
                .pill-featured {
                    background: rgba(251,191,36,0.12);
                    color: #fbbf24;
                    border: 1px solid rgba(251,191,36,0.3);
                }

                .featured-card-title {
                    font-size: clamp(1.15rem, 3.5vw, 1.9rem);
                    font-weight: 900;
                    color: #f1f5f9;
                    line-height: 1.25;
                    letter-spacing: -0.02em;
                    margin-bottom: 0.75rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.25s;
                }
                .featured-card-inner:hover .featured-card-title { color: #e0e7ff; }

                .featured-card-desc {
                    font-size: 0.82rem;
                    color: #475569;
                    line-height: 1.65;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin-bottom: 1.25rem;
                    font-weight: 500;
                }
                @media (min-width: 768px) {
                    .featured-card-desc { -webkit-line-clamp: 3; margin-bottom: 2rem; font-size: 0.9rem; }
                }

                .featured-card-footer {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.75rem;
                }
                .featured-card-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .meta-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-size: 10px;
                    font-weight: 600;
                    color: #334155;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.06);
                    padding: 0.2rem 0.5rem;
                    border-radius: 8px;
                }
                .featured-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.65rem 1.4rem;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: 0.01em;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    white-space: nowrap;
                }
                .featured-card-inner:hover .featured-cta-btn {
                    transform: scale(1.04);
                    box-shadow: 0 6px 24px rgba(0,0,0,0.4);
                }
                .featured-cta-arrow {
                    transition: transform 0.3s ease;
                }
                .featured-card-inner:hover .featured-cta-arrow { transform: translateX(3px); }

                /* right / image */
                .featured-card-right {
                    position: relative;
                    overflow: hidden;
                    min-height: 190px;
                    flex-shrink: 0;
                }
                @media (min-width: 1024px) {
                    .featured-card-right {
                        width: 45%;
                        min-height: unset;
                    }
                    .featured-card-layout {
                        align-items: stretch;
                    }
                }
                .featured-card-img {
                    object-fit: cover;
                    transition: transform 0.7s ease;
                    opacity: 0.6;
                }
                .featured-card-inner:hover .featured-card-img { transform: scale(1.05); opacity: 0.75; }
                .featured-card-img-placeholder {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.35;
                }
                /* bottom-to-top on mobile, left-to-right on desktop */
                .featured-card-img-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(13,17,23,0) 0%, rgba(13,17,23,0.6) 100%);
                    pointer-events: none;
                }
                @media (min-width: 1024px) {
                    .featured-card-img-overlay {
                        background: linear-gradient(90deg, #0d1117 0%, rgba(13,17,23,0.7) 40%, rgba(13,17,23,0.15) 100%);
                    }
                }
                /* dark overlay to suppress any bright image text / logos */
                .featured-card-img-overlay-2 {
                    position: absolute;
                    inset: 0;
                    background: rgba(7, 9, 15, 0.45);
                    pointer-events: none;
                }

                /* ════ REGULAR CARD GRID ════ */
                .bc-regular-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                @media (min-width: 540px) {
                    .bc-regular-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
                }
                @media (min-width: 1024px) {
                    .bc-regular-grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
                }

                .reg-card-root { height: 100%; }
                .reg-card-inner {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    background: #0d1117;
                    border: 1px solid rgba(255,255,255,0.07);
                    transition: all 0.35s ease;
                }
                .reg-card-inner:hover {
                    border-color: rgba(255,255,255,0.13);
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px var(--cat-glow, rgba(99,102,241,0.18)), 0 2px 12px rgba(0,0,0,0.5);
                }

                /* top accent line — appears on hover */
                .reg-card-topline {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.4s ease;
                    z-index: 10;
                }
                .reg-card-inner:hover .reg-card-topline { transform: scaleX(1); }

                /* image */
                .reg-card-img-wrap {
                    position: relative;
                    aspect-ratio: 16/9;
                    overflow: hidden;
                    background: #13161f;
                }
                .reg-card-img {
                    object-fit: cover;
                    transition: transform 0.6s ease, opacity 0.4s ease;
                    opacity: 0.7;
                }
                .reg-card-inner:hover .reg-card-img {
                    transform: scale(1.06);
                    opacity: 0.85;
                }
                .reg-card-img-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(13,17,23,0.6) 0%, transparent 60%);
                }
                .reg-card-img-empty {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.2;
                }

                /* badges on image */
                .reg-card-pill {
                    position: absolute;
                    top: 10px; left: 10px;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    padding: 0.25rem 0.65rem;
                    border-radius: 999px;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    backdrop-filter: blur(8px);
                    z-index: 5;
                }
                .reg-card-readtime {
                    position: absolute;
                    bottom: 10px; right: 10px;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    padding: 0.25rem 0.65rem;
                    border-radius: 999px;
                    font-size: 9px;
                    font-weight: 800;
                    color: #fff;
                    background: rgba(0,0,0,0.55);
                    border: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(8px);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 5;
                }
                .reg-card-inner:hover .reg-card-readtime { opacity: 1; }

                /* card body */
                .reg-card-body {
                    padding: 1.35rem 1.4rem 1.4rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
                .reg-card-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }
                .reg-meta-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-size: 11px;
                    font-weight: 600;
                    color: #334155;
                }
                .reg-meta-dot {
                    width: 3px; height: 3px;
                    border-radius: 50%;
                    background: #1e293b;
                }

                .reg-card-title {
                    font-size: 1rem;
                    font-weight: 800;
                    color: #e2e8f0;
                    line-height: 1.45;
                    letter-spacing: -0.015em;
                    margin-bottom: 0.65rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.25s;
                }
                .reg-card-inner:hover .reg-card-title { color: #c7d2fe; }

                .reg-card-desc {
                    font-size: 13px;
                    color: #334155;
                    line-height: 1.65;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin-bottom: 1.25rem;
                    flex: 1;
                    font-weight: 500;
                }

                .reg-card-cta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .reg-cta-text {
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    transition: letter-spacing 0.25s;
                }
                .reg-card-inner:hover .reg-cta-text { letter-spacing: 0.07em; }
                .reg-cta-icon {
                    width: 30px; height: 30px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    opacity: 0;
                    transform: scale(0.75);
                    transition: opacity 0.3s, transform 0.3s;
                }
                .reg-card-inner:hover .reg-cta-icon {
                    opacity: 1;
                    transform: scale(1);
                }

                /* glow border overlay */
                .reg-card-glow-border {
                    position: absolute;
                    inset: -1px;
                    border-radius: 20px;
                    pointer-events: none;
                    opacity: 0;
                    border: 1px solid transparent;
                    box-shadow: inset 0 0 0 1px var(--glow, rgba(99,102,241,0.3));
                    transition: opacity 0.35s;
                }
                .reg-card-inner:hover .reg-card-glow-border { opacity: 1; }

                /* On touch devices always show CTA elements */
                @media (hover: none) {
                    .reg-cta-icon { opacity: 1; transform: scale(1); }
                    .reg-card-readtime { opacity: 1; }
                }

                /* ── Empty State ── */
                .bc-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 5rem 2rem;
                    background: #0d1117;
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 24px;
                    text-align: center;
                }
                .bc-empty-icon {
                    width: 56px; height: 56px;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.25rem;
                }
                .bc-empty-title {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #475569;
                    margin-bottom: 0.4rem;
                }
                .bc-empty-sub {
                    font-size: 13px;
                    color: #1e293b;
                    margin-bottom: 1.5rem;
                    font-weight: 500;
                }
                .bc-empty-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1.4rem;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: #fff;
                    font-size: 13px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 16px rgba(99,102,241,0.3);
                }
                .bc-empty-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(99,102,241,0.45);
                }

                @media (max-width: 480px) {
                    .bc-filterbar { padding: 0.65rem 0.75rem; border-radius: 16px; top: 60px; }
                    .bc-tab-btn { padding: 0.38rem 0.7rem; font-size: 11px; }
                    .featured-card-left { padding: 1.25rem; }
                    .featured-card-title { -webkit-line-clamp: 2; }
                }
            `}</style>
        </div>
    );
}

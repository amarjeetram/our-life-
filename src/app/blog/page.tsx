import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { getAllPosts } from '@/lib/mdx';
import { getLatestWPPosts } from '@/lib/wordpress';
import BlogPageClient from '@/components/BlogPageClient';

// ISR — refresh every hour
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
    // 50 = one WP API page (max _embed per_page). Pagination is handled client-side.
    const wpPosts = await getLatestWPPosts(50);

    // Merge + sort all posts by date descending
    const posts = [...wpPosts, ...localPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="blog-page-root">
            {/* ══ Hero / Header ══ */}
            <div className="blog-hero">
                {/* ambient orbs */}
                <div className="blog-hero-orb blog-hero-orb-1" />
                <div className="blog-hero-orb blog-hero-orb-2" />
                <div className="blog-hero-orb blog-hero-orb-3" />
                <div className="blog-hero-grid" />

                <div className="blog-hero-inner">
                    {/* Back link */}
                    <Link href="/" className="blog-hero-back">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tools
                    </Link>

                    {/* eyebrow */}
                    <div className="blog-hero-eyebrow">
                        <span className="blog-hero-eyebrow-icon">
                            <BookOpen className="w-3.5 h-3.5" />
                        </span>
                        <span>SmartToolsWala Hub</span>
                        <span className="blog-hero-eyebrow-sep" />
                        <span className="blog-hero-eyebrow-sub">Knowledge Base</span>
                    </div>

                    {/* heading */}
                    <h1 className="blog-hero-heading">
                        Ultimate{' '}
                        <span className="blog-hero-gradient">Guides</span>,<br />
                        Tips <span className="blog-hero-outline">&amp; Ideas</span>
                    </h1>

                    {/* subtext */}
                    <p className="blog-hero-sub">
                        Step-by-step tutorials and creative content to help you make the most
                        of our digital tools — from viral Instagram bios to image compression
                        mastery and beyond.
                    </p>

                    {/* stats row */}
                    <div className="blog-hero-stats">
                        <div className="blog-hero-stat">
                            <TrendingUp className="w-4 h-4 blog-hero-stat-icon" />
                            <span className="blog-hero-stat-num">{posts.length}+</span>
                            <span className="blog-hero-stat-lbl">Articles</span>
                        </div>
                        <div className="blog-hero-stat-div" />
                        <div className="blog-hero-stat">
                            <Sparkles className="w-4 h-4 blog-hero-stat-icon" />
                            <span className="blog-hero-stat-num">50K+</span>
                            <span className="blog-hero-stat-lbl">Monthly Readers</span>
                        </div>
                        <div className="blog-hero-stat-div" />
                        <div className="blog-hero-stat">
                            <Zap className="w-4 h-4 blog-hero-stat-icon" />
                            <span className="blog-hero-stat-num">Weekly</span>
                            <span className="blog-hero-stat-lbl">New Content</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ Articles + Pagination ══ */}
            <div className="blog-page-content">
                <BlogPageClient posts={posts} />
            </div>

            <style>{`
                /* ═══════════════════════════════════════════
                   BLOG ARCHIVE PAGE — Dark SaaS Theme
                ═══════════════════════════════════════════ */

                .blog-page-root {
                    background: #07090f;
                    min-height: 100vh;
                }

                /* ── Hero ── */
                .blog-hero {
                    position: relative;
                    padding: 9rem 1.5rem 5rem;
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }
                .blog-hero-orb {
                    position: absolute; border-radius: 50%;
                    filter: blur(100px); pointer-events: none;
                }
                .blog-hero-orb-1 {
                    width: 700px; height: 700px;
                    background: radial-gradient(circle,#6366f1,transparent 70%);
                    top: -250px; right: -100px; opacity: 0.2;
                }
                .blog-hero-orb-2 {
                    width: 500px; height: 500px;
                    background: radial-gradient(circle,#8b5cf6,transparent 70%);
                    bottom: -150px; left: -100px; opacity: 0.14;
                }
                .blog-hero-orb-3 {
                    width: 350px; height: 350px;
                    background: radial-gradient(circle,#ec4899,transparent 70%);
                    top: 40%; left: 40%; opacity: 0.08;
                }
                .blog-hero-grid {
                    position: absolute; inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
                    background-size: 60px 60px;
                }

                .blog-hero-inner {
                    position: relative; z-index: 10;
                    max-width: 860px; margin: 0 auto;
                }

                .blog-hero-back {
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    font-size: 11px; font-weight: 800; text-transform: uppercase;
                    letter-spacing: 0.08em; color: #475569;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 0.45rem 1rem; border-radius: 10px;
                    text-decoration: none;
                    transition: all 0.25s;
                    margin-bottom: 2.5rem;
                }
                .blog-hero-back:hover {
                    color: #a5b4fc;
                    background: rgba(99,102,241,0.1);
                    border-color: rgba(99,102,241,0.3);
                }

                .blog-hero-eyebrow {
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    padding: 0.4rem 1rem 0.4rem 0.6rem; border-radius: 999px;
                    background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.28);
                    color: #a5b4fc; font-size: 11px; font-weight: 800;
                    letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 2rem;
                }
                .blog-hero-eyebrow-icon {
                    display: flex; align-items: center; justify-content: center;
                    width: 22px; height: 22px; border-radius: 50%;
                    background: linear-gradient(135deg,#6366f1,#8b5cf6); color: #fff;
                }
                .blog-hero-eyebrow-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(165,180,252,0.35); }
                .blog-hero-eyebrow-sub { color: #818cf8; }

                .blog-hero-heading {
                    font-size: clamp(2.6rem,6vw,4.25rem); font-weight: 900; color: #f1f5f9;
                    line-height: 1.07; letter-spacing: -0.035em; margin-bottom: 1.5rem;
                }
                .blog-hero-gradient {
                    background: linear-gradient(135deg,#818cf8 0%,#c084fc 55%,#f472b6 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
                .blog-hero-outline {
                    -webkit-text-stroke: 1.5px rgba(148,163,184,0.45); color: transparent;
                }

                .blog-hero-sub {
                    font-size: 1.05rem; color: #475569; line-height: 1.75;
                    max-width: 600px; font-weight: 500; margin-bottom: 2.5rem;
                }

                .blog-hero-stats {
                    display: inline-flex; align-items: center; gap: 0;
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px; padding: 0.85rem 2rem;
                }
                .blog-hero-stat { display: flex; align-items: center; gap: 0.5rem; padding: 0 1.5rem; }
                .blog-hero-stat:first-child { padding-left: 0; }
                .blog-hero-stat:last-child  { padding-right: 0; }
                .blog-hero-stat-icon { color: #818cf8; }
                .blog-hero-stat-num  { font-size: 1rem; font-weight: 800; color: #e2e8f0; letter-spacing: -0.02em; }
                .blog-hero-stat-lbl  { font-size: 0.7rem; font-weight: 600; color: #334155; text-transform: uppercase; letter-spacing: 0.06em; }
                .blog-hero-stat-div  { width: 1px; height: 28px; background: rgba(255,255,255,0.07); }

                /* ── Content area ── */
                .blog-page-content {
                    max-width: 1280px; margin: 0 auto;
                    padding: 3rem 1.5rem 6rem;
                }

                @media (max-width: 640px) {
                    .blog-hero { padding: 7rem 1.25rem 3.5rem; }
                    .blog-hero-stats { flex-direction: column; gap: 1rem; padding: 1.25rem 1.75rem; }
                    .blog-hero-stat { padding: 0; }
                    .blog-hero-stat-div { width: 40px; height: 1px; }
                }
            `}</style>
        </div>
    );
}

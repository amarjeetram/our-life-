import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles, Zap, TrendingUp } from 'lucide-react';
import BlogCards from './BlogCards';
import { getAllPosts } from '@/lib/mdx';
import { getLatestWPPosts } from '@/lib/wordpress';

export default async function BlogSection() {
    const localPosts = getAllPosts();
    const wpPosts = await getLatestWPPosts(10);

    const posts = [...wpPosts, ...localPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    if (!posts || posts.length === 0) return null;

    return (
        <section className="blog-section-wrapper">
            {/* ── Ambient Background ── */}
            <div className="blog-bg-ambient" aria-hidden="true">
                <div className="blog-bg-orb blog-bg-orb-1" />
                <div className="blog-bg-orb blog-bg-orb-2" />
                <div className="blog-bg-orb blog-bg-orb-3" />
                <div className="blog-bg-grid" />
            </div>

            <div className="blog-section-inner">
                {/* ── Section Header ── */}
                <div className="blog-header">
                    {/* eyebrow badge */}
                    <div className="blog-eyebrow-badge">
                        <span className="blog-eyebrow-icon">
                            <Zap className="w-3.5 h-3.5" />
                        </span>
                        <span>Knowledge Hub</span>
                        <span className="blog-eyebrow-dot" />
                        <span className="blog-eyebrow-live">Latest Articles</span>
                    </div>

                    {/* heading */}
                    <h2 className="blog-heading">
                        Explore Our{' '}
                        <span className="blog-heading-gradient">Expert</span>
                        <br />
                        <span className="blog-heading-outline">Guides & Tutorials</span>
                    </h2>

                    {/* subtext */}
                    <p className="blog-subtext">
                        In-depth tutorials, tool guides, and step-by-step documentation
                        crafted by our team to help you master every feature.
                    </p>

                    {/* stats strip */}
                    <div className="blog-stats-strip">
                        <div className="blog-stat-item">
                            <TrendingUp className="w-4 h-4 blog-stat-icon" />
                            <span className="blog-stat-num">50K+</span>
                            <span className="blog-stat-label">Monthly Readers</span>
                        </div>
                        <div className="blog-stat-divider" />
                        <div className="blog-stat-item">
                            <Sparkles className="w-4 h-4 blog-stat-icon" />
                            <span className="blog-stat-num">100+</span>
                            <span className="blog-stat-label">Expert Articles</span>
                        </div>
                        <div className="blog-stat-divider" />
                        <div className="blog-stat-item">
                            <BookOpen className="w-4 h-4 blog-stat-icon" />
                            <span className="blog-stat-num">5 min</span>
                            <span className="blog-stat-label">Avg. Read Time</span>
                        </div>
                    </div>
                </div>

                {/* ── Cards ── */}
                <BlogCards posts={posts} />

                {/* ── CTA ── */}
                <div className="blog-cta-wrap">
                    <Link href="/blog" className="blog-cta-btn">
                        <BookOpen className="w-5 h-5" />
                        <span>Explore All Articles</span>
                        <span className="blog-cta-arrow">
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                    <p className="blog-cta-note">New articles published every week</p>
                </div>
            </div>

            <style>{`
                /* ═══════════════════════════════════════════════════
                   BLOG SECTION — SaaS Dark Theme
                ═══════════════════════════════════════════════════ */

                .blog-section-wrapper {
                    position: relative;
                    padding: 7rem 0 6rem;
                    background: #07090f;
                    overflow: hidden;
                }

                /* ── Ambient Background ── */
                .blog-bg-ambient {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }
                .blog-bg-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    opacity: 0.22;
                }
                .blog-bg-orb-1 {
                    width: 700px; height: 700px;
                    background: radial-gradient(circle, #6366f1, transparent 70%);
                    top: -200px; left: -150px;
                }
                .blog-bg-orb-2 {
                    width: 550px; height: 550px;
                    background: radial-gradient(circle, #8b5cf6, transparent 70%);
                    bottom: -150px; right: -100px;
                    opacity: 0.18;
                }
                .blog-bg-orb-3 {
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, #ec4899, transparent 70%);
                    top: 50%; right: 25%;
                    transform: translateY(-50%);
                    opacity: 0.08;
                }
                .blog-bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 60px 60px;
                }

                /* ── Layout ── */
                .blog-section-inner {
                    position: relative;
                    z-index: 10;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* ── Header ── */
                .blog-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                /* eyebrow */
                .blog-eyebrow-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.4rem 1rem 0.4rem 0.6rem;
                    border-radius: 999px;
                    background: rgba(99, 102, 241, 0.12);
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    color: #a5b4fc;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    margin-bottom: 1.75rem;
                }
                .blog-eyebrow-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 22px; height: 22px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: #fff;
                }
                .blog-eyebrow-dot {
                    width: 3px; height: 3px;
                    border-radius: 50%;
                    background: rgba(165, 180, 252, 0.4);
                }
                .blog-eyebrow-live {
                    color: #818cf8;
                }

                /* heading */
                .blog-heading {
                    font-size: clamp(2.4rem, 5vw, 3.75rem);
                    font-weight: 900;
                    color: #f1f5f9;
                    line-height: 1.08;
                    letter-spacing: -0.03em;
                    margin-bottom: 1.25rem;
                }
                .blog-heading-gradient {
                    background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .blog-heading-outline {
                    -webkit-text-stroke: 1.5px rgba(148, 163, 184, 0.5);
                    color: transparent;
                }

                /* subtext */
                .blog-subtext {
                    font-size: 1.05rem;
                    color: #64748b;
                    max-width: 520px;
                    margin: 0 auto 2.5rem;
                    line-height: 1.7;
                    font-weight: 500;
                }

                /* stats strip */
                .blog-stats-strip {
                    display: inline-flex;
                    align-items: center;
                    gap: 0;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    padding: 0.85rem 2rem;
                }
                .blog-stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0 1.5rem;
                }
                .blog-stat-item:first-child { padding-left: 0; }
                .blog-stat-item:last-child  { padding-right: 0; }
                .blog-stat-icon { color: #818cf8; }
                .blog-stat-num {
                    font-size: 1rem;
                    font-weight: 800;
                    color: #e2e8f0;
                    letter-spacing: -0.02em;
                }
                .blog-stat-label {
                    font-size: 0.72rem;
                    font-weight: 600;
                    color: #475569;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                }
                .blog-stat-divider {
                    width: 1px;
                    height: 28px;
                    background: rgba(255,255,255,0.08);
                }

                /* ── CTA ── */
                .blog-cta-wrap {
                    margin-top: 4rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.85rem;
                }
                .blog-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.85rem 2rem;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: #fff;
                    font-size: 0.9rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 24px rgba(99, 102, 241, 0.35);
                    position: relative;
                    overflow: hidden;
                }
                .blog-cta-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #818cf8, #c084fc);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .blog-cta-btn:hover::before { opacity: 1; }
                .blog-cta-btn > * { position: relative; z-index: 1; }
                .blog-cta-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.5);
                }
                .blog-cta-arrow {
                    display: flex;
                    align-items: center;
                    transition: transform 0.3s ease;
                }
                .blog-cta-btn:hover .blog-cta-arrow { transform: translateX(4px); }
                .blog-cta-note {
                    font-size: 0.78rem;
                    color: #334155;
                    font-weight: 500;
                }

                @media (max-width: 640px) {
                    .blog-section-wrapper { padding: 4.5rem 0 4rem; }
                    .blog-stats-strip {
                        flex-direction: column;
                        gap: 1rem;
                        padding: 1.25rem 1.75rem;
                    }
                    .blog-stat-item { padding: 0; }
                    .blog-stat-divider { width: 40px; height: 1px; }
                }
            `}</style>
        </section>
    );
}

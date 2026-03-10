import { Metadata } from 'next';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';
import { FeaturedCard, BlogCards } from '@/components/BlogCards';
import { getAllPosts, type MDXPost } from '@/lib/mdx';

export const metadata: Metadata = {
    title: 'Blog – Image Compression Tips & Guides | SmartToolsWala',
    description: 'Read expert articles on image compression, photo resizing for TNPSC, UPSC, SSC and bank exams. Learn how to compress photos to 20KB–50KB online free.',
    alternates: { canonical: 'https://smarttoolswala.com/blog' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
        title: 'Blog – Image Compression Tips & Guides',
        description: 'Expert articles on image compression, photo resizing for TNPSC, UPSC, SSC and bank exams.',
        url: 'https://smarttoolswala.com/blog',
        type: 'website',
        siteName: 'SmartToolsWala',
    },
};

// Force dynamic rendering — never statically cache this page on Vercel
export const dynamic = 'force-dynamic';
export const revalidate = 0;


export default async function BlogPage() {
    const posts: MDXPost[] = getAllPosts();
    const featured = posts[0] ?? null;
    const rest = posts.slice(1);

    return (
        <div style={{ minHeight: '100vh', background: '#f8faff', fontFamily: 'system-ui, sans-serif' }}>

            {/* ── HERO ── */}
            <div style={{
                background: 'linear-gradient(160deg, #f8faff 0%, #ede9fe 60%, #faf5ff 100%)',
                borderBottom: '1px solid #e8eaf0',
                padding: '88px 20px 64px',
                textAlign: 'center',
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                    border: '1px solid #c7d2fe', borderRadius: '100px',
                    padding: '6px 16px', marginBottom: '20px',
                    fontSize: '13px', fontWeight: 700, color: '#6366f1',
                }}>
                    <BookOpen size={14} /> Blog &amp; Resources
                </div>
                <h1 style={{
                    fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900,
                    color: '#0f172a', letterSpacing: '-0.04em',
                    lineHeight: 1.1, marginBottom: '16px'
                }}>
                    Tips, Guides &amp;{' '}
                    <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Tutorials
                    </span>
                </h1>
                <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                    Helpful articles on image compression, sizing for government forms, and web optimization. Curated for Indian students &amp; professionals.
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '36px', flexWrap: 'wrap' }}>
                    {[
                        { icon: <BookOpen size={15} />, label: `${posts.length} Articles` },
                        { icon: <TrendingUp size={15} />, label: 'Weekly Updates' },
                        { icon: <Clock size={15} />, label: '2–5 min reads' },
                    ].map(s => (
                        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                            <span style={{ color: '#6366f1' }}>{s.icon}</span> {s.label}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 20px 80px' }}>

                {posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '22px',
                            background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px', color: '#6366f1'
                        }}>
                            <BookOpen size={32} />
                        </div>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>No posts yet</h2>
                        <p style={{ color: '#94a3b8' }}>We&apos;re working on great content. Check back soon!</p>
                    </div>
                ) : (
                    <>
                        {/* Featured */}
                        {featured && (
                            <div style={{ marginBottom: '52px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                                    <div style={{ height: '3px', width: '28px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '100px' }} />
                                    <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6366f1' }}>Featured Article</span>
                                </div>
                                <FeaturedCard post={featured} />
                            </div>
                        )}

                        {/* All posts */}
                        {rest.length > 0 && (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                                    <div style={{ height: '3px', width: '28px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '100px' }} />
                                    <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6366f1' }}>All Articles</span>
                                </div>
                                <BlogCards posts={rest} />
                            </>
                        )}

                        {/* CTA */}
                        <div style={{
                            marginTop: '64px', padding: '48px 36px', textAlign: 'center',
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                            borderRadius: '28px',
                        }}>
                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#818cf8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Try Our Tool</p>
                            <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, color: '#f8fafc', marginBottom: '12px', letterSpacing: '-0.03em' }}>
                                Compress Your Image Now
                            </h2>
                            <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '26px' }}>
                                Free, fast, no signup. Perfect for UPSC, SSC &amp; banking forms.
                            </p>
                            <a href="/compress-image-to-20kb" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: '#fff', fontWeight: 800, fontSize: '15px',
                                padding: '14px 32px', borderRadius: '14px',
                                boxShadow: '0 4px 20px rgba(99,102,241,0.45)',
                                textDecoration: 'none', letterSpacing: '-0.01em'
                            }}>
                                Compress to 20KB — Free →
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

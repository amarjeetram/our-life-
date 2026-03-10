"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, BookOpen, Clock } from 'lucide-react';

import { type MDXPost } from '@/lib/mdx';

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
}

function stripHtml(html: string) {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, '').replace(/\[&hellip;\]/g, '...').replace(/&#8230;/g, '...').trim();
}

function readTime(excerpt: string) {
    if (!excerpt) return '2 min read';
    const cleanText = stripHtml(excerpt);
    const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
    const time = Math.max(1, Math.ceil(wordCount / 200));
    return time + ' min read';
}

const ACCENTS = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
    'linear-gradient(135deg, #0ea5e9, #6366f1)',
    'linear-gradient(135deg, #ec4899, #8b5cf6)',
    'linear-gradient(135deg, #10b981, #0ea5e9)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
];

export function FeaturedCard({ post }: { post: MDXPost }) {
    const img = post.image;

    return (
        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div
                className="featured-card-grid"
                style={{
                    borderRadius: '28px', overflow: 'hidden',
                    background: '#fff', border: '1px solid #e8eaf0',
                    boxShadow: '0 4px 32px rgba(99,102,241,0.10)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 48px rgba(99,102,241,0.18)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 32px rgba(99,102,241,0.10)';
                }}
            >
                {/* Image */}
                <div
                    className="featured-card-image"
                    style={{ background: img ? undefined : ACCENTS[0] }}
                >
                    {img ? (
                        <Image
                            src={img}
                            alt={post.title.replace(/<[^>]+>/g, '')}
                            fill
                            priority
                            sizes="(max-width: 640px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <BookOpen size={48} color="rgba(255,255,255,0.6)" />
                        </div>
                    )}
                    <div style={{
                        position: 'absolute', top: '16px', left: '16px',
                        background: 'rgba(99,102,241,0.88)', backdropFilter: 'blur(8px)',
                        color: '#fff', fontSize: '11px', fontWeight: 800,
                        padding: '5px 12px', borderRadius: '100px', letterSpacing: '0.05em'
                    }}>FEATURED</div>
                </div>

                {/* Content */}
                <div className="featured-card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginBottom: '14px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Calendar size={12} /> {formatDate(post.date)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Clock size={12} /> {readTime(post.description)}
                        </span>
                    </div>
                    <h2
                        style={{ fontSize: 'clamp(17px, 2.5vw, 24px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.3, marginBottom: '12px', letterSpacing: '-0.02em' }}
                        dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75, marginBottom: '24px' }}>
                        {stripHtml(post.description).slice(0, 160)}...
                    </p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6366f1', fontWeight: 800, fontSize: '14px' }}>
                        Read Article <ArrowRight size={15} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function BlogCards({ posts }: { posts: MDXPost[] }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '22px' }}>
            {posts.map((post, i) => {
                const img = post.image;
                const author = post.author || 'SmartToolsWala';
                const excerpt = stripHtml(post.description).slice(0, 130);
                const accent = ACCENTS[(i + 1) % ACCENTS.length];

                return (
                    <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex' }}>
                        <div
                            style={{
                                borderRadius: '22px', overflow: 'hidden',
                                background: '#fff', border: '1px solid #e8eaf0',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                width: '100%', display: 'flex', flexDirection: 'column'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 36px rgba(99,102,241,0.15)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                            }}
                        >
                            {/* Thumbnail */}
                            <div style={{ height: '190px', background: img ? undefined : accent, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                                {img ? (
                                    <Image
                                        src={img}
                                        alt={post.title.replace(/<[^>]+>/g, '')}
                                        fill
                                        loading="lazy"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        style={{ objectFit: 'cover', transition: 'transform 0.4s' }}
                                    />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                        <BookOpen size={34} color="rgba(255,255,255,0.5)" />
                                    </div>
                                )}
                                <div style={{
                                    position: 'absolute', bottom: '10px', right: '10px',
                                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                                    color: '#fff', fontSize: '11px', fontWeight: 700,
                                    padding: '4px 10px', borderRadius: '100px',
                                    display: 'flex', alignItems: 'center', gap: '4px'
                                }}>
                                    <Clock size={10} /> {readTime(post.description)}
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={11} /> {formatDate(post.date)}
                                    </span>
                                    <span>·</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <User size={11} /> {author}
                                    </span>
                                </div>
                                <h2
                                    style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', lineHeight: 1.4, marginBottom: '8px', letterSpacing: '-0.01em' }}
                                    dangerouslySetInnerHTML={{ __html: post.title }}
                                />
                                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, flex: 1 }}>
                                    {excerpt}...
                                </p>
                                <div style={{
                                    marginTop: '16px', paddingTop: '12px',
                                    borderTop: '1px solid #f1f5f9',
                                    display: 'flex', justifyContent: 'flex-end',
                                    gap: '5px', fontSize: '13px', fontWeight: 700, color: '#6366f1',
                                    alignItems: 'center'
                                }}>
                                    Read more <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

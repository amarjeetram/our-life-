"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Search, Copy, CheckCircle2, ShieldAlert, Loader2, ArrowRight, Eye, ThumbsUp, MessageSquare, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function YoutubeDescriptionClient() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ title: string, description: string, stats: { views: string, likes: string, comments: string } } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copiedContent, setCopiedContent] = useState<'title' | 'description' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url) {
            toast.error('Please enter a YouTube video URL');
            return;
        }

        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            toast.error('Please enter a valid YouTube link');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        setCopiedContent(null);

        try {
            const res = await fetch('/api/extract-youtube-description', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to extract data');
            }

            if (data.title || data.description) {
                setResult(data);
                toast.success('Successfully extracted video details!');
            } else {
                setError(data.message || 'No title or description found for this URL.');
            }

        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string, type: 'title' | 'description') => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopiedContent(type);
            toast.success(`${type === 'title' ? 'Title' : 'Description'} copied to clipboard!`);
            setTimeout(() => setCopiedContent(null), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
            toast.error('Failed to copy text');
        }
    };

    return (
        <div className="w-full">
            {/* Input Section */}
            <div style={{
                background: "#ffffff", borderRadius: "24px", padding: "clamp(24px, 5vw, 40px)",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
                marginBottom: "32px", position: "relative", overflow: "hidden"
            }}>
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "6px",
                    background: "linear-gradient(90deg, #ef4444, #dc2626)"
                }} />

                <div className="text-center mb-8">
                    <div style={{
                        width: "64px", height: "64px", borderRadius: "20px",
                        background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 16px", color: "white",
                        boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)"
                    }}>
                        <Youtube size={32} />
                    </div>
                    <h2 style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 800, color: "#1e293b", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                        YouTube Description Extractor
                    </h2>
                    <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
                        Paste any YouTube Video or Shorts URL below to instantly extract its title, description, and metadata.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter a YouTube URL..."
                            title="Paste YouTube URL"
                            disabled={loading}
                            required
                            style={{
                                width: "100%", padding: "18px 24px 18px 48px",
                                borderRadius: "16px", border: "2px solid #e2e8f0",
                                fontSize: "16px", outline: "none", transition: "all 0.2s",
                                color: "#1e293b", background: url ? "#fff" : "#f8fafc"
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.background = '#fff'; }}
                            onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !url}
                        style={{
                            padding: "0 32px", height: "64px", borderRadius: "16px",
                            background: loading || !url ? "#cbd5e1" : "linear-gradient(135deg, #ef4444, #dc2626)",
                            color: "#fff", fontWeight: 700, fontSize: "16px",
                            border: "none", cursor: loading || !url ? "not-allowed" : "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                            transition: "all 0.2s", boxShadow: loading || !url ? "none" : "0 8px 20px -6px rgba(239, 68, 68, 0.5)",
                            minWidth: "160px",
                            flexShrink: 0
                        }}
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <>Extract <ArrowRight size={18} /></>}
                    </button>
                </form>

                {error && (
                    <div style={{
                        marginTop: "24px", padding: "16px", borderRadius: "12px", background: "#fef2f2",
                        border: "1px solid #fee2e2", display: "flex", alignItems: "flex-start", gap: "12px",
                        color: "#991b1b", maxWidth: "2xl", margin: "24px auto 0"
                    }}>
                        <ShieldAlert size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
                        <p style={{ fontSize: "14px", lineHeight: 1.5 }}>
                            <strong>Extraction Failed:</strong> <br />
                            {error}
                        </p>
                    </div>
                )}
            </div>

            {/* Empty State */}
            {!result && !loading && !error && (
                <div style={{
                    background: "#ffffff", borderRadius: "24px", padding: "60px 20px",
                    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)", border: "1px dashed #cbd5e1",
                    textAlign: "center"
                }}>
                    <Youtube size={48} color="#cbd5e1" style={{ margin: "0 auto 16px" }} />
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>Nothing to display yet!</h3>
                    <p style={{ color: "#94a3b8", fontSize: "15px" }}>Enter a YouTube URL above to extract the title and description.</p>
                </div>
            )}

            {/* Results Section */}
            {result && !loading && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                    {/* Stats Bar */}
                    <div style={{
                        display: "flex", flexWrap: "wrap", gap: "16px", padding: "20px",
                        background: "#fff", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
                    }}>
                        <div style={{ flex: "1 1 auto", display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                            <div style={{ background: "#e0e7ff", padding: "8px", borderRadius: "8px", color: "#4f46e5" }}><Eye size={20} /></div>
                            <div>
                                <div style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Views</div>
                                <div style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>{result.stats.views || 'N/A'}</div>
                            </div>
                        </div>
                        <div style={{ flex: "1 1 auto", display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                            <div style={{ background: "#fce7f3", padding: "8px", borderRadius: "8px", color: "#db2777" }}><ThumbsUp size={20} /></div>
                            <div>
                                <div style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Likes</div>
                                <div style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>{result.stats.likes || 'N/A'}</div>
                            </div>
                        </div>
                        <div style={{ flex: "1 1 auto", display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                            <div style={{ background: "#dcfce3", padding: "8px", borderRadius: "8px", color: "#16a34a" }}><MessageSquare size={20} /></div>
                            <div>
                                <div style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Comments</div>
                                <div style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>{result.stats.comments || 'N/A'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Title Section */}
                    <div style={{
                        background: "#ffffff", borderRadius: "24px", padding: "clamp(20px, 4vw, 32px)",
                        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)"
                    }}>
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: 0, alignSelf: "center" }}>
                                Video Title
                            </h3>
                            <button
                                onClick={() => copyToClipboard(result.title, 'title')}
                                style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    padding: "8px 16px", borderRadius: "10px", border: "none",
                                    background: copiedContent === 'title' ? "#10b981" : "#f1f5f9",
                                    color: copiedContent === 'title' ? "#fff" : "#475569", fontWeight: 600, fontSize: "13px",
                                    cursor: "pointer", transition: "all 0.2s"
                                }}
                            >
                                {copiedContent === 'title' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                {copiedContent === 'title' ? 'Copied!' : 'Copy Title'}
                            </button>
                        </div>
                        <p style={{
                            fontSize: "18px", color: "#0f172a", lineHeight: 1.5, fontWeight: 500,
                            padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0"
                        }}>
                            {result.title || "No title found"}
                        </p>
                    </div>

                    {/* Description Section */}
                    <div style={{
                        background: "#ffffff", borderRadius: "24px", padding: "clamp(20px, 4vw, 32px)",
                        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)"
                    }}>
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: 0, alignSelf: "center" }}>
                                Video Description
                            </h3>
                            <button
                                onClick={() => copyToClipboard(result.description, 'description')}
                                style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    padding: "8px 16px", borderRadius: "10px", border: "none",
                                    background: copiedContent === 'description' ? "#10b981" : "#ef4444",
                                    color: "#fff", fontWeight: 600, fontSize: "13px",
                                    cursor: "pointer", transition: "all 0.2s"
                                }}
                            >
                                {copiedContent === 'description' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                {copiedContent === 'description' ? 'Copied Description!' : 'Copy Description'}
                            </button>
                        </div>
                        <div style={{
                            fontSize: "15px", color: "#334155", lineHeight: 1.6,
                            padding: "20px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0",
                            maxHeight: "500px", overflowY: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word"
                        }}>
                            {result.description || "No description found"}
                        </div>
                    </div>

                </div>
            )}

            {/* ── Are you a happy user? Card ── */}
            <AnimatePresence>
                {(result || error) && (
                    <motion.div
                        key="happy-user-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden', marginTop: '24px' }}
                    >
                        <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '16px 24px' }}>
                            <p style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Are you a happy user? 😊</p>
                        </div>
                        <div className="ci-happy-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Use our other tools</span>
                            <div className="ci-happy-btns" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {[
                                    { href: '/youtube-tag-extractor', label: 'YouTube Tags' },
                                    { href: '/youtube-title-generator', label: 'YouTube Title' },
                                    { href: '/stylish-couple-name-maker', label: 'Couple Names' },
                                    { href: '/mb-to-kb-image-converter', label: 'MB to KB' },
                                ].map(t => (
                                    <Link key={t.href} href={t.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                                    ><Zap size={12} /> {t.label}</Link>
                                ))}
                            </div>
                        </div>
                        <div className="ci-happy-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Support Our Work ❤️</span>
                            <Link href="/donate" style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                            >☕ Donate</Link>
                        </div>
                        <div className="ci-happy-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Sharing is caring 🤝</span>
                            <div className="ci-happy-btns" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}` },
                                    { label: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}&text=Free+useful+tools` },
                                    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent('Check out this tool: ' + (typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com'))}` },
                                    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}` },
                                ].map(s => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                                    >{s.label}</a>
                                ))}
                            </div>
                        </div>
                        <div className="ci-happy-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Come back! 🔖</span>
                            <button onClick={() => alert('Press Ctrl+D (or ⌘+D on Mac) to bookmark this page!')} style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                            >🔖 Bookmark Page</button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', flexWrap: 'wrap', gap: '12px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151', flex: 1 }}>Send Feedback ✉️</span>
                            <Link href="/contact-us" style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                            >✉️ Contact us</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

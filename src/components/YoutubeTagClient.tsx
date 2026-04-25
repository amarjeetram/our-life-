"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Search, Copy, CheckCircle2, ShieldAlert, Loader2, ArrowRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function YoutubeTagClient() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [extractedVideoId, setExtractedVideoId] = useState<string | null>(null);

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
        setTags([]);
        setCopiedAll(false);
        
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
        setExtractedVideoId(match ? match[1] : null);

        try {
            const res = await fetch('/api/extract-youtube-tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to extract tags');
            }

            if (data.tags && data.tags.length > 0) {
                setTags(data.tags);
                toast.success(`Successfully extracted ${data.tags.length} tags!`);
            } else {
                setError(data.message || 'No tags found. The creator might not have added any public tags to this video.');
            }

        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const copyAllTags = () => {
        if (tags.length === 0) return;
        const tagText = tags.join(', ');
        copyToClipboard(tagText);
        setCopiedAll(true);
        toast.success('All tags copied to clipboard!');
        setTimeout(() => setCopiedAll(false), 2000);
    };

    const copySingleTag = (tag: string, index: number) => {
        copyToClipboard(tag);
        setCopiedIndex(index);
        toast.success(`Copied: "${tag}"`);
        setTimeout(() => setCopiedIndex(null), 1500);
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
                    <p style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                        YouTube Tag Extractor Tool
                    </p>
                    <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
                        Paste any YouTube Video or Shorts URL below to instantly reveal its hidden tags and keywords.
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
                            placeholder="https://www.youtube.com/watch?v=..."
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

            {/* Tags Result Grid */}
            {tags.length > 0 && !loading && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    
                    {/* Video Thumbnail */}
                    {extractedVideoId && (
                        <div style={{ width: "100%", height: "250px", background: "#0f172a", position: "relative", overflow: "hidden", borderRadius: "24px", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)" }}>
                             <img src={`https://img.youtube.com/vi/${extractedVideoId}/maxresdefault.jpg`} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, filter: "blur(8px)", transform: "scale(1.1)" }} alt="Video Background" />
                             <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "linear-gradient(to top, rgba(15,23,42,0.8), rgba(15,23,42,0.2))" }}>
                                 <img src={`https://img.youtube.com/vi/${extractedVideoId}/maxresdefault.jpg`} style={{ height: "100%", borderRadius: "12px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", border: "4px solid rgba(255,255,255,0.1)", objectFit: "cover" }} alt="Video Thumbnail" />
                             </div>
                        </div>
                    )}

                    <div style={{
                        background: "#ffffff", borderRadius: "24px", padding: "clamp(24px, 5vw, 40px)",
                        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)"
                    }}>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div>
                            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", marginBottom: "4px" }}>
                                Extracted Tags <span style={{ color: "#ef4444", background: "#fee2e2", padding: "2px 8px", borderRadius: "100px", fontSize: "14px", verticalAlign: "middle", marginLeft: "8px" }}>{tags.length}</span>
                            </h3>
                            <p style={{ fontSize: "14px", color: "#64748b" }}>Click individual tags to copy, or copy all at once.</p>
                        </div>

                        <button
                            onClick={copyAllTags}
                            style={{
                                display: "flex", alignItems: "center", gap: "8px",
                                padding: "10px 20px", borderRadius: "12px", border: "none",
                                background: copiedAll ? "#10b981" : "#f1f5f9",
                                color: copiedAll ? "#fff" : "#475569", fontWeight: 600, fontSize: "14px",
                                cursor: "pointer", transition: "all 0.2s"
                            }}
                        >
                            {copiedAll ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                            {copiedAll ? 'Copied All!' : 'Copy All Tags'}
                        </button>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {tags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => copySingleTag(tag, index)}
                                style={{
                                    padding: "8px 16px", borderRadius: "100px",
                                    border: copiedIndex === index ? "1px solid #10b981" : "1px solid #e2e8f0",
                                    background: copiedIndex === index ? "#ecfdf5" : "#ffffff",
                                    color: copiedIndex === index ? "#059669" : "#334155",
                                    fontSize: "14px", fontWeight: 500, cursor: "pointer",
                                    transition: "all 0.1s ease",
                                    display: "flex", alignItems: "center", gap: "6px"
                                }}
                                onMouseEnter={(e) => {
                                    if (copiedIndex !== index) {
                                        e.currentTarget.style.borderColor = '#94a3b8';
                                        e.currentTarget.style.background = '#f8fafc';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (copiedIndex !== index) {
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                        e.currentTarget.style.background = '#ffffff';
                                    }
                                }}
                            >
                                {tag}
                                {copiedIndex === index && <CheckCircle2 size={14} />}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px dashed #e2e8f0" }}>
                        <p style={{ fontSize: "13px", color: "#94a3b8" }}>
                            <strong>Comma separated list:</strong> <br />
                            <span style={{ userSelect: "all", display: "inline-block", marginTop: "8px", padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", width: "100%", wordBreak: "break-all" }}>
                                {tags.join(", ")}
                            </span>
                        </p>
                    </div>
                    </div>
                </div>
            )}

            {/* ── Are you a happy user? Card ── */}
            <AnimatePresence>
                {(tags.length > 0 || error) && (
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
                                    { href: '/youtube-description-extractor', label: 'YT Description' },
                                    { href: '/youtube-title-generator', label: 'YT Title' },
                                    { href: '/stylish-couple-name-maker', label: 'Couple Names' },
                                    { href: '/compress-image-to-20kb', label: 'Compress Image' },
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

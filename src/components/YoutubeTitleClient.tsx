"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Copy, Check, AlertCircle, Loader2, Youtube, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ExtractionResult {
    title: string;
    thumbnail?: string;
}

export default function YoutubeTitleClient() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ExtractionResult | null>(null);
    const [error, setError] = useState('');
    const [hasCopied, setHasCopied] = useState(false);

    const handleExtract = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError('Please enter a YouTube URL');
            return;
        }

        setIsLoading(true);
        setError('');
        setResult(null);
        setHasCopied(false);

        try {
            const response = await fetch('/api/extract-youtube-title', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to extract title');
            }

            setResult(data);

            // Auto-scroll slightly to show results
            setTimeout(() => {
                window.scrollBy({ top: 300, behavior: 'smooth' });
            }, 100);

        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (!result?.title) return;

        try {
            await navigator.clipboard.writeText(result.title);
            setHasCopied(true);
            toast.success('Title copied to clipboard!');
            setTimeout(() => setHasCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy text');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">

            {/* Header Area */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100"
                >
                    <Youtube className="w-10 h-10 text-red-500" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    YouTube Title <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Extractor</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Instantly extract and copy the correct video title from any YouTube video. Just paste the URL below!
                </p>
            </div>

            {/* Input Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 mb-12"
            >
                <form onSubmit={handleExtract} className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste YouTube video URL here (e.g., https://www.youtube.com/watch?v=...)"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !url}
                        className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[160px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Extracting...
                            </>
                        ) : (
                            'Extract Title'
                        )}
                    </button>
                </form>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 overflow-hidden"
                        >
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="font-medium text-sm">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Results Area */}
            <AnimatePresence mode="wait">
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden"
                    >
                        {/* Video Thumbnail Header */}
                        {result.thumbnail && (
                            <div className="w-full h-48 md:h-64 bg-slate-900 relative overflow-hidden hidden md:block">
                                <img
                                    src={result.thumbnail}
                                    alt="Video Thumbnail"
                                    className="w-full h-full object-cover opacity-50 blur-sm scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-t from-slate-900/80 to-transparent">
                                    <img
                                        src={result.thumbnail}
                                        alt="Video Thumbnail"
                                        className="h-full rounded-xl shadow-2xl border-4 border-white/10"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-slate-900">Extracted Title</h3>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${hasCopied
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                                        }`}
                                >
                                    {hasCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {hasCopied ? 'Copied!' : 'Copy Title'}
                                </button>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative group">
                                <p className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                                    {result.title}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                    { href: '/youtube-description-extractor', label: 'YT Description' },
                                    { href: '/stylish-couple-name-maker', label: 'Couple Names' },
                                    { href: '/image-compressor-to-20kb', label: 'Compress Image' },
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

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Copy, Heart, Hash, RefreshCcw, CheckCircle2, Zap, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// --- Unicode Font Maps ---
const FONTS = {
    normal: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    bold: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
    script: "𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
    fraktur: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
    doubleStruck: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
    aesthetic: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
};

const EMOJIS = ["❤️", "💕", "✨", "💍", "💑", "🧿", "💫", "💖", "💘", "🥰"];

const MEANINGS = [
    "A connection written in the stars ✨",
    "Two souls, perfectly aligned 💫",
    "An unbreakable bond of love ❤️",
    "A melody of two beating hearts 🎵",
    "Destined forever and always 🕊️",
    "A rare and beautiful romance 🌹",
    "The perfect blend of passion 💖",
    "Endless warmth and deep affection 🥰",
    "A journey of together forever 💑",
    "True love's ultimate match 💘",
    "A glowing spark that never fades 🔥",
    "Two halves of the very same soul 💕"
];

const applyFont = (text: string, fontKey: keyof typeof FONTS) => {
    if (fontKey === 'normal') return text;
    const targetMap = FONTS[fontKey];
    const sourceMap = FONTS.normal;
    return text.split('').map(char => {
        const idx = sourceMap.indexOf(char);
        return idx !== -1 ? targetMap[idx] : char;
    }).join('');
};

interface ResultItem {
    id: string;
    text: string;
    type: 'name' | 'hashtag';
    meaning?: string;
}

export default function CoupleNameClient() {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [results, setResults] = useState<ResultItem[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleEditSave = (id: string) => {
        setResults(results.map(r => r.id === id ? { ...r, text: editValue } : r));
        setEditingId(null);
        toast.success('Name updated!');
    };

    const toggleSave = (id: string) => {
        setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
        if (!savedIds.includes(id)) toast.success('Saved to favorites! ❤️');
    };

    const generateNames = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const n1 = name1.trim();
        const n2 = name2.trim();

        if (!n1 || !n2) {
            toast.error("Please enter both names to generate combinations!");
            return;
        }

        setIsGenerating(true);
        setResults([]);

        setTimeout(() => {
            const rawCombos = new Set<string>();
            const lowerN1 = n1.toLowerCase();
            const lowerN2 = n2.toLowerCase();
            const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

            // 1. Split logic
            const buildCombos = (first: string, second: string) => {
                const len1 = first.length;
                const len2 = second.length;

                // Half + Half
                rawCombos.add(cap(first.slice(0, Math.max(1, Math.ceil(len1 / 2)))) + second.slice(Math.floor(len2 / 2)));
                rawCombos.add(first.slice(0, 2) + second.slice(-2));
                rawCombos.add(first.slice(0, 3) + second.slice(1));

                // Vowel/Consonant blends (simplified mix)
                if (len1 > 2 && len2 > 2) {
                    rawCombos.add(cap(first.slice(0, 2)) + second.slice(2));
                    rawCombos.add(cap(first.slice(0, 1)) + second.slice(1, 3) + first.slice(-1));
                }
            };

            buildCombos(lowerN1, lowerN2);
            buildCombos(lowerN2, lowerN1);

            // Create full names
            rawCombos.add(cap(lowerN1) + cap(lowerN2));
            rawCombos.add(cap(lowerN2) + cap(lowerN1));

            // Clean & Filter
            let comboArray = Array.from(rawCombos)
                .filter(c => c.length > 2)
                .map(c => cap(c.toLowerCase())); // final capitalization pass

            // Randomize order
            comboArray = comboArray.sort(() => Math.random() - 0.5);

            const finalResults: ResultItem[] = [];
            const fonts: (keyof typeof FONTS)[] = ['normal', 'bold', 'script', 'fraktur', 'doubleStruck', 'aesthetic'];

            // Generate Styled Names
            comboArray.slice(0, 12).forEach((combo, idx) => {
                const font = fonts[idx % fonts.length];
                const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
                const meaning = MEANINGS[Math.floor(Math.random() * MEANINGS.length)];

                // Add plain version
                if (font !== 'normal') {
                    finalResults.push({ id: `plain-${idx}`, text: `${combo} ${emoji}`, type: 'name', meaning });
                }

                // Add styled version
                finalResults.push({
                    id: `styled-${idx}`,
                    text: `${applyFont(combo, font)} ${emoji}`,
                    type: 'name',
                    meaning
                });
            });

            // Generate Hashtags
            const hashtags = [
                `#${cap(lowerN1)}Weds${cap(lowerN2)}`,
                `#${cap(lowerN2)}Loves${cap(lowerN1)}`,
                `#${cap(lowerN1)}${cap(lowerN2)}Forever`,
                `#${comboArray[0]}Wedding`,
                `#${comboArray[1]}DiShaadi`,
                `#Team${comboArray[0]}`
            ];

            hashtags.forEach((tag, idx) => {
                finalResults.push({ id: `hash-${idx}`, text: tag, type: 'hashtag' });
            });

            setResults(finalResults.sort(() => Math.random() - 0.5)); // shuffle all
            setIsGenerating(false);

            // Scroll to results on mobile
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    window.scrollTo({ top: document.getElementById('results-area')?.offsetTop || 500, behavior: 'smooth' });
                }, 100);
            }

        }, 600); // Artificial delay for "processing" feel
    };

    const handleCopy = (text: string, id: string) => {
        const onSuccess = () => {
            setCopiedId(id);
            toast.success('Copied to clipboard!', { icon: '✨' });
            setTimeout(() => setCopiedId(null), 2000);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onSuccess).catch(err => {
                console.error("Clipboard API failed: ", err);
                fallbackCopy(text, onSuccess);
            });
        } else {
            fallbackCopy(text, onSuccess);
        }
    };

    const fallbackCopy = (text: string, onSuccess: () => void) => {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (successful) {
                onSuccess();
            } else {
                toast.error("Copy failed on this device.");
            }
        } catch (err) {
            console.error('Fallback copy failed', err);
            toast.error("Copy failed on this device.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Input Section */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-6 md:p-10 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <form onSubmit={generateNames} className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
                        <div className="w-full flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">First Person Name</label>
                            <input
                                type="text"
                                value={name1}
                                onChange={(e) => setName1(e.target.value.replace(/[^a-zA-Z]/g, ''))} // only letters
                                placeholder="e.g. Virat"
                                className="w-full px-5 py-4 bg-white border-2 border-pink-100 focus:border-pink-500 rounded-2xl outline-none transition-all placeholder:text-gray-300 text-lg font-semibold text-gray-800 shadow-sm"
                                maxLength={15}
                            />
                        </div>

                        <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 rounded-full shadow-sm md:mt-6 border-4 border-white z-10">
                            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                        </div>

                        <div className="w-full flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Second Person Name</label>
                            <input
                                type="text"
                                value={name2}
                                onChange={(e) => setName2(e.target.value.replace(/[^a-zA-Z]/g, ''))} // only letters
                                placeholder="e.g. Anushka"
                                className="w-full px-5 py-4 bg-white border-2 border-purple-100 focus:border-purple-500 rounded-2xl outline-none transition-all placeholder:text-gray-300 text-lg font-semibold text-gray-800 shadow-sm"
                                maxLength={15}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isGenerating || !name1 || !name2}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg px-10 py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/25 transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed group"
                        >
                            {isGenerating ? (
                                <RefreshCcw className="w-5 h-5 animate-spin" />
                            ) : (
                                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                            )}
                            {isGenerating ? 'Mixing Names...' : 'Generate Spark ✨'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Section */}
            <div id="results-area">
                <AnimatePresence>
                    {results.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Your Unique Combinations ✨</h3>
                                <p className="text-gray-500 mt-2">Click any name or hashtag to copy instantly!</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {results.map((result, idx) => (
                                    <motion.div
                                        key={result.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl transition-all duration-200 border-2 
                                            ${result.type === 'hashtag'
                                                ? 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50/80 shadow-sm'
                                                : 'bg-white border-pink-50 hover:border-pink-100 hover:shadow-lg hover:shadow-pink-500/5'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            {result.type === 'hashtag' && <Hash className="w-5 h-5 text-indigo-400 shrink-0" />}
                                            <div className="flex flex-col flex-1 min-w-0 pr-2">
                                                {editingId === result.id ? (
                                                    <input 
                                                        autoFocus
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        onBlur={() => handleEditSave(result.id)}
                                                        onKeyDown={(e) => { if (e.key === 'Enter') handleEditSave(result.id); }}
                                                        className="text-[17px] font-bold text-gray-900 bg-white border border-indigo-300 rounded px-2 py-1 w-full outline-none focus:ring-2 focus:ring-indigo-100 shadow-inner"
                                                    />
                                                ) : (
                                                    <span className={`text-[17px] sm:text-lg break-words ${result.type === 'hashtag' ? 'font-semibold text-indigo-700' : 'font-bold text-gray-800'}`}>
                                                        {result.text}
                                                    </span>
                                                )}
                                                {result.meaning && (
                                                    <span className="text-sm text-pink-500 font-medium mt-1 break-words drop-shadow-sm leading-snug">
                                                        Meaning: {result.meaning}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setEditingId(result.id); setEditValue(result.text); }}
                                                className="p-1.5 sm:p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-200 bg-white transition-all shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] hover:shadow-sm"
                                                title="Edit Name"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleCopy(result.text, result.id); }}
                                                className="p-1.5 sm:p-2 rounded-xl text-gray-400 hover:text-pink-600 hover:bg-pink-50 border border-gray-200 bg-white transition-all shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] hover:shadow-sm"
                                                title="Copy"
                                            >
                                                {copiedId === result.id ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); toggleSave(result.id); }}
                                                className={`p-1.5 sm:p-2 rounded-xl transition-all shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] hover:shadow-sm border ${savedIds.includes(result.id) ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-gray-200 bg-white text-gray-400 hover:text-rose-500 hover:bg-rose-50'}`}
                                                title="Save"
                                            >
                                                <Heart className={`w-4 h-4 ${savedIds.includes(result.id) ? 'fill-rose-500' : ''}`} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Are you a happy user? Card ── */}
            <AnimatePresence>
                {results.length > 0 && (
                    <motion.div
                        key="happy-user-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden', marginTop: '32px' }}
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
                                    { href: '/youtube-description-extractor', label: 'YT Description' },
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

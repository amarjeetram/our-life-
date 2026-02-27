"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, Download, RefreshCw, CheckCircle2, XCircle,
    FileImage, Trash2, Zap, ShieldCheck, Clock, ImageIcon,
    GraduationCap, Building2, Award, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

// ── Types ────────────────────────────────────────────────────────────────────
interface FileResult {
    id: string;
    file: File;
    optimizedUrl: string | null;
    resultSize: number | null;
    loading: boolean;
    error: string | null;
}

// ── Helper: base64 dataURL → File ────────────────────────────────────────────
function dataUrlToFile(data: string, name: string): File {
    const [meta, base64] = data.split(',');
    const mime = meta.match(/:(.*?);/)?.[1] || 'image/jpeg';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new File([bytes], name, { type: mime });
}

export default function CompressImageClient({ targetSizeKB, titleOverride, subtitleOverride, children }: { targetSizeKB: number, titleOverride?: React.ReactNode, subtitleOverride?: React.ReactNode, children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // ── Compress one file and update its slot ─────────────────────────────────
    const compressOne = useCallback(async (id: string, imgFile: File) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, loading: true, error: null } : it));
        try {
            const formData = new FormData();
            formData.append('file', imgFile);
            formData.append('targetSize', targetSizeKB.toString());
            const res = await fetch('/api/compress', { method: 'POST', body: formData });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Server error: ${res.status}`);
            }

            const blob = await res.blob();

            if (blob.size === 0) {
                throw new Error("Received empty resulting image");
            }

            setItems(prev => prev.map(it =>
                it.id === id
                    ? { ...it, loading: false, optimizedUrl: URL.createObjectURL(blob), resultSize: blob.size }
                    : it
            ));
        } catch (err: any) {
            console.error(`Compression failed for ${imgFile.name}:`, err);
            const errorMessage = err.message || 'Compression failed. Please try again.';
            setItems(prev => prev.map(it =>
                it.id === id ? { ...it, loading: false, error: errorMessage } : it
            ));
            toast.error(`Failed to compress ${imgFile.name}. Please try again or select a different image.`);
        }
    }, []);

    const retryCompression = useCallback((id: string) => {
        const item = items.find(it => it.id === id);
        if (item && item.file) {
            compressOne(id, item.file);
        }
    }, [items, compressOne]);

    // ── Add files and kick off parallel compression ───────────────────────────
    const addAndCompress = useCallback((rawFiles: File[]) => {
        const imageFiles = rawFiles.filter(f => {
            if (!f.type.startsWith('image/')) return false;
            if (f.size > 20 * 1024 * 1024) {
                toast.error(`File ${f.name} is larger than 20MB limit. It will not be uploaded.`);
                return false;
            }
            return true;
        }).slice(0, 10);
        if (!imageFiles.length) return;
        const newItems: FileResult[] = imageFiles.map(f => ({
            id: Math.random().toString(36).slice(2) + Date.now(),
            file: f,
            optimizedUrl: null,
            resultSize: null,
            loading: true,
            error: null,
        }));
        setItems(prev => [...prev, ...newItems].slice(0, 10));
        newItems.forEach(item => compressOne(item.id, item.file));
    }, [compressOne]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length) addAndCompress(files);
        e.target.value = '';
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault(); setIsDragging(false);
        addAndCompress(Array.from(e.dataTransfer.files));
    }, [addAndCompress]);

    const removeItem = (id: string) => setItems(prev => prev.filter(it => it.id !== id));
    const resetAll = () => setItems([]);

    // ── Auto-compress from homepage sessionStorage ────────────────────────────
    useEffect(() => {
        // New multi-file format
        const raw = sessionStorage.getItem('hero_images');
        if (raw) {
            sessionStorage.removeItem('hero_images');
            sessionStorage.removeItem('hero_target_size');
            try {
                const payload: { data: string; name: string }[] = JSON.parse(raw);
                addAndCompress(payload.map(p => dataUrlToFile(p.data, p.name)));
            } catch { /* silent */ }
            return;
        }
        // Legacy single-file fallback
        const data = sessionStorage.getItem('hero_image_data');
        const name = sessionStorage.getItem('hero_image_name') || 'image.jpg';
        if (data) {
            sessionStorage.removeItem('hero_image_data');
            sessionStorage.removeItem('hero_image_name');
            sessionStorage.removeItem('hero_target_size');
            try { addAndCompress([dataUrlToFile(data, name)]); } catch { /* silent */ }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Use cases ─────────────────────────────────────────────────────────────
    const useCases = [
        { icon: <GraduationCap size={18} />, label: 'UPSC / IAS', color: '#7c3aed' },
        { icon: <Award size={18} />, label: 'SSC / CGL', color: '#0ea5e9' },
        { icon: <Building2 size={18} />, label: 'Bank Forms', color: '#059669' },
        { icon: <ShieldCheck size={18} />, label: 'Defense Exams', color: '#d97706' },
    ];

    const isEmpty = items.length === 0;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f8faff 0%, #f1f5ff 60%, #faf5ff 100%)', paddingBottom: '80px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '110px 20px 0' }}>

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                        border: '1px solid #c4b5fd', borderRadius: '100px',
                        padding: '5px 16px', fontSize: '11px', fontWeight: 700,
                        color: '#5b21b6', letterSpacing: '0.06em', textTransform: 'uppercase',
                        marginBottom: '20px'
                    }}>
                        <Zap size={11} /> Free · Instant · No Watermark
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 900,
                        color: '#0f172a', lineHeight: 1.1, marginBottom: '16px',
                        letterSpacing: '-0.03em'
                    }}>
                        {titleOverride || (
                            <>
                                Compress Image to{' '}
                                <span style={{
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                }}>
                                    {targetSizeKB}KB Online
                                </span>
                            </>
                        )}
                    </h1>
                    <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
                        {subtitleOverride || `Perfect for UPSC, SSC, Bank & defence exam portals. Guaranteed under ${targetSizeKB}KB with maximum quality preserved.`}
                    </p>

                    {/* Use case tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                        {useCases.map((u) => (
                            <span key={u.label} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '6px 14px', borderRadius: '100px',
                                background: '#fff', border: `1px solid ${u.color}22`,
                                fontSize: '12px', fontWeight: 700, color: u.color,
                                boxShadow: `0 2px 8px ${u.color}15`
                            }}>
                                {u.icon} {u.label}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* ── Main Tool Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        background: '#ffffff',
                        borderRadius: '32px',
                        border: '1px solid #e2e8f8',
                        boxShadow: '0 8px 8px -4px rgba(0,0,0,0.04), 0 24px 64px -12px rgba(99,102,241,0.14)',
                        marginBottom: '20px',
                        overflow: 'hidden'
                    }}
                >
                    {/* Card top accent */}
                    <div style={{ height: '4px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)' }} />

                    <div style={{ padding: '36px' }}>
                        <AnimatePresence mode="wait">
                            {isEmpty ? (
                                /* ── Upload State ── */
                                <motion.div key="upload" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                                    <div
                                        onClick={() => document.getElementById('file-input-20kb')?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                        style={{
                                            border: `2px dashed ${isDragging ? '#6366f1' : '#e2e8f0'}`,
                                            borderRadius: '24px',
                                            background: isDragging ? '#f5f3ff' : '#fafbff',
                                            padding: '60px 24px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease',
                                            transform: isDragging ? 'scale(1.01)' : 'scale(1)',
                                        }}
                                    >
                                        <input id="file-input-20kb" type="file" hidden accept="image/*" multiple onChange={handleUpload} />

                                        <div style={{
                                            width: '88px', height: '88px', borderRadius: '28px',
                                            margin: '0 auto 22px',
                                            background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 12px 28px rgba(99,102,241,0.18)',
                                        }}>
                                            <Upload size={34} color="#5b21b6" strokeWidth={1.6} />
                                        </div>

                                        <p style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                                            Drop your photos here
                                        </p>
                                        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '28px' }}>
                                            or click to browse · JPG, PNG, WEBP · Up to 10 files, Max 20MB/file
                                        </p>

                                        <button style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            color: '#fff', border: 'none', borderRadius: '16px',
                                            padding: '14px 32px', fontSize: '15px', fontWeight: 700,
                                            cursor: 'pointer', letterSpacing: '-0.01em',
                                            boxShadow: '0 4px 16px rgba(99,102,241,0.38)',
                                        }}>
                                            <ImageIcon size={17} /> Choose Images
                                        </button>
                                        <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '18px' }}>
                                            Max 20 MB each · No signup needed · 100% private
                                        </p>
                                    </div>
                                </motion.div>

                            ) : (
                                /* ── Results State ── */
                                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                                    {/* Header row */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#64748b' }}>
                                            {items.length} image{items.length > 1 ? 's' : ''} compressing to {targetSizeKB}KB
                                        </p>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {/* Add more */}
                                            {items.length < 10 && (
                                                <>
                                                    <input id="file-input-20kb-more" type="file" hidden accept="image/*" multiple onChange={handleUpload} />
                                                    <button
                                                        onClick={() => document.getElementById('file-input-20kb-more')?.click()}
                                                        style={{
                                                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                            padding: '8px 14px', borderRadius: '12px',
                                                            border: '1.5px solid #e0e7ff', background: '#f8faff',
                                                            fontSize: '13px', fontWeight: 700, color: '#6366f1', cursor: 'pointer'
                                                        }}
                                                    >
                                                        <ImageIcon size={13} /> Add more
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={resetAll}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                    padding: '8px 14px', borderRadius: '12px',
                                                    border: '1px solid #fecdd3', background: '#fff1f2',
                                                    fontSize: '13px', fontWeight: 700, color: '#f43f5e', cursor: 'pointer'
                                                }}
                                            >
                                                <RefreshCw size={13} /> Start over
                                            </button>
                                        </div>
                                    </div>

                                    {/* Per-file results */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {items.map((item) => {
                                            const resultKB = item.resultSize ? item.resultSize / 1024 : null;
                                            const isSuccess = resultKB !== null && resultKB <= (targetSizeKB + 0.5);
                                            const saved = item.resultSize ? ((1 - item.resultSize / item.file.size) * 100).toFixed(0) : null;

                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    style={{
                                                        borderRadius: '20px',
                                                        border: '1px solid #e8eaf0',
                                                        background: '#fafbff',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {/* File bar */}
                                                    <div style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                        padding: '12px 16px',
                                                        background: '#fff', borderBottom: '1px solid #f1f5f9'
                                                    }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div style={{
                                                                width: '38px', height: '38px', borderRadius: '12px',
                                                                background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                                            }}>
                                                                <FileImage size={18} color="#6366f1" />
                                                            </div>
                                                            <div>
                                                                <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                    {item.file.name}
                                                                </p>
                                                                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                                                                    Original: {(item.file.size / 1024).toFixed(1)} KB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => removeItem(item.id)} style={{
                                                            padding: '6px 8px', borderRadius: '10px',
                                                            border: '1px solid #fecdd3', background: '#fff1f2',
                                                            color: '#f43f5e', cursor: 'pointer', display: 'flex', alignItems: 'center'
                                                        }}>
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>

                                                    {/* Loading / Result */}
                                                    <div style={{ padding: '16px' }}>
                                                        {item.loading && (
                                                            <div style={{
                                                                display: 'flex', alignItems: 'center', gap: '14px',
                                                                padding: '16px', borderRadius: '14px',
                                                                background: '#f5f3ff', border: '1px solid #ede9fe'
                                                            }}>
                                                                <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                                                                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #f1f5f9' }} />
                                                                    <div style={{
                                                                        position: 'absolute', inset: 0, borderRadius: '50%',
                                                                        border: '3px solid transparent',
                                                                        borderTopColor: '#6366f1',
                                                                        animation: 'spin 0.75s linear infinite'
                                                                    }} />
                                                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Zap size={14} color="#6366f1" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#5b21b6' }}>Compressing to {targetSizeKB} KB…</p>
                                                                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Optimizing quality &amp; dimensions</p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {item.error && !item.loading && (
                                                            <div style={{
                                                                display: 'flex', flexDirection: 'column', gap: '12px',
                                                                padding: '16px', borderRadius: '14px',
                                                                background: '#fff1f2', border: '1px solid #fecdd3'
                                                            }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                    <XCircle size={20} color="#e11d48" />
                                                                    <div>
                                                                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#9f1239' }}>Compression Error</p>
                                                                        <p style={{ fontSize: '13px', color: '#e11d48', marginTop: '2px' }}>{item.error}</p>
                                                                    </div>
                                                                </div>
                                                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                                                                    <button
                                                                        onClick={() => retryCompression(item.id)}
                                                                        style={{
                                                                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                                            padding: '8px 16px', borderRadius: '8px',
                                                                            background: '#e11d48', color: '#fff',
                                                                            border: 'none', fontSize: '13px', fontWeight: 600,
                                                                            cursor: 'pointer', boxShadow: '0 2px 4px rgba(225, 29, 72, 0.2)'
                                                                        }}
                                                                    >
                                                                        <RefreshCw size={14} /> Try Again
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {item.optimizedUrl && !item.loading && (
                                                            <div>
                                                                {/* Preview */}
                                                                <div style={{
                                                                    borderRadius: '14px', overflow: 'hidden',
                                                                    background: '#f8fafc', border: '1px solid #f1f5f9',
                                                                    maxHeight: '280px', display: 'flex',
                                                                    alignItems: 'center', justifyContent: 'center',
                                                                    marginBottom: '12px'
                                                                }}>
                                                                    <img src={item.optimizedUrl} alt="Compressed" loading="lazy" decoding="async" style={{ width: '100%', objectFit: 'contain', maxHeight: '280px' }} />
                                                                </div>

                                                                {/* Result badge + download */}
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                                                    <div style={{
                                                                        flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                                                                        padding: '10px 14px', borderRadius: '12px',
                                                                        background: isSuccess ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                                                                        border: `1px solid ${isSuccess ? '#86efac' : '#fda4af'}`,
                                                                    }}>
                                                                        {isSuccess
                                                                            ? <CheckCircle2 size={18} color="#16a34a" />
                                                                            : <XCircle size={18} color="#e11d48" />
                                                                        }
                                                                        <div>
                                                                            <p style={{ fontSize: '13px', fontWeight: 800, color: isSuccess ? '#14532d' : '#881337' }}>
                                                                                {isSuccess ? '✓ Compressed Successfully' : `Above ${targetSizeKB}KB`}
                                                                            </p>
                                                                            <p style={{ fontSize: '11px', color: isSuccess ? '#15803d' : '#be123c', marginTop: '1px', fontWeight: 600 }}>
                                                                                {(item.file.size / 1024).toFixed(1)} KB ➝ {resultKB!.toFixed(1)} KB
                                                                                {saved ? <span style={{ color: '#047857', marginLeft: '6px', background: '#d1fae5', padding: '2px 6px', borderRadius: '4px' }}>-{saved}%</span> : ''}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <button
                                                                        onClick={() => {
                                                                            const link = document.createElement('a');
                                                                            link.href = item.optimizedUrl!;
                                                                            link.download = `smarttoolswala-20kb-${item.file.name.split('.')[0]}.jpg`;
                                                                            link.click();
                                                                        }}
                                                                        style={{
                                                                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                                                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                                                            color: '#fff', border: 'none', borderRadius: '12px',
                                                                            padding: '12px 20px', fontSize: '14px', fontWeight: 800,
                                                                            cursor: 'pointer', whiteSpace: 'nowrap',
                                                                            boxShadow: '0 4px 14px rgba(99,102,241,0.38)',
                                                                        }}
                                                                    >
                                                                        <Download size={15} /> Download
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Download All button — only when all done and multiple files */}
                                    {items.length > 1 && items.every(it => it.optimizedUrl && !it.loading) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
                                        >
                                            <button
                                                onClick={() => {
                                                    items.forEach(item => {
                                                        if (!item.optimizedUrl) return;
                                                        const link = document.createElement('a');
                                                        link.href = item.optimizedUrl;
                                                        link.download = `smarttoolswala-20kb-${item.file.name.split('.')[0]}.jpg`;
                                                        link.click();
                                                    });
                                                }}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                                                    background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
                                                    color: '#fff', border: 'none', borderRadius: '16px',
                                                    padding: '15px 32px', fontSize: '15px', fontWeight: 800,
                                                    cursor: 'pointer', boxShadow: '0 4px 20px rgba(15,23,42,0.3)',
                                                    letterSpacing: '-0.01em'
                                                }}
                                            >
                                                <Download size={17} /> Download All {items.length} Files
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ── Trust Bar ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center',
                        marginBottom: '24px'
                    }}
                >
                    {[
                        { icon: <ShieldCheck size={14} />, text: 'Files deleted instantly' },
                        { icon: <Clock size={14} />, text: 'Results in under 3s' },
                        { icon: <Zap size={14} />, text: 'Zero quality loss' },
                    ].map((t) => (
                        <span key={t.text} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: '#fff', border: '1px solid #e2e8f0',
                            borderRadius: '100px', padding: '7px 16px',
                            fontSize: '12px', fontWeight: 600, color: '#475569',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                        }}>
                            <span style={{ color: '#6366f1' }}>{t.icon}</span> {t.text}
                        </span>
                    ))}
                </motion.div>

                {/* ── How it Works ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.18 }}
                    style={{
                        background: '#fff', borderRadius: '28px',
                        border: '1px solid #e8eaf0',
                        boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                        padding: '28px 32px', marginBottom: '24px'
                    }}
                >
                    <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.02em' }}>
                        How it works
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '14px' }}>
                        {[
                            { n: '01', label: 'Upload Photos', desc: 'JPG, PNG or WEBP. Up to 10 files, Max 20MB/file.', color: '#6366f1' },
                            { n: '02', label: 'Smart Compress', desc: `Iterative engine targets exactly ${targetSizeKB} KB.`, color: '#8b5cf6' },
                            { n: '03', label: 'Download All', desc: 'Portal-ready photos in seconds.', color: '#0ea5e9' },
                        ].map((s) => (
                            <div key={s.n} style={{
                                padding: '18px', borderRadius: '18px',
                                background: '#f8faff', border: '1px solid #eff0f7',
                                display: 'flex', flexDirection: 'column', gap: '12px'
                            }}>
                                <span style={{
                                    width: '38px', height: '38px', borderRadius: '12px',
                                    background: s.color, color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: 900, letterSpacing: '-0.02em',
                                    boxShadow: `0 4px 10px ${s.color}40`
                                }}>{s.n}</span>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{s.label}</p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* SEO + FAQ */}
                {children}
            </div>
        </div>
    );
}

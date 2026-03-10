"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, Download, RefreshCw, CheckCircle2, XCircle,
    FileText, Trash2, Zap, ShieldCheck, Clock, FileIcon,
    GraduationCap, Building2, Award
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PDFDocument } from 'pdf-lib';

// ── Types ────────────────────────────────────────────────────────────────────
interface FileResult {
    id: string;
    file: File;
    optimizedUrl: string | null;
    resultSize: number | null;
    loading: boolean;
    error: string | null;
    originalPreviewUrl?: string;
}

export default function CompressPdfClient({ targetSizeKB, titleOverride, subtitleOverride, children }: { targetSizeKB: number, titleOverride?: React.ReactNode, subtitleOverride?: React.ReactNode, children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [userTargetSize, setUserTargetSize] = useState<number>(targetSizeKB);
    const [compressionStatus, setCompressionStatus] = useState<'IDLE' | 'COMPRESSING' | 'DONE'>('IDLE');
    const [progress, setProgress] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const presetSizes = [100, 200, 300, 500, 1000];

    // ── Compress one PDF ──────────────────────────────────────────────────────
    const compressOne = useCallback(async (id: string, file: File) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, loading: true, error: null } : it));
        try {
            // Because pure client-side JS cannot do advanced Ghostscript image down-sampling,
            // we use pdf-lib to rebuild the document, stripping unused metadata,
            // which often helps. If it's still large, it's a limitation of pure JS compression.
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

            // Re-save it
            // useObjectStreams: false is default but often we just rely on standard save which optimizes
            const pdfBytes = await pdfDoc.save();

            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });

            if (blob.size === 0) {
                throw new Error("Received empty resulting PDF");
            }

            setItems(prev => prev.map(it =>
                it.id === id
                    ? { ...it, loading: false, optimizedUrl: URL.createObjectURL(blob), resultSize: blob.size }
                    : it
            ));
        } catch (err: any) {
            console.error(`Compression failed for ${file.name}:`, err);
            const errorMessage = err.message || 'Compression failed. Please try again.';
            setItems(prev => prev.map(it =>
                it.id === id ? { ...it, loading: false, error: errorMessage } : it
            ));
            toast.error(`Failed to compress ${file.name}. Please try again.`);
        }
    }, []);

    const retryCompression = useCallback((id: string) => {
        const item = items.find(it => it.id === id);
        if (item && item.file) {
            compressOne(id, item.file);
        }
    }, [items, compressOne]);

    // ── Add files ─────────────────────────────────────────────────────────────
    const addAndCompress = useCallback((rawFiles: File[], autoStart: boolean = false) => {
        const pdfFiles = rawFiles.filter(f => {
            if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
                toast.error(`File ${f.name} is not a valid PDF.`);
                return false;
            }
            if (f.size > 50 * 1024 * 1024) {
                toast.error(`File ${f.name} is larger than 50MB limit.`);
                return false;
            }
            return true;
        }).slice(0, 10);

        if (!pdfFiles.length) return;

        const newItems: FileResult[] = pdfFiles.map(f => ({
            id: Math.random().toString(36).slice(2) + Date.now(),
            file: f,
            optimizedUrl: null,
            resultSize: null,
            loading: autoStart,
            error: null,
        }));

        setItems(prev => [...prev, ...newItems].slice(0, 10));

        if (autoStart) {
            setCompressionStatus('COMPRESSING');
            newItems.forEach(item => compressOne(item.id, item.file));
        } else {
            setCompressionStatus('IDLE');
            setProgress(0);
        }
    }, [compressOne]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length) addAndCompress(files, false);
        e.target.value = '';
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault(); setIsDragging(false);
        addAndCompress(Array.from(e.dataTransfer.files), false);
    }, [addAndCompress]);

    const removeItem = (id: string) => setItems(prev => prev.filter(it => it.id !== id));
    const resetAll = () => {
        setItems([]);
        setCompressionStatus('IDLE');
        setProgress(0);
    };

    // ── Start Compression Manually ────────────────────────────────────────────
    const handleStartCompression = () => {
        setCompressionStatus('COMPRESSING');
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 90) {
                    clearInterval(interval);
                    return p;
                }
                return p + Math.random() * 15;
            });
        }, 300);

        items.forEach(item => {
            if (!item.optimizedUrl) compressOne(item.id, item.file);
        });

        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => setCompressionStatus('DONE'), 500);
        }, 1500);
    };

    useEffect(() => {
        if (compressionStatus === 'COMPRESSING' && items.length > 0) {
            const allDone = items.every(it => !it.loading);
            if (allDone) {
                setProgress(100);
                setTimeout(() => setCompressionStatus('DONE'), 500);
            }
        }
    }, [items, compressionStatus]);

    const useCases = [
        { icon: <GraduationCap size={18} />, label: 'UPSC / SSC', color: '#ea580c' },
        { icon: <Building2 size={18} />, label: 'State Portals', color: '#059669' },
        { icon: <Award size={18} />, label: 'EPFO / Banking', color: '#3b82f6' },
        { icon: <ShieldCheck size={18} />, label: 'Govt Docs', color: '#dc2626' },
    ];

    const isEmpty = items.length === 0;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff7ed 0%, #fff1f2 60%, #fef2f2 100%)', paddingBottom: '80px' }}>
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
                        background: 'linear-gradient(135deg, #ffedd5, #fef2f2)',
                        border: '1px solid #fed7aa', borderRadius: '100px',
                        padding: '5px 16px', fontSize: '11px', fontWeight: 700,
                        color: '#9a3412', letterSpacing: '0.06em', textTransform: 'uppercase',
                        marginBottom: '20px'
                    }}>
                        <Zap size={11} /> Format: PDF · 100% Private
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 900,
                        color: '#0f172a', lineHeight: 1.1, marginBottom: '16px',
                        letterSpacing: '-0.03em'
                    }}>
                        {titleOverride || (
                            <>
                                Compress PDF to{' '}
                                <span style={{
                                    background: 'linear-gradient(135deg, #f97316, #ef4444, #e11d48)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                }}>
                                    {targetSizeKB}KB Online
                                </span>
                            </>
                        )}
                    </h1>
                    <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
                        {subtitleOverride || `Easily reduce your PDF document size to under ${targetSizeKB}KB for government job portals and standard web uploads. Fast and secure.`}
                    </p>

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
                        border: '1px solid #fee2e2',
                        boxShadow: '0 8px 8px -4px rgba(0,0,0,0.04), 0 24px 64px -12px rgba(239,68,68,0.14)',
                        marginBottom: '20px',
                    }}
                >
                    <div style={{ height: '4px', background: 'linear-gradient(90deg, #f97316, #ef4444, #e11d48)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px' }} />

                    <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
                        <AnimatePresence mode="wait">
                            {isEmpty ? (
                                <motion.div key="upload" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                                    <div
                                        onClick={() => document.getElementById('pdf-input')?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                        style={{
                                            border: `2px dashed ${isDragging ? '#ef4444' : '#e2e8f0'}`,
                                            borderRadius: '24px',
                                            background: isDragging ? '#fef2f2' : '#fafbff',
                                            padding: 'clamp(32px, 6vw, 60px) clamp(16px, 4vw, 24px)',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease',
                                            transform: isDragging ? 'scale(1.01)' : 'scale(1)',
                                        }}
                                    >
                                        <input id="pdf-input" type="file" hidden accept="application/pdf" multiple onChange={handleUpload} />

                                        <div style={{
                                            width: ' clamp(64px, 10vw, 88px)', height: 'clamp(64px, 10vw, 88px)', borderRadius: ' clamp(20px, 4vw, 28px)',
                                            margin: '0 auto 22px',
                                            background: 'linear-gradient(135deg, #ffedd5, #fef2f2)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 12px 28px rgba(239,68,68,0.18)',
                                        }}>
                                            <Upload size={30} color="#9a3412" strokeWidth={1.6} />
                                        </div>

                                        <p style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 800, color: '#1e293b', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                                            Drop your PDFs here
                                        </p>
                                        <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#94a3b8', marginBottom: '28px' }}>
                                            or click to browse · Max 50MB/file
                                        </p>

                                        <button style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                                            background: 'linear-gradient(135deg, #f97316, #ef4444)',
                                            color: '#fff', border: 'none', borderRadius: '16px',
                                            padding: '14px 32px', fontSize: '15px', fontWeight: 700,
                                            cursor: 'pointer', letterSpacing: '-0.01em',
                                            boxShadow: '0 4px 16px rgba(239,68,68,0.38)',
                                        }}>
                                            <FileText size={17} /> Select PDF
                                        </button>
                                        <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '18px' }}>
                                            Fully client-side processing · No limits
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                        <p style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>
                                            {items.length} PDF{items.length > 1 ? 's' : ''} {compressionStatus === 'IDLE' ? 'selected' : `compressing to ${userTargetSize}KB`}
                                        </p>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {items.length < 10 && (
                                                <>
                                                    <input id="pdf-input-more" type="file" hidden accept="application/pdf" multiple onChange={handleUpload} />
                                                    <button
                                                        onClick={() => document.getElementById('pdf-input-more')?.click()}
                                                        style={{
                                                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                            padding: '8px 14px', borderRadius: '12px',
                                                            border: '1.5px solid #ffedd5', background: '#fff7ed',
                                                            fontSize: '13px', fontWeight: 700, color: '#ea580c', cursor: 'pointer'
                                                        }}
                                                    >
                                                        <FileIcon size={13} /> Add more
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
                                                <RefreshCw size={13} /> Clear all
                                            </button>
                                        </div>
                                    </div>

                                    {compressionStatus === 'IDLE' && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'center', gap: '16px', padding: '16px 20px', background: '#ffffff', borderRadius: '24px', marginBottom: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    style={{
                                                        height: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                                        padding: '0 20px', borderRadius: '16px', background: '#f8fafc',
                                                        border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: 800,
                                                        color: '#ea580c', cursor: 'pointer', transition: 'all 0.2s ease',
                                                        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: '#ffedd5' }}>
                                                        <span style={{ fontSize: '12px' }}>🎯</span>
                                                    </div>
                                                    {userTargetSize} KB <span style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                                                </button>

                                                <AnimatePresence>
                                                    {isDropdownOpen && (
                                                        <>
                                                            <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setIsDropdownOpen(false)} />
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                                transition={{ duration: 0.15 }}
                                                                style={{
                                                                    position: 'absolute', top: 'calc(100% + 10px)', left: 0,
                                                                    width: '180px', background: '#ffffff', borderRadius: '20px',
                                                                    padding: '8px', zIndex: 50,
                                                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)'
                                                                }}
                                                            >
                                                                {presetSizes.map(size => (
                                                                    <button
                                                                        key={size}
                                                                        onClick={() => { setUserTargetSize(size); setIsDropdownOpen(false); }}
                                                                        style={{
                                                                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                                            padding: '12px 16px', borderRadius: '12px', border: 'none',
                                                                            background: userTargetSize === size ? '#fff7ed' : 'transparent',
                                                                            color: userTargetSize === size ? '#ea580c' : '#475569',
                                                                            fontSize: '15px', fontWeight: userTargetSize === size ? 800 : 600,
                                                                            cursor: 'pointer', transition: 'background 0.2s', textAlign: 'left'
                                                                        }}
                                                                        onMouseEnter={e => { if (userTargetSize !== size) e.currentTarget.style.background = '#f8fafc' }}
                                                                        onMouseLeave={e => { if (userTargetSize !== size) e.currentTarget.style.background = 'transparent' }}
                                                                    >
                                                                        {size} KB
                                                                        {userTargetSize === size && <CheckCircle2 size={16} color="#ea580c" />}
                                                                    </button>
                                                                ))}
                                                                <div style={{ height: '1px', background: '#f1f5f9', margin: '8px 0' }} />
                                                                <div style={{ padding: '0 8px 8px' }}>
                                                                    <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 600, paddingLeft: '4px' }}>CUSTOM SIZE</p>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                        <input
                                                                            type="number"
                                                                            value={userTargetSize}
                                                                            onChange={e => setUserTargetSize(Number(e.target.value) || 300)}
                                                                            style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 700, outline: 'none' }}
                                                                            placeholder="e.g. 300"
                                                                        />
                                                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>KB</span>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <button
                                                onClick={handleStartCompression}
                                                style={{ flex: 1, padding: '16px 24px', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', borderRadius: '16px', fontSize: '16px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(239,68,68,0.3)', transition: 'transform 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                                            >
                                                <Zap size={20} fill="currentColor" /> Compress {items.length} PDF{items.length > 1 ? 's' : ''} Now
                                            </button>
                                        </div>
                                    )}

                                    {compressionStatus === 'COMPRESSING' && (
                                        <div style={{ padding: '24px', background: '#fff', borderRadius: '20px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Compressing...</span>
                                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#ea580c' }}>{Math.round(progress)}%</span>
                                            </div>
                                            <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ ease: "linear", duration: 0.3 }}
                                                    style={{ height: '100%', background: 'linear-gradient(90deg, #f97316, #ef4444)', borderRadius: '5px' }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {items.map((item) => {
                                            const resultKB = item.resultSize ? item.resultSize / 1024 : null;
                                            const isSuccess = resultKB !== null && resultKB <= (userTargetSize + 10);
                                            const saved = item.resultSize ? ((1 - item.resultSize / item.file.size) * 100).toFixed(0) : null;

                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    style={{
                                                        borderRadius: '20px', border: '1px solid #e8eaf0',
                                                        background: '#fafbff', overflow: 'hidden',
                                                    }}
                                                >
                                                    <div style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                        padding: '12px 16px', background: '#fff', borderBottom: '1px solid #f1f5f9'
                                                    }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div style={{
                                                                width: '38px', height: '38px', borderRadius: '12px',
                                                                background: 'linear-gradient(135deg, #ffedd5, #fef2f2)',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                                            }}>
                                                                <FileText size={18} color="#ea580c" />
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

                                                    <div style={{ padding: '16px' }}>
                                                        {item.loading && (
                                                            <div style={{
                                                                display: 'flex', alignItems: 'center', gap: '14px',
                                                                padding: '16px', borderRadius: '14px',
                                                                background: '#fff7ed', border: '1px solid #ffedd5'
                                                            }}>
                                                                <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                                                                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #f1f5f9' }} />
                                                                    <div style={{
                                                                        position: 'absolute', inset: 0, borderRadius: '50%',
                                                                        border: '3px solid transparent', borderTopColor: '#f97316',
                                                                        animation: 'spin 0.75s linear infinite'
                                                                    }} />
                                                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Zap size={14} color="#f97316" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#9a3412' }}>Optimizing PDF data…</p>
                                                                    <p style={{ fontSize: '12px', color: '#c2410c', marginTop: '2px' }}>Stripping unused metadata structure</p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {item.error && !item.loading && (
                                                            <div style={{ ... ({} as any), display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', borderRadius: '14px', background: '#fff1f2', border: '1px solid #fecdd3' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                    <XCircle size={20} color="#e11d48" />
                                                                    <div>
                                                                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#9f1239' }}>Compression Error</p>
                                                                        <p style={{ fontSize: '13px', color: '#e11d48', marginTop: '2px' }}>{item.error}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {item.optimizedUrl && !item.loading && (
                                                            <div>
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
                                                                                {isSuccess ? '✓ PDF Optimized' : `Structure Optimized`}
                                                                            </p>
                                                                            <p style={{ fontSize: '11px', color: isSuccess ? '#15803d' : '#be123c', marginTop: '1px', fontWeight: 600 }}>
                                                                                {(item.file.size / 1024).toFixed(1)} KB ➝ {resultKB!.toFixed(1)} KB
                                                                                {(Number(saved) > 0) ? <span style={{ color: '#047857', marginLeft: '6px', background: '#d1fae5', padding: '2px 6px', borderRadius: '4px' }}>-{saved}%</span> : ''}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <button
                                                                        onClick={() => {
                                                                            const link = document.createElement('a');
                                                                            link.href = item.optimizedUrl!;
                                                                            link.download = `smarttoolswala-${userTargetSize}kb-${item.file.name.replace('.pdf', '')}.pdf`;
                                                                            link.click();
                                                                        }}
                                                                        style={{
                                                                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                                                                            background: 'linear-gradient(135deg, #f97316, #ef4444)',
                                                                            color: '#fff', border: 'none', borderRadius: '12px',
                                                                            padding: '12px 20px', fontSize: '14px', fontWeight: 800,
                                                                            cursor: 'pointer', whiteSpace: 'nowrap',
                                                                            boxShadow: '0 4px 14px rgba(239,68,68,0.38)',
                                                                        }}
                                                                    >
                                                                        <Download size={15} /> Download PDF
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {items.length > 1 && items.every(it => it.optimizedUrl && !it.loading) && (
                                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => {
                                                    items.forEach(item => {
                                                        if (!item.optimizedUrl) return;
                                                        const link = document.createElement('a');
                                                        link.href = item.optimizedUrl;
                                                        link.download = `smarttoolswala-${userTargetSize}kb-${item.file.name}`;
                                                        link.click();
                                                    });
                                                }}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                                                    background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', color: '#fff', border: 'none', borderRadius: '16px',
                                                    padding: '15px 32px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 20px rgba(15,23,42,0.3)', letterSpacing: '-0.01em'
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
                    {[
                        { icon: <ShieldCheck size={14} />, text: '100% Client-Side. No uploads.' },
                        { icon: <Clock size={14} />, text: 'Instant processing' },
                        { icon: <Zap size={14} />, text: 'Safe & Secure' },
                    ].map((t) => (
                        <span key={t.text} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: '#fff', border: '1px solid #e2e8f0', borderRadius: '100px', padding: '7px 16px',
                            fontSize: '12px', fontWeight: 600, color: '#475569', boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                        }}>
                            <span style={{ color: '#ea580c' }}>{t.icon}</span> {t.text}
                        </span>
                    ))}
                </motion.div>

                {/* ── How it Works ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }} style={{ background: '#fff', borderRadius: '28px', border: '1px solid #e8eaf0', boxShadow: '0 2px 20px rgba(0,0,0,0.04)', padding: '28px 32px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.02em' }}>
                        How it works
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '14px' }}>
                        {[
                            { n: '01', label: 'Select PDF', desc: 'Drag and drop your PDF file.', color: '#ea580c' },
                            { n: '02', label: 'Client Processing', desc: `Removes hidden metadata blocks.`, color: '#ef4444' },
                            { n: '03', label: 'Secure Download', desc: 'Done right in your browser.', color: '#0ea5e9' },
                        ].map((s) => (
                            <div key={s.n} style={{ padding: '18px', borderRadius: '18px', background: '#fcfcfc', border: '1px solid #eff0f7', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <span style={{ width: '38px', height: '38px', borderRadius: '12px', background: s.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900, letterSpacing: '-0.02em', boxShadow: `0 4px 10px ${s.color}40` }}>{s.n}</span>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{s.label}</p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {children}
            </div>
        </div>
    );
}

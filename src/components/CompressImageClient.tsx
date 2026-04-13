"use client";


import React, { useState, useCallback, useEffect } from 'react';
// Mock framer-motion to save JS payload
const motion = {
    div: ({ initial, animate, exit, transition, ...props }: any) => {
        // preserve className if exists, or add native-fade-in
        const className = props.className ? props.className + ' native-fade-in' : 'native-fade-in';
        return <div {...props} className={className} />;
    }
};
const AnimatePresence = ({ children }: any) => <>{children}</>;



import Link from 'next/link';
import {
    Upload, Download, RefreshCw, CheckCircle2, XCircle,
    FileImage, Trash2, Zap, ShieldCheck, Clock, ImageIcon,
    GraduationCap, Building2, Award, AlertCircle, ArrowRight
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

export default function CompressImageClient({ targetSizeKB, titleOverride, subtitleOverride, useCasesOverride, hideTopBadge, belowUseCasesContent, children }: { targetSizeKB: number, titleOverride?: React.ReactNode, subtitleOverride?: React.ReactNode, useCasesOverride?: { icon: React.ReactNode, label: string, color: string }[], hideTopBadge?: boolean, belowUseCasesContent?: React.ReactNode, children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [userTargetSize, setUserTargetSize] = useState<number>(targetSizeKB);
    const [compressionStatus, setCompressionStatus] = useState<'IDLE' | 'COMPRESSING' | 'DONE'>('IDLE');
    const [progress, setProgress] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const presetSizes = [20, 30, 40, 50, 100, 200];

    // ── Compress one file and update its slot ─────────────────────────────────
    // ── Client-side smart pre-shrink using browser-image-compression ─────────
    // Next.js App Router has a hardcoded ~4MB body limit for route handlers.
    // We use browser-image-compression (same algo as Squoosh) to intelligently
    // reduce file size before uploading — quality is preserved far better than Canvas.
    const preshrinkFile = useCallback(async (file: File): Promise<File> => {
        let imageCompression;
        try {
            const mod = await import('browser-image-compression');
            imageCompression = mod.default || mod;
        } catch (e) {
            console.error("Failed to load compression library", e);
            return file;
        }
        const MAX_PAYLOAD_MB = 3.5;
        if (file.size <= MAX_PAYLOAD_MB * 1024 * 1024) return file;

        try {
            const compressed = await imageCompression(file, {
                maxSizeMB: MAX_PAYLOAD_MB,
                maxWidthOrHeight: 4096,   // keep up to 4K resolution
                useWebWorker: true,
                preserveExif: false,
                initialQuality: 0.85,
            });
            // Return as File with original name
            return new File([compressed], file.name, { type: compressed.type });
        } catch {
            // If compression fails, send as-is and let server handle the error
            return file;
        }
    }, []);

    const compressOne = useCallback(async (id: string, imgFile: File) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, loading: true, error: null } : it));
        try {
            // Pre-shrink on client if file is too large for the API body limit
            const fileToSend = await preshrinkFile(imgFile);

            const formData = new FormData();
            formData.append('file', fileToSend);
            formData.append('targetSize', userTargetSize.toString());
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
    }, [userTargetSize, preshrinkFile]);

    const retryCompression = useCallback((id: string) => {
        const item = items.find(it => it.id === id);
        if (item && item.file) {
            compressOne(id, item.file);
        }
    }, [items, compressOne]);

    // ── Add files and optionally kick off parallel compression ───────────────────────────
    const addAndCompress = useCallback((rawFiles: File[], autoStart: boolean = false) => {
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

    // ── Auto-compress from homepage sessionStorage ────────────────────────────
    useEffect(() => {
        // Preferred method: Fast, infinite size cross-component routing via memory
        const memoryFiles = (window as any).__HERO_FILES__;
        const memoryTarget = (window as any).__HERO_TARGET_SIZE__;

        if (memoryTarget && !isNaN(parseInt(memoryTarget))) {
            setUserTargetSize(parseInt(memoryTarget));
            delete (window as any).__HERO_TARGET_SIZE__;
        } else {
            const heroTargetSize = sessionStorage.getItem('hero_target_size');
            if (heroTargetSize && !isNaN(parseInt(heroTargetSize))) {
                setUserTargetSize(parseInt(heroTargetSize));
                sessionStorage.removeItem('hero_target_size');
            }
        }

        if (memoryFiles && memoryFiles.length > 0) {
            addAndCompress(memoryFiles, true);
            delete (window as any).__HERO_FILES__;
            sessionStorage.removeItem('hero_images'); // clear fallback
            sessionStorage.removeItem('hero_image_data');
            sessionStorage.removeItem('hero_image_name');
            return;
        }

        // New multi-file format
        const raw = sessionStorage.getItem('hero_images');
        if (raw) {
            sessionStorage.removeItem('hero_images');
            sessionStorage.removeItem('hero_target_size');
            try {
                const payload: { data: string; name: string }[] = JSON.parse(raw);
                addAndCompress(payload.map(p => dataUrlToFile(p.data, p.name)), true);
            } catch { /* silent */ }
            return;
        }
        // Legay single-file fallback
        const data = sessionStorage.getItem('hero_image_data');
        const name = sessionStorage.getItem('hero_image_name') || 'image.jpg';
        if (data) {
            sessionStorage.removeItem('hero_image_data');
            sessionStorage.removeItem('hero_image_name');
            sessionStorage.removeItem('hero_target_size');
            try { addAndCompress([dataUrlToFile(data, name)], true); } catch { /* silent */ }
        }

        // ── Listen for custom event from GlobalDropZone ──────────────────────────
        const handleGlobalDrop = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail?.files?.length) {
                addAndCompress(customEvent.detail.files, false);
            }
        };

        window.addEventListener('global-drop-compress', handleGlobalDrop);

        return () => {
            window.removeEventListener('global-drop-compress', handleGlobalDrop);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Start Compression Manually ────────────────────────────────────────────
    const handleStartCompression = () => {
        setCompressionStatus('COMPRESSING');
        setProgress(0);

        // Fake progress animation
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

        // Cleanup interval when done would ideally be handled, but simple approach:
        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => setCompressionStatus('DONE'), 500);
        }, 2000); // rough estimate or we can just rely on item loading states.
    };

    // Actual progress/status sync: if all items are not loading and we are compressing, complete progress.
    useEffect(() => {
        if (compressionStatus === 'COMPRESSING' && items.length > 0) {
            const allDone = items.every(it => !it.loading);
            if (allDone) {
                setProgress(100);
                setTimeout(() => setCompressionStatus('DONE'), 500);
            }
        }
    }, [items, compressionStatus]);

    // ── Use cases ─────────────────────────────────────────────────────────────
    const defaultUseCases = [
        { icon: <GraduationCap size={18} />, label: 'UPSC / IAS', color: '#7c3aed' },
        { icon: <Award size={18} />, label: 'SSC / CGL', color: '#0369a1' },
        { icon: <Building2 size={18} />, label: 'Bank Forms', color: '#047857' },
        { icon: <ShieldCheck size={18} />, label: 'Defense Exams', color: '#b45309' },
    ];
    
    const activeUseCases = useCasesOverride || defaultUseCases;

    const isEmpty = items.length === 0;

    return (
        <div className="compress-image-wrapper">

                {/* ── Header ── */}
                <div className="native-fade-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    {!hideTopBadge && (
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
                    )}

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
                    <p style={{ fontSize: '17px', color: '#475569', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
                        {subtitleOverride || `Perfect for UPSC, SSC, Bank & defence exam portals. Guaranteed under ${targetSizeKB}KB with maximum quality preserved.`}
                    </p>

                    {/* Use case tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                        {activeUseCases.map((u) => (
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

                    {belowUseCasesContent && (
                        <div style={{ marginTop: '24px' }}>
                            {belowUseCasesContent}
                        </div>
                    )}
                </div>

                {/* ── Main Tool Card ── */}
                <div className="native-fade-in delay-100" style={{
                        background: '#ffffff',
                        borderRadius: '32px',
                        border: '1px solid #e2e8f8',
                        boxShadow: '0 8px 8px -4px rgba(0,0,0,0.04), 0 24px 64px -12px rgba(99,102,241,0.14)',
                        marginBottom: '20px',
                    }}>
                    {/* Card top accent */}
                    <div style={{ height: '4px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px' }} />

                    <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
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
                                            border: `2px dashed ${isDragging ? '#4f46e5' : '#94a3b8'}`,
                                            borderRadius: '24px',
                                            background: isDragging ? '#f5f3ff' : '#ffffff',
                                            padding: 'clamp(32px, 6vw, 60px) clamp(16px, 4vw, 24px)',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease',
                                            transform: isDragging ? 'scale(1.01)' : 'scale(1)',
                                        }}
                                    >
                                        <input id="file-input-20kb" type="file" hidden accept="image/*" multiple onChange={handleUpload} />

                                        <div style={{
                                            width: ' clamp(64px, 10vw, 88px)', height: 'clamp(64px, 10vw, 88px)', borderRadius: ' clamp(20px, 4vw, 28px)',
                                            margin: '0 auto 22px',
                                            background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 12px 28px rgba(99,102,241,0.18)',
                                        }}>
                                            <Upload size={30} color="#5b21b6" strokeWidth={1.6} />
                                        </div>

                                        <p style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 800, color: '#1e293b', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                                            Drop your photos here
                                        </p>
                                        <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#64748b', marginBottom: '28px' }}>
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
                                        <p style={{ fontSize: '12px', color: '#475569', marginTop: '18px' }}>
                                            Max 20 MB each · No signup needed · 100% private
                                        </p>
                                    </div>
                                </motion.div>

                            ) : (
                                /* ── Results State ── */
                                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                                    {/* Header row */}
                                    <div className="ci-header-row">
                                        <p style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>
                                            {items.length} image{items.length > 1 ? 's' : ''} {compressionStatus === 'IDLE' ? 'selected' : `compressing to ${userTargetSize}KB`}
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

                                    {/* Manual Compression Box */}
                                    {compressionStatus === 'IDLE' && (
                                        <div className="ci-compress-box">

                                            {/* Custom Dropdown */}
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    style={{
                                                        height: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                                        padding: '0 20px', borderRadius: '16px', background: '#f8fafc',
                                                        border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: 800,
                                                        color: '#4f46e5', cursor: 'pointer', transition: 'all 0.2s ease',
                                                        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: '#ede9fe' }}>
                                                        <span style={{ fontSize: '12px' }}>🎯</span>
                                                    </div>
                                                    {userTargetSize} KB <span style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                                                </button>

                                                {/* Dropdown Menu */}
                                                <AnimatePresence>
                                                    {isDropdownOpen && (
                                                        <>
                                                            <div
                                                                style={{ position: 'fixed', inset: 0, zIndex: 1040 }}
                                                                onClick={() => setIsDropdownOpen(false)}
                                                            />
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                                transition={{ duration: 0.15 }}
                                                                style={{
                                                                    position: 'fixed',
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: '200px',
                                                                    background: '#ffffff',
                                                                    borderRadius: '20px',
                                                                    padding: '8px',
                                                                    zIndex: 1050,
                                                                    boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0,0,0,0.06)',
                                                                    transform: 'none',
                                                                }}
                                                                ref={(el: HTMLDivElement | null) => {
                                                                    if (el) {
                                                                        const btn = el.parentElement?.previousElementSibling as HTMLElement;
                                                                        if (btn) {
                                                                            const r = btn.getBoundingClientRect();
                                                                            el.style.top = `${r.bottom + 8}px`;
                                                                            el.style.left = `${r.left}px`;
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                {presetSizes.map(size => (
                                                                    <button
                                                                        key={size}
                                                                        onClick={() => { setUserTargetSize(size); setIsDropdownOpen(false); }}
                                                                        style={{
                                                                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                                            padding: '12px 16px', borderRadius: '12px', border: 'none',
                                                                            background: userTargetSize === size ? '#f5f3ff' : 'transparent',
                                                                            color: userTargetSize === size ? '#4f46e5' : '#475569',
                                                                            fontSize: '15px', fontWeight: userTargetSize === size ? 800 : 600,
                                                                            cursor: 'pointer', transition: 'background 0.2s', textAlign: 'left'
                                                                        }}
                                                                        onMouseEnter={e => { if (userTargetSize !== size) e.currentTarget.style.background = '#f8fafc' }}
                                                                        onMouseLeave={e => { if (userTargetSize !== size) e.currentTarget.style.background = 'transparent' }}
                                                                    >
                                                                        {size} KB
                                                                        {userTargetSize === size && <CheckCircle2 size={16} color="#4f46e5" />}
                                                                    </button>
                                                                ))}
                                                                <div style={{ height: '1px', background: '#f1f5f9', margin: '8px 0' }} />
                                                                <div style={{ padding: '0 8px 8px' }}>
                                                                    <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: 600, paddingLeft: '4px' }}>CUSTOM SIZE</p>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                        <input
                                                                            type="number"
                                                                            value={userTargetSize}
                                                                            onChange={e => setUserTargetSize(Number(e.target.value) || 20)}
                                                                            style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 700, outline: 'none' }}
                                                                            placeholder="e.g. 75"
                                                                        />
                                                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>KB</span>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <button
                                                className="ci-compress-btn"
                                                onClick={handleStartCompression}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                                            >
                                                <Zap size={20} fill="currentColor" /> Compress {items.length} Image{items.length > 1 ? 's' : ''} Now
                                            </button>
                                        </div>
                                    )}

                                    {/* Progress Bar */}
                                    {compressionStatus === 'COMPRESSING' && (
                                        <div style={{ padding: '24px', background: '#fff', borderRadius: '20px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Compressing...</span>
                                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#6366f1' }}>{Math.round(progress)}%</span>
                                            </div>
                                            <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ ease: "linear", duration: 0.3 }}
                                                    style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '5px' }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Per-file results */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {items.map((item) => {
                                            const resultKB = item.resultSize ? item.resultSize / 1024 : null;
                                            const isSuccess = resultKB !== null && resultKB <= (userTargetSize + 0.5);
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
                                                            {/* Thumbnail preview of original image */}
                                                            <div style={{
                                                                width: '48px', height: '48px', borderRadius: '12px',
                                                                overflow: 'hidden', flexShrink: 0,
                                                                border: '2px solid #e0e7ff',
                                                                background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                            }}>
                                                                <img
                                                                    src={URL.createObjectURL(item.file)}
                                                                    alt={item.file.name}
                                                                    style={{
                                                                        width: '100%', height: '100%',
                                                                        objectFit: 'cover', display: 'block'
                                                                    }}
                                                                    loading="eager"
                                                                />
                                                            </div>
                                                            <div>
                                                            <p className="ci-filename">{item.file.name}</p>

                                                                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
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
                                                                        animation: 'spin-cw 0.75s linear infinite'
                                                                    }} />
                                                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Zap size={14} color="#6366f1" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#5b21b6' }}>Compressing to {userTargetSize} KB…</p>
                                                                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Optimizing quality &amp; dimensions</p>
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
                                                                <div className="ci-result-row">
                                                                    <div className="ci-result-badge" style={{ background: isSuccess ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : 'linear-gradient(135deg, #fff1f2, #ffe4e6)', border: `1px solid ${isSuccess ? '#86efac' : '#fda4af'}` }}>
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
                </div>

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

                {/* ── Are you a happy user? Card ── */}
                <AnimatePresence>
                    {(compressionStatus === 'DONE' || items.some(it => it.error)) && (
                        <motion.div
                            key="happy-user-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: '24px' }}
                        >
                            <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '16px 24px' }}>
                                <p style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Are you a happy user? 😊</p>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Use our other tools</span>
                                <div className="ci-happy-btns">
                                    {[
                                        { href: '/compress-image-to-20kb', label: 'Compress 20KB' },
                                        { href: '/compress-image-to-50kb', label: 'Compress 50KB' },
                                        { href: '/govt-exam-tools/signature-resize', label: 'Signature Resize' },
                                        { href: '/mb-to-kb-image-converter', label: 'MB to KB' },
                                    ].map(t => (
                                        <Link key={t.href} href={t.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                                        ><Zap size={12} /> {t.label}</Link>
                                    ))}
                                </div>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Support Our Work ❤️</span>
                                <Link href="/donate" style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                                >☕ Donate</Link>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Sharing is caring 🤝</span>
                                <div className="ci-happy-btns">
                                    {[
                                        { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}` },
                                        { label: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}&text=Free+image+compression+tool` },
                                        { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent('Free image compression tool: ' + (typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com'))}` },
                                        { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}` },
                                    ].map(s => (
                                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                                        >{s.label}</a>
                                    ))}
                                </div>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Come back! 🔖</span>
                                <button onClick={() => alert('Press Ctrl+D (or ⌘+D on Mac) to bookmark this page!')} style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                                >🔖 Bookmark Page</button>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Link to this tool 🔗</span>
                                <div className="ci-link-row">
                                    <input readOnly value={typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com'} className="ci-link-input" />
                                    <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} style={{ padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>📋 Copy</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '12px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Send Feedback ✉️</span>
                                <Link href="/contact-us" style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                                >✉️ Contact us</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                            { n: '01', label: 'Upload Photos', desc: 'JPG, PNG or WEBP. Up to 10 files, Max 20MB/file.', color: '#4338ca' },
                            { n: '02', label: 'Smart Compress', desc: `Iterative engine targets exactly ${targetSizeKB} KB.`, color: '#6d28d9' },
                            { n: '03', label: 'Download All', desc: 'Portal-ready photos in seconds.', color: '#0369a1' },
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
                                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
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

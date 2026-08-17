"use client";


import React, { useState, useCallback, useEffect } from 'react';
// Mock framer-motion to save JS payload, strip all framer-motion props to avoid React warnings
const motion = {
    div: ({ initial, animate, exit, transition, whileHover, whileTap, whileDrag, whileFocus, whileInView, layoutId, layout, mode, variants, viewport, onViewportEnter, onViewportLeave, ...props }: any) => {
        return <div {...props} />;
    }
};
const AnimatePresence = ({ children }: any) => <>{children}</>;



import Link from 'next/link';
import {
    Upload, Download, RefreshCw, CheckCircle2, XCircle,
    FileImage, Trash2, Zap, ShieldCheck, Clock, ImageIcon,
    GraduationCap, Building2, Award, AlertCircle, ArrowRight,
    Archive
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
    const [isBottomVisible, setIsBottomVisible] = useState(false);
    useEffect(() => {
        if (compressionStatus !== 'DONE') return;
        const target = document.getElementById('download-anchor');
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => {
            // If the anchor is visible OR if we scrolled past it (it's above the viewport)
            // we "dock" the button. It only floats when we are ABOVE the anchor.
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
                setIsBottomVisible(true);
            } else {
                setIsBottomVisible(false);
            }
        }, { threshold: 0, rootMargin: '0px' });
        observer.observe(target);
        return () => observer.disconnect();
    }, [compressionStatus, items.length]);

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
            let blob: Blob | null = null;
            let usedServerFallback = false;

            // Step 1: Attempt Client-Side Compression (Hybrid Approach)
            // We try to compress standard formats locally to save Vercel CPU and Bandwidth
            const isStandardFormat = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(imgFile.type);
            
            if (isStandardFormat) {
                try {
                    const mod = await import('browser-image-compression');
                    const imageCompression = mod.default || mod;
                    
                    // Convert target size KB to MB for the library
                    const targetSizeMB = userTargetSize / 1024;
                    
                    const compressedFile = await imageCompression(imgFile, {
                        maxSizeMB: targetSizeMB,
                        maxWidthOrHeight: 4096, // Keep good resolution
                        useWebWorker: true,
                        initialQuality: 0.85,
                        alwaysKeepResolution: true, // Try to keep dimensions if possible
                    });

                    // Check if client-side compression successfully reached the target size
                    // Allow a tiny 1KB margin of error
                    if (compressedFile.size <= (userTargetSize * 1024) + 1024) {
                        blob = compressedFile;
                    } else {
                        console.log(`Client compression reached ${compressedFile.size / 1024}KB, which is above ${userTargetSize}KB target. Falling back to server...`);
                    }
                } catch (clientErr) {
                    console.warn("Client-side compression failed, falling back to server:", clientErr);
                }
            }

            // Step 2: Fallback to Server-Side Compression if client failed or format is unsupported
            if (!blob) {
                usedServerFallback = true;
                const fileToSend = await preshrinkFile(imgFile);

                const formData = new FormData();
                formData.append('file', fileToSend);
                formData.append('targetSize', userTargetSize.toString());
                const res = await fetch('/api/compress', { method: 'POST', body: formData });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || `Server error: ${res.status}`);
                }

                blob = await res.blob();
            }

            if (!blob || blob.size === 0) {
                throw new Error("Received empty resulting image");
            }

            setItems(prev => prev.map(it =>
                it.id === id
                    ? { ...it, loading: false, optimizedUrl: URL.createObjectURL(blob as Blob), resultSize: blob?.size || 0 }
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

    const handleDownloadZip = async () => {
        const successfulItems = items.filter(item => item.optimizedUrl);
        if (successfulItems.length === 0) {
            toast.error('No compressed images available to ZIP.');
            return;
        }

        toast.loading('Creating ZIP file...', { id: 'zip-toast' });
        try {
            const JSZip = (await import('jszip')).default;
            const zip = new JSZip();

            for (let i = 0; i < successfulItems.length; i++) {
                const item = successfulItems[i];
                if (!item.optimizedUrl) continue;

                const response = await fetch(item.optimizedUrl);
                const blob = await response.blob();

                const ext = item.file.name.substring(item.file.name.lastIndexOf('.'));
                const baseName = item.file.name.substring(0, item.file.name.lastIndexOf('.'));
                const zipFileName = `${baseName}-${userTargetSize}kb${ext}`;

                zip.file(zipFileName, blob);
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const zipUrl = URL.createObjectURL(zipBlob);

            const a = document.createElement('a');
            a.href = zipUrl;
            a.download = `smarttoolswala-${userTargetSize}kb-images.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(zipUrl);
            toast.success('ZIP downloaded successfully!', { id: 'zip-toast' });
        } catch (err) {
            console.error(err);
            toast.error('Failed to create ZIP.', { id: 'zip-toast' });
        }
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
        <div className="compress-image-wrapper" style={{ position: 'relative' }}>
            {/* LCP fast-paint anchor: an invisible structural element larger than any ads */}
            <svg width="100%" height="40vh" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f8faff" />
            </svg>
            <div style={{ position: 'relative', zIndex: 1 }}>

                {/* ── Header ── */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
                <div style={{
                    marginBottom: '20px',
                }}>
                    {/* Gradient top line accent */}
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)', borderRadius: '3px', marginBottom: '16px' }} />

                    <div style={{ padding: '0' }}>
                        <AnimatePresence mode="wait">
                            {isEmpty ? (
                                /* ── Upload State ── */
                                <motion.div key="upload" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                                    <input id="file-input-20kb" type="file" hidden accept="image/*" multiple onChange={handleUpload} />

                                    {/* ── Premium Upload Card ── */}
                                    <div
                                        onClick={() => document.getElementById('file-input-20kb')?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                        style={{
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            padding: 'clamp(44px, 8vw, 80px) clamp(24px, 5vw, 56px)',
                                            borderRadius: '28px',
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            transition: 'all 0.25s ease',
                                            background: isDragging
                                                ? 'linear-gradient(145deg, #eef2ff, #ede9fe)'
                                                : 'linear-gradient(145deg, #0d1117 0%, #0f172a 60%, #13112a 100%)',
                                            border: isDragging
                                                ? '2px solid #818cf8'
                                                : '1.5px solid rgba(129, 140, 248, 0.22)',
                                            boxShadow: isDragging
                                                ? '0 0 0 4px rgba(129,140,248,0.2), 0 16px 48px rgba(99,102,241,0.28)'
                                                : '0 4px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
                                            transform: isDragging ? 'scale(1.018)' : 'scale(1)',
                                        }}
                                    >
                                        {/* Ambient glow blob */}
                                        <div style={{
                                            position: 'absolute', top: '-40px', left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '280px', height: '200px',
                                            background: 'radial-gradient(ellipse, rgba(129,140,248,0.18) 0%, transparent 70%)',
                                            pointerEvents: 'none',
                                        }} />

                                        {/* Icon orb */}
                                        <div style={{
                                            position: 'relative',
                                            width: '80px', height: '80px',
                                            borderRadius: '24px',
                                            background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            marginBottom: '24px',
                                            boxShadow: '0 12px 36px rgba(129,140,248,0.5)',
                                            color: '#fff',
                                            flexShrink: 0,
                                            transition: 'transform 0.25s, box-shadow 0.25s',
                                            transform: isDragging ? 'scale(1.12) translateY(-4px)' : 'none',
                                        }}>
                                            <Upload size={30} strokeWidth={1.8} />
                                        </div>

                                        {/* Headline */}
                                        <p style={{
                                            fontSize: 'clamp(20px, 4vw, 26px)',
                                            fontWeight: 800,
                                            color: '#f1f5f9',
                                            letterSpacing: '-0.03em',
                                            marginBottom: '8px',
                                            lineHeight: 1.2,
                                        }}>
                                            {isDragging ? '✦ Release to upload' : 'Drop your images here'}
                                        </p>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#64748b',
                                            marginBottom: '24px',
                                        }}>
                                            or click anywhere to browse your files
                                        </p>

                                        {/* Format pills */}
                                        <div style={{
                                            display: 'flex', flexWrap: 'wrap',
                                            justifyContent: 'center', gap: '8px',
                                            marginBottom: '32px',
                                        }}>
                                            {['JPG', 'PNG', 'WEBP', 'Up to 10 files', 'Max 20 MB'].map(label => (
                                                <span key={label} style={{
                                                    display: 'inline-flex', alignItems: 'center',
                                                    padding: '5px 14px',
                                                    borderRadius: '100px',
                                                    background: 'rgba(129,140,248,0.1)',
                                                    border: '1px solid rgba(129,140,248,0.25)',
                                                    fontSize: '12px', fontWeight: 700,
                                                    color: '#a5b4fc',
                                                    letterSpacing: '0.02em',
                                                }}>
                                                    {label}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA button */}
                                        <button
                                            className="ci-upload-btn"
                                            onClick={e => { e.stopPropagation(); document.getElementById('file-input-20kb')?.click(); }}
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '10px',
                                                padding: '14px 36px',
                                                borderRadius: '16px',
                                                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                                color: '#fff',
                                                fontSize: '15px', fontWeight: 700,
                                                border: 'none', cursor: 'pointer',
                                                letterSpacing: '-0.01em',
                                                boxShadow: '0 4px 20px rgba(129,140,248,0.45)',
                                                position: 'relative', zIndex: 1,
                                            }}
                                        >
                                            <ImageIcon size={16} /> Choose Images
                                        </button>

                                        {/* Privacy note */}
                                        <p style={{
                                            fontSize: '12px',
                                            color: '#475569',
                                            marginTop: '18px',
                                            position: 'relative', zIndex: 1,
                                        }}>
                                            🔒 No signup · 100% private · Files never stored
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
                                                                    position: 'absolute',
                                                                    top: 'calc(100% + 12px)',
                                                                    left: '0',
                                                                    width: '200px',
                                                                    background: '#ffffff',
                                                                    borderRadius: '20px',
                                                                    padding: '8px',
                                                                    zIndex: 1050,
                                                                    boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0,0,0,0.06)',
                                                                    transform: 'none',
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
                                                                                {isSuccess ? '✓ Compressed Successfully' : `Above ${userTargetSize}KB`}
                                                                            </p>
                                                                            <p style={{ fontSize: '11px', color: isSuccess ? '#15803d' : '#be123c', marginTop: '1px', fontWeight: 600 }}>
                                                                                {(item.file.size / 1024).toFixed(1)} KB ➝ {resultKB!.toFixed(1)} KB
                                                                                {saved ? <span style={{ color: '#047857', marginLeft: '6px', background: '#d1fae5', padding: '2px 6px', borderRadius: '4px' }}>-{saved}%</span> : ''}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        className="ci-download-btn"
                                                                        onClick={() => {
                                                                            const link = document.createElement('a');
                                                                            link.href = item.optimizedUrl!;
                                                                            link.download = `smarttoolswala-${userTargetSize}kb-${item.file.name.split('.')[0]}.jpg`;
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
                                        <>
                                            {/* Invisible anchor to detect when we reach the bottom */}
                                            <div id="download-anchor" style={{ height: '80px', marginTop: '-40px', pointerEvents: 'none' }} />

                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    ...(isBottomVisible ? {
                                                        marginTop: '16px', display: 'flex', justifyContent: 'center'
                                                    } : {
                                                        position: 'fixed', bottom: '24px', left: '0', right: '0', zIndex: 1040,
                                                        display: 'flex', justifyContent: 'center', padding: '0 24px',
                                                        pointerEvents: 'none'
                                                    })
                                                }}
                                            >
                                                <button
                                                    className="ci-download-zip-btn"
                                                    onClick={handleDownloadZip}
                                                    style={{
                                                        pointerEvents: 'auto',
                                                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                                                        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
                                                        color: '#fff', border: 'none', borderRadius: '16px',
                                                        padding: '15px 32px', fontSize: '15px', fontWeight: 800,
                                                        cursor: 'pointer', boxShadow: '0 8px 30px rgba(15,23,42,0.4)',
                                                        letterSpacing: '-0.01em',
                                                        width: isBottomVisible ? 'auto' : '100%',
                                                        maxWidth: '400px',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                                                    }}
                                                >
                                                    <Archive size={17} /> Download All {items.length} Files (ZIP)
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>


                {/* Trust Bar */}
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
                            style={{ background: 'var(--bg-secondary)', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', marginBottom: '24px' }}
                        >
                            <div style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', padding: '16px 24px' }}>
                                <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Are you a happy user? 😊</p>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Use our other tools</span>
                                <div className="ci-happy-btns">
                                    {[
                                        { href: '/image-compressor-to-20kb', label: 'Compress 20KB' },
                                        { href: '/compress-image-to-50kb', label: 'Compress 50KB' },
                                        { href: '/govt-exam-tools/signature-resize', label: 'Signature Resize' },
                                        { href: '/mb-to-kb-image-converter', label: 'MB to KB' },
                                    ].map(t => (
                                        <Link key={t.href} href={t.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '8px', border: '1.5px solid var(--brand-light)', background: 'var(--bg-tertiary)', fontSize: '13px', fontWeight: 700, color: 'var(--brand-primary)', textDecoration: 'none' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-light)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'; }}
                                        ><Zap size={12} /> {t.label}</Link>
                                    ))}
                                </div>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Support Our Work ❤️</span>
                                <Link href="/donate" style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid var(--brand-light)', background: 'var(--bg-tertiary)', fontSize: '13px', fontWeight: 700, color: 'var(--brand-primary)', textDecoration: 'none' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-light)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'; }}
                                >☕ Donate</Link>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Sharing is caring 🤝</span>
                                <div className="ci-happy-btns">
                                    {[
                                        { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}` },
                                        { label: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}&text=Free+image+compression+tool` },
                                        { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent('Free image compression tool: ' + (typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com'))}` },
                                        { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com')}` },
                                    ].map(s => (
                                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid var(--brand-light)', background: 'var(--bg-tertiary)', fontSize: '13px', fontWeight: 700, color: 'var(--brand-primary)', textDecoration: 'none' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-light)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'; }}
                                        >{s.label}</a>
                                    ))}
                                </div>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Come back! 🔖</span>
                                <button onClick={() => alert('Press Ctrl+D (or ⌘+D on Mac) to bookmark this page!')} style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid var(--brand-light)', background: 'var(--bg-tertiary)', fontSize: '13px', fontWeight: 700, color: 'var(--brand-primary)', cursor: 'pointer' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-light)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'; }}
                                >🔖 Bookmark Page</button>
                            </div>
                            <div className="ci-happy-row">
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Link to this tool 🔗</span>
                                <div className="ci-link-row">
                                    <input readOnly value={typeof window !== 'undefined' ? window.location.href : 'https://smarttoolswala.com'} className="ci-link-input" />
                                    <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} style={{ padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>📋 Copy</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '12px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Send Feedback ✉️</span>
                                <Link href="/contact-us" style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid var(--brand-light)', background: 'var(--bg-tertiary)', fontSize: '13px', fontWeight: 700, color: 'var(--brand-primary)', textDecoration: 'none' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-light)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'; }}
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
                        background: 'var(--bg-secondary)', borderRadius: '28px',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--shadow-sm)',
                        padding: '28px 32px', marginBottom: '24px'
                    }}
                >
                    <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', letterSpacing: '-0.02em' }}>
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
                                background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)',
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
                                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{s.label}</p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{s.desc}</p>
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

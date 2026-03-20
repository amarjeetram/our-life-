"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, Download, RefreshCw, CheckCircle2, XCircle,
    FileImage, Trash2, Zap, ShieldCheck, Clock, ImageIcon,
    Crop
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FileResult {
    id: string;
    file: File;
    optimizedUrl: string | null;
    resultSize: number | null;
    loading: boolean;
    error: string | null;
}

export default function SignatureResizeClient({ children }: { children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    
    // User configuration
    const [unit, setUnit] = useState<'pixel' | 'cm'>('pixel');
    const [widthPx, setWidthPx] = useState<number | ''>(140);
    const [heightPx, setHeightPx] = useState<number | ''>(60);
    const [widthCm, setWidthCm] = useState<number | ''>(3.5);
    const [heightCm, setHeightCm] = useState<number | ''>(1.5);
    const [targetKB, setTargetKB] = useState<number | ''>(20);

    const [compressionStatus, setCompressionStatus] = useState<'IDLE' | 'COMPRESSING' | 'DONE'>('IDLE');
    const [progress, setProgress] = useState(0);

    // DPI for CM to Pixel conversion (standard 300 DPI for print/gov portals)
    const DPI = 300;
    const cmToPx = (cm: number) => Math.round((cm * DPI) / 2.54);

    const compressOne = useCallback(async (id: string, imgFile: File) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, loading: true, error: null } : it));
        try {
            const formData = new FormData();
            formData.append('file', imgFile);
            formData.append('targetSize', (targetKB || 20).toString());
            
            let finalWidth = 140;
            let finalHeight = 60;
            
            if (unit === 'pixel') {
                finalWidth = Number(widthPx) || 140;
                finalHeight = Number(heightPx) || 60;
            } else {
                finalWidth = cmToPx(Number(widthCm) || 3.5);
                finalHeight = cmToPx(Number(heightCm) || 1.5);
            }
            
            formData.append('width', finalWidth.toString());
            formData.append('height', finalHeight.toString());

            const res = await fetch('/api/signature-resize', { method: 'POST', body: formData });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Server error: ${res.status}`);
            }

            const blob = await res.blob();
            if (blob.size === 0) throw new Error("Received empty resulting image");

            setItems(prev => prev.map(it =>
                it.id === id
                    ? { ...it, loading: false, optimizedUrl: URL.createObjectURL(blob), resultSize: blob.size }
                    : it
            ));
        } catch (err: any) {
            console.error(`Reduction failed for ${imgFile.name}:`, err);
            setItems(prev => prev.map(it =>
                it.id === id ? { ...it, loading: false, error: err.message || 'Failed. Try again.' } : it
            ));
            toast.error(`Failed to resize ${imgFile.name}.`);
        }
    }, [targetKB, unit, widthPx, heightPx, widthCm, heightCm]);

    const retryCompression = useCallback((id: string) => {
        const item = items.find(it => it.id === id);
        if (item && item.file) compressOne(id, item.file);
    }, [items, compressOne]);

    const addFiles = useCallback((rawFiles: File[]) => {
        const imageFiles = rawFiles.filter(f => f.type.startsWith('image/')).slice(0, 10 - items.length);
        if (!imageFiles.length) return;
        
        const newItems: FileResult[] = imageFiles.map(f => ({
            id: Math.random().toString(36).slice(2) + Date.now(),
            file: f, optimizedUrl: null, resultSize: null, loading: false, error: null,
        }));
        
        setItems(prev => [...prev, ...newItems]);
    }, [items]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length) addFiles(files);
        e.target.value = '';
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault(); setIsDragging(false);
        addFiles(Array.from(e.dataTransfer.files));
    }, [addFiles]);

    const handleStartCompression = () => {
        if (!targetKB || (unit === 'pixel' && (!widthPx || !heightPx)) || (unit === 'cm' && (!widthCm || !heightCm))) {
            toast.error('Please fill in dimensions and target KB correctly.');
            return;
        }

        setCompressionStatus('COMPRESSING');
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(p => (p >= 90 ? p : p + Math.random() * 15));
        }, 300);

        items.forEach(item => {
            if (!item.optimizedUrl) compressOne(item.id, item.file);
        });

        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => setCompressionStatus('DONE'), 500);
        }, 2000);
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

    const resetAll = () => {
        setItems([]);
        setCompressionStatus('IDLE');
        setProgress(0);
    };

    const removeItem = (id: string) => setItems(prev => prev.filter(it => it.id !== id));
    const isEmpty = items.length === 0;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f8faff 0%, #f1f5ff 60%, #faf5ff 100%)', paddingBottom: '80px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '110px 20px 0' }}>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: '16px' }}>
                        Signature Resize to KB &amp; Pixels/Cm
                    </h1>
                    <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
                        Resize your signature photo to exact width and height (cm or px) and compress size to Kb instantly for SSC, RRB, UPSC, and government portals.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: '#ffffff', borderRadius: '32px', border: '1px solid #e2e8f8',
                        boxShadow: '0 8px 8px -4px rgba(0,0,0,0.04), 0 24px 64px -12px rgba(99,102,241,0.14)',
                        marginBottom: '40px', overflow: 'hidden'
                    }}
                >
                    <div style={{ height: '4px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)' }} />
                    <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px', margin: '0 auto 32px' }}>
                            {/* Controls Form, resembling the image */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '8px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', color: '#1e293b', fontWeight: 600, cursor: 'pointer' }}>
                                    <input type="radio" checked={unit === 'pixel'} onChange={() => setUnit('pixel')} style={{ accentColor: '#4f46e5', width: '18px', height: '18px' }} />
                                    Pixel
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', color: '#1e293b', fontWeight: 600, cursor: 'pointer' }}>
                                    <input type="radio" checked={unit === 'cm'} onChange={() => setUnit('cm')} style={{ accentColor: '#4f46e5', width: '18px', height: '18px' }} />
                                    Centimeter
                                </label>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textAlign: 'center' }}>Width ({unit === 'pixel' ? 'px' : 'cm'})</span>
                                    <input 
                                        type="number" 
                                        value={unit === 'pixel' ? widthPx : widthCm}
                                        onChange={(e) => unit === 'pixel' ? setWidthPx(Number(e.target.value) || '') : setWidthCm(Number(e.target.value) || '')}
                                        style={{ width: '100px', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '15px', fontWeight: 600 }}
                                    />
                                </div>
                                <span style={{ fontSize: '20px', color: '#cbd5e1', fontWeight: 700, marginTop: '20px' }}>X</span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textAlign: 'center' }}>Height ({unit === 'pixel' ? 'px' : 'cm'})</span>
                                    <input 
                                        type="number" 
                                        value={unit === 'pixel' ? heightPx : heightCm}
                                        onChange={(e) => unit === 'pixel' ? setHeightPx(Number(e.target.value) || '') : setHeightCm(Number(e.target.value) || '')}
                                        style={{ width: '100px', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '15px', fontWeight: 600 }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>Size:</span>
                                <div style={{ display: 'flex' }}>
                                    <input 
                                        type="number" 
                                        value={targetKB}
                                        onChange={(e) => setTargetKB(Number(e.target.value) || '')}
                                        style={{ width: '100px', padding: '10px', border: '1px solid #cbd5e1', borderRight: 'none', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', textAlign: 'center', fontSize: '15px', fontWeight: 600 }}
                                    />
                                    <span style={{ background: '#64748b', color: '#fff', padding: '10px 16px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', fontSize: '15px', fontWeight: 600 }}>
                                        Kb
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Upload Zone */}
                        <AnimatePresence mode="wait">
                            {isEmpty ? (
                                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div
                                        onClick={() => document.getElementById('sig-input')?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                        style={{
                                            border: `2px dashed ${isDragging ? '#6366f1' : '#e2e8f0'}`, borderRadius: '24px',
                                            background: isDragging ? '#f5f3ff' : '#fafbff',
                                            padding: '40px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s'
                                        }}
                                    >
                                        <input id="sig-input" type="file" hidden accept="image/*" multiple onChange={handleUpload} />
                                        <div style={{ width: '70px', height: '70px', borderRadius: '20px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #ede9fe, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Upload size={28} color="#5b21b6" strokeWidth={1.8} />
                                        </div>
                                        <p style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>Drop signatures here</p>
                                        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>PNG, JPG, WEBP. You can resize 10 images at once.</p>
                                        <button style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                            <ImageIcon size={16} /> Select Images
                                        </button>
                                        <div style={{ marginTop: '20px' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Note:- You can resize 10 images at once.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                        <p style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>
                                            {items.length} items to resize
                                        </p>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {items.length < 10 && (
                                                <>
                                                 <input id="sig-input-add" type="file" hidden accept="image/*" multiple onChange={handleUpload} />
                                                 <button onClick={() => document.getElementById('sig-input-add')?.click()} style={{ padding: '8px 14px', borderRadius: '12px', border: '1px solid #e0e7ff', background: '#f8faff', fontSize: '13px', fontWeight: 700, color: '#6366f1', cursor: 'pointer' }}>+ Add</button>
                                                </>
                                            )}
                                            <button onClick={resetAll} style={{ padding: '8px 14px', borderRadius: '12px', border: '1px solid #fecdd3', background: '#fff1f2', fontSize: '13px', fontWeight: 700, color: '#f43f5e', cursor: 'pointer' }}>Clear</button>
                                        </div>
                                    </div>

                                    {compressionStatus === 'IDLE' && (
                                        <button
                                            onClick={handleStartCompression}
                                            style={{ width: '100%', padding: '18px', background: '#3b4382', color: 'white', borderRadius: '16px', fontSize: '17px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(59,67,130,0.3)', marginBottom: '24px' }}
                                        >
                                            <Crop size={20} /> Resize Signature
                                        </button>
                                    )}

                                    {compressionStatus === 'COMPRESSING' && (
                                        <div style={{ padding: '24px', background: '#fff', borderRadius: '20px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Resizing &amp; Compressing...</span>
                                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#6366f1' }}>{Math.round(progress)}%</span>
                                            </div>
                                            <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.3 }} style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '5px' }} />
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {items.map(item => (
                                            <div key={item.id} style={{ borderRadius: '16px', border: '1px solid #e8eaf0', background: '#f8fafc', padding: '16px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <FileImage size={18} color="#64748b" />
                                                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>{item.file.name}</span>
                                                    </div>
                                                    <button onClick={() => removeItem(item.id)} style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                                </div>
                                                
                                                {item.optimizedUrl && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                                        <img src={item.optimizedUrl} alt="Resized" style={{ height: '60px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <CheckCircle2 size={16} color="#10b981" />
                                                                <span style={{ fontSize: '13px', fontWeight: 700, color: '#047857' }}>Success • {item.resultSize ? (item.resultSize / 1024).toFixed(1) : ''} KB</span>
                                                            </div>
                                                        </div>
                                                        <a href={item.optimizedUrl} download={`signature-resized-${item.file.name}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#4f46e5', color: '#fff', textDecoration: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700 }}>
                                                            <Download size={14} /> Download
                                                        </a>
                                                    </div>
                                                )}
                                                {item.error && !item.loading && (
                                                    <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600 }}>Error: {item.error}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
                                        { href: '/mb-to-kb-converter', label: 'MB to KB' },
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
                            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '12px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Send Feedback ✉️</span>
                                <Link href="/contact-us" style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: '13px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafbff'; }}
                                >✉️ Contact us</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {children}

            </div>
        </div>
    );
}

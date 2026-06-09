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
import CropperModal from './CropperModal';

interface FileResult {
    id: string;
    file: File;
    optimizedUrl: string | null;
    resultSize: number | null;
    loading: boolean;
    error: string | null;
}

export default function SignatureResizeClient({ children, title, subtitle }: { children?: React.ReactNode, title?: string, subtitle?: string }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [croppingItemId, setCroppingItemId] = useState<string | null>(null);
    
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

    useEffect(() => {
        const handleGlobalDrop = (e: any) => {
            const files = e.detail?.files as File[];
            if (files && files.length) addFiles(files);
        };
        window.addEventListener("global-drop-compress", handleGlobalDrop);
        return () => window.removeEventListener("global-drop-compress", handleGlobalDrop);
    }, [addFiles]);

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
        <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.04), transparent 45%), radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.04), transparent 45%), #f8fafc', paddingBottom: '80px' }}>
            <style>{`
                .ci-happy-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #f1f5f9; flex-wrap: wrap; gap: 10px; }
                .ci-happy-row:last-child { border-bottom: none; }
                .ci-happy-btns { display: flex; flex-wrap: wrap; gap: 8px; }
                .ci-link-row { display: flex; align-items: center; gap: 8px; flex: 1; max-width: 380px; min-width: 200px; width: 100%; }
                .ci-link-input { flex: 1; padding: 8px 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 12px; color: #64748b; background: #f8fafc; outline: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
                @media (max-width: 480px) {
                    .ci-happy-row { padding: 12px 16px; }
                    .ci-link-row { max-width: 100%; }
                }

                .input-premium {
                    width: 120px;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: 2px solid #e2e8f0;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                    background: #ffffff;
                    outline: none;
                    transition: all 0.2s ease;
                }
                .input-premium:focus {
                    border-color: #6366f1;
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
                }
                .input-wrapper-premium {
                    display: flex;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                    border-radius: 12px;
                    overflow: hidden;
                    border: 2px solid #e2e8f0;
                    transition: all 0.2s ease;
                }
                .input-wrapper-premium:focus-within {
                    border-color: #6366f1;
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
                }
                .input-wrapper-premium input {
                    width: 110px;
                    padding: 12px 16px;
                    border: none;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                    outline: none;
                    background: #ffffff;
                }
                .segmented-control {
                    display: flex;
                    background: #f1f5f9;
                    border-radius: 14px;
                    padding: 4px;
                    width: fit-content;
                    margin: 0 auto;
                    border: 1px solid #e2e8f0;
                }
                .segmented-btn {
                    padding: 8px 24px;
                    border-radius: 10px;
                    border: none;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .segmented-btn.active {
                    background: #ffffff;
                    color: #4f46e5;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
                }
                .segmented-btn.inactive {
                    background: transparent;
                    color: #64748b;
                }
                .segmented-btn.inactive:hover {
                    color: #0f172a;
                }
                .dropzone-premium {
                    border: 2px dashed #c7d2fe;
                    border-radius: 24px;
                    background: linear-gradient(135deg, #ffffff 0%, #fcfcff 100%);
                    padding: 48px 24px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .dropzone-premium:hover {
                    border-color: #6366f1;
                    background: #fbfbfe;
                    transform: translateY(-2px);
                    box-shadow: 0 12px 20px -10px rgba(99, 102, 241, 0.15);
                }
                .btn-primary-premium {
                    background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
                    color: #ffffff;
                    border: none;
                    border-radius: 12px;
                    padding: 12px 28px;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
                    transition: all 0.2s ease;
                }
                .btn-primary-premium:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
                }
                .upload-icon-container {
                    width: 76px;
                    height: 76px;
                    border-radius: 22px;
                    margin: 0 auto 20px;
                    background: linear-gradient(135deg, #ede9fe, #dbeafe);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .dropzone-premium:hover .upload-icon-container {
                    background: linear-gradient(135deg, #6366f1, #4f46e5);
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
                }
                .dropzone-premium:hover .upload-icon-container svg {
                    color: #ffffff !important;
                }
            `}</style>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '110px 20px 0' }}>

                {/* Breadcrumb Navigation */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <Link href="/" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#4f46e5'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>Home</Link>
                    <span style={{ color: '#cbd5e1' }}>/</span>
                    <Link href="/image-tools" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#4f46e5'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>Image Tools</Link>
                    <span style={{ color: '#cbd5e1' }}>/</span>
                    <span style={{ color: '#0f172a' }}>Signature Resize Tool</span>
                </nav>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                        {title || 'Free Signature Resize Tool (10-20 KB & CM) for Govt Exams'}
                    </h1>
                    <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7, fontWeight: 500 }}>
                        {subtitle || 'Easily resize your photo and signature to exact width and height (cm or px) and compress size to 10-20Kb instantly for SSC, RRB, PAN Card, and GATE forms.'}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: '#ffffff', borderRadius: '32px', border: '1px solid #e2e8f0',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02), 0 20px 40px -10px rgba(99,102,241,0.08)',
                        marginBottom: '40px', overflow: 'hidden'
                    }}
                >
                    <div style={{ height: '5px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)' }} />
                    <div style={{ padding: 'clamp(20px, 5vw, 40px)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '500px', margin: '0 auto 36px' }}>
                            {/* Controls Form - Segmented Tab Style */}
                            <div className="segmented-control">
                                <button
                                    type="button"
                                    onClick={() => setUnit('pixel')}
                                    className={`segmented-btn ${unit === 'pixel' ? 'active' : 'inactive'}`}
                                >
                                    Pixel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUnit('cm')}
                                    className={`segmented-btn ${unit === 'cm' ? 'active' : 'inactive'}`}
                                >
                                    Centimeter
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569', textAlign: 'center' }}>Width ({unit === 'pixel' ? 'px' : 'cm'})</span>
                                    <input 
                                        type="number" 
                                        value={unit === 'pixel' ? widthPx : widthCm}
                                        onChange={(e) => unit === 'pixel' ? setWidthPx(Number(e.target.value) || '') : setWidthCm(Number(e.target.value) || '')}
                                        className="input-premium"
                                    />
                                </div>
                                <span style={{ fontSize: '20px', color: '#94a3b8', fontWeight: 800, marginTop: '24px' }}>×</span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569', textAlign: 'center' }}>Height ({unit === 'pixel' ? 'px' : 'cm'})</span>
                                    <input 
                                        type="number" 
                                        value={unit === 'pixel' ? heightPx : heightCm}
                                        onChange={(e) => unit === 'pixel' ? setHeightPx(Number(e.target.value) || '') : setHeightCm(Number(e.target.value) || '')}
                                        className="input-premium"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Target File Size</span>
                                <div className="input-wrapper-premium">
                                    <input 
                                        type="number" 
                                        value={targetKB}
                                        onChange={(e) => setTargetKB(Number(e.target.value) || '')}
                                    />
                                    <span style={{ background: '#f8fafc', color: '#475569', padding: '12px 20px', borderLeft: '2px solid #e2e8f0', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                                        KB
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
                                        className="dropzone-premium"
                                        style={isDragging ? { borderColor: '#6366f1', background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)' } : {}}
                                    >
                                        <input id="sig-input" type="file" hidden accept="image/*" multiple onChange={handleUpload} />
                                        <div className="upload-icon-container">
                                            <Upload size={28} color="#4f46e5" strokeWidth={2.2} />
                                        </div>
                                        <p style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Drop your signature here</p>
                                        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>PNG, JPG, JPEG, WEBP. Select up to 10 images at once.</p>
                                        <button className="btn-primary-premium">
                                            <ImageIcon size={16} /> Select Images
                                        </button>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '36px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                                                <ShieldCheck size={16} color="#10b981" /> 100% Secure &amp; Private
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                                                <Zap size={16} color="#eab308" /> Fast Compression
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                                                <CheckCircle2 size={16} color="#6366f1" /> Free to Use
                                            </div>
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
                                            className="btn-primary-premium"
                                            style={{ width: '100%', padding: '16px', fontSize: '16px', justifyContent: 'center', marginBottom: '24px' }}
                                        >
                                            <Crop size={18} /> Resize Signature
                                        </button>
                                    )}

                                    {compressionStatus === 'COMPRESSING' && (
                                        <div style={{ padding: '24px', background: '#ffffff', borderRadius: '20px', marginBottom: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Resizing &amp; Compressing...</span>
                                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#6366f1' }}>{Math.round(progress)}%</span>
                                            </div>
                                            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.3 }} style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '4px' }} />
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {items.map(item => (
                                            <div key={item.id} style={{ borderRadius: '20px', border: '1px solid #e2e8f0', background: '#f8fafc', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={{ padding: '8px', background: '#ede9fe', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FileImage size={18} color="#6366f1" />
                                                        </div>
                                                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', wordBreak: 'break-all' }}>{item.file.name}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                        <button 
                                                            onClick={() => setCroppingItemId(item.id)} 
                                                            style={{ 
                                                                background: '#ffffff', 
                                                                color: '#4f46e5', 
                                                                cursor: 'pointer', 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                gap: '6px', 
                                                                fontSize: '13px', 
                                                                fontWeight: 700,
                                                                padding: '6px 12px',
                                                                borderRadius: '8px',
                                                                border: '1px solid #e2e8f0',
                                                                transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#4f46e5'; e.currentTarget.style.background = '#f5f3ff'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#ffffff'; }}
                                                        >
                                                            <Crop size={14} /> Crop
                                                        </button>
                                                        <button 
                                                            onClick={() => removeItem(item.id)} 
                                                            style={{ 
                                                                border: 'none', 
                                                                background: '#fff1f2', 
                                                                color: '#f43f5e', 
                                                                cursor: 'pointer',
                                                                padding: '8px',
                                                                borderRadius: '8px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={e => e.currentTarget.style.background = '#ffe4e6'}
                                                            onMouseLeave={e => e.currentTarget.style.background = '#fff1f2'}
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {!item.optimizedUrl && (
                                                    <div style={{ marginBottom: '4px' }}>
                                                        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>Expected Outcome (Preview):</p>
                                                        <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '12px', display: 'inline-block', border: '1px solid #cbd5e1', maxWidth: '100%', overflow: 'hidden' }}>
                                                            <img 
                                                                src={URL.createObjectURL(item.file)} 
                                                                alt="Live Preview" 
                                                                style={{ 
                                                                    display: 'block',
                                                                    maxHeight: '120px',
                                                                    maxWidth: '100%',
                                                                    aspectRatio: unit === 'pixel' 
                                                                        ? `${Number(widthPx) || 140} / ${Number(heightPx) || 60}`
                                                                        : `${Number(widthCm) || 3.5} / ${Number(heightCm) || 1.5}`,
                                                                    objectFit: 'fill',
                                                                    borderRadius: '4px'
                                                                }} 
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {item.optimizedUrl && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                                        <img src={item.optimizedUrl} alt="Resized" style={{ maxHeight: '60px', borderRadius: '8px', border: '1px solid #e2e8f0', objectFit: 'contain' }} />
                                                        <div style={{ flex: 1, minWidth: '150px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <CheckCircle2 size={16} color="#10b981" />
                                                                <span style={{ fontSize: '13px', fontWeight: 700, color: '#047857' }}>Success • {item.resultSize ? (item.resultSize / 1024).toFixed(1) : ''} KB</span>
                                                            </div>
                                                        </div>
                                                        <a href={item.optimizedUrl} download={`signature-resized-${item.file.name}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#4f46e5', color: '#fff', textDecoration: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, boxShadow: '0 2px 4px rgba(79, 70, 229, 0.1)' }}>
                                                            <Download size={14} /> Download
                                                        </a>
                                                    </div>
                                                )}
                                                {item.error && !item.loading && (
                                                    <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                                                        <XCircle size={16} /> Error: {item.error}
                                                    </div>
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
                                        { href: '/image-compressor-to-20kb', label: 'Compress 20KB' },
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

                {croppingItemId && (
                    <CropperModal 
                        imageSrc={URL.createObjectURL(items.find(i => i.id === croppingItemId)!.file)}
                        aspectRatio={unit === 'pixel' ? (Number(widthPx) || 140) / (Number(heightPx) || 60) : (Number(widthCm) || 3.5) / (Number(heightCm) || 1.5)}
                        onClose={() => setCroppingItemId(null)}
                        onCropComplete={(croppedFile) => {
                            setItems(prev => prev.map(it => it.id === croppingItemId ? { ...it, file: croppedFile, optimizedUrl: null, resultSize: null } : it));
                            setCroppingItemId(null);
                        }}
                    />
                )}

                {children}

            </div>
        </div>
    );
}

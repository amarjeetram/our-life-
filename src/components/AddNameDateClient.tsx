"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Upload, Download, RefreshCw, CheckCircle2, XCircle,
    FileImage, Trash2, Zap, ImageIcon, User, Calendar
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

export default function AddNameDateClient({ children }: { children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    
    // Configuration Fields
    const [nameText, setNameText] = useState('AMARJEET');
    const [includeDate, setIncludeDate] = useState(true);
    const [dateText, setDateText] = useState(() => {
        const d = new Date();
        return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
    });
    
    // Compression Settings
    const [enableCompression, setEnableCompression] = useState(false);
    const [widthPx, setWidthPx] = useState<number | ''>('');
    const [heightPx, setHeightPx] = useState<number | ''>('');
    const [targetKB, setTargetKB] = useState<number>(50);

    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'DONE'>('IDLE');
    const [progress, setProgress] = useState(0);

    // ── Pre-process Canvas Logic ────────────────────────────────────────────────
    const stampOriginalImage = (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return reject(new Error('Failed to get canvas context'));

                let finalWidth = img.width;
                let finalHeight = img.height;

                // Optional resizing
                if (enableCompression) {
                    const w = Number(widthPx);
                    const h = Number(heightPx);
                    if (w && h) {
                        finalWidth = w;
                        finalHeight = h;
                    } else if (w && !h) {
                        finalWidth = w;
                        finalHeight = (img.height / img.width) * finalWidth;
                    } else if (!w && h) {
                        finalHeight = h;
                        finalWidth = (img.width / img.height) * finalHeight;
                    }
                }
                
                // Calculate strip height for the bottom
                // We want it proportional. E.g., at least 50px, usually 15-20% of image height
                let stripHeight = Math.floor(finalHeight * 0.18);
                if (stripHeight < 40) stripHeight = 40;

                canvas.width = finalWidth;
                canvas.height = finalHeight + stripHeight;

                // 1. Draw Image
                ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

                // 2. Draw White Strip
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, finalHeight, finalWidth, stripHeight);

                // 3. Draw thin black border around the whole thing
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = Math.max(1, Math.floor(finalWidth * 0.005)); 
                ctx.strokeRect(0, 0, finalWidth, finalHeight + stripHeight);
                
                // Line separating image and strip
                ctx.beginPath();
                ctx.moveTo(0, finalHeight);
                ctx.lineTo(finalWidth, finalHeight);
                ctx.stroke();

                // 4. Draw Text
                ctx.fillStyle = '#000000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const nameLines = nameText.trim() ? [nameText.trim().toUpperCase()] : [];
                const dateLines = includeDate && dateText.trim() ? [dateText.trim()] : [];
                
                if (nameLines.length > 0 && dateLines.length > 0) {
                    const fontSize = stripHeight * 0.35;
                    ctx.font = `bold ${fontSize}px sans-serif`;
                    // Name
                    ctx.fillText(nameLines[0], finalWidth / 2, finalHeight + (stripHeight * 0.35));
                    // Date
                    ctx.font = `bold ${fontSize * 0.9}px sans-serif`;
                    ctx.fillText(dateLines[0], finalWidth / 2, finalHeight + (stripHeight * 0.75));
                } else if (nameLines.length > 0) {
                    const fontSize = stripHeight * 0.45;
                    ctx.font = `bold ${fontSize}px sans-serif`;
                    ctx.fillText(nameLines[0], finalWidth / 2, finalHeight + (stripHeight * 0.5));
                } else if (dateLines.length > 0) {
                    const fontSize = stripHeight * 0.45;
                    ctx.font = `bold ${fontSize}px sans-serif`;
                    ctx.fillText(dateLines[0], finalWidth / 2, finalHeight + (stripHeight * 0.5));
                }

                // 5. Enhance image -> Blob
                canvas.toBlob((blob) => {
                    if (!blob) return reject(new Error('Canvas to Blob failed'));
                    // Use a new file name indicating it has name/date
                    const nameParts = file.name.split('.');
                    const ext = nameParts.pop();
                    const newName = `${nameParts.join('.')}-stamped.${ext}`;
                    resolve(new File([blob], newName, { type: file.type || 'image/jpeg' }));
                }, file.type || 'image/jpeg', 1.0);
            };
            img.onerror = () => reject(new Error('Failed to load image into canvas'));
            img.src = URL.createObjectURL(file);
        });
    };

    const processOne = useCallback(async (id: string, imgFile: File) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, loading: true, error: null } : it));
        try {
            // STEP 1: Add Name & Date via Canvas
            const stampedFile = await stampOriginalImage(imgFile);

            // STEP 2: Compress to target KB via our API
            const formData = new FormData();
            formData.append('file', stampedFile);
            formData.append('targetSize', targetKB.toString());

            const res = await fetch('/api/compress', { method: 'POST', body: formData });

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
            console.error(`Processing failed for ${imgFile.name}:`, err);
            setItems(prev => prev.map(it =>
                it.id === id ? { ...it, loading: false, error: err.message || 'Processing failed. Try again.' } : it
            ));
            toast.error(`Failed to process ${imgFile.name}.`);
        }
    }, [nameText, includeDate, dateText, enableCompression, widthPx, heightPx, targetKB]);


    // ── Handlers ────────────────────────────────────────────────
    const addFiles = useCallback((rawFiles: File[]) => {
        const imageFiles = rawFiles.filter(f => f.type.startsWith('image/')).slice(0, 5 - items.length);
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

    const handleStartProcessing = () => {
        if (!nameText && !dateText) {
            toast.error("Please enter Name or Date to stamp onto the photo.");
            return;
        }

        setStatus('PROCESSING');
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(p => (p >= 90 ? p : p + Math.random() * 15));
        }, 300);

        items.forEach(item => {
            if (!item.optimizedUrl) processOne(item.id, item.file);
        });

        // Safe fallback
        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => setStatus('DONE'), 500);
        }, 2000);
    };

    useEffect(() => {
        if (status === 'PROCESSING' && items.length > 0) {
            const allDone = items.every(it => !it.loading);
            if (allDone) {
                setProgress(100);
                setTimeout(() => setStatus('DONE'), 500);
            }
        }
    }, [items, status]);

    const resetAll = () => {
        setItems([]);
        setStatus('IDLE');
        setProgress(0);
    };

    const removeItem = (id: string) => setItems(prev => prev.filter(it => it.id !== id));
    const isEmpty = items.length === 0;

    return (
        <div style={{ minHeight: '100vh', background: '#fafbff', paddingBottom: '80px', paddingTop: '40px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

                {/* Header UI */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
                        <Link href="/govt-exam-tools/tnpsc-photo-compressor" style={{ padding: '8px 24px', borderRadius: '8px', background: 'transparent', border: 'none', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>TNPSC Tools</Link>
                        <button style={{ padding: '8px 24px', borderRadius: '8px', background: '#fff', border: '1px solid #e2e8f0', fontWeight: 700, color: '#0f172a', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Add Name & Date</button>
                    </div>
                    
                    <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: '16px' }}>
                        Add Name & Date to Photo
                    </h1>
                    <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Generate perfectly sized photos with your Name and Date stamped at the bottom. 100% compliant with TNPSC, SSC, UPPSC, and RRB guidelines.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
                    
                    {/* Left Col: Upload & Results */}
                    <div style={{ gridColumn: '1 / -1' }} className="md-content">
                        {/* We will handle responsive using simple CSS directly below */}
                    </div>
                    
                    <style>{`
                        .main-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: start; }
                        @media(min-width: 768px) { .main-grid { grid-template-columns: 1.1fr 0.9fr; } }
                        .glass-card { background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.02); overflow: hidden; }
                    `}</style>
                    
                    <div className="main-grid" style={{ gridColumn: '1 / -1' }}>
                        
                        {/* LEFT: UPLOADER & RESULTS */}
                        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '24px' }}>
                                <AnimatePresence mode="wait">
                                    {isEmpty ? (
                                        <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <div
                                                onClick={() => document.getElementById('name-date-input')?.click()}
                                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                                onDragLeave={() => setIsDragging(false)}
                                                onDrop={handleDrop}
                                                style={{
                                                    border: `2px dashed ${isDragging ? '#6366f1' : '#cbd5e1'}`, borderRadius: '16px',
                                                    background: isDragging ? '#e0e7ff' : '#f8fafc',
                                                    padding: '40px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center'
                                                }}
                                            >
                                                <input id="name-date-input" type="file" hidden accept="image/*" multiple onChange={handleUpload} />
                                                <div style={{ width: '64px', height: '64px', borderRadius: '16px', margin: '0 auto 16px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', justifyContent: 'center' }}>
                                                    <Upload size={24} color="#6366f1" strokeWidth={2} />
                                                </div>
                                                <p style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>Upload your passport photo</p>
                                                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>JPG, PNG. Max 10MB.</p>
                                                <button style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
                                                    Select Photo
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                                <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{items.length} file{items.length>1?'s':''} ready</p>
                                                <button onClick={resetAll} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Clear All</button>
                                            </div>

                                            {status === 'IDLE' && (
                                                <button
                                                    onClick={handleStartProcessing}
                                                    style={{ width: '100%', padding: '16px', background: '#10b981', color: 'white', borderRadius: '12px', fontSize: '16px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', marginBottom: '20px' }}
                                                >
                                                    <Zap size={18} /> Apply Name & Date
                                                </button>
                                            )}

                                            {status === 'PROCESSING' && (
                                                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Processing Images...</span>
                                                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>{Math.round(progress)}%</span>
                                                    </div>
                                                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: '#10b981', borderRadius: '4px' }} />
                                                    </div>
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {items.map(item => (
                                                    <div key={item.id} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', padding: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                        <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                                            {item.optimizedUrl ? (
                                                                <img src={item.optimizedUrl} alt="Done" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                            ) : (
                                                                <img src={URL.createObjectURL(item.file)} alt="Original" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            )}
                                                        </div>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.file.name}</p>
                                                            {item.optimizedUrl ? (
                                                                <p style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>Success • {(item.resultSize! / 1024).toFixed(1)} KB</p>
                                                            ) : item.error ? (
                                                                <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600, marginTop: '2px' }}>{item.error}</p>
                                                            ) : (
                                                                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Waiting...</p>
                                                            )}
                                                        </div>
                                                        {item.optimizedUrl && (
                                                            <a href={item.optimizedUrl} download={`photo-name-date-${item.file.name}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: '#eff6ff', color: '#3b82f6', borderRadius: '8px', cursor: 'pointer', flexShrink: 0 }}>
                                                                <Download size={16} strokeWidth={2.5}/>
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* RIGHT: CONFIGURATION UI */}
                        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#4f46e5', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800 }}>1</div>
                                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Configuration</h2>
                            </div>
                            
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                
                                {/* Block 1: Add Name & Date */}
                                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ background: '#e0e7ff', color: '#4f46e5', borderRadius: '50%', padding: '4px' }}>
                                                <CheckCircle2 size={16} strokeWidth={3} />
                                            </div>
                                            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Add Name & Date</span>
                                        </div>
                                        <span style={{ fontSize: '11px', background: '#e2e8f0', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontWeight: 600 }}>Required</span>
                                    </div>

                                    {/* Name Input */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Name (Block Letters)</label>
                                        <div style={{ position: 'relative' }}>
                                            <User size={16} color="#94a3b8" style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
                                            <input 
                                                type="text" 
                                                value={nameText}
                                                onChange={e => setNameText(e.target.value.toUpperCase())}
                                                placeholder="e.g. AMARJEET"
                                                style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', outline: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Date Input */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Date of Photo</label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={includeDate} 
                                                    onChange={e => setIncludeDate(e.target.checked)}
                                                    style={{ width: '14px', height: '14px', accentColor: '#4f46e5' }}
                                                />
                                                Include Date
                                            </label>
                                        </div>
                                        {includeDate && (
                                            <div style={{ position: 'relative' }}>
                                                <Calendar size={16} color="#94a3b8" style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
                                                <input 
                                                    type="text" 
                                                    value={dateText}
                                                    onChange={e => setDateText(e.target.value)}
                                                    placeholder="DD-MM-YYYY"
                                                    style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#0f172a', outline: 'none' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Block 2: Compression Settings */}
                                <div style={{ background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '16px', padding: '20px', opacity: enableCompression ? 1 : 0.7, transition: 'opacity 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: enableCompression ? '16px' : '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Compression Settings</span>
                                            <span style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>OPTIONAL</span>
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            checked={enableCompression} 
                                            onChange={e => setEnableCompression(e.target.checked)}
                                            style={{ width: '18px', height: '18px', accentColor: '#4f46e5', cursor: 'pointer' }}
                                        />
                                    </div>

                                    {enableCompression && (
                                        <>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Width (px)</label>
                                                    <input 
                                                        type="number" 
                                                        value={widthPx} 
                                                        onChange={e => setWidthPx(Number(e.target.value) || '')} 
                                                        placeholder="Width"
                                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600 }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Height (px)</label>
                                                    <input 
                                                        type="number" 
                                                        value={heightPx} 
                                                        onChange={e => setHeightPx(Number(e.target.value) || '')} 
                                                        placeholder="Height"
                                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600 }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Target Size (KB)</label>
                                                <input 
                                                    type="number" 
                                                    value={targetKB} 
                                                    onChange={e => setTargetKB(Number(e.target.value) || 50)} 
                                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600 }}
                                                />
                                            </div>
                                            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '12px' }}>Leave unchecked to keep original dimensions and skip intense compression.</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {children}

            </div>
        </div>
    );
}

"use client";

import React, { useState, useCallback, useEffect } from 'react';
const motion = {
    div: ({ initial, animate, exit, transition, whileHover, whileTap, whileDrag, whileFocus, whileInView, layoutId, layout, mode, variants, viewport, onViewportEnter, onViewportLeave, ...props }: any) => {
        return <div {...props} />;
    }
};
const AnimatePresence = ({ children }: any) => <>{children}</>;

import {
    Upload, Download, RefreshCw, CheckCircle2, XCircle,
    FileImage, Trash2, Zap, ShieldCheck, ImageIcon,
    AlertCircle, ArrowRight, User, PenTool, Globe
} from 'lucide-react';
import toast from 'react-hot-toast';
import RelatedGovtTools from './RelatedGovtTools';

interface FileResult {
    id: string;
    file: File;
    optimizedUrl: string | null;
    resultSize: number | null;
    loading: boolean;
    error: string | null;
}

type Portal = 'UTI' | 'NSDL' | 'CUSTOM';
type Mode = 'PHOTO' | 'SIGNATURE';

export default function PanCardResizerClient({ children }: { children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [portal, setPortal] = useState<Portal>('UTI');
    const [mode, setMode] = useState<Mode>('PHOTO');
    const [compressionStatus, setCompressionStatus] = useState<'IDLE' | 'COMPRESSING' | 'DONE'>('IDLE');
    const [progress, setProgress] = useState(0);

    // Preset configurations
    const configs = {
        UTI: {
            PHOTO: { width: 213, height: 213, targetKB: 25, label: 'UTI Photo (213x213)' },
            SIGNATURE: { width: 1023, height: 680, targetKB: 55, label: 'UTI Signature (1023x680)' }
        },
        NSDL: {
            PHOTO: { width: 276, height: 197, targetKB: 45, label: 'NSDL Photo (3.5x2.5cm)' },
            SIGNATURE: { width: 440, height: 160, targetKB: 45, label: 'NSDL Signature (2x4.5cm)' }
        },
        CUSTOM: {
            PHOTO: { width: 213, height: 213, targetKB: 20, label: 'Custom Specs' },
            SIGNATURE: { width: 600, height: 300, targetKB: 20, label: 'Custom Specs' }
        }
    };

    const currentConfig = portal === 'CUSTOM' ? configs.CUSTOM[mode] : configs[portal][mode];

    const compressOne = useCallback(async (id: string, imgFile: File) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, loading: true, error: null } : it));
        try {
            const formData = new FormData();
            formData.append('file', imgFile);
            formData.append('targetSize', currentConfig.targetKB.toString());
            formData.append('width', currentConfig.width.toString());
            formData.append('height', currentConfig.height.toString());

            const res = await fetch('/api/compress', { method: 'POST', body: formData });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Server error: ${res.status}`);
            }

            const blob = await res.blob();
            if (blob.size === 0) throw new Error("Received empty image");

            setItems(prev => prev.map(it =>
                it.id === id
                    ? { ...it, loading: false, optimizedUrl: URL.createObjectURL(blob), resultSize: blob.size }
                    : it
            ));
        } catch (err: any) {
            console.error(`Resizing failed:`, err);
            setItems(prev => prev.map(it =>
                it.id === id ? { ...it, loading: false, error: err.message || 'Failed' } : it
            ));
            toast.error(`Failed to resize ${imgFile.name}`);
        }
    }, [currentConfig]);

    const addAndCompress = useCallback((rawFiles: File[], autoStart: boolean = false) => {
        const imageFiles = rawFiles.filter(f => f.type.startsWith('image/')).slice(0, 5);
        if (!imageFiles.length) return;
        
        const newItems: FileResult[] = imageFiles.map(f => ({
            id: Math.random().toString(36).slice(2) + Date.now(),
            file: f,
            optimizedUrl: null,
            resultSize: null,
            loading: autoStart,
            error: null,
        }));
        
        setItems(prev => [...prev, ...newItems].slice(0, 5));
        if (autoStart) {
            setCompressionStatus('COMPRESSING');
            newItems.forEach(item => compressOne(item.id, item.file));
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

    const handleStart = () => {
        setCompressionStatus('COMPRESSING');
        setProgress(0);
        items.forEach(item => {
            if (!item.optimizedUrl) compressOne(item.id, item.file);
        });
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

    const isEmpty = items.length === 0;

    return (
        <div className="pan-resizer-container">
            {/* Header / Mode Switcher */}
            <div className="mb-10 text-center">
                <div style={{
                    display: 'inline-flex', background: '#f1f5f9', padding: '6px', 
                    borderRadius: '16px', marginBottom: '24px', border: '1px solid #e2e8f0'
                }}>
                    <button 
                        onClick={() => setMode('PHOTO')}
                        className={`mode-btn ${mode === 'PHOTO' ? 'active' : ''}`}
                    >
                        <User size={16} /> Photo Resize
                    </button>
                    <button 
                        onClick={() => setMode('SIGNATURE')}
                        className={`mode-btn ${mode === 'SIGNATURE' ? 'active' : ''}`}
                    >
                        <PenTool size={16} /> Signature Resize
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {['UTI', 'NSDL'].map((p) => (
                        <button 
                            key={p}
                            onClick={() => setPortal(p as Portal)}
                            className={`portal-tab ${portal === p ? 'active' : ''}`}
                        >
                            <Globe size={14} /> {p} Portal
                        </button>
                    ))}
                </div>
                
                <p className="mt-4 text-sm font-medium text-slate-500">
                    Configuration: <span className="text-indigo-600 font-bold">{currentConfig.width}x{currentConfig.height}px</span> · Target: <span className="text-indigo-600 font-bold">&lt;{currentConfig.targetKB}KB</span>
                </p>
            </div>

            {/* Main Tool Area */}
            <div className="tool-card shadow-2xl rounded-[32px] overflow-hidden bg-white border border-slate-200">
                <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <div className="p-8">
                    {isEmpty ? (
                        <div 
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('pan-upload')?.click()}
                            className={`drop-zone border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-slate-300 hover:border-indigo-400'}`}
                        >
                            <input id="pan-upload" type="file" hidden accept="image/*" multiple onChange={handleUpload} />
                            <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-lg group-hover:scale-110 transition-transform">
                                <Upload size={36} />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">Drop your {mode.toLowerCase()} here</h3>
                            <p className="text-slate-500 text-sm mb-6">Supports JPG, PNG (Auto-converts to PAN-ready JPEG)</p>
                            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 mx-auto">
                                <ImageIcon size={18} /> Select Files
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <p className="font-black text-slate-800">{items.length} Files Selected</p>
                                <button onClick={() => setItems([])} className="text-red-500 text-sm font-bold flex items-center gap-1 hover:underline">
                                    <RefreshCw size={14} /> Clear All
                                </button>
                            </div>

                            {compressionStatus === 'IDLE' && (
                                <button 
                                    onClick={handleStart}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-indigo-200 shadow-xl hover:bg-indigo-700 transition-colors"
                                >
                                    <Zap size={20} fill="currentColor" /> Resize for {portal} Now
                                </button>
                            )}

                            {compressionStatus === 'COMPRESSING' && (
                                <div className="p-4 bg-slate-50 rounded-2xl border">
                                    <div className="flex justify-between mb-2 text-xs font-black text-indigo-600">
                                        <span>PROCESSING DATA...</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4">
                                {items.map(item => (
                                    <div key={item.id} className="p-4 rounded-2xl border bg-slate-50/50 flex flex-wrap items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-white border p-1 shrink-0 overflow-hidden">
                                            <img src={URL.createObjectURL(item.file)} className="w-full h-full object-contain" alt="Preview" />
                                        </div>
                                        <div className="flex-1 min-w-[150px]">
                                            <p className="font-bold text-slate-800 text-sm truncate">{item.file.name}</p>
                                            <p className="text-xs text-slate-500">{(item.file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        {item.loading && <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />}
                                        {item.optimizedUrl && (
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-green-600 leading-none">READY</p>
                                                    <p className="text-xs font-bold text-slate-800">{(item.resultSize! / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        const a = document.createElement('a');
                                                        a.href = item.optimizedUrl!;
                                                        a.download = `pan-${portal.toLowerCase()}-${mode.toLowerCase()}-${item.file.name.split('.')[0]}.jpg`;
                                                        a.click();
                                                    }}
                                                    className="bg-green-600 text-white p-2 rounded-xl hover:bg-green-700 shadow-lg flex items-center gap-2 px-4 text-sm font-bold"
                                                >
                                                    <Download size={16} /> Download
                                                </button>
                                            </div>
                                        )}
                                        <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="text-slate-400 hover:text-red-500">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* SEO Content Container */}
            <div className="mt-16">
                <RelatedGovtTools currentRoute="/govt-exam-tools/pan-card-photo-resize" />
            </div>

            <div className="mt-16 bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm">
                {children}
            </div>

            <style jsx>{`
                .mode-btn {
                    padding: 8px 16px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 800;
                    color: #64748b;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .mode-btn:hover { color: #475569; }
                .mode-btn.active {
                    background: white;
                    color: #4f46e5;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }
                .portal-tab {
                    padding: 8px 20px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 800;
                    color: #475569;
                    background: #f8fafc;
                    border: 1.5px solid #e2e8f0;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .portal-tab:hover { background: #f1f5f9; }
                .portal-tab.active {
                    border-color: #6366f1;
                    background: #eef2ff;
                    color: #4f46e5;
                }
            `}</style>
        </div>
    );
}

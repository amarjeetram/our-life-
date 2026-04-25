"use client";

import React, { useState, useCallback, useEffect } from 'react';
const motion = {
    div: ({ initial, animate, exit, transition, whileHover, whileTap, whileDrag, whileFocus, whileInView, layoutId, layout, mode, variants, viewport, onViewportEnter, onViewportLeave, ...props }: any) => {
        return <div {...props} />;
    }
};

import {
    Upload, Download, RefreshCw, Trash2, Zap, 
    ImageIcon, User, Smartphone, Camera, Grid
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

type Mode = 'PASSPORT' | 'POSTCARD';

export default function NeetPhotoResizerClient({ children }: { children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [mode, setMode] = useState<Mode>('PASSPORT');
    const [compressionStatus, setCompressionStatus] = useState<'IDLE' | 'COMPRESSING' | 'DONE'>('IDLE');
    const [progress, setProgress] = useState(0);

    const configs = {
        PASSPORT: { width: 413, height: 531, targetKB: 80, label: 'Passport Size (3.5x4.5cm)' },
        POSTCARD: { width: 1200, height: 1800, targetKB: 120, label: 'Postcard Size (4x6 inch)' }
    };

    const currentConfig = configs[mode];

    const compressOne = useCallback(async (id: string, imgFile: File) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, loading: true, error: null } : it));
        try {
            const formData = new FormData();
            formData.append('file', imgFile);
            formData.append('targetSize', currentConfig.targetKB.toString());
            formData.append('width', currentConfig.width.toString());
            formData.append('height', currentConfig.height.toString());

            const res = await fetch('/api/compress', { method: 'POST', body: formData });
            if (!res.ok) throw new Error("Server error during resize");

            const blob = await res.blob();
            setItems(prev => prev.map(it =>
                it.id === id
                    ? { ...it, loading: false, optimizedUrl: URL.createObjectURL(blob), resultSize: blob.size }
                    : it
            ));
        } catch (err: any) {
            setItems(prev => prev.map(it => it.id === id ? { ...it, loading: false, error: 'Failed' } : it));
            toast.error(`Failed to resize ${imgFile.name}`);
        }
    }, [currentConfig]);

    const addFiles = (rawFiles: File[]) => {
        const imageFiles = Array.from(rawFiles).filter(f => f.type.startsWith('image/')).slice(0, 5);
        if (!imageFiles.length) return;
        
        const newItems: FileResult[] = imageFiles.map(f => ({
            id: Math.random().toString(36).slice(2),
            file: f,
            optimizedUrl: null,
            resultSize: null,
            loading: false,
            error: null,
        }));
        setItems(prev => [...prev, ...newItems].slice(0, 5));
    };

    const handleStart = () => {
        setCompressionStatus('COMPRESSING');
        setProgress(0);
        items.forEach(item => {
            if (!item.optimizedUrl) compressOne(item.id, item.file);
        });
    };

    useEffect(() => {
        if (compressionStatus === 'COMPRESSING') {
            const allDone = items.every(it => !it.loading);
            if (allDone) {
                setProgress(100);
                setTimeout(() => setCompressionStatus('DONE'), 500);
            }
        }
    }, [items, compressionStatus]);

    return (
        <div className="neet-resizer-container">
            <div className="mb-8 text-center">
                <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mb-6">
                    <button 
                        onClick={() => setMode('PASSPORT')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${mode === 'PASSPORT' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <User size={16} /> Passport Size
                    </button>
                    <button 
                        onClick={() => setMode('POSTCARD')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${mode === 'POSTCARD' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <ImageIcon size={16} /> Postcard Size (4x6)
                    </button>
                </div>
                <div className="flex justify-center items-center gap-4 text-xs font-bold text-slate-500">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">{currentConfig.width}x{currentConfig.height}px</span>
                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full">Target: &lt;{currentConfig.targetKB}KB</span>
                </div>
            </div>

            <div className="tool-card shadow-2xl rounded-[32px] overflow-hidden bg-white border border-slate-200">
                <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />
                <div className="p-8">
                    {items.length === 0 ? (
                        <div 
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(Array.from(e.dataTransfer.files)); }}
                            onClick={() => document.getElementById('neet-upload')?.click()}
                            className={`drop-zone border-2 border-dashed rounded-3xl p-16 text-center transition-all cursor-pointer ${isDragging ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-400'}`}
                        >
                            <input id="neet-upload" type="file" hidden accept="image/*" multiple onChange={(e) => addFiles(Array.from(e.target.files || []))} />
                            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500 shadow-inner">
                                <Camera size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Upload NEET {mode.toLowerCase()}</h3>
                            <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">Selected photo must have a white background as per NTA guidelines.</p>
                            <button className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl shadow-red-100 flex items-center gap-2 mx-auto scale-110">
                                <Grid size={20} /> Select Photos
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black text-slate-800">{items.length} Files Ready</h3>
                                <button onClick={() => setItems([])} className="text-red-500 text-sm font-black flex items-center gap-1">
                                    <RefreshCw size={14} /> Reset
                                </button>
                            </div>

                            {compressionStatus === 'IDLE' && (
                                <button 
                                    onClick={handleStart}
                                    className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-red-100 hover:bg-red-700 transition-all"
                                >
                                    <Zap size={24} fill="currentColor" /> Resize for NEET 2026
                                </button>
                            )}

                            {compressionStatus === 'COMPRESSING' && (
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between items-end mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs font-black text-red-600 uppercase tracking-widest">Processing...</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-700">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4">
                                {items.map(item => (
                                    <div key={item.id} className="p-5 rounded-3xl border bg-white flex items-center gap-5 shadow-sm">
                                        <div className="w-20 h-20 rounded-2xl bg-slate-100 p-1 border overflow-hidden shrink-0">
                                            <img src={URL.createObjectURL(item.file)} className="w-full h-full object-contain" alt="Preview" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-black text-slate-800 text-sm truncate">{item.file.name}</p>
                                            <p className="text-xs font-bold text-slate-400">Original: {(item.file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        {item.optimizedUrl && (
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-green-600 mb-0.5">READY</p>
                                                    <p className="text-sm font-black text-slate-800">{(item.resultSize! / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        const a = document.createElement('a');
                                                        a.href = item.optimizedUrl!;
                                                        a.download = `neet-${mode.toLowerCase()}-${item.file.name.split('.')[0]}.jpg`;
                                                        a.click();
                                                    }}
                                                    className="bg-green-600 text-white p-3 rounded-2xl hover:bg-green-700 shadow-lg shadow-green-100 flex items-center gap-2 px-6 text-sm font-black transition-all"
                                                >
                                                    <Download size={18} /> Download
                                                </button>
                                            </div>
                                        )}
                                        <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="text-slate-300 hover:text-red-500 p-2 transition-colors">
                                            <Trash2 size={22} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-16">
                <RelatedGovtTools currentRoute="/govt-exam-tools/neet-photo-resizer" />
                {children}
            </div>
        </div>
    );
}

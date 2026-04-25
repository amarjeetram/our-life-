"use client";

import React, { useState, useCallback, useEffect } from 'react';
const motion = {
    div: ({ initial, animate, exit, transition, ...props }: any) => <div {...props} />
};

import {
    Upload, Download, RefreshCw, Trash2, Zap, 
    ImageIcon, Camera, CheckCircle2, Scissors
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

export default function UtiPhotoResizerClient({ children }: { children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [compressionStatus, setCompressionStatus] = useState<'IDLE' | 'COMPRESSING' | 'DONE'>('IDLE');
    const [progress, setProgress] = useState(0);

    const config = { width: 213, height: 213, targetKB: 25, label: 'UTI PAN Standard (213x213 Pixels)' };

    const compressOne = useCallback(async (id: string, imgFile: File) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, loading: true, error: null } : it));
        try {
            const formData = new FormData();
            formData.append('file', imgFile);
            formData.append('targetSize', config.targetKB.toString());
            formData.append('width', config.width.toString());
            formData.append('height', config.height.toString());

            const res = await fetch('/api/compress', { method: 'POST', body: formData });
            if (!res.ok) throw new Error("Resize failed");

            const blob = await res.blob();
            setItems(prev => prev.map(it =>
                it.id === id
                    ? { ...it, loading: false, optimizedUrl: URL.createObjectURL(blob), resultSize: blob.size }
                    : it
            ));
        } catch (err: any) {
            setItems(prev => prev.map(it => it.id === id ? { ...it, loading: false, error: 'Failed' } : it));
            toast.error(`Error resizing ${imgFile.name}`);
        }
    }, [config]);

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
        <div className="uti-resizer-container">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-3 bg-orange-50 px-6 py-3 rounded-2xl border border-orange-100 shadow-sm mb-6">
                    <Camera className="text-orange-600" size={20} />
                    <span className="font-black text-orange-900">UTI PAN Photo Mode Active</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                </div>
                <p className="text-sm font-bold text-slate-500 max-w-md mx-auto">
                    Automatic Resolution: <span className="text-orange-600">213 x 213 Pixels</span> · Target: <span className="text-orange-600">&lt; 30 KB</span>
                </p>
            </div>

            <div className="tool-card shadow-3xl rounded-[40px] overflow-hidden bg-white border border-slate-100 relative">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
                <div className="p-8 md:p-12">
                    <p className="text-center mb-6 text-sm font-extrabold text-slate-600 flex items-center justify-center gap-2">
                        <Zap size={14} fill="currentColor" /> Upload your photo and instantly resize it for UTI PAN – exact size, KB & format ready in seconds.
                    </p>

                    {items.length === 0 ? (
                        <div 
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(Array.from(e.dataTransfer.files)); }}
                            onClick={() => document.getElementById('uti-upload')?.click()}
                            className={`drop-zone border-2 border-dashed rounded-[32px] p-20 text-center transition-all cursor-pointer ${isDragging ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 hover:border-orange-400 hover:bg-slate-50/50'}`}
                        >
                            <input id="uti-upload" type="file" hidden accept="image/*" multiple onChange={(e) => addFiles(Array.from(e.target.files || []))} />
                            <div className="w-24 h-24 bg-orange-100 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-orange-600 shadow-inner">
                                <Upload size={48} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 mb-2">Drop Photo Here</h3>
                            <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">JPG, PNG, or WEBP. We convert automatically to high-quality UTI-ready JPEG.</p>
                            <button className="bg-orange-600 text-white px-12 py-5 rounded-[22px] font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 flex items-center gap-3 mx-auto text-lg transition-transform hover:scale-105 active:scale-95">
                                <ImageIcon size={22} /> Choose Photos
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black">{items.length}</div>
                                    <span className="font-black text-slate-800">Files Optimized For UTI</span>
                                </div>
                                <button onClick={() => setItems([])} className="text-slate-400 hover:text-red-500 font-black text-sm transition-colors">
                                    RESET ALL
                                </button>
                            </div>

                            {compressionStatus === 'IDLE' && (
                                <button 
                                    onClick={handleStart}
                                    className="w-full bg-orange-600 text-white py-6 rounded-3xl font-black text-2xl flex items-center justify-center gap-4 shadow-2xl shadow-orange-100 hover:bg-orange-700 transition-all hover:-translate-y-1"
                                >
                                    <Scissors size={28} /> Start UTI Resize
                                </button>
                            )}

                            {compressionStatus === 'COMPRESSING' && (
                                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 text-center">
                                    <div className="flex justify-between items-center mb-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <RefreshCw className="text-orange-600 animate-spin" size={20} />
                                            <span className="text-sm font-black text-slate-700 uppercase tracking-widest">Optimizing Pixels...</span>
                                        </div>
                                        <span className="text-2xl font-black text-orange-600">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-6">
                                {items.map(item => (
                                    <div key={item.id} className="p-6 rounded-[32px] border bg-white flex flex-wrap items-center gap-6 group hover:border-orange-200 transition-colors">
                                        <div className="w-24 h-24 rounded-2xl bg-slate-50 p-1 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                                            <img src={URL.createObjectURL(item.file)} className="max-w-full max-h-full object-contain" alt="Preview" />
                                        </div>
                                        <div className="flex-1 min-w-[150px]">
                                            <p className="font-black text-slate-800 text-lg truncate mb-1">{item.file.name}</p>
                                            <p className="text-sm font-bold text-slate-400 italic">Original: {(item.file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        {item.optimizedUrl && (
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <div className="flex items-center justify-end gap-1.5 text-green-600 font-extrabold text-xs mb-1">
                                                        <CheckCircle2 size={14} /> 213x213 OK
                                                    </div>
                                                    <p className="text-xl font-black text-slate-800">{(item.resultSize! / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        const a = document.createElement('a');
                                                        a.href = item.optimizedUrl!;
                                                        a.download = `uti-pan-photo-${item.file.name.split('.')[0]}.jpg`;
                                                        a.click();
                                                    }}
                                                    className="bg-green-600 text-white p-4 rounded-2xl hover:bg-green-700 shadow-xl shadow-green-100 flex items-center gap-2 px-8 text-sm font-black transition-transform hover:scale-105 active:scale-95"
                                                >
                                                    <Download size={20} /> Download
                                                </button>
                                            </div>
                                        )}
                                        <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-20">
                <RelatedGovtTools currentRoute="/govt-exam-tools/uti-photo-resize" />
                {children}
            </div>
        </div>
    );
}

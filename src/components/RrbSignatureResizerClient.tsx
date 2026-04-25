"use client";

import React, { useState, useCallback, useEffect } from 'react';
const motion = {
    div: ({ initial, animate, exit, transition, ...props }: any) => <div {...props} />
};

import {
    Upload, Download, RefreshCw, Trash2, Zap, 
    ImageIcon, PenTool, CheckCircle2, AlertCircle
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

export default function RrbSignatureResizerClient({ children }: { children?: React.ReactNode }) {
    const [items, setItems] = useState<FileResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [compressionStatus, setCompressionStatus] = useState<'IDLE' | 'COMPRESSING' | 'DONE'>('IDLE');
    const [progress, setProgress] = useState(0);

    const config = { width: 140, height: 60, targetKB: 15, label: 'RRB Standard (140x60 Pixels)' };

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
        <div className="rrb-resizer-container">
            <div className="mb-8 text-center bg-blue-50/50 p-6 rounded-[32px] border border-blue-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                    <PenTool size={24} />
                </div>
                <h2 className="text-xl font-black text-slate-800 mb-1">RRB Signature Preset Active</h2>
                <div className="flex justify-center items-center gap-3 text-sm font-bold text-blue-600">
                    <span className="bg-white px-3 py-1 rounded-full border border-blue-200">140 x 60 Pixels</span>
                    <span className="bg-white px-3 py-1 rounded-full border border-blue-200">Target: 10-20 KB</span>
                </div>
            </div>

            <div className="tool-card shadow-2xl rounded-[32px] overflow-hidden bg-white border border-slate-200">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />
                <div className="p-8">
                    {items.length === 0 ? (
                        <div 
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(Array.from(e.dataTransfer.files)); }}
                            onClick={() => document.getElementById('rrb-upload')?.click()}
                            className={`drop-zone border-2 border-dashed rounded-3xl p-16 text-center transition-all cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400'}`}
                        >
                            <input id="rrb-upload" type="file" hidden accept="image/*" multiple onChange={(e) => addFiles(Array.from(e.target.files || []))} />
                            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Upload size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Upload RRB Signature</h3>
                            <p className="text-slate-500 text-sm mb-8">Preferred: Black ink on white paper.</p>
                            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2 mx-auto">
                                <ImageIcon size={20} /> Select Signature
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-wider">{items.length} Files Selected</span>
                                <button onClick={() => setItems([])} className="text-red-500 text-sm font-black flex items-center gap-1 hover:underline">
                                    <RefreshCw size={14} /> Clear
                                </button>
                            </div>

                            {compressionStatus === 'IDLE' && (
                                <button 
                                    onClick={handleStart}
                                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:bg-blue-700 transition-all"
                                >
                                    <Zap size={24} fill="currentColor" /> Resize to 140x60 Now
                                </button>
                            )}

                            {compressionStatus === 'COMPRESSING' && (
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-xs font-black text-blue-600">PROCESSING...</span>
                                        <span className="text-sm font-black text-slate-700">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4">
                                {items.map(item => (
                                    <div key={item.id} className="p-5 rounded-3xl border bg-slate-50/20 flex items-center gap-5">
                                        <div className="w-20 h-10 rounded-lg bg-white p-1 border overflow-hidden shrink-0 flex items-center justify-center">
                                            <img src={URL.createObjectURL(item.file)} className="max-w-full max-h-full object-contain" alt="Preview" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-800 text-sm truncate">{item.file.name}</p>
                                            <p className="text-xs text-slate-500">{(item.file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        {item.optimizedUrl && (
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1 text-green-600 font-black text-[10px]">
                                                        <CheckCircle2 size={10} /> 140x60
                                                    </div>
                                                    <p className="text-sm font-black text-slate-800">{(item.resultSize! / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        const a = document.createElement('a');
                                                        a.href = item.optimizedUrl!;
                                                        a.download = `rrb-signature-${item.file.name.split('.')[0]}.jpg`;
                                                        a.click();
                                                    }}
                                                    className="bg-green-600 text-white p-3 rounded-2xl hover:bg-green-700 shadow-lg flex items-center gap-2 px-6 text-sm font-black"
                                                >
                                                    <Download size={18} /> Download
                                                </button>
                                            </div>
                                        )}
                                        <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="text-slate-300 hover:text-red-500">
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
                <RelatedGovtTools currentRoute="/govt-exam-tools/rrb-signature-resizer" />
                {children}
            </div>
        </div>
    );
}

"use client";

import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

interface BioCardProps {
    text: string;
}

export default function BioCard({ text }: BioCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy bio:', err);
        }
    };

    // Split text into lines, filter out empty trailing/leading lines
    const lines = text.trim().split('\n');

    return (
        <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 hover:border-slate-700 not-prose p-6 sm:p-7">
            <div className="flex justify-between items-center mb-5">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5 select-none">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                    <span>Instagram Bio</span>
                </span>
                
                <button
                    onClick={handleCopy}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 border transform active:scale-95 cursor-pointer ${
                        copied
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-indigo-500/20'
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4" />
                            <span>Copy Bio</span>
                        </>
                    )}
                </button>
            </div>
            
            <div className="space-y-2 select-all font-sans text-base sm:text-lg font-bold text-slate-200 leading-relaxed pl-4 border-l-3 border-indigo-500/40">
                {lines.map((line, idx) => (
                    <div key={idx} className="break-words">
                        {line}
                    </div>
                ))}
            </div>
        </div>
    );
}

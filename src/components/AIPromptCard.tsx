"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface AIPromptCardProps {
    title: string;
    imageSrc: string;
    prompt: string;
}

export default function AIPromptCard({ title, imageSrc, prompt }: AIPromptCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="my-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 not-prose">
            {/* Image Preview - shown in full natural aspect ratio */}
            <div className="relative w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-auto block transition-transform duration-500 hover:scale-[1.02]"
                    loading="lazy"
                />
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight mb-3">
                    {title}
                </h3>
                
                {/* Code Block with Copy Action */}
                <div className="relative rounded-2xl bg-slate-50 border border-slate-100 p-4 font-mono text-[13px] sm:text-sm text-slate-600 leading-relaxed pr-16">
                    <p className="margin-0 select-all font-semibold">{prompt}</p>
                    
                    <button
                        onClick={handleCopy}
                        className="absolute right-3 top-3 p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all duration-200 flex items-center justify-center min-w-[42px] min-h-[42px]"
                        title="Copy to Clipboard"
                    >
                        {copied ? (
                            <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-600">
                                <Check size={16} /> Copied
                            </span>
                        ) : (
                            <Copy size={16} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

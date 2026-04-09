"use client";

import React, { useState } from 'react';
import { Heart, RefreshCw, Share2, Copy, Sparkles } from 'lucide-react';

export default function LoveCalculatorClient() {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Analyzing names...');
    const [message, setMessage] = useState('');

    const calculateLove = (e: React.FormEvent) => {
        e.preventDefault();
        const n1 = name1.trim();
        const n2 = name2.trim();
        if (!n1 || !n2) return;

        setIsCalculating(true);
        setResult(null);
        setDisplayProgress(0);

        const loadingPhrases = [
            'Mapping name energies...',
            'Calculating romance probability...',
            'Connecting cosmic vibrations...',
            'Aligning the stars...',
            'Finding perfect matches...'
        ];
        
        let phraseIndex = 0;
        const phraseInterval = setInterval(() => {
            phraseIndex = (phraseIndex + 1) % loadingPhrases.length;
            setLoadingText(loadingPhrases[phraseIndex]);
        }, 500);

        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 3;
            if (progress > 99) progress = 99;
            setDisplayProgress(progress);
        }, 100);

        // Deterministic but pseudo-random hash algorithm so same names yield same result
        setTimeout(() => {
            clearInterval(phraseInterval);
            clearInterval(progressInterval);

            const combined = [n1.toLowerCase(), n2.toLowerCase()].sort().join('');
            let sum = 0;
            for (let i = 0; i < combined.length; i++) {
                sum += combined.charCodeAt(i);
            }
            
            // Seeded calculation
            const randomSeed = Math.sin(sum) * 10000;
            let percentage = Math.floor((randomSeed - Math.floor(randomSeed)) * 100) + 1;
            
            // Adjust so it feels a bit more natural, ensuring low digits aren't too low
            if (percentage < 10) percentage += 15;
            
            setResult(percentage);
            
            if (percentage <= 30) setMessage("Not a perfect match 😅");
            else if (percentage <= 55) setMessage("Friend zone vibes 💬");
            else if (percentage <= 75) setMessage("There may be something special 💖");
            else if (percentage <= 90) setMessage("Strong connection detected ❤️");
            else setMessage("A perfect love match 💘");
            
            setIsCalculating(false);
        }, 3000); // 3 seconds calculation animation
    };

    const handleCopy = () => {
        const text = `Love Percentage between ${name1.trim()} & ${name2.trim()} is ${result}%! ${message} \n\nCheck yours at: https://smarttoolswala.com/fun/love-percentage-calculator-by-name`;
        navigator.clipboard.writeText(text);
        alert('Result copied!');
    };

    const handleShare = () => {
        const text = `Love Percentage between ${name1.trim()} & ${name2.trim()} is ${result}%! ${message} \n\nCheck yours at: https://smarttoolswala.com/fun/love-percentage-calculator-by-name`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleReset = () => {
        setName1('');
        setName2('');
        setResult(null);
        setMessage('');
    };

    return (
        <div className="max-w-lg mx-auto w-full">
            <style>{`
                .heart-beat-fast {
                    animation: heartbeatFast 0.6s infinite;
                }
                @keyframes heartbeatFast {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.25); }
                    100% { transform: scale(1); }
                }
                .calc-blob {
                    position: absolute;
                    filter: blur(40px);
                    z-index: 0;
                    opacity: 0.4;
                }
                .slide-up-anim {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes slideUp {
                    0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
            
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-rose-200/50 p-6 sm:p-10 border border-rose-100 relative overflow-hidden min-h-[420px] flex flex-col justify-center">
                {/* Decorative Blobs */}
                <div className="calc-blob bg-gradient-to-r from-rose-200 to-pink-200 w-48 h-48 rounded-full top-[-20%] left-[-10%]"></div>
                <div className="calc-blob bg-gradient-to-r from-pink-200 to-rose-200 w-48 h-48 rounded-full bottom-[-20%] right-[-10%]"></div>

                <div className="relative z-10 w-full h-full flex flex-col justify-center">
                    {!isCalculating && result === null && (
                        <div className="slide-up-anim">
                            <div className="flex justify-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl rotate-3 flex items-center justify-center shadow-lg shadow-rose-200/50">
                                    <Heart size={32} color="white" fill="white" className="-rotate-3" />
                                </div>
                            </div>

                            <form onSubmit={calculateLove} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Boy / First Name</label>
                                    <input
                                        type="text"
                                        value={name1}
                                        onChange={(e) => setName1(e.target.value)}
                                        placeholder="Enter first name"
                                        className="w-full px-5 py-4 rounded-xl shadow-sm border-2 border-rose-50 bg-rose-50/30 focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-800 font-bold text-lg placeholder:text-slate-400 placeholder:font-medium"
                                        required
                                    />
                                </div>
                                
                                <div className="flex justify-center -my-3 relative z-10">
                                    <div className="bg-white p-2 text-rose-400 rounded-full shadow-md border border-slate-100">
                                        <Heart size={20} fill="currentColor" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Girl / Second Name</label>
                                    <input
                                        type="text"
                                        value={name2}
                                        onChange={(e) => setName2(e.target.value)}
                                        placeholder="Enter second name"
                                        className="w-full px-5 py-4 rounded-xl shadow-sm border-2 border-rose-50 bg-rose-50/30 focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-800 font-bold text-lg placeholder:text-slate-400 placeholder:font-medium"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!name1.trim() || !name2.trim()}
                                    className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-lg shadow-lg shadow-rose-200/70 hover:shadow-xl hover:shadow-rose-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex justify-center items-center gap-2"
                                >
                                    Calculate Love Percentage <Sparkles size={20} />
                                </button>
                            </form>
                        </div>
                    )}

                    {isCalculating && (
                        <div className="flex flex-col items-center justify-center py-10 space-y-8 slide-up-anim">
                            <div className="relative w-36 h-36 flex items-center justify-center">
                                {/* Outer spinning ring */}
                                <div className="absolute inset-0 rounded-full border-[8px] border-rose-100 border-t-rose-500 animate-spin"></div>
                                {/* Inner spinning ring reverse */}
                                <div className="absolute inset-3 rounded-full border-[6px] border-pink-50 border-b-pink-400 animate-[spin_1.5s_linear_infinite_reverse]"></div>
                                {/* Pulsing Heart inside */}
                                <Heart className="w-12 h-12 text-rose-500 heart-beat-fast drop-shadow-md" fill="currentColor" />
                            </div>
                            
                            <div className="text-center space-y-2">
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 tracking-tighter tabular-nums transition-all">
                                    {displayProgress}%
                                </div>
                                <p className="text-slate-500 font-bold animate-pulse text-lg">
                                    {loadingText}
                                </p>
                            </div>
                        </div>
                    )}

                    {!isCalculating && result !== null && (
                        <div className="text-center slide-up-anim py-2">
                            <h3 className="text-2xl font-black text-slate-800 mb-1">
                                <span className="text-rose-500 capitalize">{name1}</span> & <span className="text-pink-500 capitalize">{name2}</span>
                            </h3>
                            <p className="text-slate-500 font-bold mb-6 uppercase tracking-wider text-sm">Compatibility Score</p>
                            
                            <div className="flex justify-center mb-8 relative">
                                <div className="absolute inset-0 bg-rose-200 rounded-full blur-2xl opacity-50 scale-150 -z-10"></div>
                                <div className="inline-flex items-center justify-center w-48 h-48 rounded-full border-[8px] border-white bg-gradient-to-br from-rose-50 to-pink-50 shadow-2xl shadow-rose-200/60 relative overflow-hidden">
                                    <div className="absolute top-4 left-4 text-rose-200 opacity-50 rotate-[-20deg]">
                                        <Heart size={36} fill="currentColor" />
                                    </div>
                                    <div className="absolute bottom-4 right-4 text-pink-200 opacity-50 rotate-[20deg]">
                                        <Heart size={28} fill="currentColor" />
                                    </div>
                                    <span className="text-7xl font-black bg-gradient-to-br from-rose-500 to-pink-600 text-transparent bg-clip-text drop-shadow-sm z-10">
                                        {result}%
                                    </span>
                                </div>
                            </div>
                            
                            <div className="bg-white border-2 border-rose-100 text-rose-700 p-5 rounded-2xl mb-8 shadow-sm">
                                <p className="font-bold text-xl">{message}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all border border-slate-200"
                                >
                                    <RefreshCw size={18} /> Calculate Again
                                </button>
                                <div className="flex flex-1 gap-3">
                                    <button
                                        onClick={handleCopy}
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
                                    >
                                        <Copy size={18} /> Copy
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex-2 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366]/10 text-[#1da851] font-bold hover:bg-[#25D366]/20 transition-all border border-[#25D366]/20 whitespace-nowrap"
                                    >
                                        <Share2 size={18} /> Share Result
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

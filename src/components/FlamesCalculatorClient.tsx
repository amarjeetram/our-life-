"use client";

import React, { useState, useRef } from "react";
import { Heart, RefreshCw, Handshake, Users, Flame, Skull, Link2 } from "lucide-react";

export default function FlamesCalculatorClient() {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [dob1, setDob1] = useState("");
    const [dob2, setDob2] = useState("");
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState<{ letter: string, title: string, desc: string, icon: any, color: string } | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const flamesData = {
        F: { title: "Friends", desc: "You two are meant to be amazing friends!", icon: <Handshake size={32} />, color: "text-blue-500", bg: "bg-blue-50 border-blue-200" },
        L: { title: "Lovers", desc: "A spark of true love! You are meant to be lovers.", icon: <Heart size={32} fill="currentColor" />, color: "text-rose-500", bg: "bg-rose-50 border-rose-200" },
        A: { title: "Affection", desc: "Deep affection! There is a strong, caring bond between you two.", icon: <Flame size={32} />, color: "text-orange-500", bg: "bg-orange-50 border-orange-200" },
        M: { title: "Marriage", desc: "Wedding bells! You are destined to get married.", icon: <Link2 size={32} />, color: "text-purple-500", bg: "bg-purple-50 border-purple-200" },
        E: { title: "Enemies", desc: "Uh oh! You two might be standing on opposite sides.", icon: <Skull size={32} />, color: "text-slate-800", bg: "bg-slate-100 border-slate-300" },
        S: { title: "Siblings", desc: "A bond like brother and sister!", icon: <Users size={32} />, color: "text-teal-500", bg: "bg-teal-50 border-teal-200" }
    };

    const calculateFlames = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name1.trim() || !name2.trim()) return;

        setIsCalculating(true);
        setResult(null);

        // Algorithm
        setTimeout(() => {
            const clean1 = name1.toLowerCase().replace(/[^a-z]/g, "");
            const clean2 = name2.toLowerCase().replace(/[^a-z]/g, "");

            let charCount = 0;
            const map1: Record<string, number> = {};
            const map2: Record<string, number> = {};

            for (const char of clean1) map1[char] = (map1[char] || 0) + 1;
            for (const char of clean2) map2[char] = (map2[char] || 0) + 1;

            for (const char in map1) {
                if (map2[char]) {
                    const min = Math.min(map1[char], map2[char]);
                    map1[char] -= min;
                    map2[char] -= min;
                }
            }

            for (const char in map1) charCount += map1[char];
            for (const char in map2) charCount += map2[char];

            // DOBS calculation (incorporate digits if dob provided for LSI variant support)
            if (dob1 && dob2) {
                const d1 = dob1.replace(/[^0-9]/g, "");
                const d2 = dob2.replace(/[^0-9]/g, "");
                let nDob = 0;
                for (const char of d1) nDob += parseInt(char);
                for (const char of d2) nDob += parseInt(char);
                // Add sum of digits to the character count for a unique DOBS modified count
                charCount += nDob;
            }

            // Fallback if identical
            if (charCount === 0) charCount = 1;

            let flames = ["F", "L", "A", "M", "E", "S"];
            let idx = 0;

            while (flames.length > 1) {
                idx = (idx + charCount - 1) % flames.length;
                flames.splice(idx, 1);
            }

            const finalLetter = flames[0] as keyof typeof flamesData;
            
            setResult({ letter: finalLetter, ...flamesData[finalLetter] });
            setIsCalculating(false);

            setTimeout(() => {
                if (resultRef.current) {
                    resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 100);
        }, 1200); // 1.2s delay for animation suspense
    };

    return (
        <div className="w-full max-w-lg mx-auto transform transition-all">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-10 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-rose-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                <form onSubmit={calculateFlames} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Boy / First Person's Name</label>
                        <input
                            type="text"
                            placeholder="E.g. Siddharth"
                            required
                            maxLength={40}
                            value={name1}
                            onChange={(e) => setName1(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/20 rounded-2xl px-5 py-4 text-slate-800 font-medium placeholder:text-slate-400 outline-none transition-all"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block text-rose-500">Girl / Second Person's Name</label>
                        <input
                            type="text"
                            placeholder="E.g. Kiara"
                            required
                            maxLength={40}
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/20 rounded-2xl px-5 py-4 text-slate-800 font-medium placeholder:text-slate-400 outline-none transition-all"
                        />
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-2 relative">
                        <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Advanced (Optional)</span>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 block">Date of Birth 1</label>
                                <input
                                    type="date"
                                    value={dob1}
                                    onChange={(e) => setDob1(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-rose-400 rounded-xl px-3 py-2 text-slate-700 text-sm outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 block">Date of Birth 2</label>
                                <input
                                    type="date"
                                    value={dob2}
                                    onChange={(e) => setDob2(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-rose-400 rounded-xl px-3 py-2 text-slate-700 text-sm outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isCalculating || !name1 || !name2}
                        className="w-full group relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-2xl px-6 py-4 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-rose-500/20 active:scale-[0.98]"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            {isCalculating ? (
                                <>
                                    <RefreshCw className="animate-spin" size={22} />
                                    Calculating Destiny...
                                </>
                            ) : (
                                <>
                                    Play FLAMES <Flame size={22} className="text-orange-400 group-hover:text-white transition-colors" />
                                </>
                            )}
                        </span>
                    </button>
                </form>

                {/* RESULT SECTION */}
                {result && !isCalculating && (
                    <div ref={resultRef} className="mt-8 animate-in fade-in zoom-in duration-500">
                        <div className={`p-8 rounded-3xl border-2 ${result.bg} text-center shadow-sm relative`}>
                            {/* Confetti or spark decorative if romantic */}
                            {['L', 'A', 'M'].includes(result.letter) && (
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-rose-100 animate-bounce">
                                    ❤️
                                </div>
                            )}

                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl shadow-slate-200/50 mb-4 border border-slate-50 ${result.color} transform transition-transform hover:scale-110 duration-300`}>
                                {result.icon}
                            </div>
                            
                            <h3 className={`text-4xl font-extrabold mb-2 tracking-tight ${result.color}`}>
                                {result.title}
                            </h3>
                            <p className="text-slate-700 font-medium text-lg mb-2">
                                For <span className="font-bold text-slate-900 capitalize">{name1}</span> & <span className="font-bold text-slate-900 capitalize">{name2}</span>
                            </p>
                            <p className="text-slate-600 bg-white/60 p-3 rounded-xl border border-white/50 backdrop-blur-sm shadow-sm inline-block mx-auto">
                                {result.desc}
                            </p>
                        </div>
                        
                        <button
                            onClick={() => setResult(null)}
                            className="mt-6 flex items-center justify-center gap-2 w-full text-slate-500 font-semibold hover:text-slate-800 transition-colors py-2"
                        >
                            <RefreshCw size={18} /> Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

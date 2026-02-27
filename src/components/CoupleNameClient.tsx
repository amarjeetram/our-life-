"use client";

import React, { useState } from 'react';
import { Sparkles, Copy, Heart, Hash, RefreshCcw, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// --- Unicode Font Maps ---
const FONTS = {
    normal: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    bold: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
    script: "𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
    fraktur: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
    doubleStruck: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
    aesthetic: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
};

const EMOJIS = ["❤️", "💕", "✨", "💍", "💑", "🧿", "💫", "💖", "💘", "🥰"];

const applyFont = (text: string, fontKey: keyof typeof FONTS) => {
    if (fontKey === 'normal') return text;
    const targetMap = FONTS[fontKey];
    const sourceMap = FONTS.normal;
    return text.split('').map(char => {
        const idx = sourceMap.indexOf(char);
        return idx !== -1 ? targetMap[idx] : char;
    }).join('');
};

interface ResultItem {
    id: string;
    text: string;
    type: 'name' | 'hashtag';
}

export default function CoupleNameClient() {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [results, setResults] = useState<ResultItem[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const generateNames = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const n1 = name1.trim();
        const n2 = name2.trim();

        if (!n1 || !n2) {
            toast.error("Please enter both names to generate combinations!");
            return;
        }

        setIsGenerating(true);
        setResults([]);

        setTimeout(() => {
            const rawCombos = new Set<string>();
            const lowerN1 = n1.toLowerCase();
            const lowerN2 = n2.toLowerCase();
            const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

            // 1. Split logic
            const buildCombos = (first: string, second: string) => {
                const len1 = first.length;
                const len2 = second.length;

                // Half + Half
                rawCombos.add(cap(first.slice(0, Math.max(1, Math.ceil(len1 / 2)))) + second.slice(Math.floor(len2 / 2)));
                rawCombos.add(first.slice(0, 2) + second.slice(-2));
                rawCombos.add(first.slice(0, 3) + second.slice(1));

                // Vowel/Consonant blends (simplified mix)
                if (len1 > 2 && len2 > 2) {
                    rawCombos.add(cap(first.slice(0, 2)) + second.slice(2));
                    rawCombos.add(cap(first.slice(0, 1)) + second.slice(1, 3) + first.slice(-1));
                }
            };

            buildCombos(lowerN1, lowerN2);
            buildCombos(lowerN2, lowerN1);

            // Create full names
            rawCombos.add(cap(lowerN1) + cap(lowerN2));
            rawCombos.add(cap(lowerN2) + cap(lowerN1));

            // Clean & Filter
            let comboArray = Array.from(rawCombos)
                .filter(c => c.length > 2)
                .map(c => cap(c.toLowerCase())); // final capitalization pass

            // Randomize order
            comboArray = comboArray.sort(() => Math.random() - 0.5);

            const finalResults: ResultItem[] = [];
            const fonts: (keyof typeof FONTS)[] = ['normal', 'bold', 'script', 'fraktur', 'doubleStruck', 'aesthetic'];

            // Generate Styled Names
            comboArray.slice(0, 12).forEach((combo, idx) => {
                const font = fonts[idx % fonts.length];
                const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

                // Add plain version
                if (font !== 'normal') {
                    finalResults.push({ id: `plain-${idx}`, text: `${combo} ${emoji}`, type: 'name' });
                }

                // Add styled version
                finalResults.push({
                    id: `styled-${idx}`,
                    text: `${applyFont(combo, font)} ${emoji}`,
                    type: 'name'
                });
            });

            // Generate Hashtags
            const hashtags = [
                `#${cap(lowerN1)}Weds${cap(lowerN2)}`,
                `#${cap(lowerN2)}Loves${cap(lowerN1)}`,
                `#${cap(lowerN1)}${cap(lowerN2)}Forever`,
                `#${comboArray[0]}Wedding`,
                `#${comboArray[1]}DiShaadi`,
                `#Team${comboArray[0]}`
            ];

            hashtags.forEach((tag, idx) => {
                finalResults.push({ id: `hash-${idx}`, text: tag, type: 'hashtag' });
            });

            setResults(finalResults.sort(() => Math.random() - 0.5)); // shuffle all
            setIsGenerating(false);

            // Scroll to results on mobile
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    window.scrollTo({ top: document.getElementById('results-area')?.offsetTop || 500, behavior: 'smooth' });
                }, 100);
            }

        }, 600); // Artificial delay for "processing" feel
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedId(id);
            toast.success('Copied to clipboard!', { icon: '✨' });
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Input Section */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-6 md:p-10 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <form onSubmit={generateNames} className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
                        <div className="w-full flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">First Person Name</label>
                            <input
                                type="text"
                                value={name1}
                                onChange={(e) => setName1(e.target.value.replace(/[^a-zA-Z]/g, ''))} // only letters
                                placeholder="e.g. Virat"
                                className="w-full px-5 py-4 bg-white border-2 border-pink-100 focus:border-pink-500 rounded-2xl outline-none transition-all placeholder:text-gray-300 text-lg font-semibold text-gray-800 shadow-sm"
                                maxLength={15}
                            />
                        </div>

                        <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 rounded-full shadow-sm md:mt-6 border-4 border-white z-10">
                            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                        </div>

                        <div className="w-full flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Second Person Name</label>
                            <input
                                type="text"
                                value={name2}
                                onChange={(e) => setName2(e.target.value.replace(/[^a-zA-Z]/g, ''))} // only letters
                                placeholder="e.g. Anushka"
                                className="w-full px-5 py-4 bg-white border-2 border-purple-100 focus:border-purple-500 rounded-2xl outline-none transition-all placeholder:text-gray-300 text-lg font-semibold text-gray-800 shadow-sm"
                                maxLength={15}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isGenerating || !name1 || !name2}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg px-10 py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/25 transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed group"
                        >
                            {isGenerating ? (
                                <RefreshCcw className="w-5 h-5 animate-spin" />
                            ) : (
                                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                            )}
                            {isGenerating ? 'Mixing Names...' : 'Generate Spark ✨'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Section */}
            <div id="results-area">
                <AnimatePresence>
                    {results.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Your Unique Combinations ✨</h3>
                                <p className="text-gray-500 mt-2">Click any name or hashtag to copy instantly!</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.map((result, idx) => (
                                    <motion.div
                                        key={result.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                        onClick={() => handleCopy(result.text, result.id)}
                                        className={`group relative flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 
                                            ${result.type === 'hashtag'
                                                ? 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50'
                                                : 'bg-white border-pink-50 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-500/5'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {result.type === 'hashtag' && <Hash className="w-4 h-4 text-indigo-400 shrink-0" />}
                                            <span className={`text-[17px] truncate ${result.type === 'hashtag' ? 'font-semibold text-indigo-700' : 'text-gray-800'}`}>
                                                {result.text}
                                            </span>
                                        </div>

                                        <div className={`shrink-0 p-2 rounded-xl transition-colors ${copiedId === result.id ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-pink-500'}`}>
                                            {copiedId === result.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

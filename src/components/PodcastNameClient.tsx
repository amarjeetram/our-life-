"use client";

import React, { useState } from 'react';
import { Mic2, Sparkles, Copy, CheckCircle2, Play, Radio, Podcast } from 'lucide-react';

const NICHES = ["Random", "True Crime", "Sports", "Funny / Comedy", "Business", "Tech", "Pop Culture"];

const DICT = {
    "True Crime": {
        adjectives: ["Cold", "Dark", "Unsolved", "Bloody", "Missing", "Fatal", "Twisted", "Hidden", "Guilty", "Silent", "Lethal", "Sinister"],
        nouns: ["Case", "Files", "Murder", "Evidence", "Truth", "Secrets", "Alibi", "Motives", "Confessions", "Justice", "Suspects", "Traces"],
        formats: ["The {Adj} {Noun}", "{Noun} in the {Adj}", "{Adj} {Noun} Podcast", "The {Noun} Tapes", "Uncovering the {Noun}"]
    },
    "Sports": {
        adjectives: ["Daily", "Fantasy", "Pro", "Unfiltered", "Elite", "Hardwood", "Gridiron", "Locker Room", "Prime", "Bench", "Ultimate", "Final"],
        nouns: ["Draft", "Talk", "Takes", "Huddle", "Playbook", "Review", "Nation", "Scout", "Report", "Rundown", "Champs", "Score"],
        formats: ["The {Adj} {Noun}", "{Adj} {Noun} Show", "{Noun} Weekly", "Beyond the {Noun}", "{Noun} & {Noun}"]
    },
    "Funny / Comedy": {
        adjectives: ["Drunk", "Awkward", "Slightly", "Unapologetic", "Stupid", "Bad", "Messy", "Accidental", "Random", "Clueless", "Loud", "Weird"],
        nouns: ["Thoughts", "Advice", "Mistakes", "Banter", "Mondays", "Genius", "Stories", "Takes", "Babble", "Ramblings", "Chaos", "Logic"],
        formats: ["{Adj} {Noun}", "The {Adj} {Noun} Podcast", "Two Guys & {Adj} {Noun}", "Just {Adj} {Noun}", "{Noun} with Friends"]
    },
    "Business": {
        adjectives: ["Smart", "Global", "Next Gen", "Lean", "Rich", "Modern", "Strategic", "Alpha", "Daily", "Digital", "Future", "Startup"],
        nouns: ["Hustle", "Wealth", "Founders", "Growth", "Scale", "Money", "Capital", "Mindset", "Profits", "Network", "Blueprint", "Leaders"],
        formats: ["The {Adj} {Noun}", "{Noun} Strategies", "{Adj} {Noun} Radio", "Mastering {Noun}", "The {Noun} Show"]
    },
    "Tech": {
        adjectives: ["Cyber", "Code", "Future", "Wired", "Smart", "Silicon", "Beta", "Digital", "Cloud", "Neural", "Tech", "Data"],
        nouns: ["Stack", "Bytes", "Talks", "Review", "Update", "Hackers", "Valley", "Trends", "Logic", "Nodes", "Network", "Shift"],
        formats: ["{Adj} {Noun}", "The {Adj} {Noun} Podcast", "{Noun} Daily", "Decoding the {Noun}", "{Noun} Unplugged"]
    },
    "Pop Culture": {
        adjectives: ["Trending", "Binge", "Toxic", "Iconic", "Weekly", "Viral", "Uncanceled", "Pop", "Hollywood", "Messy", "Loud", "Candid"],
        nouns: ["Spill", "Tea", "Watch", "Takes", "Vibes", "Gossip", "Drama", "Culture", "Fandom", "Review", "Update", "Scene"],
        formats: ["The {Adj} {Noun}", "{Adj} {Noun}", "Spilling the {Noun}", "{Noun} Catch-up", "The {Noun} Room"]
    }
};

export default function PodcastNameClient() {
    const [generatedNames, setGeneratedNames] = useState<string[]>([]);
    const [selectedNiche, setSelectedNiche] = useState<string>("Random");
    const [quantity, setQuantity] = useState<number>(6);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const generatePodcastName = (niche: string) => {
        let targetNiche = niche;
        if (targetNiche === "Random") {
            const nichesList = Object.keys(DICT);
            targetNiche = nichesList[Math.floor(Math.random() * nichesList.length)];
        }

        const dict = DICT[targetNiche as keyof typeof DICT];
        const format = dict.formats[Math.floor(Math.random() * dict.formats.length)];
        
        let adj1 = dict.adjectives[Math.floor(Math.random() * dict.adjectives.length)];
        let noun1 = dict.nouns[Math.floor(Math.random() * dict.nouns.length)];
        let noun2 = dict.nouns[Math.floor(Math.random() * dict.nouns.length)];

        while (noun1 === noun2) {
            noun2 = dict.nouns[Math.floor(Math.random() * dict.nouns.length)];
        }

        let result = format.replace("{Adj}", adj1);
        if (result.includes("{Noun} & {Noun}")) {
            result = result.replace("{Noun} & {Noun}", `${noun1} & ${noun2}`);
        } else {
            result = result.replace("{Noun}", noun1);
        }

        return result;
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const newNames: string[] = [];
            for (let i = 0; i < quantity; i++) {
                newNames.push(generatePodcastName(selectedNiche));
            }
            setGeneratedNames(newNames);
            setCopiedIndex(null);
            setIsGenerating(false);
        }, 300); // Shorter loading time for snappier feel
    };

    const copyToClipboard = (name: string, index: number) => {
        navigator.clipboard.writeText(name);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // UI Colors based on Spotify/Apple Podcast aesthetics
    const themeGradient = "from-emerald-400 to-teal-500";
    const bgGlow = "bg-emerald-500";
    const buttonBg = "bg-slate-900";

    return (
        <div className="w-full bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            
            {/* Header / App Bar Style */}
            <div className="p-8 md:p-10 relative overflow-hidden bg-slate-900 text-white">
                <div className={`absolute top-0 right-0 w-80 h-80 ${bgGlow} rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none`}></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${themeGradient} flex items-center justify-center text-white shadow-lg`}>
                            <Podcast className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight">AI Podcast Namer</h2>
                            <p className="text-slate-400 font-medium mt-1">Discover your show's perfect identity.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8 bg-slate-50 border-b border-slate-100">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <Radio className="w-4 h-4 text-emerald-500" /> Podcast Niche
                    </label>
                    <div className="relative">
                        <select 
                            value={selectedNiche} 
                            onChange={(e) => setSelectedNiche(e.target.value)}
                            className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all shadow-sm"
                        >
                            {NICHES.map(g => <option key={g} value={g}>{g === "Random" ? "🎲 All Categories (Surprise Me)" : g}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-slate-400">
                            ▼
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <Mic2 className="w-4 h-4 text-teal-500" /> Quantity
                    </label>
                    <div className="flex items-center gap-4 bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                        <input 
                            type="range" 
                            min="3" 
                            max="12" 
                            step="3"
                            value={quantity} 
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="flex-1 accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none"
                        />
                        <span className="font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">{quantity}</span>
                    </div>
                </div>
            </div>

            {/* Generate Button Container */}
            <div className="px-8 md:px-10 py-8 flex justify-center -mt-12 relative z-10">
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`group relative flex items-center gap-3 ${buttonBg} hover:bg-slate-800 text-white font-black text-lg px-12 py-5 rounded-full shadow-2xl transition-all active:scale-95 disabled:opacity-70`}
                >
                    {isGenerating ? (
                        <>
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            On Air...
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5 fill-current" /> 
                            Generate Show Names
                        </>
                    )}
                </button>
            </div>

            {/* Results Grid */}
            <div className="p-8 md:p-10 pt-4">
                {generatedNames.length === 0 ? (
                    <div className="text-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50">
                        <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${themeGradient} flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 opacity-50`}>
                            <Mic2 className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Mic Check, 1, 2, 3...</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto">Select your podcast niche and hit generate to discover the perfect title for your new show.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {generatedNames.map((name, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white rounded-2xl border-2 border-slate-100 hover:border-emerald-500/50 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${themeGradient}`}></div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedNiche === "Random" ? "Podcast" : selectedNiche}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 leading-tight">
                                        {name}
                                    </h3>
                                </div>
                                
                                <button 
                                    onClick={() => copyToClipboard(name, idx)}
                                    className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                                        copiedIndex === idx 
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 hover:text-slate-900'
                                    }`}
                                >
                                    {copiedIndex === idx ? (
                                        <><CheckCircle2 className="w-4 h-4" /> Name Copied</>
                                    ) : (
                                        <><Copy className="w-4 h-4" /> Copy Name</>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

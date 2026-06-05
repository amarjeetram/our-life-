"use client";

import React, { useState } from 'react';
import { Cat, Sparkles, Wand2, Copy, CheckCircle2, RotateCw } from 'lucide-react';

const PREFIXES = ["Fire", "Bramble", "Lion", "Tiger", "Frost", "Leaf", "Sand", "Squirrel", "Jay", "Dove", "Raven", "Cloud", "Ash", "Fern", "Dust", "Thorn", "Bright", "Cinder", "Hawk", "Moth", "Willow", "Silver", "Storm", "Crooked", "Leopard", "Mist", "Night", "Black", "Russet", "Rowan", "Tawn", "Tall", "Mud", "Crow", "Breeze", "Heather", "Dark", "Broken", "Mapleshade", "Scourge", "Bone"];
const SUFFIXES = ["heart", "claw", "pool", "pelt", "strike", "foot", "tail", "flight", "feather", "storm", "shade", "frost", "whisker", "breeze", "song", "wing", "shine", "leaf", "blaze", "fall", "step", "cloud", "watcher", "fur", "fang", "tooth", "ear"];
const RANKS = ["Warrior", "Leader", "Apprentice", "Kit", "Medicine Cat", "Elder"];
const CLANS = ["ThunderClan", "ShadowClan", "RiverClan", "WindClan", "SkyClan", "Dark Forest", "BloodClan", "StarClan"];

const PERSONALITIES = [
    "Fierce and loyal, always ready to defend the clan with their life.",
    "Gentle and wise, preferring diplomacy over shedding blood.",
    "Quick and agile, making them an excellent hunter in thick undergrowth.",
    "Dark and mysterious, often keeping to themselves but fiercely powerful.",
    "Ambitious and cunning, willing to cross lines to gain power and respect.",
    "Warm and nurturing, highly respected by queens and elders alike.",
    "Stubborn and hot-headed, but possessing a brave and true heart.",
    "Quiet and observant, often noticing things that others easily miss."
];

interface GeneratedName {
    prefix: string;
    suffix: string;
    rank: string;
    clan: string;
    personality: string;
}

export default function WarriorCatNameClient() {
    const [generatedCats, setGeneratedCats] = useState<GeneratedName[]>([]);
    const [selectedClan, setSelectedClan] = useState<string>("Random");
    const [selectedRank, setSelectedRank] = useState<string>("Random");
    const [quantity, setQuantity] = useState<number>(3);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateNames = () => {
        const newCats: GeneratedName[] = [];
        for (let i = 0; i < quantity; i++) {
            const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
            let suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
            
            let rank = selectedRank;
            if (rank === "Random") {
                rank = RANKS[Math.floor(Math.random() * RANKS.length)];
            }

            if (rank === "Leader") suffix = "star";
            if (rank === "Apprentice") suffix = "paw";
            if (rank === "Kit") suffix = "kit";

            let clan = selectedClan;
            if (clan === "Random") {
                clan = CLANS[Math.floor(Math.random() * CLANS.length)];
            }

            const personality = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)];

            newCats.push({ prefix, suffix, rank, clan, personality });
        }
        setGeneratedCats(newCats);
        setCopiedIndex(null);
    };

    const copyToClipboard = (cat: GeneratedName, index: number) => {
        const fullName = `${cat.prefix}${cat.suffix}`;
        const text = `Name: ${fullName}\nRank: ${cat.rank}\nClan: ${cat.clan}\nPersonality: ${cat.personality}`;
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center gap-4 mb-2 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                        <Cat className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Warrior Cat Name Generator</h2>
                        <p className="text-slate-500 font-medium text-sm">Generate random warrior cat names with clans, ranks, and personality descriptions.</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 bg-slate-50 border-b border-slate-200">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Clan</label>
                    <select 
                        value={selectedClan} 
                        onChange={(e) => setSelectedClan(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    >
                        <option value="Random">🎲 Random Clan</option>
                        {CLANS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Rank</label>
                    <select 
                        value={selectedRank} 
                        onChange={(e) => setSelectedRank(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    >
                        <option value="Random">🎲 Random Rank</option>
                        {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">How many names?</label>
                    <div className="flex items-center gap-3">
                        <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={quantity} 
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="flex-1 accent-amber-500"
                        />
                        <span className="font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-lg">{quantity}</span>
                    </div>
                </div>
            </div>

            {/* Generate Button Container */}
            <div className="px-6 md:px-8 py-6 flex justify-center -mt-6">
                <button
                    onClick={generateNames}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-slate-800/20 transition-transform active:scale-95"
                >
                    <Wand2 className="w-5 h-5" /> Generate Warrior Cats
                </button>
            </div>

            {/* Results Grid */}
            <div className="p-6 md:p-8 pt-0">
                {generatedCats.length === 0 ? (
                    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-3xl">
                        <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-700 mb-1">No Cats Generated Yet</h3>
                        <p className="text-slate-500 text-sm">Click the generate button above to create unique warrior cat names with detailed descriptions!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {generatedCats.map((cat, idx) => {
                            const fullName = `${cat.prefix}${cat.suffix}`;
                            
                            // Clan badge color
                            let badgeColor = "bg-slate-100 text-slate-600";
                            if (cat.clan === "ThunderClan") badgeColor = "bg-amber-100 text-amber-700 border-amber-200";
                            if (cat.clan === "ShadowClan") badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
                            if (cat.clan === "RiverClan") badgeColor = "bg-blue-100 text-blue-700 border-blue-200";
                            if (cat.clan === "WindClan") badgeColor = "bg-emerald-100 text-emerald-700 border-emerald-200";
                            if (cat.clan === "Dark Forest") badgeColor = "bg-red-950 text-red-300 border-red-900";
                            if (cat.clan === "StarClan") badgeColor = "bg-indigo-50 text-indigo-600 border-indigo-200";

                            return (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all hover:-translate-y-1 relative">
                                    <div className="p-5 flex-grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${badgeColor}`}>
                                                {cat.clan}
                                            </span>
                                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                                                {cat.rank}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-black text-slate-800 mb-2">
                                            {fullName}
                                        </h3>
                                        
                                        <p className="text-sm text-slate-500 italic leading-relaxed">
                                            "{cat.personality}"
                                        </p>
                                    </div>
                                    
                                    <div className="p-3 bg-slate-50 border-t border-slate-100">
                                        <button 
                                            onClick={() => copyToClipboard(cat, idx)}
                                            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg transition-colors"
                                        >
                                            {copiedIndex === idx ? (
                                                <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <span className="text-emerald-600">Copied Profile</span></>
                                            ) : (
                                                <><Copy className="w-4 h-4" /> Copy Cat Profile</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

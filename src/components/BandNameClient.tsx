"use client";

import React, { useState } from 'react';
import { Music, Sparkles, Wand2, Copy, CheckCircle2, Headphones, Guitar, Mic2 } from 'lucide-react';

const GENRES = ["Random", "Rock", "Metal", "Punk", "Emo", "Indie", "Boy Band", "K-Pop", "Synthwave"];

// Dictionary for Generation
const DICT = {
    Rock: {
        adjectives: ["Electric", "Rolling", "Black", "Crimson", "Midnight", "Sonic", "Velvet", "Heavy", "Iron", "Silent", "Lost", "Rebel"],
        nouns: ["Stones", "Zeppelin", "Sabbath", "Roses", "Eagles", "Hearts", "Skulls", "Rebels", "Lions", "Kings", "Phantoms", "Crow"],
        formats: ["The {Adj} {Noun}", "{Noun} {Noun}", "{Adj} {Noun}"]
    },
    Metal: {
        adjectives: ["Death", "Iron", "Dark", "Bleeding", "Shattered", "Rotting", "Toxic", "Grave", "Blood", "Steel", "Venom", "Dead"],
        nouns: ["Maiden", "Priest", "Throne", "Scythe", "Plague", "Slaughter", "Abyss", "Skull", "Chaos", "Wrath", "Empires", "Gods"],
        formats: ["{Adj} {Noun}", "The {Adj} {Noun}", "{Noun} of {Noun}"]
    },
    Punk: {
        adjectives: ["Angry", "Rotten", "Social", "Dead", "Anti", "Cheap", "Plastic", "Riot", "Trash", "Toxic", "Urban", "Blind"],
        nouns: ["Pistols", "Youth", "Clash", "Rejects", "Distortion", "Rats", "Mutants", "Misfits", "Threat", "Disaster", "Aliens", "Dogs"],
        formats: ["The {Adj} {Noun}", "{Noun} {Noun}", "{Adj} {Noun}"]
    },
    Emo: {
        adjectives: ["Crying", "Bleeding", "Broken", "Falling", "Sad", "Shattered", "Dying", "Lonely", "Silent", "Fading", "Lost", "Tearful"],
        nouns: ["Hearts", "Romance", "Tears", "Shadows", "Promises", "Lullaby", "Diary", "Secrets", "Ghosts", "Echoes", "Tragedy", "Memories"],
        formats: ["{Adj} {Noun}", "A {Adj} {Noun}", "The {Noun} of {Adj}"]
    },
    Indie: {
        adjectives: ["Arctic", "Vampire", "Neutral", "Tame", "Local", "Modest", "Crystal", "Neon", "Plastic", "Yellow", "Wandering", "Two"],
        nouns: ["Monkeys", "Weekend", "Hotel", "Impala", "Natives", "Mouse", "Castles", "Trees", "Oceans", "Bears", "Doors", "Makers"],
        formats: ["The {Adj} {Noun}", "{Adj} {Noun}", "{Noun} & The {Noun}"]
    },
    "Boy Band": {
        adjectives: ["Backstreet", "One", "Perfect", "True", "Dream", "Star", "Five", "New", "Forever", "Midnight", "Golden", "Sweet"],
        nouns: ["Boys", "Direction", "Zone", "Harmony", "Kids", "Vibes", "Rhythm", "Angels", "Brothers", "Love", "Hearts", "Echo"],
        formats: ["{Adj} {Noun}", "The {Adj} {Noun}", "{Noun} {Noun}"]
    },
    "K-Pop": {
        adjectives: ["Red", "Black", "Super", "Infinite", "Stray", "Twice", "Ever", "Dream", "Star", "Neon", "Cosmic", "Wonder"],
        nouns: ["Pink", "Junior", "Kids", "Glow", "Girls", "Boys", "Velvet", "Generation", "Zone", "Light", "Bullet", "Secret"],
        formats: ["{Adj} {Noun}", "{Adj}{Noun}", "{Noun} {Noun}"]
    },
    Synthwave: {
        adjectives: ["Neon", "Cyber", "Retro", "Laser", "Night", "Synth", "Chrome", "Digital", "Future", "Miami", "Crystal", "Holo"],
        nouns: ["Drive", "Rider", "Wave", "City", "Runner", "Dreams", "Grid", "Vice", "Magic", "Force", "Glitch", "Pulse"],
        formats: ["{Adj} {Noun}", "{Adj}{Noun}", "The {Adj} {Noun}"]
    }
};

export default function BandNameClient() {
    const [generatedNames, setGeneratedNames] = useState<string[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>("Random");
    const [quantity, setQuantity] = useState<number>(6);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const generateBandName = (genre: string) => {
        let targetGenre = genre;
        if (targetGenre === "Random") {
            const genresList = Object.keys(DICT);
            targetGenre = genresList[Math.floor(Math.random() * genresList.length)];
        }

        const dict = DICT[targetGenre as keyof typeof DICT];
        const format = dict.formats[Math.floor(Math.random() * dict.formats.length)];
        
        let adj1 = dict.adjectives[Math.floor(Math.random() * dict.adjectives.length)];
        let noun1 = dict.nouns[Math.floor(Math.random() * dict.nouns.length)];
        let noun2 = dict.nouns[Math.floor(Math.random() * dict.nouns.length)];

        while (noun1 === noun2) {
            noun2 = dict.nouns[Math.floor(Math.random() * dict.nouns.length)];
        }

        let result = format.replace("{Adj}", adj1);
        if (result.includes("{Noun} {Noun}")) {
            result = result.replace("{Noun} {Noun}", `${noun1} ${noun2}`);
        } else if (result.includes("{Noun} of {Noun}")) {
            result = result.replace("{Noun} of {Noun}", `${noun1} of ${noun2}`);
        } else if (result.includes("{Noun} & The {Noun}")) {
            result = result.replace("{Noun} & The {Noun}", `${noun1} & The ${noun2}`);
        } else if (result.includes("{Adj}{Noun}")) {
            result = result.replace("{Adj}{Noun}", `${adj1}${noun1}`);
        } else {
            result = result.replace("{Noun}", noun1);
        }

        return result;
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate a slight AI loading effect for the premium feel
        setTimeout(() => {
            const newNames: string[] = [];
            for (let i = 0; i < quantity; i++) {
                newNames.push(generateBandName(selectedGenre));
            }
            setGeneratedNames(newNames);
            setCopiedIndex(null);
            setIsGenerating(false);
        }, 400);
    };

    const copyToClipboard = (name: string, index: number) => {
        navigator.clipboard.writeText(name);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative">
            {/* Dark/Neon Background FX */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header */}
            <div className="border-b border-white/10 p-6 md:p-8 relative z-10 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-5 mb-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center text-white shadow-[0_0_30px_rgba(192,38,211,0.4)]">
                        <Headphones className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 tracking-tight">AI Band Name Generator</h2>
                        <p className="text-slate-400 font-medium text-sm md:text-base mt-1">Generate epic, unique, and genre-specific band names instantly.</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6 bg-white/5 border-b border-white/10 relative z-10 backdrop-blur-sm">
                <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                        <Guitar className="w-4 h-4 text-purple-400" /> Select Music Genre
                    </label>
                    <div className="relative">
                        <select 
                            value={selectedGenre} 
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="w-full px-5 py-4 bg-[#111] border border-white/20 rounded-xl font-bold text-white focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50 appearance-none transition-all"
                        >
                            {GENRES.map(g => <option key={g} value={g}>{g === "Random" ? "🎲 All Genres (Surprise Me!)" : g}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                            ▼
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                        <Mic2 className="w-4 h-4 text-fuchsia-400" /> Number of Names
                    </label>
                    <div className="flex items-center gap-4 bg-[#111] border border-white/20 rounded-xl px-5 py-4">
                        <input 
                            type="range" 
                            min="3" 
                            max="12" 
                            step="3"
                            value={quantity} 
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="flex-1 accent-fuchsia-500 h-2 bg-slate-800 rounded-lg appearance-none"
                        />
                        <span className="font-black text-fuchsia-400 bg-fuchsia-500/10 px-3 py-1 rounded-lg border border-fuchsia-500/20">{quantity}</span>
                    </div>
                </div>
            </div>

            {/* Generate Button Container */}
            <div className="px-6 md:px-8 py-8 flex justify-center relative z-10">
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="group relative flex items-center gap-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xl px-12 py-5 rounded-2xl shadow-[0_0_40px_rgba(192,38,211,0.5)] hover:shadow-[0_0_60px_rgba(192,38,211,0.7)] transition-all active:scale-95 disabled:opacity-70"
                >
                    {isGenerating ? (
                        <>
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
                            Generate Band Names
                        </>
                    )}
                </button>
            </div>

            {/* Results Grid */}
            <div className="p-6 md:p-8 pt-0 relative z-10">
                {generatedNames.length === 0 ? (
                    <div className="text-center py-16 px-4 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                        <Music className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-300 mb-2">The Stage is Empty</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto">Select a genre and hit generate to summon epic AI-generated band names for your next musical project.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {generatedNames.map((name, idx) => (
                            <div 
                                key={idx} 
                                className="group relative bg-[#111] hover:bg-[#1a1a1a] rounded-2xl border border-white/10 hover:border-purple-500/50 p-6 flex flex-col justify-center items-center text-center transition-all duration-300 overflow-hidden"
                            >
                                {/* Neon Glow on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-fuchsia-500/0 group-hover:from-purple-500/10 group-hover:to-fuchsia-500/10 transition-colors duration-500"></div>
                                
                                <h3 className="text-2xl font-black text-white mb-6 relative z-10 tracking-wide uppercase drop-shadow-md">
                                    "{name}"
                                </h3>
                                
                                <button 
                                    onClick={() => copyToClipboard(name, idx)}
                                    className={`absolute bottom-0 left-0 right-0 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 translate-y-full group-hover:translate-y-0 ${
                                        copiedIndex === idx 
                                            ? 'bg-emerald-500/20 text-emerald-400 border-t border-emerald-500/30' 
                                            : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border-t border-white/10'
                                    }`}
                                >
                                    {copiedIndex === idx ? (
                                        <><CheckCircle2 className="w-4 h-4" /> Copied!</>
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

"use client";

import React, { useState } from 'react';
import { Sparkles, Copy, CheckCircle2, Wand2, Shield, Leaf, Moon } from 'lucide-react';

const SUBRACES = ["Random", "High Elf", "Wood Elf", "Dark Elf (Drow)", "Night Elf", "Half-Elf"];

// Dictionary for Elf Name Generation
const DICT = {
    "High Elf": {
        male: ["Aelar", "Aerdeth", "Aramil", "Carix", "Cornaith", "Elenaril", "Galinndan", "Hadarai", "Iliyar", "Lucan", "Mindartis", "Paelias", "Peren", "Quarion", "Syllin", "Thamior", "Varis"],
        female: ["Althaea", "Aramina", "Birel", "Caelynn", "Drusilia", "Enna", "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Naivara", "Quelenna", "Silaqui", "Vadania", "Xanaphia"],
        surnames: ["Amastacia (Starflower)", "Amakiir (Gemflower)", "Galanodel (Moonwhisper)", "Holimion (Diamonddew)", "Ilphelkiir (Gemblossom)", "Liadon (Silverfrond)", "Meliamne (Oakenheel)", "Nailo (Nightbreeze)", "Siannodel (Moonbrook)", "Xiloscient (Goldpetal)"]
    },
    "Wood Elf": {
        male: ["Adran", "Aelar", "Beiro", "Carric", "Enialis", "Erdan", "Erevan", "Heian", "Ivellios", "Laucian", "Rolen", "Soveli", "Thamior", "Theren"],
        female: ["Adrie", "Andraste", "Antinua", "Bethrynna", "Birel", "Chaedi", "Dara", "Enna", "Jelenneth", "Keyleth", "Mia", "Quillathe", "Sariel", "Thia", "Valanthe"],
        surnames: ["Greenleaf", "Oakenshield", "Swiftstream", "Pineshadow", "Mossrunner", "Fernwalker", "Wildheart", "Winddancer", "Barkweaver", "Thornstrike", "Autumnleaf"]
    },
    "Dark Elf (Drow)": {
        male: ["Akord", "Belgos", "Chasrm", "Drizzt", "Elendar", "Guldor", "Hatchnet", "Ildan", "Jarlaxle", "Kophner", "Llolth", "Malice", "Nalfein", "Pharaun", "Rizzen", "Tarl", "Vorn", "Zack", "Zaknafein"],
        female: ["Akor", "Beldra", "Chardalyn", "Dina", "Elendra", "Ghilanna", "Halastra", "Ilivarra", "Jaelre", "Khelben", "Liriel", "Malaggar", "Nalvanna", "Phaere", "Riklaunim", "Talabir", "Vierna", "Zilvree"],
        surnames: ["Auvryndar", "Baenre", "Despana", "Do'Urden", "Everhate", "Freth", "Hunzrin", "Melarn", "Mizzrym", "Noquar", "Oblodra", "Teken'duis", "Xorlarrin", "Zauviir"]
    },
    "Night Elf": {
        male: ["Astarii", "Broll", "Deldrom", "Elidyr", "Fandral", "Garithos", "Halduron", "Illidan", "Jarod", "Kael", "Lathandros", "Malfurion", "Narthalus", "Othmar", "Phaelis", "Rathil", "Saldar", "Terenas", "Vael", "Zaram"],
        female: ["Althea", "Belyra", "Calytha", "Dalar", "Elune", "Feral", "Glynna", "Halanna", "Illis", "Janal", "Kaldra", "Lirissa", "Maiev", "Nalya", "Ollisia", "Phaelya", "Ryllia", "Sylvanas", "Talia", "Tyrande", "Velissa", "Zala"],
        surnames: ["Bearmantle", "Bladeleaf", "Shadowsong", "Stormrage", "Whisperwind", "Feathermoon", "Starseeker", "Moonrider", "Nighthaven", "Staghelm", "Ravencaller"]
    },
    "Half-Elf": {
        male: ["Alberic", "Bregal", "Corrin", "Davner", "Eldon", "Falken", "Garrick", "Hektor", "Ilan", "Jandar", "Kaldor", "Luthor", "Merrick", "Niall", "Orin", "Perrin", "Quinn", "Rowan", "Silas", "Tobias", "Ulric", "Valen", "Willem", "Xander", "Yorn", "Zane"],
        female: ["Alina", "Brea", "Celia", "Daria", "Elara", "Freya", "Gwyn", "Hana", "Ilsa", "Janna", "Kira", "Lyra", "Mira", "Nia", "Oria", "Pia", "Ria", "Sia", "Tia", "Vera", "Willa", "Xena", "Yara", "Zia"],
        surnames: ["Half-Elves often adopt human or elven surnames randomly. Generate again for more options!"] // Logic will randomly pull from human-ish or elven surnames
    }
};

const HALF_ELF_SURNAMES = ["Smith", "Cooper", "Fletcher", "Tanner", "Miller", "Amastacia", "Galanodel", "Greenleaf", "Oakenshield", "Do'Urden", "Shadowsong", "Stormrage"];

export default function ElfNameClient() {
    const [generatedNames, setGeneratedNames] = useState<{name: string, subrace: string}[]>([]);
    const [selectedSubrace, setSelectedSubrace] = useState<string>("Random");
    const [selectedGender, setSelectedGender] = useState<string>("Any");
    const [quantity, setQuantity] = useState<number>(6);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const generateElfName = (subrace: string, gender: string) => {
        let targetSubrace = subrace;
        if (targetSubrace === "Random") {
            const subracesList = Object.keys(DICT);
            targetSubrace = subracesList[Math.floor(Math.random() * subracesList.length)];
        }

        let targetGender = gender;
        if (targetGender === "Any") {
            targetGender = Math.random() > 0.5 ? "male" : "female";
        }

        const dict = DICT[targetSubrace as keyof typeof DICT];
        
        let firstName = "";
        if (targetGender === "male") {
            firstName = dict.male[Math.floor(Math.random() * dict.male.length)];
        } else {
            firstName = dict.female[Math.floor(Math.random() * dict.female.length)];
        }

        let surname = "";
        if (targetSubrace === "Half-Elf") {
            surname = HALF_ELF_SURNAMES[Math.floor(Math.random() * HALF_ELF_SURNAMES.length)];
        } else {
            surname = dict.surnames[Math.floor(Math.random() * dict.surnames.length)];
        }

        return {
            name: `${firstName} ${surname}`,
            subrace: targetSubrace
        };
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate magical generation
        setTimeout(() => {
            const newNames: {name: string, subrace: string}[] = [];
            for (let i = 0; i < quantity; i++) {
                newNames.push(generateElfName(selectedSubrace, selectedGender.toLowerCase()));
            }
            setGeneratedNames(newNames);
            setCopiedIndex(null);
            setIsGenerating(false);
        }, 450);
    };

    const copyToClipboard = (name: string, index: number) => {
        navigator.clipboard.writeText(name);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // Styling based on Subrace
    const getSubraceColors = (subrace: string) => {
        switch(subrace) {
            case 'High Elf': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Wood Elf': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Dark Elf (Drow)': return 'bg-slate-800 text-purple-300 border-purple-900/50';
            case 'Night Elf': return 'bg-indigo-900 text-indigo-200 border-indigo-800';
            case 'Half-Elf': return 'bg-sky-100 text-sky-800 border-sky-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <div className="w-full bg-[#1e293b] border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl relative font-sans">
            
            {/* Ambient Magical Background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header / App Bar Style */}
            <div className="p-8 md:p-10 relative overflow-hidden bg-slate-900/40 backdrop-blur-md border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-purple-600 p-[2px] shadow-[0_0_30px_rgba(16,185,129,0.3)]`}>
                            <div className="w-full h-full bg-slate-900 rounded-3xl flex items-center justify-center">
                                <Leaf className="w-8 h-8 text-emerald-400" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-purple-400 tracking-tight">Elf Name Generator</h2>
                            <p className="text-slate-400 font-medium mt-1">Summon mystical names for your D&D characters.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="p-8 md:p-10 grid md:grid-cols-3 gap-6 relative z-10">
                <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" /> Subrace
                    </label>
                    <div className="relative">
                        <select 
                            value={selectedSubrace} 
                            onChange={(e) => setSelectedSubrace(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl font-bold text-emerald-100 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all shadow-inner backdrop-blur-sm"
                        >
                            {SUBRACES.map(g => <option key={g} value={g}>{g === "Random" ? "🎲 Any Subrace" : g}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-emerald-500/50">
                            ▼
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                        <Moon className="w-4 h-4 text-purple-400" /> Gender
                    </label>
                    <div className="relative">
                        <select 
                            value={selectedGender} 
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl font-bold text-purple-100 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 appearance-none transition-all shadow-inner backdrop-blur-sm"
                        >
                            <option value="Any">🎲 Any Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-purple-500/50">
                            ▼
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                        <Wand2 className="w-4 h-4 text-teal-400" /> Quantity
                    </label>
                    <div className="flex items-center gap-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl px-5 py-4 shadow-inner backdrop-blur-sm">
                        <input 
                            type="range" 
                            min="3" 
                            max="12" 
                            step="3"
                            value={quantity} 
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="flex-1 accent-teal-500 h-2 bg-slate-700 rounded-lg appearance-none"
                        />
                        <span className="font-black text-teal-300 bg-teal-500/10 px-3 py-1 rounded-lg border border-teal-500/20">{quantity}</span>
                    </div>
                </div>
            </div>

            {/* Generate Button Container */}
            <div className="px-8 md:px-10 pb-8 flex justify-center relative z-10">
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`group relative flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xl px-12 py-5 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-all active:scale-95 disabled:opacity-70 border border-emerald-400/30`}
                >
                    {isGenerating ? (
                        <>
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Conjuring...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
                            Summon Elf Names
                        </>
                    )}
                </button>
            </div>

            {/* Results Grid */}
            <div className="p-8 md:p-10 pt-4 bg-slate-900/50 backdrop-blur-md relative z-10 border-t border-white/5 min-h-[300px]">
                {generatedNames.length === 0 ? (
                    <div className="text-center py-16 px-4 border-2 border-dashed border-slate-700/50 rounded-[2rem] bg-slate-800/30 max-w-2xl mx-auto">
                        <Wand2 className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-slate-300 mb-2">The Scroll is Empty</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto">Select your subrace and gender, then channel the magic to reveal authentic, lore-friendly elven names.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {generatedNames.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-slate-800/80 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 p-6 flex flex-col justify-between shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${getSubraceColors(item.subrace)}`}>
                                            {item.subrace}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-100 leading-tight">
                                        {item.name.split(' ')[0]}
                                    </h3>
                                    {item.name.split(' ')[1] && (
                                        <p className="text-emerald-400/80 font-medium italic mt-1 text-lg">
                                            {item.name.split(' ').slice(1).join(' ')}
                                        </p>
                                    )}
                                </div>
                                
                                <button 
                                    onClick={() => copyToClipboard(item.name, idx)}
                                    className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                                        copiedIndex === idx 
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                            : 'bg-slate-900/50 text-slate-400 hover:bg-slate-700 border border-slate-700 hover:text-slate-200'
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

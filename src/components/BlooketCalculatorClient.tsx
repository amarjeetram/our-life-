"use client";

import React, { useState, useEffect } from 'react';
import { Coins, Package, Percent, Target, ArrowRight, Activity, ShieldAlert, Sparkles } from 'lucide-react';

export default function BlooketCalculatorClient() {
    const [totalTokens, setTotalTokens] = useState<number | ''>(500);
    const [packCost, setPackCost] = useState<number | ''>(25);
    const [dropRate, setDropRate] = useState<number | ''>(0.05);

    // Calculated values
    const [packsAfforded, setPacksAfforded] = useState(0);
    const [probability, setProbability] = useState(0);
    const [tokensLeft, setTokensLeft] = useState(0);

    // Common drop rates for quick selection
    const QUICK_RATES = [
        { label: "Uncommon", value: 15 },
        { label: "Rare", value: 5 },
        { label: "Epic", value: 1 },
        { label: "Legendary", value: 0.1 },
        { label: "Chroma", value: 0.05 },
        { label: "Mystical", value: 0.02 },
    ];

    // Common pack costs
    const QUICK_COSTS = [15, 20, 25];

    useEffect(() => {
        calculateProbabilities();
    }, [totalTokens, packCost, dropRate]);

    const calculateProbabilities = () => {
        const tTokens = typeof totalTokens === 'number' ? totalTokens : 0;
        const pCost = typeof packCost === 'number' ? packCost : 1; // prevent divide by zero realistically
        const dRate = typeof dropRate === 'number' ? dropRate : 0;

        if (pCost <= 0) {
            setPacksAfforded(0);
            setProbability(0);
            setTokensLeft(tTokens);
            return;
        }

        const affordable = Math.floor(tTokens / pCost);
        const remainder = tTokens % pCost;
        
        // P(at least 1) = 1 - (1 - P(event))^n
        const decimalRate = dRate / 100;
        const chanceNotGetting = Math.pow(1 - decimalRate, affordable);
        const chanceGettingAtLeastOne = (1 - chanceNotGetting) * 100;

        setPacksAfforded(affordable);
        setTokensLeft(remainder);
        
        // Fix weird JS math errors and cap at 99.99 for display clarity if it's super close
        if (chanceGettingAtLeastOne > 99.99) {
            setProbability(99.99);
        } else if (chanceGettingAtLeastOne < 0.01 && chanceGettingAtLeastOne > 0) {
            setProbability(0.01); 
        } else {
            setProbability(Number(chanceGettingAtLeastOne.toFixed(2)));
        }
    };

    const handleNumberInput = (
        e: React.ChangeEvent<HTMLInputElement>, 
        setter: React.Dispatch<React.SetStateAction<number | ''>>,
        allowDecimal: boolean = false
    ) => {
        const val = e.target.value;
        if (val === '') {
            setter('');
            return;
        }
        
        const num = allowDecimal ? parseFloat(val) : parseInt(val, 10);
        if (!isNaN(num) && num >= 0) {
            setter(num);
        }
    };

    const getProbabilityColorTag = (prob: number) => {
        if (prob >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
        if (prob >= 50) return "text-blue-600 bg-blue-50 border-blue-200";
        if (prob >= 20) return "text-amber-600 bg-amber-50 border-amber-200";
        return "text-rose-600 bg-rose-50 border-rose-200";
    };

    const getProbabilityMessage = (prob: number) => {
        if (prob >= 90) return "Excellent! You are highly likely to get it.";
        if (prob >= 50) return "Coin toss! A decent chance, but prepare for bad luck.";
        if (prob >= 20) return "Low odds. You might need to save up more tokens.";
        return "Extreme luck required! Very unlikely to pull.";
    };

    return (
        <div className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Pack Probability Calculator</h2>
                        <p className="text-slate-500 font-medium text-sm">Calculate your exact chances of pulling rare blooks.</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6 md:p-8 grid lg:grid-cols-5 gap-8">
                
                {/* Input Controls */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* Block 1: Total Tokens */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                        <label className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                <Coins className="w-4 h-4 text-amber-500" /> Total Tokens
                            </span>
                            <span className="text-xs font-bold text-slate-400 uppercase">Input</span>
                        </label>
                        <input
                            type="number"
                            value={totalTokens}
                            onChange={(e) => handleNumberInput(e, setTotalTokens)}
                            placeholder="e.g. 5000"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl outline-none font-bold text-lg text-slate-800 transition-all"
                        />
                    </div>

                    {/* Block 2: Pack Cost */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                        <label className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                <Package className="w-4 h-4 text-indigo-500" /> Cost Per Pack
                            </span>
                        </label>
                        <div className="flex gap-3 mb-3">
                            {QUICK_COSTS.map(cost => (
                                <button
                                    key={`cost-${cost}`}
                                    onClick={() => setPackCost(cost)}
                                    className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${
                                        packCost === cost 
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {cost}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                value={packCost}
                                onChange={(e) => handleNumberInput(e, setPackCost)}
                                placeholder="Custom cost"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl outline-none font-bold text-lg text-slate-800 transition-all"
                            />
                        </div>
                    </div>

                    {/* Block 3: Drop Rate */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                        <label className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                <Percent className="w-4 h-4 text-rose-500" /> Blook Drop Rate (%)
                            </span>
                        </label>
                        <div className="relative mb-4">
                            <input
                                type="number"
                                step="0.01"
                                value={dropRate}
                                onChange={(e) => handleNumberInput(e, setDropRate, true)}
                                placeholder="0.05"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-xl outline-none font-bold text-lg text-slate-800 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {QUICK_RATES.map(rate => (
                                <button
                                    key={rate.label}
                                    onClick={() => setDropRate(rate.value)}
                                    className={`py-2 px-2 rounded-lg border text-xs font-bold transition-all ${
                                        dropRate === rate.value 
                                            ? 'bg-rose-600 border-rose-600 text-white shadow-md' 
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {rate.label} ({rate.value}%)
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-4">
                    
                    {/* Packs Afforded Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100 transition-colors"></div>
                        <span className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-2 z-10">Packs You Can Buy</span>
                        <div className="text-5xl font-black text-slate-800 mb-2 z-10 flex items-baseline gap-1">
                            {packsAfforded} <span className="text-xl text-slate-400">📦</span>
                        </div>
                        {tokensLeft > 0 && (
                            <span className="text-sm font-bold text-slate-400 z-10 bg-slate-50 px-3 py-1 rounded-full">
                                {tokensLeft} tokens remaining
                            </span>
                        )}
                    </div>

                    {/* Probability Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-center relative flex flex-col min-h-[220px]">
                        {/* Top color bar */}
                        <div className={`h-2 w-full ${probability >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                        
                        <div className="p-6 flex flex-col flex-grow items-center justify-center relative z-10">
                            <span className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-3 flex items-center gap-1">
                                <Target className="w-3 h-3" /> Chance to Pull
                            </span>
                            
                            <div className={`text-6xl md:text-7xl font-black tracking-tighter mb-4 ${probability >= 50 ? 'text-emerald-600' : 'text-slate-800'}`}>
                                {probability}%
                            </div>
                            
                            <div className={`w-full py-2.5 px-4 rounded-xl border ${getProbabilityColorTag(probability)}`}>
                                <p className="text-sm font-bold flex items-center justify-center gap-2">
                                    {probability >= 50 ? <Sparkles className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                                    {getProbabilityMessage(probability)}
                                </p>
                            </div>
                        </div>
                        
                        {/* Decorative background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none"></div>
                    </div>

                </div>
            </div>

            {/* Footer warning */}
            <div className="bg-indigo-50/50 p-4 border-t border-indigo-100/50 text-center">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                    Math calculates probability, but RNG controls your luck!
                </p>
            </div>
        </div>
    );
}

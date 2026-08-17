"use client";

import React, { useState, useEffect } from 'react';
import { Coins, Package, Percent, Target, Activity, ShieldAlert, Sparkles } from 'lucide-react';

export default function BlooketCalculatorClient() {
    const initTokens = 500;
    const initCost = 25;
    const initRate = 0.05;
    
    const initAffordable = Math.floor(initTokens / initCost);
    const initRemainder = initTokens % initCost;
    const initChanceNotGetting = Math.pow(1 - (initRate / 100), initAffordable);
    let initProb = (1 - initChanceNotGetting) * 100;
    initProb = initProb < 0.01 && initProb > 0 ? 0.01 : Number(initProb.toFixed(2));

    const [totalTokens, setTotalTokens] = useState<number | ''>(initTokens);
    const [packCost, setPackCost] = useState<number | ''>(initCost);
    const [dropRate, setDropRate] = useState<number | ''>(initRate);

    const [packsAfforded, setPacksAfforded] = useState(initAffordable);
    const [probability, setProbability] = useState(initProb);
    const [tokensLeft, setTokensLeft] = useState(initRemainder);

    const QUICK_RATES = [
        { label: "Uncommon", value: 15 },
        { label: "Rare", value: 5 },
        { label: "Epic", value: 1 },
        { label: "Legendary", value: 0.1 },
        { label: "Chroma", value: 0.05 },
        { label: "Mystical", value: 0.02 },
    ];

    const QUICK_COSTS = [15, 20, 25];

    useEffect(() => {
        calculateProbabilities();
    }, [totalTokens, packCost, dropRate]);

    const calculateProbabilities = () => {
        const tTokens = typeof totalTokens === 'number' ? totalTokens : 0;
        const pCost = typeof packCost === 'number' ? packCost : 1;
        const dRate = typeof dropRate === 'number' ? dropRate : 0;

        if (pCost <= 0) {
            setPacksAfforded(0);
            setProbability(0);
            setTokensLeft(tTokens);
            return;
        }

        const affordable = Math.floor(tTokens / pCost);
        const remainder = tTokens % pCost;
        const decimalRate = dRate / 100;
        const chanceNotGetting = Math.pow(1 - decimalRate, affordable);
        const chanceGettingAtLeastOne = (1 - chanceNotGetting) * 100;

        setPacksAfforded(affordable);
        setTokensLeft(remainder);

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
        if (val === '') { setter(''); return; }
        const num = allowDecimal ? parseFloat(val) : parseInt(val, 10);
        if (!isNaN(num) && num >= 0) setter(num);
    };

    const getProbabilityMessage = (prob: number) => {
        if (prob >= 90) return "Excellent! You are highly likely to get it.";
        if (prob >= 50) return "Coin toss! A decent chance, but prepare for bad luck.";
        if (prob >= 20) return "Low odds. You might need to save up more tokens.";
        return "Extreme luck required! Very unlikely to pull.";
    };

    const isGood = probability >= 50;

    return (
        <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl border border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900">

            {/* ── Header ── */}
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/40">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                            Pack Probability Calculator
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                            Calculate your exact chances of pulling rare blooks.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="p-6 md:p-8 grid lg:grid-cols-5 gap-8 bg-slate-50 dark:bg-slate-900">

                {/* Input Controls */}
                <div className="lg:col-span-3 space-y-5">

                    {/* Block 1: Total Tokens */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <label className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <Coins className="w-4 h-4 text-amber-500" /> Total Tokens
                            </span>
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Input</span>
                        </label>
                        <input
                            type="number"
                            value={totalTokens}
                            onChange={(e) => handleNumberInput(e, setTotalTokens)}
                            placeholder="e.g. 5000"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 rounded-xl outline-none font-bold text-lg text-slate-800 dark:text-white transition-all"
                        />
                    </div>

                    {/* Block 2: Pack Cost */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <label className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <Package className="w-4 h-4 text-indigo-500" /> Cost Per Pack
                            </span>
                        </label>
                        <div className="flex gap-3 mb-3">
                            {QUICK_COSTS.map(cost => (
                                <button
                                    key={`cost-${cost}`}
                                    onClick={() => setPackCost(cost)}
                                    className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                                        packCost === cost
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/30'
                                            : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
                                    }`}
                                >
                                    {cost}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            value={packCost}
                            onChange={(e) => handleNumberInput(e, setPackCost)}
                            placeholder="Custom cost"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 rounded-xl outline-none font-bold text-lg text-slate-800 dark:text-white transition-all"
                        />
                    </div>

                    {/* Block 3: Drop Rate */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <label className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <Percent className="w-4 h-4 text-rose-500" /> Blook Drop Rate (%)
                            </span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={dropRate}
                            onChange={(e) => handleNumberInput(e, setDropRate, true)}
                            placeholder="0.05"
                            className="w-full px-4 py-3 mb-4 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900 rounded-xl outline-none font-bold text-lg text-slate-800 dark:text-white transition-all"
                        />
                        <div className="grid grid-cols-3 gap-2">
                            {QUICK_RATES.map(rate => (
                                <button
                                    key={rate.label}
                                    onClick={() => setDropRate(rate.value)}
                                    className={`py-2 px-2 rounded-lg border text-xs font-bold transition-all ${
                                        dropRate === rate.value
                                            ? 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-500/30'
                                            : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
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
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-2xl"></div>
                        <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs mb-2 z-10">
                            Packs You Can Buy
                        </span>
                        <div className="text-5xl font-black text-slate-800 dark:text-white mb-2 z-10 flex items-baseline gap-1">
                            {packsAfforded} <span className="text-xl">📦</span>
                        </div>
                        {tokensLeft > 0 && (
                            <span className="text-sm font-bold text-slate-400 dark:text-slate-500 z-10 bg-slate-50 dark:bg-slate-700 px-3 py-1 rounded-full">
                                {tokensLeft} tokens remaining
                            </span>
                        )}
                    </div>

                    {/* Probability Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden text-center flex flex-col min-h-[220px]">
                        {/* Top color bar */}
                        <div className={`h-2 w-full ${isGood ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                        <div className="p-6 flex flex-col flex-grow items-center justify-center">
                            <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs mb-3 flex items-center gap-1">
                                <Target className="w-3 h-3" /> Chance to Pull
                            </span>

                            <div className={`text-6xl md:text-7xl font-black tracking-tighter mb-4 ${isGood ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-white'}`}>
                                {probability}%
                            </div>

                            <div className={`w-full py-2.5 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 ${
                                isGood
                                    ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800'
                                    : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800'
                            }`}>
                                {isGood ? <Sparkles className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                                {getProbabilityMessage(probability)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-indigo-100 dark:border-indigo-900/50 text-center bg-indigo-50 dark:bg-indigo-950/30">
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
                    Math calculates probability, but RNG controls your luck!
                </p>
            </div>
        </div>
    );
}

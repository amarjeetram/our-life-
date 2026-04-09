"use client";

import React, { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";

type UnitType = "weight" | "volume";

interface Unit {
    id: string;
    name: string;
    type: UnitType;
    multiplier: number; // For weight: relative to grams. For volume: relative to ml.
}

const UNITS: Record<string, Unit> = {
    grams: { id: "grams", name: "Grams (g)", type: "weight", multiplier: 1 },
    oz: { id: "oz", name: "Ounces (oz)", type: "weight", multiplier: 28.3495 },
    ml: { id: "ml", name: "Milliliters (mL)", type: "volume", multiplier: 1 },
    liters: { id: "liters", name: "Liters (L)", type: "volume", multiplier: 1000 },
    cups: { id: "cups", name: "Cups (US)", type: "volume", multiplier: 236.588 },
    tbsp: { id: "tbsp", name: "Tablespoons (tbsp)", type: "volume", multiplier: 14.7868 },
    tsp: { id: "tsp", name: "Teaspoons (tsp)", type: "volume", multiplier: 4.92892 },
};

const INGREDIENTS = [
    { id: "water", name: "Water", density: 1.0 },
    { id: "milk", name: "Milk", density: 1.03 },
    { id: "flour", name: "Flour (All-Purpose)", density: 0.528 },
    { id: "sugar", name: "Sugar (Granulated)", density: 0.845 },
    { id: "butter", name: "Butter", density: 0.959 },
    { id: "oil", name: "Vegetable Oil", density: 0.88 },
    { id: "honey", name: "Honey", density: 1.43 },
    { id: "cocoa", name: "Cocoa Powder", density: 0.42 },
];

interface Props {
    defaultFrom: string;
    defaultTo: string;
}

export default function CookingConverterClient({ defaultFrom, defaultTo }: Props) {
    const [fromValue, setFromValue] = useState<string>("1");
    const [fromUnit, setFromUnit] = useState<string>(defaultFrom);
    const [toValue, setToValue] = useState<string>("");
    const [toUnit, setToUnit] = useState<string>(defaultTo);
    const [ingredient, setIngredient] = useState<string>("water");

    const calculateResult = (value: string, from: string, to: string, ing: string) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "";

        const fromData = UNITS[from];
        const toData = UNITS[to];
        const density = INGREDIENTS.find(i => i.id === ing)?.density || 1.0;

        if (!fromData || !toData) return "";

        let result = 0;

        // Same type conversion (Weight to Weight OR Volume to Volume)
        if (fromData.type === toData.type) {
            // value in base unit (ml or grams)
            const baseValue = num * fromData.multiplier;
            result = baseValue / toData.multiplier;
        } 
        // Volume to Weight
        else if (fromData.type === "volume" && toData.type === "weight") {
            const mlValue = num * fromData.multiplier;
            const gramsValue = mlValue * density;
            result = gramsValue / toData.multiplier;
        } 
        // Weight to Volume
        else if (fromData.type === "weight" && toData.type === "volume") {
            const gramsValue = num * fromData.multiplier;
            const mlValue = gramsValue / density;
            result = mlValue / toData.multiplier;
        }

        // Format to remove trailing zeros and keep sanity
        return parseFloat(result.toFixed(4)).toString();
    };

    useEffect(() => {
        setToValue(calculateResult(fromValue, fromUnit, toUnit, ingredient));
    }, [fromValue, fromUnit, toUnit, ingredient]);

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromValue(e.target.value);
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setFromValue(toValue || "1");
    };

    const needsIngredient = UNITS[fromUnit]?.type !== UNITS[toUnit]?.type;

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
                
                {needsIngredient && (
                    <div className="mb-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl animate-in fade-in slide-in-from-top-4">
                        <label className="block text-sm font-bold text-orange-800 mb-2">Select Ingredient (Required for accuracy)</label>
                        <select 
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            className="w-full bg-white border-2 border-orange-200 focus:border-orange-500 rounded-xl px-4 py-3 text-slate-800 font-medium outline-none transition-all cursor-pointer"
                        >
                            {INGREDIENTS.map(i => (
                                <option key={i.id} value={i.id}>{i.name}</option>
                            ))}
                        </select>
                        <p className="text-xs text-orange-600/80 mt-2 font-medium">Because volume-to-weight depends entirely on ingredient density.</p>
                    </div>
                )}

                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    
                    {/* FROM INPUT */}
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-500 mb-2 tracking-wide uppercase">From</label>
                            <input
                                type="number"
                                value={fromValue}
                                onChange={handleFromChange}
                                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 rounded-2xl px-5 py-4 text-2xl font-black text-slate-800 outline-none transition-all"
                                placeholder="0"
                            />
                        </div>
                        <select 
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full bg-white border-2 border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none transition-all cursor-pointer"
                        >
                            {Object.values(UNITS).map(u => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* SWAP BUTTON */}
                    <div className="flex justify-center py-4 md:py-0 md:pt-6">
                        <button
                            onClick={swapUnits}
                            className="bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white p-4 rounded-full transition-all shadow-sm hover:shadow-lg active:scale-95 group"
                            title="Swap Units"
                        >
                            <ArrowRightLeft size={24} className="group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* TO INPUT */}
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-500 mb-2 tracking-wide uppercase">To</label>
                            <input
                                type="text"
                                readOnly
                                value={toValue}
                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-2xl font-black text-orange-600 outline-none"
                                placeholder="0"
                            />
                        </div>
                        <select 
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full bg-white border-2 border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none transition-all cursor-pointer"
                        >
                            {Object.values(UNITS).map(u => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}

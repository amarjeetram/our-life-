"use client";

import React, { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";

interface VolumeUnit {
    id: string;
    name: string;
    toMl: number;
}

const UNITS: Record<string, VolumeUnit> = {
    ml:          { id: "ml",          name: "Milliliter (mL)",      toMl: 1 },
    liters:      { id: "liters",      name: "Liter (L)",            toMl: 1000 },
    oz:          { id: "oz",          name: "Fluid Ounces (fl oz)", toMl: 29.5735 },
    cups:        { id: "cups",        name: "Cups (US)",            toMl: 236.588 },
    gallons:     { id: "gallons",     name: "Gallons (US)",         toMl: 3785.41 },
    cubicMeter:  { id: "cubicMeter",  name: "Cubic Meter (m³)",     toMl: 1000000 },
};

interface Props {
    defaultFrom: string;
    defaultTo: string;
}

export default function VolumeConverterClient({ defaultFrom, defaultTo }: Props) {
    const [fromValue, setFromValue] = useState<string>("1");
    const [fromUnit, setFromUnit] = useState<string>(defaultFrom);
    const [toValue, setToValue] = useState<string>("");
    const [toUnit, setToUnit] = useState<string>(defaultTo);

    const calculateResult = (val: string, from: string, to: string): string => {
        const num = parseFloat(val);
        if (isNaN(num)) return "";
        const fromData = UNITS[from];
        const toData = UNITS[to];
        if (!fromData || !toData) return "";
        const inMl = num * fromData.toMl;
        const result = inMl / toData.toMl;
        return parseFloat(result.toFixed(8)).toString();
    };

    useEffect(() => {
        setToValue(calculateResult(fromValue, fromUnit, toUnit));
    }, [fromValue, fromUnit, toUnit]);

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setFromValue(toValue || "1");
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    {/* FROM */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-500 tracking-wide uppercase">From</label>
                        <input
                            type="number"
                            value={fromValue}
                            onChange={(e) => setFromValue(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-2xl px-5 py-4 text-2xl font-black text-slate-800 outline-none transition-all"
                            placeholder="0"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full bg-white border-2 border-slate-200 focus:border-purple-500 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none transition-all cursor-pointer"
                        >
                            {Object.values(UNITS).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>

                    {/* SWAP */}
                    <div className="flex justify-center py-4 md:py-0 md:pt-8">
                        <button
                            onClick={swapUnits}
                            className="bg-purple-100 hover:bg-purple-500 text-purple-600 hover:text-white p-4 rounded-full transition-all shadow-sm hover:shadow-lg active:scale-95 group"
                        >
                            <ArrowRightLeft size={24} className="group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* TO */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-500 tracking-wide uppercase">To</label>
                        <input
                            type="text"
                            readOnly
                            value={toValue}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-2xl font-black text-purple-600 outline-none"
                            placeholder="0"
                        />
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full bg-white border-2 border-slate-200 focus:border-purple-500 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none transition-all cursor-pointer"
                        >
                            {Object.values(UNITS).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Quick Reference */}
                {fromValue && parseFloat(fromValue) > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Quick Reference</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.values(UNITS).filter(u => u.id !== fromUnit).map(u => {
                                const val = calculateResult(fromValue, fromUnit, u.id);
                                return (
                                    <div key={u.id} className="bg-slate-50 rounded-xl p-3 text-center">
                                        <div className="text-lg font-bold text-slate-800">{parseFloat(parseFloat(val).toFixed(6))}</div>
                                        <div className="text-xs text-slate-500 font-medium mt-1">{u.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";
import React, { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";

const UNITS: Record<string, { name: string; toSqMeter: number }> = {
    sqMeter:  { name: "Square Meter (m²)",       toSqMeter: 1 },
    sqFeet:   { name: "Square Feet (sq ft)",      toSqMeter: 0.092903 },
    sqKm:     { name: "Square Kilometer (km²)",   toSqMeter: 1000000 },
    acre:     { name: "Acre",                     toSqMeter: 4046.86 },
    hectare:  { name: "Hectare (ha)",             toSqMeter: 10000 },
    sqMile:   { name: "Square Mile (mi²)",        toSqMeter: 2589988 },
    sqYard:   { name: "Square Yard (sq yd)",      toSqMeter: 0.836127 },
};

export default function AreaConverterClient({ defaultFrom, defaultTo }: { defaultFrom: string; defaultTo: string }) {
    const [fromValue, setFromValue] = useState("1");
    const [fromUnit, setFromUnit] = useState(defaultFrom);
    const [toValue, setToValue] = useState("");
    const [toUnit, setToUnit] = useState(defaultTo);

    const calc = (val: string, from: string, to: string) => {
        const n = parseFloat(val);
        if (isNaN(n) || !UNITS[from] || !UNITS[to]) return "";
        return parseFloat((n * UNITS[from].toSqMeter / UNITS[to].toSqMeter).toFixed(8)).toString();
    };

    useEffect(() => { setToValue(calc(fromValue, fromUnit, toUnit)); }, [fromValue, fromUnit, toUnit]);

    const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); setFromValue(toValue || "1"); };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-500 tracking-wide uppercase">From</label>
                        <input type="number" value={fromValue} onChange={e => setFromValue(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-2xl px-5 py-4 text-2xl font-black text-slate-800 outline-none transition-all" placeholder="0" />
                        <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full bg-white border-2 border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none cursor-pointer">
                            {Object.entries(UNITS).map(([id, u]) => <option key={id} value={id}>{u.name}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-center py-4 md:py-0 md:pt-8">
                        <button onClick={swap} className="bg-emerald-100 hover:bg-emerald-500 text-emerald-600 hover:text-white p-4 rounded-full transition-all shadow-sm hover:shadow-lg active:scale-95 group">
                            <ArrowRightLeft size={24} className="group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-500 tracking-wide uppercase">To</label>
                        <input type="text" readOnly value={toValue} className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-2xl font-black text-emerald-600 outline-none" placeholder="0" />
                        <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full bg-white border-2 border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none cursor-pointer">
                            {Object.entries(UNITS).map(([id, u]) => <option key={id} value={id}>{u.name}</option>)}
                        </select>
                    </div>
                </div>
                {fromValue && parseFloat(fromValue) > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Quick Reference</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(UNITS).filter(([id]) => id !== fromUnit).map(([id, u]) => (
                                <div key={id} className="bg-slate-50 rounded-xl p-3 text-center">
                                    <div className="text-base font-bold text-slate-800">{parseFloat(parseFloat(calc(fromValue, fromUnit, id)).toFixed(6))}</div>
                                    <div className="text-xs text-slate-500 font-medium mt-1">{u.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

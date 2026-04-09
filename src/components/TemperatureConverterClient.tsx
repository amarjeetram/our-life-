"use client";

import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

type TempUnit = "celsius" | "fahrenheit" | "kelvin";

interface Conversion {
    from: TempUnit;
    to: TempUnit;
    convert: (v: number) => number;
}

const CONVERSIONS: Record<string, (v: number) => number> = {
    "celsius-fahrenheit":    (v) => (v * 9/5) + 32,
    "fahrenheit-celsius":    (v) => (v - 32) * 5/9,
    "celsius-kelvin":        (v) => v + 273.15,
    "kelvin-celsius":        (v) => v - 273.15,
    "fahrenheit-kelvin":     (v) => (v - 32) * 5/9 + 273.15,
    "kelvin-fahrenheit":     (v) => (v - 273.15) * 9/5 + 32,
    "celsius-celsius":       (v) => v,
    "fahrenheit-fahrenheit": (v) => v,
    "kelvin-kelvin":         (v) => v,
};

const UNIT_NAMES: Record<TempUnit, string> = {
    celsius:    "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin:     "Kelvin (K)",
};

interface Props {
    defaultFrom: TempUnit;
    defaultTo: TempUnit;
}

export default function TemperatureConverterClient({ defaultFrom, defaultTo }: Props) {
    const [fromValue, setFromValue] = useState<string>("0");
    const [fromUnit, setFromUnit] = useState<TempUnit>(defaultFrom);
    const [toUnit, setToUnit] = useState<TempUnit>(defaultTo);

    const convert = (val: string, from: TempUnit, to: TempUnit): string => {
        const num = parseFloat(val);
        if (isNaN(num)) return "";
        const key = `${from}-${to}`;
        const fn = CONVERSIONS[key];
        if (!fn) return "";
        return parseFloat(fn(num).toFixed(4)).toString();
    };

    const toValue = convert(fromValue, fromUnit, toUnit);

    const swapUnits = () => {
        const oldTo = toUnit;
        const oldFrom = fromUnit;
        setFromUnit(oldTo);
        setToUnit(oldFrom);
        setFromValue(toValue || "0");
    };

    // Quick reference: show all 3 units
    const allUnits: TempUnit[] = ["celsius", "fahrenheit", "kelvin"];

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
                            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 rounded-2xl px-5 py-4 text-2xl font-black text-slate-800 outline-none transition-all"
                            placeholder="0"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value as TempUnit)}
                            className="w-full bg-white border-2 border-slate-200 focus:border-red-500 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none transition-all cursor-pointer"
                        >
                            {allUnits.map(u => <option key={u} value={u}>{UNIT_NAMES[u]}</option>)}
                        </select>
                    </div>

                    {/* SWAP */}
                    <div className="flex justify-center py-4 md:py-0 md:pt-8">
                        <button
                            onClick={swapUnits}
                            className="bg-red-100 hover:bg-red-500 text-red-500 hover:text-white p-4 rounded-full transition-all shadow-sm hover:shadow-lg active:scale-95 group"
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
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-2xl font-black text-red-500 outline-none"
                            placeholder="0"
                        />
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value as TempUnit)}
                            className="w-full bg-white border-2 border-slate-200 focus:border-red-500 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none transition-all cursor-pointer"
                        >
                            {allUnits.map(u => <option key={u} value={u}>{UNIT_NAMES[u]}</option>)}
                        </select>
                    </div>
                </div>

                {/* Quick Reference */}
                {fromValue !== "" && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Quick Reference</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {allUnits.map(u => (
                                <div key={u} className={`rounded-xl p-3 text-center ${u === fromUnit ? "bg-red-50 border-2 border-red-200" : "bg-slate-50"}`}>
                                    <div className="text-lg font-bold text-slate-800">{convert(fromValue, fromUnit, u)}</div>
                                    <div className="text-xs text-slate-500 font-medium mt-1">{UNIT_NAMES[u]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Percent, ArrowRightLeft, DollarSign, Activity, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

type Mode = 'ADD' | 'REMOVE';

export default function GstCalculatorClient() {
    const [amount, setAmount] = useState<number | ''>(10000);
    const [gstRate, setGstRate] = useState<number>(18);
    const [mode, setMode] = useState<Mode>('ADD');

    // Calculated values
    const [netAmount, setNetAmount] = useState<number>(0); // The base amount without GST
    const [gstAmount, setGstAmount] = useState<number>(0);
    const [cgstAmount, setCgstAmount] = useState<number>(0);
    const [sgstAmount, setSgstAmount] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0); // The amount including GST

    const COMMON_RATES = [0.25, 3, 5, 12, 18, 28];

    useEffect(() => {
        calculateGST();
    }, [amount, gstRate, mode]);

    const calculateGST = () => {
        const amt = typeof amount === 'number' ? amount : 0;
        const rate = typeof gstRate === 'number' ? gstRate : 0;

        if (mode === 'ADD') {
            // Amount provided is the NET amount (Base price)
            const gst = (amt * rate) / 100;
            const total = amt + gst;
            
            setNetAmount(amt);
            setGstAmount(gst);
            setCgstAmount(gst / 2);
            setSgstAmount(gst / 2);
            setTotalAmount(total);
        } else {
            // Amount provided is the TOTAL amount (Including GST)
            const base = (amt * 100) / (100 + rate);
            const gst = amt - base;
            
            setNetAmount(base);
            setGstAmount(gst);
            setCgstAmount(gst / 2);
            setSgstAmount(gst / 2);
            setTotalAmount(amt);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '') {
            setAmount('');
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0) {
            setAmount(num);
        }
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '') {
            setGstRate(0); // Temporary fallback while typing
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0) {
            setGstRate(num);
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(val);
    };

    return (
        <div className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] overflow-hidden shadow-2xl relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3"></div>

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 p-6 md:p-8 relative z-10">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                        <Calculator className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">GST Calculator</h2>
                        <p className="text-slate-500 font-medium text-sm md:text-base mt-1">Instant, accurate GST calculation for India & globally.</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6 md:p-8 grid lg:grid-cols-12 gap-8 relative z-10">
                
                {/* Input Controls (Left Column) */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* Mode Toggle */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/60 shadow-sm flex relative">
                        <div 
                            className={`absolute top-2 bottom-2 w-[calc(50%-0.5rem)] bg-indigo-600 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${mode === 'ADD' ? 'left-2' : 'left-[calc(50%+0.25rem)]'}`}
                        ></div>
                        <button
                            onClick={() => setMode('ADD')}
                            className={`flex-1 py-3.5 rounded-xl font-bold text-sm md:text-base z-10 transition-colors flex items-center justify-center gap-2 ${mode === 'ADD' ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}
                        >
                            <Calculator className="w-4 h-4" /> Add GST (Exclusive)
                        </button>
                        <button
                            onClick={() => setMode('REMOVE')}
                            className={`flex-1 py-3.5 rounded-xl font-bold text-sm md:text-base z-10 transition-colors flex items-center justify-center gap-2 ${mode === 'REMOVE' ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}
                        >
                            <ArrowRightLeft className="w-4 h-4" /> Remove GST (Inclusive)
                        </button>
                    </div>

                    {/* Amount Input */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:border-indigo-200">
                        <label className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-emerald-500" /> 
                                {mode === 'ADD' ? 'Base Amount (Before GST)' : 'Total Amount (After GST)'}
                            </span>
                            <span className="text-[10px] font-bold text-indigo-500 uppercase bg-indigo-50 px-2 py-1 rounded-md">Amount</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-slate-400 font-bold text-xl">₹</span>
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="e.g. 10000"
                                className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white rounded-xl outline-none font-black text-2xl text-slate-800 transition-all"
                            />
                        </div>
                    </div>

                    {/* GST Rate Selection */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:border-indigo-200">
                        <label className="flex items-center justify-between mb-4">
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                <Percent className="w-4 h-4 text-rose-500" /> Select GST Slab
                            </span>
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                            {COMMON_RATES.map(rate => (
                                <button
                                    key={`rate-${rate}`}
                                    onClick={() => setGstRate(rate)}
                                    className={`py-3 px-2 rounded-xl border-2 text-sm font-black transition-all ${
                                        gstRate === rate 
                                            ? 'bg-rose-50 border-rose-500 text-rose-600 shadow-sm' 
                                            : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    {rate}%
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-slate-400 font-bold">Custom:</span>
                            </div>
                            <input
                                type="number"
                                step="0.1"
                                value={gstRate}
                                onChange={handleRateChange}
                                className="w-full pl-24 pr-10 py-3 bg-slate-50 border-2 border-slate-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:bg-white rounded-xl outline-none font-bold text-lg text-slate-800 transition-all"
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <span className="text-slate-400 font-bold">%</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Results Panel (Right Column) */}
                <div className="lg:col-span-5 space-y-4">
                    
                    <div className="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden h-full flex flex-col justify-center">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-indigo-200 font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Tax Breakdown
                            </h3>
                            
                            <div className="space-y-5">
                                {/* Base Amount */}
                                <div className="flex justify-between items-end border-b border-slate-700/50 pb-4">
                                    <div>
                                        <div className="text-slate-400 text-sm font-medium mb-1">Base Amount</div>
                                        <div className="text-slate-500 text-xs">Excluding GST</div>
                                    </div>
                                    <div className="text-xl font-bold text-slate-200">{formatCurrency(netAmount)}</div>
                                </div>

                                {/* CGST / SGST */}
                                <div className="grid grid-cols-2 gap-4 border-b border-slate-700/50 pb-4">
                                    <div>
                                        <div className="text-slate-400 text-sm font-medium mb-1">CGST ({(gstRate / 2).toFixed(2)}%)</div>
                                        <div className="text-lg font-bold text-emerald-400">{formatCurrency(cgstAmount)}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-slate-400 text-sm font-medium mb-1">SGST ({(gstRate / 2).toFixed(2)}%)</div>
                                        <div className="text-lg font-bold text-emerald-400">{formatCurrency(sgstAmount)}</div>
                                    </div>
                                </div>

                                {/* Total GST */}
                                <div className="flex justify-between items-end border-b border-slate-700/50 pb-4">
                                    <div>
                                        <div className="text-slate-400 text-sm font-medium mb-1">Total GST</div>
                                        <div className="text-slate-500 text-xs">({gstRate}%)</div>
                                    </div>
                                    <div className="text-2xl font-bold text-rose-400">+{formatCurrency(gstAmount)}</div>
                                </div>
                                
                                {/* Final Amount */}
                                <div className="pt-2">
                                    <div className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-2">Total Amount</div>
                                    <div className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-baseline gap-2">
                                        {formatCurrency(totalAmount).replace('₹', '')}
                                        <span className="text-2xl text-indigo-300 font-bold">₹</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer Note */}
            <div className="bg-indigo-50/50 p-5 border-t border-indigo-100/50 flex items-start gap-3 relative z-10">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-indigo-800 leading-relaxed">
                    <strong>Pro Tip:</strong> Use "Add GST" to calculate tax on top of a net price. Use "Remove GST" to extract the base amount and tax components from a fully inclusive MRP. All calculations are 100% accurate as per the Indian GST Council guidelines.
                </p>
            </div>
        </div>
    );
}

'use client';

import React, { useState, useCallback, ReactNode } from 'react';
import { ArrowLeftRight, Copy, Check, RefreshCw } from 'lucide-react';

const UNITS = [
    { label: 'Bit', value: 'bit', bytes: 0.125 },
    { label: 'Byte', value: 'byte', bytes: 1 },
    { label: 'Kilobyte (KB)', value: 'kb', bytes: 1024 },
    { label: 'Megabyte (MB)', value: 'mb', bytes: 1024 * 1024 },
    { label: 'Gigabyte (GB)', value: 'gb', bytes: 1024 * 1024 * 1024 },
    { label: 'Terabyte (TB)', value: 'tb', bytes: 1024 * 1024 * 1024 * 1024 },
];

// Preset examples
const EXAMPLES = [
    { label: '1 MB to KB', from: 'mb', to: 'kb', value: '1' },
    { label: '5 MB to KB', from: 'mb', to: 'kb', value: '5' },
    { label: '0.5 MB to KB', from: 'mb', to: 'kb', value: '0.5' },
    { label: '100 KB to MB', from: 'kb', to: 'mb', value: '100' },
    { label: '1 GB to MB', from: 'gb', to: 'mb', value: '1' },
    { label: '512 KB to MB', from: 'kb', to: 'mb', value: '512' },
];

function convertValue(value: number, from: string, to: string): number {
    const fromUnit = UNITS.find(u => u.value === from);
    const toUnit = UNITS.find(u => u.value === to);
    if (!fromUnit || !toUnit) return 0;
    const bytes = value * fromUnit.bytes;
    return bytes / toUnit.bytes;
}

function formatResult(num: number): string {
    if (num === 0) return '0';
    if (num >= 1) {
        if (Number.isInteger(num)) return num.toLocaleString();
        return parseFloat(num.toFixed(6)).toLocaleString(undefined, { maximumFractionDigits: 6 });
    }
    return num.toPrecision(6).replace(/\.?0+$/, '');
}

interface MBtoKBConverterClientProps {
    children?: ReactNode;
}

export default function MBtoKBConverterClient({ children }: MBtoKBConverterClientProps) {
    const [inputValue, setInputValue] = useState('1');
    const [fromUnit, setFromUnit] = useState('mb');
    const [toUnit, setToUnit] = useState('kb');
    const [copied, setCopied] = useState(false);

    const numericValue = parseFloat(inputValue) || 0;
    const result = convertValue(numericValue, fromUnit, toUnit);
    const resultStr = formatResult(result);

    const handleSwap = useCallback(() => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    }, [fromUnit, toUnit]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(resultStr).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [resultStr]);

    const handleReset = () => {
        setInputValue('1');
        setFromUnit('mb');
        setToUnit('kb');
    };

    const handleExample = (ex: typeof EXAMPLES[0]) => {
        setFromUnit(ex.from);
        setToUnit(ex.to);
        setInputValue(ex.value);
    };

    const fromLabel = UNITS.find(u => u.value === fromUnit)?.label || '';
    const toLabel = UNITS.find(u => u.value === toUnit)?.label || '';

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #7c3aed 100%)', paddingTop: '80px' }}>
                <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white">
                    <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', padding: '5px 16px', marginBottom: '16px' }}>
                        Unit Converter
                    </span>
                    <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
                        MB to KB{' '}
                        <span style={{ background: 'linear-gradient(90deg, #a5b4fc, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Converter
                        </span>
                    </h1>
                    <p style={{ fontSize: '17px', opacity: 0.85, maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                        Convert MB to KB instantly using our free online converter. Enter any megabyte value to get the exact kilobyte result with formula, examples, and reverse conversion support.
                    </p>
                </div>
            </div>

            {/* Converter Card */}
            <div className="max-w-3xl mx-auto px-4" style={{ marginTop: '-40px', paddingBottom: '32px' }}>
                <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(99,102,241,0.15), 0 4px 16px rgba(0,0,0,0.06)', padding: 'clamp(24px,5vw,48px)', border: '1px solid rgba(99,102,241,0.1)' }}>

                    {/* Quick Examples */}
                    <div style={{ marginBottom: '28px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '10px' }}>Quick Examples</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {EXAMPLES.map(ex => (
                                <button
                                    key={ex.label}
                                    onClick={() => handleExample(ex)}
                                    style={{
                                        padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                                        border: '1.5px solid #e0e7ff', background: '#f5f3ff', color: '#4f46e5',
                                        cursor: 'pointer', transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#4f46e5'; (e.target as HTMLButtonElement).style.color = 'white'; }}
                                    onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = '#f5f3ff'; (e.target as HTMLButtonElement).style.color = '#4f46e5'; }}
                                >
                                    {ex.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-end mb-6">
                        {/* From */}
                        <div className="flex-1">
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6366f1', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>From</label>
                            <select
                                value={fromUnit}
                                onChange={e => setFromUnit(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '2px solid #e0e7ff', fontSize: '14px', fontWeight: 600, color: '#1e1b4b', background: '#fafafa', marginBottom: '10px', outline: 'none' }}
                            >
                                {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                            </select>
                            <input
                                type="number"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="Enter value..."
                                min="0"
                                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #6366f1', fontSize: '24px', fontWeight: 800, color: '#1e1b4b', background: 'white', outline: 'none', boxSizing: 'border-box', boxShadow: '0 0 0 4px rgba(99,102,241,0.08)' }}
                            />
                        </div>

                        {/* Swap Button */}
                        <div className="flex justify-center items-center py-1 md:py-0 md:pb-1">
                            <button
                                onClick={handleSwap}
                                title="Swap units"
                                className="swap-btn"
                                style={{ width: '48px', height: '48px', borderRadius: '999px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99,102,241,0.3)', transition: 'transform 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
                            >
                                <ArrowLeftRight size={20} color="white" className="md:rotate-0 rotate-90" />
                            </button>
                        </div>

                        {/* To */}
                        <div className="flex-1">
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#7c3aed', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>To</label>
                            <select
                                value={toUnit}
                                onChange={e => setToUnit(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '2px solid #f3e8ff', fontSize: '14px', fontWeight: 600, color: '#1e1b4b', background: '#fafafa', marginBottom: '10px', outline: 'none' }}
                            >
                                {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                            </select>
                            <div style={{ position: 'relative' }}>
                                <div style={{ width: '100%', padding: '14px 48px 14px 16px', borderRadius: '12px', border: '2px solid #a855f7', fontSize: '24px', fontWeight: 800, color: '#1e1b4b', background: '#faf5ff', boxSizing: 'border-box', minHeight: '60px', wordBreak: 'break-all' }}>
                                    {numericValue > 0 ? resultStr : <span style={{ color: '#c4b5fd', fontWeight: 400, fontSize: '18px' }}>Result</span>}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    title="Copy result"
                                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#16a34a' : '#a855f7', transition: 'color 0.2s' }}
                                >
                                    {copied ? <Check size={20} /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Result Formula */}
                    {numericValue > 0 && (
                        <div style={{ background: 'linear-gradient(135deg, #f5f3ff, #fdf4ff)', border: '1.5px solid #e9d5ff', borderRadius: '14px', padding: '16px 20px', marginBottom: '20px', textAlign: 'center' }}>
                            <p style={{ fontSize: '15px', color: '#6b21a8', fontWeight: 500, margin: 0 }}>
                                <strong>{inputValue} {fromLabel}</strong>
                                {' = '}
                                <strong style={{ color: '#4f46e5', fontSize: '18px' }}>{resultStr} {toLabel}</strong>
                            </p>
                        </div>
                    )}

                    {/* Reset */}
                    <div style={{ textAlign: 'right' }}>
                        <button
                            onClick={handleReset}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '999px', border: '1.5px solid #e0e7ff', background: 'white', color: '#6366f1', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={e => { (e.currentTarget.style.background = '#f5f3ff'); }}
                            onMouseLeave={e => { (e.currentTarget.style.background = 'white'); }}
                        >
                            <RefreshCw size={14} /> Reset
                        </button>
                    </div>

                    {/* Info Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '28px' }}>
                        {[
                            { label: '1 MB = KB', value: '1,024 KB' },
                            { label: '1 GB = MB', value: '1,024 MB' },
                            { label: '1 KB = Bytes', value: '1,024 B' },
                            { label: '1 MB = Bytes', value: '1,048,576 B' },
                        ].map(item => (
                            <div key={item.label} style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{item.label}</p>
                                <p style={{ fontSize: '18px', fontWeight: 800, color: '#4f46e5', margin: 0 }}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SEO Bottom Content */}
            <div className="max-w-4xl mx-auto px-4 pb-20">
                {children}
            </div>
        </main>
    );
}

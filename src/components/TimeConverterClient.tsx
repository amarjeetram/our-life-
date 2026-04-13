'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

export type TimeConvMode =
  | 'seconds-to-minutes' | 'minutes-to-hours' | 'hours-to-days' | 'days-to-years'
  | 'unit-converter';

interface RelatedLink { href: string; label: string; }

interface TimeConverterClientProps {
  mode: TimeConvMode;
  title: string;
  subtitle: string;
  accentColor: string;
  relatedLinks: RelatedLink[];
  children?: React.ReactNode;
}

const TO_SECONDS: Record<string, number> = {
  seconds: 1, minutes: 60, hours: 3600, days: 86400,
  weeks: 604800, months: 2629800, years: 31557600,
};
const UNITS = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];
const UNIT_LABELS: Record<string, string> = {
  seconds: 'Seconds', minutes: 'Minutes', hours: 'Hours',
  days: 'Days', weeks: 'Weeks', months: 'Months', years: 'Years',
};

function convert(value: number, from: string, to: string): string {
  if (!value || isNaN(value)) return '';
  const seconds = value * TO_SECONDS[from];
  const result = seconds / TO_SECONDS[to];
  return result % 1 === 0 ? result.toLocaleString() : result.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

function SimpleConverter({ fromUnit, toUnit, accentColor }: { fromUnit: string; toUnit: string; accentColor: string }) {
  const [val, setVal] = useState('1');
  const result = convert(parseFloat(val), fromUnit, toUnit);
  const inputClass = 'w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-400 transition-colors bg-white';
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">{UNIT_LABELS[fromUnit]}</label>
        <input type="number" min="0" value={val} onChange={e => setVal(e.target.value)} className={inputClass} placeholder="Enter value" />
      </div>
      {result && (
        <div className="rounded-2xl p-5 text-center border-2" style={{ background: accentColor + '0d', borderColor: accentColor + '33' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>{UNIT_LABELS[toUnit]}</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{result}</p>
          <p className="text-sm text-slate-500 mt-1">{val} {UNIT_LABELS[fromUnit]} = {result} {UNIT_LABELS[toUnit]}</p>
        </div>
      )}
    </div>
  );
}

function MasterConverter({ accentColor }: { accentColor: string }) {
  const [val, setVal] = useState('1');
  const [fromUnit, setFromUnit] = useState('hours');
  const inputClass = 'border-2 border-slate-200 rounded-xl px-4 py-3 text-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-400 transition-colors bg-white';
  const selectClass = 'border-2 border-slate-200 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 focus:outline-none focus:border-blue-400 transition-colors bg-white cursor-pointer';
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Value</label>
          <input type="number" min="0" value={val} onChange={e => setVal(e.target.value)} className={`${inputClass} w-full`} />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">From</label>
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={`${selectClass} w-full`}>
            {UNITS.map(u => <option key={u} value={u}>{UNIT_LABELS[u]}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {UNITS.filter(u => u !== fromUnit).map(toUnit => {
          const res = convert(parseFloat(val), fromUnit, toUnit);
          return (
            <div key={toUnit} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">{UNIT_LABELS[toUnit]}</span>
              <span className="text-base font-black text-slate-900">{res || '—'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TimeConverterClient({ mode, title, subtitle, accentColor, relatedLinks, children }: TimeConverterClientProps) {
  const modeToUnits: Record<string, [string, string]> = {
    'seconds-to-minutes': ['seconds', 'minutes'],
    'minutes-to-hours': ['minutes', 'hours'],
    'hours-to-days': ['hours', 'days'],
    'days-to-years': ['days', 'years'],
    'unit-converter': ['hours', 'minutes'],
  };
  const [fromUnit, toUnit] = modeToUnits[mode];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="pt-24 pb-6 px-4 text-center">
        <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: accentColor }}>Time Converters</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">{title}</h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto">{subtitle}</p>
      </section>

      <section className="max-w-lg mx-auto px-4 pb-6">
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: accentColor }} />
          <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: accentColor }} />
          <div className="relative z-10">
            {mode === 'unit-converter' ? <MasterConverter accentColor={accentColor} /> : <SimpleConverter fromUnit={fromUnit} toUnit={toUnit} accentColor={accentColor} />}
          </div>
        </div>
      </section>

      {relatedLinks.length > 0 && (
        <section className="max-w-lg mx-auto px-4 mt-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <ArrowRight size={14} style={{ color: accentColor }} /> Related Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedLinks.map(link => (
                <Link key={link.href} href={link.href} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group">
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">{link.label}</span>
                  <ChevronRight size={13} className="text-slate-400 group-hover:text-slate-600" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {children && <section className="max-w-lg mx-auto px-4 mt-4 pb-16">{children}</section>}
    </main>
  );
}

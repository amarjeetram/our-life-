'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';

export type PeriodMode =
  | 'weeks-from-today' | 'months-from-today' | 'years-from-today'
  | 'weeks-ago' | 'months-ago'
  | 'exact-weeks' | 'exact-months' | 'exact-years';

interface RelatedLink { href: string; label: string; }

interface PeriodCalculatorClientProps {
  mode: PeriodMode;
  exactValue?: number;
  title: string;
  subtitle: string;
  accentColor: string;
  relatedLinks: RelatedLink[];
  children?: React.ReactNode;
}

const TODAY = () => {
  const d = new Date(); d.setHours(0, 0, 0, 0); return d;
};

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function addWeeks(d: Date, w: number) { const r = new Date(d); r.setDate(r.getDate() + w * 7); return r; }
function addMonths(d: Date, m: number) { const r = new Date(d); r.setMonth(r.getMonth() + m); return r; }
function addYears(d: Date, y: number) { const r = new Date(d); r.setFullYear(r.getFullYear() + y); return r; }

export default function PeriodCalculatorClient({
  mode, exactValue, title, subtitle, accentColor, relatedLinks, children,
}: PeriodCalculatorClientProps) {

  const [inputVal, setInputVal] = useState('4');
  const [result, setResult] = useState('');
  const [resultSub, setResultSub] = useState('');
  const [todayStr, setTodayStr] = useState('');

  useEffect(() => {
    setTodayStr(formatDate(TODAY()));
    compute(TODAY());
  }, []);

  useEffect(() => { compute(TODAY()); }, [inputVal]);

  function compute(base: Date) {
    const n = parseFloat(inputVal) || 0;

    if (mode === 'exact-weeks' && exactValue !== undefined) {
      const d = addWeeks(base, exactValue);
      setResult(formatDate(d));
      setResultSub(`${exactValue} weeks = ${exactValue * 7} days from today`);
      return;
    }
    if (mode === 'exact-months' && exactValue !== undefined) {
      const d = addMonths(base, exactValue);
      setResult(formatDate(d));
      setResultSub(`${exactValue} months from today`);
      return;
    }
    if (mode === 'exact-years' && exactValue !== undefined) {
      const d = addYears(base, exactValue);
      setResult(formatDate(d));
      setResultSub(`${exactValue} year(s) from today`);
      return;
    }

    if (mode === 'weeks-from-today') {
      const d = addWeeks(base, n);
      setResult(formatDate(d));
      setResultSub(`${n} weeks = ${n * 7} days from today`);
    } else if (mode === 'months-from-today') {
      const d = addMonths(base, n);
      setResult(formatDate(d));
      setResultSub(`${n} month(s) from today`);
    } else if (mode === 'years-from-today') {
      const d = addYears(base, n);
      setResult(formatDate(d));
      setResultSub(`${n} year(s) from today`);
    } else if (mode === 'weeks-ago') {
      const d = addWeeks(base, -n);
      setResult(formatDate(d));
      setResultSub(`${n} weeks ago`);
    } else if (mode === 'months-ago') {
      const d = addMonths(base, -n);
      setResult(formatDate(d));
      setResultSub(`${n} month(s) ago`);
    }
  }

  const labelClass = 'block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide';
  const inputClass = 'w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-400 transition-colors bg-white';

  const isExact = mode.startsWith('exact-');
  const unitLabel = mode.includes('week') ? 'Weeks' : mode.includes('month') ? 'Months' : 'Years';

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="pt-24 pb-6 px-4 text-center">
        <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          Date & Time Tools
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">{title}</h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto">{subtitle}</p>
      </section>

      <section className="max-w-lg mx-auto px-4 pb-6">
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: accentColor }} />
          <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: accentColor }} />

          <div className="relative z-10">
            {isExact ? (
              <div className="text-center py-2">
                <p className="text-slate-500 text-sm">Today is</p>
                <p className="text-base font-bold text-slate-800 mt-1">{todayStr}</p>
              </div>
            ) : (
              <div>
                <label className={labelClass}>{unitLabel}</label>
                <input type="number" min="0" step="1" value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  className={inputClass} placeholder={`Enter ${unitLabel.toLowerCase()}`} />
                <p className="text-xs text-slate-400 mt-2">Today: {todayStr}</p>
              </div>
            )}

            {result && (
              <div className="mt-6 rounded-2xl p-5 text-center border-2"
                style={{ background: accentColor + '0d', borderColor: accentColor + '33' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Result</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900">{result}</p>
                {resultSub && <p className="text-sm text-slate-500 mt-1">{resultSub}</p>}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Clock size={12} />
              <span>Based on today: {todayStr}</span>
            </div>
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
                <Link key={link.href} href={link.href}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group">
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">{link.label}</span>
                  <ChevronRight size={13} className="text-slate-400 group-hover:text-slate-600" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {children && (
        <section className="max-w-lg mx-auto px-4 mt-4 pb-16">{children}</section>
      )}
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock, Calculator, ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CalcMode =
  | 'days-from-today'
  | 'days-ago'
  | 'date-difference'
  | 'add-days-to-date'
  | 'exact-days'; // for 7,30,45,60,90 days from today

interface RelatedLink {
  href: string;
  label: string;
}

interface DayCalculatorClientProps {
  mode: CalcMode;
  exactDays?: number; // used for exact-days mode
  title: string;
  subtitle: string;
  accentColor: string;
  relatedLinks: RelatedLink[];
  children?: React.ReactNode; // SEO section
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function formatDateShort(d: Date): string {
  return d.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysBetween(a: Date, b: Date): number {
  const diff = b.getTime() - a.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function toInputValue(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DayCalculatorClient({
  mode, exactDays, title, subtitle, accentColor, relatedLinks, children,
}: DayCalculatorClientProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [inputDays, setInputDays] = useState<string>(mode === 'days-from-today' ? '30' : mode === 'days-ago' ? '7' : '');
  const [dateA, setDateA] = useState<string>(toInputValue(today));
  const [dateB, setDateB] = useState<string>(toInputValue(addDays(today, 30)));
  const [addDate, setAddDate] = useState<string>(toInputValue(today));
  const [addDaysInput, setAddDaysInput] = useState<string>('30');
  const [result, setResult] = useState<string>('');
  const [resultSub, setResultSub] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(formatDate(today));
  }, []);

  useEffect(() => {
    calculate();
  }, [inputDays, dateA, dateB, addDate, addDaysInput]);

  function calculate() {
    const t = new Date();
    t.setHours(0, 0, 0, 0);

    if (mode === 'exact-days' && exactDays !== undefined) {
      const target = addDays(t, exactDays);
      setResult(formatDate(target));
      setResultSub(`That is ${formatDateShort(target)}`);
      return;
    }

    if (mode === 'days-from-today') {
      const n = parseInt(inputDays) || 0;
      if (isNaN(n)) return;
      const target = addDays(t, n);
      setResult(formatDate(target));
      setResultSub(`${n} days from today is ${formatDateShort(target)}`);
      return;
    }

    if (mode === 'days-ago') {
      const n = parseInt(inputDays) || 0;
      if (isNaN(n)) return;
      const target = addDays(t, -n);
      setResult(formatDate(target));
      setResultSub(`${n} days ago was ${formatDateShort(target)}`);
      return;
    }

    if (mode === 'date-difference') {
      const a = new Date(dateA);
      const b = new Date(dateB);
      if (isNaN(a.getTime()) || isNaN(b.getTime())) return;
      const diff = Math.abs(daysBetween(a, b));
      const weeks = Math.floor(diff / 7);
      const days = diff % 7;
      const months = Math.abs(
        (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
      );
      setResult(`${diff} Days`);
      setResultSub(`= ${weeks} weeks ${days} days  •  ≈ ${months} months`);
      return;
    }

    if (mode === 'add-days-to-date') {
      const base = new Date(addDate);
      const n = parseInt(addDaysInput) || 0;
      if (isNaN(base.getTime())) return;
      const target = addDays(base, n);
      setResult(formatDate(target));
      setResultSub(`${n} days after ${formatDateShort(base)}`);
      return;
    }
  }

  // ─── Render input section based on mode ───────────────────────────────────

  function renderInput() {
    const inputClass = `w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-gray-800 focus:outline-none focus:border-[${accentColor}] transition-colors bg-white`;
    const labelClass = 'block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide';

    if (mode === 'exact-days') {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500 text-base">Today is</p>
          <p className="text-xl font-bold text-gray-800 mt-1">{currentDate}</p>
        </div>
      );
    }

    if (mode === 'days-from-today' || mode === 'days-ago') {
      return (
        <div>
          <label className={labelClass}>
            {mode === 'days-from-today' ? 'Number of Days (from today)' : 'Number of Days (ago)'}
          </label>
          <input
            type="number"
            min="0"
            value={inputDays}
            onChange={e => setInputDays(e.target.value)}
            className={inputClass}
            placeholder="e.g. 30"
          />
          <p className="text-xs text-gray-400 mt-2">Today: {currentDate}</p>
        </div>
      );
    }

    if (mode === 'date-difference') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start Date</label>
            <input type="date" value={dateA} onChange={e => setDateA(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>End Date</label>
            <input type="date" value={dateB} onChange={e => setDateB(e.target.value)} className={inputClass} />
          </div>
        </div>
      );
    }

    if (mode === 'add-days-to-date') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start Date</label>
            <input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Days to Add</label>
            <input
              type="number"
              min="0"
              value={addDaysInput}
              onChange={e => setAddDaysInput(e.target.value)}
              className={inputClass}
              placeholder="e.g. 30"
            />
          </div>
        </div>
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-14 px-4 text-white"
        style={{ background: `linear-gradient(135deg, ${accentColor}dd 0%, ${accentColor} 100%)` }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            <Calendar size={14} /> Date & Time Tools
          </div>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3">{title}</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">{subtitle}</p>
        </div>
      </section>

      {/* Calculator Card */}
      <section className="max-w-3xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: accentColor }}>
              <Calculator size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Calculator</h2>
          </div>

          {renderInput()}

          {/* Result */}
          {result && (
            <div className="mt-6 rounded-xl p-5 text-center border-2" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Result</p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900">{result}</p>
              {resultSub && <p className="text-sm text-gray-500 mt-1">{resultSub}</p>}
            </div>
          )}

          {/* Today info */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <Clock size={12} />
            <span>Based on today: {currentDate}</span>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedLinks.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 mt-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ArrowRight size={16} style={{ color: accentColor }} /> Related Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-slate-50 transition-all group"
                >
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{link.label}</span>
                  <ChevronRight size={14} className="text-gray-400 group-hover:text-gray-600" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Content */}
      {children && (
        <section className="max-w-3xl mx-auto px-4 mt-8 pb-16">
          {children}
        </section>
      )}
    </main>
  );
}

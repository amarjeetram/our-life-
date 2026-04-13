'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';

export type TimeCalcMode =
  | 'hours-from-now'
  | 'hours-ago'
  | 'minutes-from-now'
  | 'time-difference'
  | 'add-subtract-time'
  | 'exact-hours'; // for 2,4,8,12,24 hours from now

interface RelatedLink { href: string; label: string; }

interface TimeCalculatorClientProps {
  mode: TimeCalcMode;
  exactHours?: number;
  title: string;
  subtitle: string;
  accentColor: string;
  relatedLinks: RelatedLink[];
  children?: React.ReactNode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function now() {
  const d = new Date();
  d.setSeconds(0, 0);
  return d;
}

function formatDateTime(d: Date): string {
  return d.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function addMinutes(d: Date, mins: number): Date {
  const r = new Date(d);
  r.setMinutes(r.getMinutes() + mins);
  return r;
}

function toTimeInput(d: Date): string {
  return d.toTimeString().slice(0, 5);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TimeCalculatorClient({
  mode, exactHours, title, subtitle, accentColor, relatedLinks, children,
}: TimeCalculatorClientProps) {

  const [inputHours, setInputHours] = useState('2');
  const [inputMins, setInputMins] = useState('30');
  const [timeA, setTimeA] = useState('09:00');
  const [timeB, setTimeB] = useState('17:00');
  const [baseTime, setBaseTime] = useState('');
  const [addH, setAddH] = useState('2');
  const [addM, setAddM] = useState('30');
  const [addMode, setAddMode] = useState<'add' | 'sub'>('add');
  const [result, setResult] = useState('');
  const [resultSub, setResultSub] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const n = now();
    setCurrentTime(formatDateTime(n));
    setBaseTime(toTimeInput(n));
    calculate(n);
  }, []);

  useEffect(() => { calculate(now()); }, [inputHours, inputMins, timeA, timeB, baseTime, addH, addM, addMode]);

  function calculate(n: Date) {
    if (mode === 'exact-hours' && exactHours !== undefined) {
      const target = addMinutes(n, exactHours * 60);
      setResult(formatTime(target));
      setResultSub(`${formatDate(target)}`);
      return;
    }

    if (mode === 'hours-from-now') {
      const h = parseFloat(inputHours) || 0;
      const target = addMinutes(n, h * 60);
      setResult(formatTime(target));
      setResultSub(`${h} hours from now → ${formatDate(target)}`);
      return;
    }

    if (mode === 'hours-ago') {
      const h = parseFloat(inputHours) || 0;
      const target = addMinutes(n, -h * 60);
      setResult(formatTime(target));
      setResultSub(`${h} hours ago it was ${formatDate(target)}`);
      return;
    }

    if (mode === 'minutes-from-now') {
      const m = parseInt(inputMins) || 0;
      const target = addMinutes(n, m);
      setResult(formatTime(target));
      setResultSub(`${m} minutes from now → ${formatDate(target)}`);
      return;
    }

    if (mode === 'time-difference') {
      const [ah, am] = timeA.split(':').map(Number);
      const [bh, bm] = timeB.split(':').map(Number);
      const totalA = ah * 60 + am;
      const totalB = bh * 60 + bm;
      let diff = Math.abs(totalB - totalA);
      const hours = Math.floor(diff / 60);
      const mins = diff % 60;
      setResult(`${hours}h ${mins}m`);
      setResultSub(`= ${diff} minutes total`);
      return;
    }

    if (mode === 'add-subtract-time') {
      const [bh, bm] = baseTime.split(':').map(Number);
      const base = new Date();
      base.setHours(bh, bm, 0, 0);
      const totalMins = (parseInt(addH) || 0) * 60 + (parseInt(addM) || 0);
      const target = addMinutes(base, addMode === 'add' ? totalMins : -totalMins);
      setResult(formatTime(target));
      setResultSub(`${addMode === 'add' ? '+' : '−'} ${addH}h ${addM}m from ${timeA}`);
      return;
    }
  }

  // ─── Input rendering ─────────────────────────────────────────────────────

  const labelClass = 'block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide';
  const inputClass = 'w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-lg font-semibold text-slate-800 focus:outline-none transition-colors bg-white focus:border-blue-400';

  function renderInput() {
    if (mode === 'exact-hours') {
      return (
        <div className="text-center py-4">
          <p className="text-slate-500 text-sm">Current time</p>
          <p className="text-base font-bold text-slate-800 mt-1">{currentTime}</p>
        </div>
      );
    }

    if (mode === 'hours-from-now' || mode === 'hours-ago') {
      return (
        <div>
          <label className={labelClass}>
            {mode === 'hours-from-now' ? 'Hours from now' : 'Hours ago'}
          </label>
          <input type="number" min="0" step="0.5" value={inputHours}
            onChange={e => setInputHours(e.target.value)}
            className={inputClass} placeholder="e.g. 4" />
          <p className="text-xs text-slate-400 mt-2">Current time: {currentTime}</p>
        </div>
      );
    }

    if (mode === 'minutes-from-now') {
      return (
        <div>
          <label className={labelClass}>Minutes from now</label>
          <input type="number" min="0" value={inputMins}
            onChange={e => setInputMins(e.target.value)}
            className={inputClass} placeholder="e.g. 30" />
          <p className="text-xs text-slate-400 mt-2">Current time: {currentTime}</p>
        </div>
      );
    }

    if (mode === 'time-difference') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start Time</label>
            <input type="time" value={timeA} onChange={e => setTimeA(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>End Time</label>
            <input type="time" value={timeB} onChange={e => setTimeB(e.target.value)} className={inputClass} />
          </div>
        </div>
      );
    }

    if (mode === 'add-subtract-time') {
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Base Time</label>
            <input type="time" value={baseTime} onChange={e => setBaseTime(e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Hours</label>
              <input type="number" min="0" value={addH} onChange={e => setAddH(e.target.value)} className={inputClass} placeholder="0" />
            </div>
            <div>
              <label className={labelClass}>Minutes</label>
              <input type="number" min="0" max="59" value={addM} onChange={e => setAddM(e.target.value)} className={inputClass} placeholder="0" />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setAddMode('add')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${addMode === 'add' ? 'text-white' : 'bg-slate-100 text-slate-600'}`}
              style={addMode === 'add' ? { background: accentColor } : {}}
            >+ Add</button>
            <button
              onClick={() => setAddMode('sub')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${addMode === 'sub' ? 'text-white' : 'bg-slate-100 text-slate-600'}`}
              style={addMode === 'sub' ? { background: accentColor } : {}}
            >− Subtract</button>
          </div>
        </div>
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Clean header */}
      <section className="pt-24 pb-6 px-4 text-center">
        <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          Date & Time Tools
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">{title}</h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto">{subtitle}</p>
      </section>

      {/* Calculator Card — FLAMES style */}
      <section className="max-w-lg mx-auto px-4 pb-6">
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 md:p-10 relative overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute top-[-50px] right-[-50px] w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: accentColor }} />
          <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: accentColor }} />

          <div className="relative z-10">
            {renderInput()}

            {/* Result */}
            {result && (
              <div className="mt-6 rounded-2xl p-5 text-center border-2"
                style={{ background: accentColor + '0d', borderColor: accentColor + '33' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Result</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{result}</p>
                {resultSub && <p className="text-sm text-slate-500 mt-1">{resultSub}</p>}
              </div>
            )}

            {/* Current time footer */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Clock size={12} />
              <span>Based on current time: {currentTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedLinks.length > 0 && (
        <section className="max-w-lg mx-auto px-4 mt-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <ArrowRight size={14} style={{ color: accentColor }} /> Related Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedLinks.map((link) => (
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

      {/* SEO Content */}
      {children && (
        <section className="max-w-lg mx-auto px-4 mt-4 pb-16">
          {children}
        </section>
      )}
    </main>
  );
}

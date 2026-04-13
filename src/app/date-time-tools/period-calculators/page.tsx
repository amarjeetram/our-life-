import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: { absolute: 'Period Calculators – Weeks, Months & Years From Today | SmartToolsWala' },
    description: 'Free period calculators. Find weeks from today, months from today, years from today, weeks ago, months ago and more. Instant results.',
    keywords: 'period calculator, weeks from today, months from today, years from today, weeks ago, months ago calculator',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators' },
};

const tools = [
    { href: '/date-time-tools/period-calculators/weeks-from-today-calculator', title: 'Weeks From Today Calculator', description: 'Find the exact date X weeks from today.', badge: 'Popular' },
    { href: '/date-time-tools/period-calculators/months-from-today-calculator', title: 'Months From Today Calculator', description: 'Calculate the exact date X months from today.' },
    { href: '/date-time-tools/period-calculators/years-from-today-calculator', title: 'Years From Today Calculator', description: 'Find the exact date X years from today.' },
    { href: '/date-time-tools/period-calculators/weeks-ago-calculator', title: 'Weeks Ago Calculator', description: 'Find what date it was X weeks ago.' },
    { href: '/date-time-tools/period-calculators/months-ago-calculator', title: 'Months Ago Calculator', description: 'Find what date it was X months ago.' },
    { href: '/date-time-tools/period-calculators/2-weeks-from-today', title: '2 Weeks From Today', description: 'What is the exact date 2 weeks from today?' },
    { href: '/date-time-tools/period-calculators/6-weeks-from-today', title: '6 Weeks From Today', description: 'What is the exact date 6 weeks from today?' },
    { href: '/date-time-tools/period-calculators/3-months-from-today', title: '3 Months From Today', description: "What's the exact date 3 months from today?", badge: 'Popular' },
    { href: '/date-time-tools/period-calculators/6-months-from-today', title: '6 Months From Today', description: 'What is the exact date 6 months from today?' },
    { href: '/date-time-tools/period-calculators/1-year-from-today', title: '1 Year From Today', description: 'What is the exact date exactly 1 year from today?' },
];

export default function PeriodCalculatorsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="pt-24 pb-6 px-4 text-center">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-emerald-600 mb-3">Date & Time Tools</span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">Period Calculators</h1>
                <p className="text-slate-500 max-w-xl mx-auto">Calculate dates in weeks, months and years — from today or in the past. Free and instant.</p>
            </section>
            <section className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map(tool => (
                        <Link key={tool.href} href={tool.href} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                                <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">{tool.title}</h2>
                                {tool.badge && <span className="ml-2 shrink-0 text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">{tool.badge}</span>}
                            </div>
                            <p className="text-sm text-slate-500 flex-1">{tool.description}</p>
                            <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 mt-4">Calculate <ArrowRight size={13} /></div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: { absolute: 'Time Calculators – Hours From Now, Time Difference & More | SmartToolsWala' },
    description: 'Free online time calculators. Find hours from now, hours ago, minutes from now, time difference and more. Instant results, no signup needed.',
    keywords: 'time calculator, hours from now, hours ago, minutes from now, time difference calculator, add subtract time',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators',
    },
};

const tools = [
    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', title: 'Hours From Now Calculator', description: 'Find out what time it will be X hours from now.', badge: 'Popular' },
    { href: '/date-time-tools/time-calculators/hours-ago-calculator', title: 'Hours Ago Calculator', description: 'Find out what time it was X hours ago.' },
    { href: '/date-time-tools/time-calculators/minutes-from-now-calculator', title: 'Minutes From Now Calculator', description: 'Find the exact time X minutes from now.' },
    { href: '/date-time-tools/time-calculators/time-difference-calculator', title: 'Time Difference Calculator', description: 'Calculate the difference between two times in hours and minutes.' },
    { href: '/date-time-tools/time-calculators/add-subtract-time-calculator', title: 'Add / Subtract Time Calculator', description: 'Add or subtract hours and minutes from any time.' },
    { href: '/date-time-tools/time-calculators/2-hours-from-now', title: '2 Hours From Now', description: 'What time is it exactly 2 hours from now?' },
    { href: '/date-time-tools/time-calculators/4-hours-from-now', title: '4 Hours From Now', description: 'What time is it exactly 4 hours from now?' },
    { href: '/date-time-tools/time-calculators/8-hours-from-now', title: '8 Hours From Now', description: 'What time is it exactly 8 hours from now?', badge: 'Popular' },
    { href: '/date-time-tools/time-calculators/12-hours-from-now', title: '12 Hours From Now', description: 'What time is it exactly 12 hours from now?' },
    { href: '/date-time-tools/time-calculators/24-hours-from-now', title: '24 Hours From Now', description: 'What time is exactly 24 hours from now?' },
];

export default function TimeCalculatorsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="pt-24 pb-6 px-4 text-center">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-violet-600 mb-3">
                    Date & Time Tools
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">Time Calculators</h1>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Free online time calculators — find hours from now, hours ago, time differences and more instantly.
                </p>
            </section>

            <section className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <Link key={tool.href} href={tool.href} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                                <h2 className="text-base font-bold text-slate-900 group-hover:text-violet-600 transition-colors leading-snug">{tool.title}</h2>
                                {tool.badge && (
                                    <span className="ml-2 shrink-0 text-[10px] font-bold bg-violet-600 text-white px-2 py-0.5 rounded-full">{tool.badge}</span>
                                )}
                            </div>
                            <p className="text-sm text-slate-500 flex-1">{tool.description}</p>
                            <div className="flex items-center gap-1 text-sm font-bold text-violet-600 mt-4">
                                Calculate <ArrowRight size={13} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

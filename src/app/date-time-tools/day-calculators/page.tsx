import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: { absolute: 'Day Calculators – Days From Today, Date Difference & More | SmartToolsWala' },
    description: 'Free day calculators online. Find days from today, days ago, difference between two dates, add days to a date, and quick results for 7, 30, 45, 60 & 90 days from today.',
    keywords: 'day calculator, days from today, days ago calculator, date difference calculator, add days to date, 30 days from today, 90 days from today',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators',
    },
};

const tools = [
    {
        href: '/date-time-tools/day-calculators/days-from-today',
        title: 'Days From Today Calculator',
        description: 'Enter any number of days and instantly find what date it will be from today.',
        badge: 'Popular',
    },
    {
        href: '/date-time-tools/day-calculators/days-ago',
        title: 'Days Ago Calculator',
        description: 'Find out what date it was X days ago from today instantly.',
    },
    {
        href: '/date-time-tools/day-calculators/date-difference',
        title: 'Date Difference Calculator',
        description: 'Calculate the exact number of days between any two dates.',
    },
    {
        href: '/date-time-tools/day-calculators/add-days-to-date',
        title: 'Add Days to Date Calculator',
        description: 'Pick a start date, add any number of days, and get the resulting date.',
    },
    {
        href: '/date-time-tools/day-calculators/7-days-from-today',
        title: '7 Days From Today',
        description: 'What is the date exactly 7 days from today?',
    },
    {
        href: '/date-time-tools/day-calculators/30-days-from-today',
        title: '30 Days From Today',
        description: 'What is the date exactly 30 days from today?',
        badge: 'Popular',
    },
    {
        href: '/date-time-tools/day-calculators/45-days-from-today',
        title: '45 Days From Today',
        description: 'What is the date exactly 45 days from today?',
    },
    {
        href: '/date-time-tools/day-calculators/60-days-from-today',
        title: '60 Days From Today',
        description: 'What is the date exactly 60 days from today?',
    },
    {
        href: '/date-time-tools/day-calculators/90-days-from-today',
        title: '90 Days From Today',
        description: 'What is the date exactly 90 days from today?',
    },
];

export default function DayCalculatorsPage() {
    return (
        <main className="min-h-screen bg-slate-50">

            {/* Clean header — no breadcrumb, no gradient */}
            <section className="pt-24 pb-6 px-4 text-center">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-600 mb-3">
                    Date & Time Tools
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">Day Calculators</h1>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Instantly calculate days from today, date differences, days ago and more — free, accurate results.
                </p>
            </section>

            {/* Tools Grid */}
            <section className="max-w-5xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <Link key={tool.href} href={tool.href} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                                <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">{tool.title}</h2>
                                {tool.badge && (
                                    <span className="ml-2 shrink-0 text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">{tool.badge}</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 flex-1">{tool.description}</p>
                            <div className="flex items-center gap-1 text-sm font-bold text-blue-600 mt-4">
                                Calculate <ArrowRight size={13} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

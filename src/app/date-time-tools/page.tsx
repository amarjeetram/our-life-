import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, Clock, Timer, ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: { absolute: 'Date & Time Tools – Free Online Calculators | SmartToolsWala' },
    description: 'Free online date and time tools. Calculate days from today, date differences, days ago, add days to dates and more. Fast, accurate and free.',
    keywords: 'date time tools, days from today, date calculator, day calculator online, date difference calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools',
    },
};

const categories = [
    {
        id: 'day-calculators',
        href: '/date-time-tools/day-calculators',
        icon: Calendar,
        color: '#2563eb',
        bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        title: 'Day Calculators',
        description: 'Calculate days from today, days ago, date differences, and more.',
        tools: [
            'Days From Today Calculator',
            'Days Ago Calculator',
            'Date Difference Calculator',
            'Add Days to Date',
            '30 Days From Today',
        ],
    },
    {
        id: 'time-calculators',
        href: '/date-time-tools/time-calculators',
        icon: Clock,
        color: '#7c3aed',
        bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
        title: 'Time Calculators',
        description: 'Add and subtract time, calculate durations and more.',
        tools: ['Coming Soon'],
    },
    {
        id: 'period-calculators',
        href: '/date-time-tools/period-calculators',
        icon: Timer,
        color: '#0891b2',
        bg: 'linear-gradient(135deg, #cffafe, #a5f3fc)',
        title: 'Period Calculators',
        description: 'Calculate week, month and year periods between dates.',
        tools: ['Coming Soon'],
    },
];

export default function DateTimeToolsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 px-4 text-center">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-200 mb-4">SmartToolsWala</span>
                <h1 className="text-4xl sm:text-5xl font-black mb-4">Date & Time Tools</h1>
                <p className="text-blue-100 max-w-xl mx-auto text-lg">
                    Free online date calculators for every need — days from today, date differences, custom date math and more.
                </p>
            </section>

            {/* Categories */}
            <section className="max-w-5xl mx-auto px-4 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Link key={cat.id} href={cat.href} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6">
                                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: cat.bg }}>
                                    <Icon size={24} style={{ color: cat.color }} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.title}</h2>
                                <p className="text-gray-500 text-sm mb-4">{cat.description}</p>
                                <ul className="space-y-1 mb-5">
                                    {cat.tools.map(t => (
                                        <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                                            <ChevronRight size={12} style={{ color: cat.color }} /> {t}
                                        </li>
                                    ))}
                                </ul>
                                <span className="flex items-center gap-1 text-sm font-bold" style={{ color: cat.color }}>
                                    Explore <ArrowRight size={14} />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

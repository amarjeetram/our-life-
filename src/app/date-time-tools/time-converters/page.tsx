import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: { absolute: 'Time Converters – Seconds, Minutes, Hours, Days & More | SmartToolsWala' },
    description: 'Free online time unit converters. Convert seconds to minutes, minutes to hours, hours to days, days to years and more. Includes a master time unit converter.',
    keywords: 'time converter, seconds to minutes, minutes to hours, hours to days, days to years, time unit converter',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters' },
};

const tools = [
    { href: '/date-time-tools/time-converters/time-unit-converter', title: 'Time Unit Converter (Master)', description: 'Convert any time unit to all others at once — seconds, minutes, hours, days, weeks, months, years.', badge: 'Master' },
    { href: '/date-time-tools/time-converters/seconds-to-minutes-converter', title: 'Seconds to Minutes', description: 'Convert any number of seconds to minutes instantly.' },
    { href: '/date-time-tools/time-converters/minutes-to-hours-converter', title: 'Minutes to Hours', description: 'Convert any number of minutes to hours instantly.' },
    { href: '/date-time-tools/time-converters/hours-to-days-converter', title: 'Hours to Days', description: 'Convert hours to days with exact decimal results.' },
    { href: '/date-time-tools/time-converters/days-to-years-converter', title: 'Days to Years', description: 'Convert any number of days to years.' },
    { href: '/date-time-tools/time-converters/how-many-weeks-in-a-year', title: 'How Many Weeks in a Year?', description: 'There are 52.1775 weeks in a year. See the full breakdown.' },
    { href: '/date-time-tools/time-converters/how-many-hours-in-a-year', title: 'How Many Hours in a Year?', description: 'There are 8,760 hours in a regular year and 8,784 in a leap year.' },
    { href: '/date-time-tools/time-converters/how-many-minutes-in-a-day', title: 'How Many Minutes in a Day?', description: 'There are exactly 1,440 minutes in a day. See the calculation.', badge: 'Popular' },
    { href: '/date-time-tools/time-converters/how-many-seconds-in-a-day', title: 'How Many Seconds in a Day?', description: 'There are exactly 86,400 seconds in a day.' },
    { href: '/date-time-tools/time-converters/10000-days-in-years', title: '10,000 Days in Years', description: '10,000 days = 27.38 years. Full breakdown and facts.' },
];

export default function TimeConvertersPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="pt-24 pb-6 px-4 text-center">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3">Date & Time Tools</span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">Time Converters</h1>
                <p className="text-slate-500 max-w-xl mx-auto">Convert between seconds, minutes, hours, days, weeks, months and years — free and instant.</p>
            </section>
            <section className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map(tool => (
                        <Link key={tool.href} href={tool.href} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                                <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">{tool.title}</h2>
                                {tool.badge && <span className="ml-2 shrink-0 text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">{tool.badge}</span>}
                            </div>
                            <p className="text-sm text-slate-500 flex-1">{tool.description}</p>
                            <div className="flex items-center gap-1 text-sm font-bold text-indigo-600 mt-4">Convert <ArrowRight size={13} /></div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

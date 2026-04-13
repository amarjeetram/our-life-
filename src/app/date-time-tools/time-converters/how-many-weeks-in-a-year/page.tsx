import { Metadata } from 'next';
import Link from 'next/link';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'How Many Weeks in a Year? – 52 or 53 Weeks Explained' },
    description: 'There are 52 weeks and 1 day in a regular year, and 52 weeks and 2 days in a leap year. Full explanation with examples.',
    keywords: 'how many weeks in a year, weeks in a year, 52 weeks in a year, weeks in a leap year, how many weeks are in a year',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/how-many-weeks-in-a-year' },
};

const faqs = [
    { q: 'How many weeks are in a year?', a: 'A regular year has 52 weeks and 1 day (365 days ÷ 7 = 52.142857). A leap year has 52 weeks and 2 days (366 ÷ 7 = 52.2857).' },
    { q: 'Does a year have 52 or 53 weeks?', a: 'A calendar year always has 52 full weeks, but may have a partial 53rd week depending on what day January 1 falls on.' },
    { q: 'How many weeks are in a month?', a: 'On average, a month has about 4.33 weeks (52.18 ÷ 12).' },
    { q: 'How many weeks is 6 months?', a: '6 months ≈ 26 weeks.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'Article', headline: 'How Many Weeks in a Year?', description: 'A regular year has 52 weeks and 1 day. A leap year has 52 weeks and 2 days.' },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <main className="min-h-screen bg-slate-50">
                <section className="pt-24 pb-6 px-4 text-center">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3">Time Converters</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">How Many Weeks in a Year?</h1>
                    <p className="text-slate-500 max-w-xl mx-auto">A regular year = 52 weeks 1 day. A leap year = 52 weeks 2 days.</p>
                </section>

                <section className="max-w-lg mx-auto px-4 pb-6">
                    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-8 text-center">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">Regular Year</p>
                                <p className="text-4xl font-black text-slate-900">52</p>
                                <p className="text-sm text-slate-500 mt-1">weeks + 1 day</p>
                                <p className="text-xs text-slate-400 mt-1">= 52.1429 weeks</p>
                            </div>
                            <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100">
                                <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-1">Leap Year</p>
                                <p className="text-4xl font-black text-slate-900">52</p>
                                <p className="text-sm text-slate-500 mt-1">weeks + 2 days</p>
                                <p className="text-xs text-slate-400 mt-1">= 52.2857 weeks</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-lg mx-auto px-4 mt-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-700 mb-3">Related Converters</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                { href: '/date-time-tools/time-converters/how-many-hours-in-a-year', label: 'Hours in a Year' },
                                { href: '/date-time-tools/time-converters/how-many-minutes-in-a-day', label: 'Minutes in a Day' },
                                { href: '/date-time-tools/time-converters/how-many-seconds-in-a-day', label: 'Seconds in a Day' },
                                { href: '/date-time-tools/time-converters/time-unit-converter', label: 'Time Unit Converter' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-600 hover:text-slate-900">
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="max-w-lg mx-auto px-4 mt-4 pb-16">
                    <SEOBottomSection keyword="how many weeks in a year" heading="How Many Weeks in a Year?" faqs={faqs}>
                        <p>365 ÷ 7 = <strong>52 weeks and 1 extra day</strong> in a regular year. In a leap year (366 days): 366 ÷ 7 = <strong>52 weeks and 2 extra days</strong>. This is why some years have a "53rd week" on the ISO calendar.</p>
                    </SEOBottomSection>
                </section>
            </main>
        </>
    );
}

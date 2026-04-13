import { Metadata } from 'next';
import Link from 'next/link';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'How Many Minutes in a Day? – 1,440 Minutes Explained' },
    description: 'There are exactly 1,440 minutes in a day. Full calculation: 24 hours × 60 minutes = 1,440 minutes.',
    keywords: 'how many minutes in a day, minutes in a day, 1440 minutes in a day, minutes per day, how many minutes are in a day',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/how-many-minutes-in-a-day' },
};

const faqs = [
    { q: 'How many minutes are in a day?', a: 'There are exactly 1,440 minutes in a day (24 hours × 60 minutes).' },
    { q: 'How many minutes are in a week?', a: '1 week = 10,080 minutes (7 × 1,440).' },
    { q: 'How many minutes are in a year?', a: 'A regular year has 525,600 minutes (365 × 1,440).' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'Article', headline: 'How Many Minutes in a Day?' },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <main className="min-h-screen bg-slate-50">
                <section className="pt-24 pb-6 px-4 text-center">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3">Time Converters</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">How Many Minutes in a Day?</h1>
                    <p className="text-slate-500 max-w-xl mx-auto">Exactly 1,440 minutes in a day (24 × 60).</p>
                </section>
                <section className="max-w-lg mx-auto px-4 pb-6">
                    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-8 text-center">
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Minutes in a Day</p>
                        <p className="text-7xl font-black text-slate-900 tracking-tight">1,440</p>
                        <p className="text-slate-500 mt-3">24 hours × 60 minutes</p>
                        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                            {[['1 hour', '60 min'], ['1 week', '10,080 min'], ['1 month', '~43,800 min'], ['1 year', '525,600 min']].map(([period, val]) => (
                                <div key={period} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <p className="text-xs text-slate-500 font-semibold">{period}</p>
                                    <p className="text-base font-black text-slate-900">{val}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="max-w-lg mx-auto px-4 mt-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-700 mb-3">Related</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                { href: '/date-time-tools/time-converters/how-many-seconds-in-a-day', label: 'Seconds in a Day' },
                                { href: '/date-time-tools/time-converters/how-many-hours-in-a-year', label: 'Hours in a Year' },
                                { href: '/date-time-tools/time-converters/minutes-to-hours-converter', label: 'Minutes to Hours' },
                                { href: '/date-time-tools/time-converters/time-unit-converter', label: 'Time Unit Converter' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-600 hover:text-slate-900 block">{l.label}</Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="max-w-lg mx-auto px-4 mt-4 pb-16">
                    <SEOBottomSection keyword="how many minutes in a day" heading="How Many Minutes in a Day?" faqs={faqs}>
                        <p>1 day = 24 hours × 60 minutes = <strong>1,440 minutes</strong>. Extended: 1 week = 7 × 1,440 = 10,080 minutes. 1 year = 365 × 1,440 = 525,600 minutes.</p>
                    </SEOBottomSection>
                </section>
            </main>
        </>
    );
}

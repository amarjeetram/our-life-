import { Metadata } from 'next';
import Link from 'next/link';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'How Many Seconds in a Day? – 86,400 Seconds Explained' },
    description: 'There are exactly 86,400 seconds in a day. Full calculation: 24 hours × 60 minutes × 60 seconds = 86,400.',
    keywords: 'how many seconds in a day, seconds in a day, 86400 seconds in a day, seconds per day, how many seconds are in a day',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/how-many-seconds-in-a-day' },
};

const faqs = [
    { q: 'How many seconds are in a day?', a: 'There are exactly 86,400 seconds in a day (24 × 60 × 60).' },
    { q: 'How many seconds are in a week?', a: '1 week = 604,800 seconds (7 × 86,400).' },
    { q: 'How many seconds are in a year?', a: 'A regular year has 31,536,000 seconds (365 × 86,400).' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'Article', headline: 'How Many Seconds in a Day?' },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <main className="min-h-screen bg-slate-50">
                <section className="pt-24 pb-6 px-4 text-center">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3">Time Converters</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">How Many Seconds in a Day?</h1>
                    <p className="text-slate-500 max-w-xl mx-auto">Exactly 86,400 seconds in a day (24 × 60 × 60).</p>
                </section>
                <section className="max-w-lg mx-auto px-4 pb-6">
                    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-8 text-center">
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Seconds in a Day</p>
                        <p className="text-6xl font-black text-slate-900 tracking-tight">86,400</p>
                        <p className="text-slate-500 mt-3">24 hours × 60 min × 60 sec</p>
                        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                            {[['1 minute', '60 sec'], ['1 hour', '3,600 sec'], ['1 week', '604,800 sec'], ['1 year', '31,536,000 sec']].map(([period, val]) => (
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
                                { href: '/date-time-tools/time-converters/how-many-minutes-in-a-day', label: 'Minutes in a Day' },
                                { href: '/date-time-tools/time-converters/seconds-to-minutes-converter', label: 'Seconds to Minutes' },
                                { href: '/date-time-tools/time-converters/how-many-hours-in-a-year', label: 'Hours in a Year' },
                                { href: '/date-time-tools/time-converters/time-unit-converter', label: 'Time Unit Converter' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-600 hover:text-slate-900 block">{l.label}</Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="max-w-lg mx-auto px-4 mt-4 pb-16">
                    <SEOBottomSection keyword="how many seconds in a day" heading="How Many Seconds in a Day?" faqs={faqs}>
                        <p>1 day = 24 × 60 × 60 = <strong>86,400 seconds</strong>. 1 week = 7 × 86,400 = 604,800 seconds. 1 year = 365 × 86,400 = 31,536,000 seconds.</p>
                    </SEOBottomSection>
                </section>
            </main>
        </>
    );
}

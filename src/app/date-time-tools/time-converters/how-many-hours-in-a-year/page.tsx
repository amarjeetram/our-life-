import { Metadata } from 'next';
import Link from 'next/link';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'How Many Hours in a Year? – 8,760 or 8,784 Hours Explained' },
    description: 'There are 8,760 hours in a regular year and 8,784 hours in a leap year. Full calculation and breakdown.',
    keywords: 'how many hours in a year, hours in a year, 8760 hours in a year, hours per year, hours in a leap year',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/how-many-hours-in-a-year' },
};

const faqs = [
    { q: 'How many hours are in a year?', a: 'A regular year has 8,760 hours (365 × 24). A leap year has 8,784 hours (366 × 24).' },
    { q: 'How many hours are in a month?', a: 'On average, a month has about 730 hours (8,760 ÷ 12).' },
    { q: 'How many hours are in a week?', a: '1 week = 168 hours (7 × 24).' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'Article', headline: 'How Many Hours in a Year?' },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <main className="min-h-screen bg-slate-50">
                <section className="pt-24 pb-6 px-4 text-center">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3">Time Converters</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">How Many Hours in a Year?</h1>
                    <p className="text-slate-500 max-w-xl mx-auto">Regular year = 8,760 hours. Leap year = 8,784 hours.</p>
                </section>
                <section className="max-w-lg mx-auto px-4 pb-6">
                    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-8 text-center">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Regular Year</p>
                                <p className="text-3xl font-black text-slate-900">8,760</p>
                                <p className="text-sm text-slate-500 mt-1">hours</p>
                                <p className="text-xs text-slate-400 mt-1">365 × 24</p>
                            </div>
                            <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100">
                                <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-1">Leap Year</p>
                                <p className="text-3xl font-black text-slate-900">8,784</p>
                                <p className="text-sm text-slate-500 mt-1">hours</p>
                                <p className="text-xs text-slate-400 mt-1">366 × 24</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-lg mx-auto px-4 mt-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-700 mb-3">Related</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                { href: '/date-time-tools/time-converters/how-many-weeks-in-a-year', label: 'Weeks in a Year' },
                                { href: '/date-time-tools/time-converters/how-many-minutes-in-a-day', label: 'Minutes in a Day' },
                                { href: '/date-time-tools/time-converters/hours-to-days-converter', label: 'Hours to Days' },
                                { href: '/date-time-tools/time-converters/time-unit-converter', label: 'Time Unit Converter' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-600 hover:text-slate-900 block">{l.label}</Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="max-w-lg mx-auto px-4 mt-4 pb-16">
                    <SEOBottomSection keyword="how many hours in a year" heading="How Many Hours in a Year?" faqs={faqs}>
                        <p>Calculation: 365 days × 24 hours = <strong>8,760 hours/year</strong>. For a leap year: 366 × 24 = <strong>8,784 hours</strong>. In a week: 7 × 24 = 168 hours.</p>
                    </SEOBottomSection>
                </section>
            </main>
        </>
    );
}

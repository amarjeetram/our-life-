import { Metadata } from 'next';
import Link from 'next/link';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '10,000 Days in Years – How Old is 10,000 Days?' },
    description: '10,000 days = 27 years, 4 months, and 15 days approximately. Full breakdown of what 10,000 days means in years, months, hours, and minutes.',
    keywords: '10000 days in years, how many years is 10000 days, 10000 days old, 10 thousand days in years',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/10000-days-in-years' },
};

const faqs = [
    { q: 'How many years is 10,000 days?', a: '10,000 days ÷ 365.2425 = approximately 27.38 years (27 years and ~4.5 months).' },
    { q: 'How many hours is 10,000 days?', a: '10,000 × 24 = 240,000 hours.' },
    { q: 'How many minutes is 10,000 days?', a: '10,000 × 1,440 = 14,400,000 minutes.' },
    { q: 'How many seconds is 10,000 days?', a: '10,000 × 86,400 = 864,000,000 seconds.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'Article', headline: '10,000 Days in Years' },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <main className="min-h-screen bg-slate-50">
                <section className="pt-24 pb-6 px-4 text-center">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3">Time Converters</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">10,000 Days in Years</h1>
                    <p className="text-slate-500 max-w-xl mx-auto">10,000 days = approximately <strong>27 years and 4 months</strong>.</p>
                </section>
                <section className="max-w-lg mx-auto px-4 pb-6">
                    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-8">
                        <div className="text-center mb-6">
                            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">10,000 Days =</p>
                            <p className="text-5xl font-black text-slate-900">~27.38 years</p>
                            <p className="text-slate-500 mt-2 text-sm">≈ 27 years, 4 months, 15 days</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                ['Years', '~27.38'],
                                ['Months', '~328.5'],
                                ['Weeks', '~1,428.6'],
                                ['Hours', '240,000'],
                                ['Minutes', '14,400,000'],
                                ['Seconds', '864,000,000'],
                            ].map(([unit, val]) => (
                                <div key={unit} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{unit}</p>
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
                                { href: '/date-time-tools/time-converters/days-to-years-converter', label: 'Days to Years Converter' },
                                { href: '/date-time-tools/time-converters/how-many-hours-in-a-year', label: 'Hours in a Year' },
                                { href: '/date-time-tools/time-converters/how-many-weeks-in-a-year', label: 'Weeks in a Year' },
                                { href: '/date-time-tools/time-converters/time-unit-converter', label: 'Time Unit Converter' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-600 hover:text-slate-900 block">{l.label}</Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="max-w-lg mx-auto px-4 mt-4 pb-16">
                    <SEOBottomSection keyword="10000 days in years" heading="10,000 Days in Years" faqs={faqs}>
                        <p>10,000 ÷ 365.2425 = <strong>27.379 years</strong>. This landmark is celebrated by many people as a life milestone. In hours: 240,000. In minutes: 14.4 million. In seconds: 864 million.</p>
                    </SEOBottomSection>
                </section>
            </main>
        </>
    );
}

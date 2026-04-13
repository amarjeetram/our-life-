import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '3 Months From Today – What Date is 3 Months From Now?' },
    description: 'What is the exact date 3 months from today? Get an instant result calculated from your current date. 3 months ≈ 90–92 days.',
    keywords: '3 months from today, what date is 3 months from now, 3 months from today date, 90 days from today',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/3-months-from-today' },
};

const faqs = [
    { q: 'What date is 3 months from today?', a: 'The exact date is shown above based on your current device date.' },
    { q: 'Is 3 months the same as 90 days?', a: '3 calendar months is usually 90–92 days depending on the specific months. Calendar months are used here, not a fixed 90 days.' },
    { q: 'What is 3 months used for?', a: 'Common uses include quarterly planning, probationary periods, notice periods, and medical follow-ups.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '3 Months From Today', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/3-months-from-today', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="exact-months" exactValue={3} title="3 Months From Today"
                subtitle="The exact date 3 calendar months from today — calculated automatically."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/6-months-from-today', label: '6 Months From Today' },
                    { href: '/date-time-tools/period-calculators/months-from-today-calculator', label: 'Custom Months Calculator' },
                    { href: '/date-time-tools/day-calculators/90-days-from-today', label: '90 Days From Today' },
                    { href: '/date-time-tools/period-calculators/1-year-from-today', label: '1 Year From Today' },
                ]}
            >
                <SEOBottomSection keyword="3 months from today" heading="3 Months From Today" faqs={faqs}>
                    <p>3 months from today uses real calendar math and is equivalent to one fiscal quarter. The result varies slightly from "90 days from today" since calendar months differ in length.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

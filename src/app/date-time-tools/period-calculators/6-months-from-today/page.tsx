import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '6 Months From Today – What Date is 6 Months From Now?' },
    description: 'What date is exactly 6 months from today? Get an instant result. 6 months = half a year, ≈ 181–184 days depending on the calendar.',
    keywords: '6 months from today, what date is 6 months from now, half year from today, 6 months date calculator',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/6-months-from-today' },
};

const faqs = [
    { q: 'What date is 6 months from today?', a: 'The exact date is displayed above using your device\'s current date.' },
    { q: 'Is 6 months the same as 180 days?', a: '6 calendar months is usually 181–184 days depending on the specific months (e.g. Jan–Jun vs Feb–Aug).' },
    { q: 'What is 6 months used for?', a: 'Common uses: biannual reviews, subscription renewals, visa expirations, loan deadlines, and half-year planning.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '6 Months From Today', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/6-months-from-today', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="exact-months" exactValue={6} title="6 Months From Today"
                subtitle="The exact date 6 calendar months (half a year) from today — calculated automatically."
                accentColor="#d97706"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/3-months-from-today', label: '3 Months From Today' },
                    { href: '/date-time-tools/period-calculators/1-year-from-today', label: '1 Year From Today' },
                    { href: '/date-time-tools/period-calculators/months-from-today-calculator', label: 'Custom Months Calculator' },
                ]}
            >
                <SEOBottomSection keyword="6 months from today" heading="6 Months From Today" faqs={faqs}>
                    <p>6 months from today is half a year — used widely for biannual reviews, visa deadlines, and financial planning. The result above uses real calendar months, not a fixed number of days.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

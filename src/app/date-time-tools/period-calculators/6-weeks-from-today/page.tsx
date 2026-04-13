import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '6 Weeks From Today – What Date is 6 Weeks From Now?' },
    description: 'What is the date exactly 6 weeks from today? Instant answer, updated automatically. 6 weeks = 42 days from today.',
    keywords: '6 weeks from today, what date is 6 weeks from today, 42 days from today, 6 weeks from now',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/6-weeks-from-today' },
};

const faqs = [
    { q: 'What date is 6 weeks from today?', a: 'The exact date is shown above. 6 weeks = 42 days from today.' },
    { q: 'How many days is 6 weeks?', a: '6 weeks = 42 days.' },
    { q: 'Is 6 weeks roughly 1.5 months?', a: 'Yes, 6 weeks ≈ 1.5 calendar months.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '6 Weeks From Today', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/6-weeks-from-today', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="exact-weeks" exactValue={6} title="6 Weeks From Today"
                subtitle="The exact date 6 weeks (42 days) from today — updated automatically."
                accentColor="#0891b2"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/2-weeks-from-today', label: '2 Weeks From Today' },
                    { href: '/date-time-tools/period-calculators/weeks-from-today-calculator', label: 'Custom Weeks Calculator' },
                    { href: '/date-time-tools/period-calculators/3-months-from-today', label: '3 Months From Today' },
                ]}
            >
                <SEOBottomSection keyword="6 weeks from today" heading="6 Weeks From Today" faqs={faqs}>
                    <p>6 weeks from today equals 42 days. This is approximately 1.5 calendar months. The result above is calculated automatically from today's date. For any custom period, use our <strong>Weeks From Today Calculator</strong>.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

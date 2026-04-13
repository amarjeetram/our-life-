import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '2 Weeks From Today – What is the Date 2 Weeks From Now?' },
    description: 'What is the date exactly 2 weeks from today? Get the instant answer — updated automatically based on your current date. 2 weeks = 14 days.',
    keywords: '2 weeks from today, what date is 2 weeks from today, 2 weeks from now date, 14 days from today',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/2-weeks-from-today' },
};

const faqs = [
    { q: 'What is the date 2 weeks from today?', a: 'The exact date 2 weeks from today is shown in the result above, updated based on your current date.' },
    { q: 'How many days is 2 weeks?', a: '2 weeks = 14 days.' },
    { q: 'Is 2 weeks the same as a fortnight?', a: 'Yes! A fortnight is exactly 2 weeks or 14 days.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '2 Weeks From Today', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/2-weeks-from-today', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="exact-weeks" exactValue={2} title="2 Weeks From Today"
                subtitle="The exact date 2 weeks (14 days) from today — updated automatically."
                accentColor="#059669"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/6-weeks-from-today', label: '6 Weeks From Today' },
                    { href: '/date-time-tools/period-calculators/weeks-from-today-calculator', label: 'Custom Weeks Calculator' },
                    { href: '/date-time-tools/day-calculators/14-days-from-today', label: '14 Days From Today' },
                    { href: '/date-time-tools/period-calculators/3-months-from-today', label: '3 Months From Today' },
                ]}
            >
                <SEOBottomSection keyword="2 weeks from today" heading="2 Weeks From Today" faqs={faqs}>
                    <p>2 weeks from today is also known as a fortnight from today — exactly 14 days from the current date. For any custom number of weeks, use the <strong>Weeks From Today Calculator</strong>.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

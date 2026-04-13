import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '1 Year From Today – What Date is 1 Year From Now?' },
    description: 'What is the exact date 1 year from today? Get an instant answer based on your current date. 1 year = 365 days (or 366 in a leap year).',
    keywords: '1 year from today, what date is 1 year from now, one year from today date, 365 days from today',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/1-year-from-today' },
};

const faqs = [
    { q: 'What date is 1 year from today?', a: 'The exact date is shown above based on your device\'s current date. It is the same calendar date next year.' },
    { q: 'Is 1 year always 365 days?', a: 'A regular year is 365 days, but a leap year is 366 days. The calculator uses real calendar year math.' },
    { q: 'What is 1 year from today used for?', a: 'Common uses: annual goals, subscription renewals, visa validity, warranties, loan maturities, and anniversaries.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '1 Year From Today', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/1-year-from-today', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="exact-years" exactValue={1} title="1 Year From Today"
                subtitle="The exact date exactly 1 year (365 or 366 days) from today — calculated automatically."
                accentColor="#059669"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/6-months-from-today', label: '6 Months From Today' },
                    { href: '/date-time-tools/period-calculators/3-months-from-today', label: '3 Months From Today' },
                    { href: '/date-time-tools/period-calculators/years-from-today-calculator', label: 'Custom Years Calculator' },
                ]}
            >
                <SEOBottomSection keyword="1 year from today" heading="1 Year From Today" faqs={faqs}>
                    <p>1 year from today is the same calendar date but in the following year. It accounts for leap years automatically. For multi-year calculations, use the <strong>Years From Today Calculator</strong>.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

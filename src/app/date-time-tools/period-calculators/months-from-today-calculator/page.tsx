import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Months From Today Calculator – What Date is X Months From Now?' },
    description: 'Find the exact date X months from today with our free Months From Today Calculator. Enter any number of months for an instant result.',
    keywords: 'months from today, months from today calculator, 3 months from today, 6 months from today date, what date is 2 months from now',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/months-from-today-calculator' },
};

const faqs = [
    { q: 'How do I calculate months from today?', a: 'Enter the number of months in the calculator above. It adds that many calendar months to today\'s date.' },
    { q: 'What date is 3 months from today?', a: 'Enter 3 in the calculator to see the exact date 3 months from today based on the current date.' },
    { q: 'Is 3 months the same as 90 days?', a: 'Not always — 3 calendar months can be 89, 90, or 91 days depending on the months involved. This calculator uses real calendar months.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Months From Today Calculator', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/months-from-today-calculator', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Period Calculators', item: 'https://smarttoolswala.com/date-time-tools/period-calculators' },
                        { '@type': 'ListItem', position: 4, name: 'Months From Today Calculator', item: 'https://smarttoolswala.com/date-time-tools/period-calculators/months-from-today-calculator' },
                    ] },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="months-from-today" title="Months From Today Calculator"
                subtitle="Enter any number of months to find the exact future date from today."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/3-months-from-today', label: '3 Months From Today' },
                    { href: '/date-time-tools/period-calculators/6-months-from-today', label: '6 Months From Today' },
                    { href: '/date-time-tools/period-calculators/weeks-from-today-calculator', label: 'Weeks From Today' },
                    { href: '/date-time-tools/period-calculators/years-from-today-calculator', label: 'Years From Today' },
                ]}
            >
                <SEOBottomSection keyword="months from today calculator" heading="Months From Today Calculator" faqs={faqs}>
                    <p>This calculator moves exactly X calendar months forward from today. It accounts for month-length variation so you always get accurate results. For fixed lookups, try <strong>3 Months From Today</strong> or <strong>6 Months From Today</strong>.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

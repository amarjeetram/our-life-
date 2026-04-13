import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Weeks Ago Calculator – What Date Was X Weeks Ago?' },
    description: 'Find out what date it was X weeks ago with our free Weeks Ago Calculator. Enter any number of weeks for an instant past date result.',
    keywords: 'weeks ago calculator, what date was 4 weeks ago, 6 weeks ago date, weeks ago from today',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/weeks-ago-calculator' },
};

const faqs = [
    { q: 'What date was 4 weeks ago?', a: 'Enter 4 in the calculator above to get the exact date 4 weeks ago from today.' },
    { q: 'How does Weeks Ago work?', a: 'It subtracts the number of weeks (×7 days) from today\'s date.' },
    { q: 'Is this free?', a: 'Yes, 100% free.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Weeks Ago Calculator', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/weeks-ago-calculator', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Period Calculators', item: 'https://smarttoolswala.com/date-time-tools/period-calculators' },
                        { '@type': 'ListItem', position: 3, name: 'Weeks Ago Calculator', item: 'https://smarttoolswala.com/date-time-tools/period-calculators/weeks-ago-calculator' },
                    ] },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="weeks-ago" title="Weeks Ago Calculator"
                subtitle="Enter any number of weeks to find the exact date that many weeks ago."
                accentColor="#d97706"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/weeks-from-today-calculator', label: 'Weeks From Today' },
                    { href: '/date-time-tools/period-calculators/months-ago-calculator', label: 'Months Ago Calculator' },
                    { href: '/date-time-tools/day-calculators/days-ago', label: 'Days Ago Calculator' },
                ]}
            >
                <SEOBottomSection keyword="weeks ago calculator" heading="Weeks Ago Calculator" faqs={faqs}>
                    <p>The Weeks Ago Calculator subtracts the number of weeks (×7 days) from today's date. Useful for audit trails, medical history, payroll, and any lookback scenario.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

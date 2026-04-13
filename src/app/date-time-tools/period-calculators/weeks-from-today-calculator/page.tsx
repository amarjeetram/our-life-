import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Weeks From Today Calculator – Find Date X Weeks From Now' },
    description: 'Free Weeks From Today Calculator. Enter any number of weeks and instantly find the exact future date. Perfect for project deadlines, appointments and planning.',
    keywords: 'weeks from today, weeks from today calculator, what date is 4 weeks from today, 6 weeks from today date',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/weeks-from-today-calculator' },
};

const faqs = [
    { q: 'How do I calculate weeks from today?', a: 'Enter the number of weeks in the box above. The calculator multiplies by 7 days and adds it to today\'s date.' },
    { q: 'What date is 4 weeks from today?', a: '4 weeks = 28 days from today. Enter 4 in the calculator to see the exact date.' },
    { q: 'What is 6 weeks from today?', a: '6 weeks = 42 days. The exact date depends on today, so use the calculator for a live result.' },
    { q: 'Is this free?', a: 'Yes, 100% free.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Weeks From Today Calculator', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/weeks-from-today-calculator', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Period Calculators', item: 'https://smarttoolswala.com/date-time-tools/period-calculators' },
                        { '@type': 'ListItem', position: 4, name: 'Weeks From Today Calculator', item: 'https://smarttoolswala.com/date-time-tools/period-calculators/weeks-from-today-calculator' },
                    ] },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="weeks-from-today" title="Weeks From Today Calculator"
                subtitle="Enter any number of weeks to instantly find the exact future date from today."
                accentColor="#059669"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/2-weeks-from-today', label: '2 Weeks From Today' },
                    { href: '/date-time-tools/period-calculators/6-weeks-from-today', label: '6 Weeks From Today' },
                    { href: '/date-time-tools/period-calculators/months-from-today-calculator', label: 'Months From Today' },
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today' },
                ]}
            >
                <SEOBottomSection keyword="weeks from today calculator" heading="Weeks From Today Calculator" faqs={faqs}>
                    <p>1 week = 7 days. This calculator multiplies your input by 7 and adds it to today's date to give you the exact future date. For quick lookups, use our <strong>2 Weeks From Today</strong> or <strong>6 Weeks From Today</strong> pages.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

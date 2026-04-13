import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Months Ago Calculator – What Date Was X Months Ago?' },
    description: 'Find out what date it was X months ago using our free Months Ago Calculator. Enter any number of months for an instant past date result.',
    keywords: 'months ago calculator, what date was 3 months ago, 6 months ago date, months ago from today',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/months-ago-calculator' },
};

const faqs = [
    { q: 'What date was 3 months ago?', a: 'Enter 3 in the calculator above to get the exact date 3 calendar months ago.' },
    { q: 'Is 3 months ago the same as 90 days ago?', a: 'Not always — calendar months vary in length. 3 months ago uses real month subtraction, not just 90 days.' },
    { q: 'Is this free?', a: 'Yes, 100% free.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Months Ago Calculator', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/months-ago-calculator', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Period Calculators', item: 'https://smarttoolswala.com/date-time-tools/period-calculators' },
                        { '@type': 'ListItem', position: 3, name: 'Months Ago Calculator', item: 'https://smarttoolswala.com/date-time-tools/period-calculators/months-ago-calculator' },
                    ] },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="months-ago" title="Months Ago Calculator"
                subtitle="Enter any number of months to find the exact past date from today."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/months-from-today-calculator', label: 'Months From Today' },
                    { href: '/date-time-tools/period-calculators/weeks-ago-calculator', label: 'Weeks Ago Calculator' },
                    { href: '/date-time-tools/day-calculators/days-ago', label: 'Days Ago Calculator' },
                ]}
            >
                <SEOBottomSection keyword="months ago calculator" heading="Months Ago Calculator" faqs={faqs}>
                    <p>The Months Ago Calculator uses real calendar month subtraction so the result correctly accounts for different month lengths. Ideal for looking up past contract start dates, subscriptions, and medical timelines.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

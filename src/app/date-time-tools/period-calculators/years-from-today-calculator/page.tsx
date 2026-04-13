import { Metadata } from 'next';
import PeriodCalculatorClient from '@/components/PeriodCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Years From Today Calculator – What Date is X Years From Now?' },
    description: 'Find the exact date X years from today instantly. Free Years From Today Calculator — great for anniversary, retirement, and long-term planning.',
    keywords: 'years from today, years from today calculator, what date is 5 years from today, 10 years from today date',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/period-calculators/years-from-today-calculator' },
};

const faqs = [
    { q: 'How do I find a date X years from today?', a: 'Enter the number of years in the box above. The calculator adds that many years to the current date and shows the exact result.' },
    { q: 'What date is 5 years from today?', a: 'Enter 5 above to get the exact date 5 years from today.' },
    { q: 'Does it account for leap years?', a: 'Yes! JavaScript\'s built-in date math correctly handles leap years.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Years From Today Calculator', url: 'https://smarttoolswala.com/date-time-tools/period-calculators/years-from-today-calculator', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Period Calculators', item: 'https://smarttoolswala.com/date-time-tools/period-calculators' },
                        { '@type': 'ListItem', position: 3, name: 'Years From Today Calculator', item: 'https://smarttoolswala.com/date-time-tools/period-calculators/years-from-today-calculator' },
                    ] },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <PeriodCalculatorClient
                mode="years-from-today" title="Years From Today Calculator"
                subtitle="Enter any number of years to find the exact future date from today."
                accentColor="#0891b2"
                relatedLinks={[
                    { href: '/date-time-tools/period-calculators/1-year-from-today', label: '1 Year From Today' },
                    { href: '/date-time-tools/period-calculators/months-from-today-calculator', label: 'Months From Today' },
                    { href: '/date-time-tools/period-calculators/weeks-from-today-calculator', label: 'Weeks From Today' },
                ]}
            >
                <SEOBottomSection keyword="years from today calculator" heading="Years From Today Calculator" faqs={faqs}>
                    <p>This calculator adds exact calendar years to today's date. Perfect for retirement planning, loan maturity dates, anniversaries, and long-term goal tracking.</p>
                </SEOBottomSection>
            </PeriodCalculatorClient>
        </>
    );
}

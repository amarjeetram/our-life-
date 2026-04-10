import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '90 Days From Today – What is the Date 90 Days From Now?' },
    description: 'Find out what date is exactly 90 days from today. Free instantly updated calculator. 90 days = 3 months approximately. Perfect for quarterly planning.',
    keywords: '90 days from today, what date is 90 days from today, 90 days from now, three months from today, 90 day notice period, quarterly date calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/90-days-from-today',
    },
};

const faqs = [
    { q: 'What date is 90 days from today?', a: 'The calculator shows the exact date. It is automatically updated based on today\'s current date.' },
    { q: 'What is 90 days in months?', a: '90 days is approximately 3 months, though the exact calendar date depends on the months involved.' },
    { q: 'What is 90 days in weeks?', a: '90 days is exactly 12 weeks and 6 days.' },
    { q: 'When is 90 days used?', a: '90-day periods are common in business probation periods, government forms, health plans, visa validity, and quarterly financial reviews.' },
];

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'WebApplication',
                                name: '90 Days From Today Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/90-days-from-today',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Find what date is exactly 90 days from today — updated daily.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: '90 Days From Today', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/90-days-from-today' },
                                ],
                            },
                            {
                                '@type': 'FAQPage',
                                mainEntity: faqs.map(f => ({
                                    '@type': 'Question', name: f.q,
                                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                                })),
                            },
                        ],
                    }),
                }}
            />
            <DayCalculatorClient
                mode="exact-days"
                exactDays={90}
                title="90 Days From Today"
                subtitle="Instantly see the exact date 90 days from today — approximately one quarter (3 months) ahead."
                accentColor="#059669"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today Calculator' },
                    { href: '/date-time-tools/day-calculators/60-days-from-today', label: '60 Days From Today' },
                    { href: '/date-time-tools/day-calculators/45-days-from-today', label: '45 Days From Today' },
                    { href: '/date-time-tools/day-calculators/30-days-from-today', label: '30 Days From Today' },
                    { href: '/date-time-tools/day-calculators/date-difference', label: 'Date Difference Calculator' },
                ]}
            >
                <SEOBottomSection keyword="90 days from today" heading="What Date is 90 Days From Today?" faqs={faqs}>
                    <p>90 days from today equals 12 weeks and 6 days — approximately one full quarter (3 months). The 90-day window is widely used in business probation periods, USCIS/visa timelines, health insurance plans, and quarterly performance reviews.</p>
                    <p>Also explore: <strong>60 days from today</strong> for 2-month horizons, or <strong>30 days from today</strong> and <strong>45 days from today</strong> for shorter planning.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

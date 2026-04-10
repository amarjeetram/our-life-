import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '60 Days From Today – What is the Date 60 Days From Now?' },
    description: 'Find out what date is exactly 60 days from today. Instant free calculator. 60 days = 2 months approximately. Perfect for 60-day notice periods.',
    keywords: '60 days from today, what date is 60 days from today, 60 days from now, two months from today, 60 day notice period',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/60-days-from-today',
    },
};

const faqs = [
    { q: 'What date is 60 days from today?', a: 'The calculator above shows the exact result based on today\'s date. It updates automatically daily.' },
    { q: 'What is 60 days in months?', a: '60 days is approximately 2 months, though the exact calendar date depends on which months are involved.' },
    { q: 'What is 60 days in weeks?', a: '60 days is exactly 8 weeks and 4 days.' },
    { q: 'Is this calculator free?', a: 'Yes, completely free to use anytime.' },
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
                                name: '60 Days From Today Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/60-days-from-today',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Find what date is exactly 60 days from today.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: '60 Days From Today', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/60-days-from-today' },
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
                exactDays={60}
                title="60 Days From Today"
                subtitle="Instantly find the exact date 60 days from today — approximately 2 months ahead."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today Calculator' },
                    { href: '/date-time-tools/day-calculators/45-days-from-today', label: '45 Days From Today' },
                    { href: '/date-time-tools/day-calculators/90-days-from-today', label: '90 Days From Today' },
                    { href: '/date-time-tools/day-calculators/30-days-from-today', label: '30 Days From Today' },
                ]}
            >
                <SEOBottomSection keyword="60 days from today" heading="What Date is 60 Days From Today?" faqs={faqs}>
                    <p>60 days from today is exactly 8 weeks and 4 days — approximately 2 months. 60-day periods are common for notice periods, government deadlines, insurance claims, and business contracts.</p>
                    <p>Related: <strong>45 days from today</strong> for shorter windows, or <strong>90 days from today</strong> for quarterly planning.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

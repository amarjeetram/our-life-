import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '7 Days From Today – What is the Date 7 Days From Now?' },
    description: 'Find out what date is exactly 7 days from today. Our free calculator instantly shows the date one week from now with the full day name.',
    keywords: '7 days from today, what date is 7 days from today, one week from today, 7 days from now, date 7 days from now',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/7-days-from-today',
    },
};

const faqs = [
    { q: 'What is 7 days from today?', a: 'The calculator above shows today\'s exact date plus 7 days, giving you the precise date one week from now.' },
    { q: 'Is 7 days the same as 1 week?', a: 'Yes, 7 days is exactly 1 week.' },
    { q: 'Does this update automatically?', a: 'Yes, the result updates based on today\'s date every time you load the page.' },
    { q: 'Is this free?', a: 'Completely free, no sign-up required.' },
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
                                name: '7 Days From Today Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/7-days-from-today',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Find what date is exactly 7 days from today.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: '7 Days From Today', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/7-days-from-today' },
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
                exactDays={7}
                title="7 Days From Today"
                subtitle="Instantly see what exact date falls exactly 7 days (1 week) from today."
                accentColor="#2563eb"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today Calculator' },
                    { href: '/date-time-tools/day-calculators/30-days-from-today', label: '30 Days From Today' },
                    { href: '/date-time-tools/day-calculators/45-days-from-today', label: '45 Days From Today' },
                    { href: '/date-time-tools/day-calculators/date-difference', label: 'Date Difference Calculator' },
                ]}
            >
                <SEOBottomSection keyword="7 days from today" heading="What Date is 7 Days From Today?" faqs={faqs}>
                    <p>7 days from today is exactly one week from the current date. This is useful for weekly scheduling, short-term deadlines, follow-ups, and planning weekly events.</p>
                    <p>For a custom number of days, try our <strong>Days From Today Calculator</strong> or explore <strong>30 days from today</strong> and <strong>45 days from today</strong> for longer timeframes.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

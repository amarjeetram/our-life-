import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '30 Days From Today – What is the Date 30 Days From Now?' },
    description: 'Find out what date is exactly 30 days from today. Instantly see the date one month from now with our free 30 Days From Today calculator.',
    keywords: '30 days from today, what date is 30 days from today, 30 days from now, one month from today, date 30 days from now',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/30-days-from-today',
    },
};

const faqs = [
    { q: 'What date is 30 days from today?', a: 'The result above shows the exact date. It is automatically calculated based on today\'s date and updates daily.' },
    { q: 'Is 30 days the same as 1 month?', a: 'Not always. Months have 28–31 days depending on the calendar. 30 days is an exact count, while "one month" varies.' },
    { q: 'Can I calculate other days from today?', a: 'Yes! Visit our Days From Today Calculator to enter any number of days.' },
    { q: 'Is this free?', a: 'Yes, 100% free.' },
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
                                name: '30 Days From Today Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/30-days-from-today',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Find what date is exactly 30 days from today.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: '30 Days From Today', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/30-days-from-today' },
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
                exactDays={30}
                title="30 Days From Today"
                subtitle="See the exact date that falls 30 days from today — updated automatically every day."
                accentColor="#d97706"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today Calculator' },
                    { href: '/date-time-tools/day-calculators/7-days-from-today', label: '7 Days From Today' },
                    { href: '/date-time-tools/day-calculators/45-days-from-today', label: '45 Days From Today' },
                    { href: '/date-time-tools/day-calculators/60-days-from-today', label: '60 Days From Today' },
                    { href: '/date-time-tools/day-calculators/90-days-from-today', label: '90 Days From Today' },
                ]}
            >
                <SEOBottomSection keyword="30 days from today" heading="What Date is 30 Days From Today?" faqs={faqs}>
                    <p>30 days from today is approximately one month ahead. This is one of the most commonly searched date calculations — useful for bill due dates, contract periods, trial expirations, and event planning.</p>
                    <p>Also check out <strong>45 days from today</strong>, <strong>60 days from today</strong>, or use the full <strong>Days From Today Calculator</strong> for any custom number of days.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

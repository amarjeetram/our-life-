import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Days From Today Calculator – What Date is X Days From Now?' },
    description: 'Use our free Days From Today Calculator to instantly find out what date will be X days from today. Enter any number and get the exact date immediately.',
    keywords: 'days from today, days from today calculator, what date is 30 days from today, how many days from today, day calculator online',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/days-from-today',
    },
};

const faqs = [
    { q: 'How do I find out what date is X days from today?', a: 'Simply enter the number of days in the input box above. The calculator instantly shows you the exact future date without any button click.' },
    { q: 'What is 30 days from today?', a: 'You can use our calculator above for the exact answer. It automatically calculates based on today\'s date.' },
    { q: 'Does the calculator count today as day 1?', a: 'No. Today is Day 0. So "1 day from today" means tomorrow.' },
    { q: 'Is this calculator free?', a: 'Yes, completely free. No sign-up or download required.' },
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
                                name: 'Days From Today Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/days-from-today',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Free online calculator to find what date is X days from today.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: 'Days From Today', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/days-from-today' },
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
                mode="days-from-today"
                title="Days From Today Calculator"
                subtitle="Enter any number of days and instantly find the exact future date from today."
                accentColor="#2563eb"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/7-days-from-today', label: '7 Days From Today' },
                    { href: '/date-time-tools/day-calculators/30-days-from-today', label: '30 Days From Today' },
                    { href: '/date-time-tools/day-calculators/45-days-from-today', label: '45 Days From Today' },
                    { href: '/date-time-tools/day-calculators/60-days-from-today', label: '60 Days From Today' },
                    { href: '/date-time-tools/day-calculators/90-days-from-today', label: '90 Days From Today' },
                    { href: '/date-time-tools/day-calculators/days-ago', label: 'Days Ago Calculator' },
                    { href: '/date-time-tools/day-calculators/date-difference', label: 'Date Difference Calculator' },
                ]}
            >
                <SEOBottomSection
                    keyword="days from today calculator"
                    heading="How to Use the Days From Today Calculator"
                    faqs={faqs}
                >
                    <p>Enter any positive number in the box above to find the exact future date that many days from today. The calculator uses your device's local date and updates in real time — no button press needed.</p>
                    <p>This is useful for deadlines, project planning, countdowns, legal notice periods, and many more real-world situations. Quickly find out what date is <strong>7 days from today</strong>, <strong>30 days from today</strong>, or even 365 days from today.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

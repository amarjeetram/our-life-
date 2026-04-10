import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '45 Days From Today – What is the Date 45 Days From Now?' },
    description: 'Find out what date is exactly 45 days from today. Our free calculator instantly shows the result. Perfect for legal notices, deadlines and planning.',
    keywords: '45 days from today, what date is 45 days from today, 45 days from now, date 45 days from now, 45 day deadline calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/45-days-from-today',
    },
};

const faqs = [
    { q: 'What date is 45 days from today?', a: 'The calculator above shows the exact date. It updates automatically based on today\'s current date.' },
    { q: 'What is 45 days in weeks?', a: '45 days is exactly 6 weeks and 3 days.' },
    { q: 'Is 45 days used in legal notices?', a: 'Yes, 45-day notice periods are common in legal, rental, and contract situations.' },
    { q: 'Is this tool free?', a: 'Yes, completely free to use.' },
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
                                name: '45 Days From Today Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/45-days-from-today',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Find what date is exactly 45 days from today instantly.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: '45 Days From Today', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/45-days-from-today' },
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
                exactDays={45}
                title="45 Days From Today"
                subtitle="Find the exact date 45 days from now — great for legal notices, planning and deadlines."
                accentColor="#0891b2"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today Calculator' },
                    { href: '/date-time-tools/day-calculators/30-days-from-today', label: '30 Days From Today' },
                    { href: '/date-time-tools/day-calculators/60-days-from-today', label: '60 Days From Today' },
                    { href: '/date-time-tools/day-calculators/date-difference', label: 'Date Difference Calculator' },
                ]}
            >
                <SEOBottomSection keyword="45 days from today" heading="What Date is 45 Days From Today?" faqs={faqs}>
                    <p>45 days from today is 6 weeks and 3 days into the future. This period is frequently used in legal notices, contract terms, and real estate transactions.</p>
                    <p>Related: <strong>30 days from today</strong> for shorter deadlines, or <strong>60 days from today</strong> and <strong>90 days from today</strong> for longer planning windows.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

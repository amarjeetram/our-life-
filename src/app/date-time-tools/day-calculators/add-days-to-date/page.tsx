import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Add Days to Date Calculator – Find Future Date Easily Online Free' },
    description: 'Add any number of days to a specific date and get the exact result instantly. Free online Add Days to Date Calculator — no downloads, no sign-up.',
    keywords: 'add days to date, add days to a date calculator, date calculator add days, what date will it be in X days, future date calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/add-days-to-date',
    },
};

const faqs = [
    { q: 'How do I add days to a specific date?', a: 'Select your start date and enter the number of days to add. The calculator instantly shows the resulting future date.' },
    { q: 'Can I add days to a past date?', a: 'Yes! You can select any date — past, present, or future — as your start date.' },
    { q: 'What if I enter a negative number of days?', a: 'The calculator will subtract days from your selected date, giving you a past date.' },
    { q: 'Is this tool free?', a: 'Yes, completely free and works directly in your browser without any downloads.' },
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
                                name: 'Add Days to Date Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/add-days-to-date',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Add any number of days to any date and find the result instantly.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: 'Add Days to Date', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/add-days-to-date' },
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
                mode="add-days-to-date"
                title="Add Days to Date Calculator"
                subtitle="Select any start date, enter days to add, and instantly get your resulting date."
                accentColor="#059669"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today Calculator' },
                    { href: '/date-time-tools/day-calculators/date-difference', label: 'Date Difference Calculator' },
                    { href: '/date-time-tools/day-calculators/30-days-from-today', label: '30 Days From Today' },
                    { href: '/date-time-tools/day-calculators/90-days-from-today', label: '90 Days From Today' },
                ]}
            >
                <SEOBottomSection
                    keyword="add days to date calculator"
                    heading="Add Days to Any Date – Instant Calculator"
                    faqs={faqs}
                >
                    <p>Need to find out what date falls a certain number of days from a specific date? Our Add Days to Date Calculator makes it effortless. Just select your start date and enter the number of days.</p>
                    <p>Great for planning delivery dates, calculating rental periods, scheduling follow-ups, legal deadlines, or any date-math you need to do quickly.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

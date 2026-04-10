import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Days Ago Calculator – What Date Was X Days Ago?' },
    description: 'Find out what date it was X days ago from today using our free Days Ago Calculator. Enter any number of days and get the exact past date instantly.',
    keywords: 'days ago calculator, what date was 30 days ago, 7 days ago, 90 days ago, past date calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/days-ago',
    },
};

const faqs = [
    { q: 'What date was 30 days ago?', a: 'Use the calculator above, enter 30, and it instantly shows the exact date 30 days before today.' },
    { q: 'How does the Days Ago Calculator work?', a: 'It subtracts your entered number of days from today\'s date and returns the resulting past date.' },
    { q: 'Can I calculate days ago from a specific date?', a: 'For a specific start date, use our Date Difference Calculator instead.' },
    { q: 'Is this tool free?', a: 'Yes, 100% free with no sign-up required.' },
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
                                name: 'Days Ago Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/days-ago',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Free calculator to find what date it was X days ago from today.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: 'Days Ago Calculator', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/days-ago' },
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
                mode="days-ago"
                title="Days Ago Calculator"
                subtitle="Enter a number to find out what exact date it was that many days ago from today."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today Calculator' },
                    { href: '/date-time-tools/day-calculators/date-difference', label: 'Date Difference Calculator' },
                    { href: '/date-time-tools/day-calculators/30-days-from-today', label: '30 Days From Today' },
                    { href: '/date-time-tools/day-calculators/90-days-from-today', label: '90 Days From Today' },
                ]}
            >
                <SEOBottomSection
                    keyword="days ago calculator"
                    heading="Days Ago Calculator – Find Any Past Date"
                    faqs={faqs}
                >
                    <p>Our Days Ago Calculator helps you quickly find a past date by subtracting a number of days from today. Just type the number and the date appears instantly.</p>
                    <p>This is perfect for checking deadlines that have passed, verifying timelines, audits, or any scenario where you need to know what date it was X days ago.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

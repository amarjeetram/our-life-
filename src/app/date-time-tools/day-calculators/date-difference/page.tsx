import { Metadata } from 'next';
import DayCalculatorClient from '@/components/DayCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Date Difference Calculator – Days Between Two Dates Online Free' },
    description: 'Calculate the exact number of days between any two dates with our free Date Difference Calculator. Also shows weeks and months difference instantly.',
    keywords: 'date difference calculator, days between two dates, how many days between dates, date calculator, difference between two dates in days',
    alternates: {
        canonical: 'https://smarttoolswala.com/date-time-tools/day-calculators/date-difference',
    },
};

const faqs = [
    { q: 'How do I calculate days between two dates?', a: 'Select your start date and end date in the calculator above. It instantly shows the exact number of days, weeks, and approximate months between them.' },
    { q: 'Does it count both the start and end date?', a: 'The calculator counts the days between the two dates. If start and end are the same, the result is 0.' },
    { q: 'Can I use past dates?', a: 'Yes, you can use any date — past, present, or future for both start and end.' },
    { q: 'Is the calculator free?', a: 'Yes, completely free with no registration needed.' },
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
                                name: 'Date Difference Calculator',
                                url: 'https://smarttoolswala.com/date-time-tools/day-calculators/date-difference',
                                applicationCategory: 'Utility',
                                operatingSystem: 'All',
                                description: 'Calculate days between two dates instantly for free.',
                                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                                    { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                                    { '@type': 'ListItem', position: 3, name: 'Day Calculators', item: 'https://smarttoolswala.com/date-time-tools/day-calculators' },
                                    { '@type': 'ListItem', position: 4, name: 'Date Difference Calculator', item: 'https://smarttoolswala.com/date-time-tools/day-calculators/date-difference' },
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
                mode="date-difference"
                title="Date Difference Calculator"
                subtitle="Pick two dates to instantly calculate the exact number of days, weeks, and months between them."
                accentColor="#0891b2"
                relatedLinks={[
                    { href: '/date-time-tools/day-calculators/days-from-today', label: 'Days From Today Calculator' },
                    { href: '/date-time-tools/day-calculators/add-days-to-date', label: 'Add Days to Date' },
                    { href: '/date-time-tools/day-calculators/days-ago', label: 'Days Ago Calculator' },
                    { href: '/date-time-tools/day-calculators/30-days-from-today', label: '30 Days From Today' },
                ]}
            >
                <SEOBottomSection
                    keyword="date difference calculator"
                    heading="Date Difference Calculator – Days Between Two Dates"
                    faqs={faqs}
                >
                    <p>Our Date Difference Calculator finds the exact number of days between any two dates. It also shows the difference in weeks and approximate months for your convenience.</p>
                    <p>Use cases: calculate contract durations, measure project timelines, find how many days until an upcoming event, or verify elapsed time between two historical dates.</p>
                </SEOBottomSection>
            </DayCalculatorClient>
        </>
    );
}

import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Hours Ago Calculator – What Time Was It X Hours Ago?' },
    description: 'Find out what time it was X hours ago with our free Hours Ago Calculator. Enter any hours and get the exact past time based on your current local time.',
    keywords: 'hours ago calculator, what time was it 4 hours ago, 8 hours ago, time ago calculator, past time calculator',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/hours-ago-calculator' },
};

const faqs = [
    { q: 'What time was it 4 hours ago?', a: 'Enter 4 in the calculator above and it instantly shows the exact time 4 hours before now.' },
    { q: 'How does the Hours Ago Calculator work?', a: 'It subtracts the entered number of hours from the current local time and displays the resulting past time.' },
    { q: 'Can I enter decimal hours like 1.5?', a: 'Yes! 1.5 = 1 hour 30 minutes ago, 2.5 = 2 hours 30 minutes ago.' },
    { q: 'Is this free?', a: 'Yes, 100% free.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Hours Ago Calculator', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/hours-ago-calculator', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Find what time it was X hours ago.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: 'Hours Ago Calculator', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/hours-ago-calculator' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="hours-ago" title="Hours Ago Calculator"
                subtitle="Enter any number of hours to instantly find what time it was that many hours ago."
                accentColor="#0891b2"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Hours From Now Calculator' },
                    { href: '/date-time-tools/time-calculators/time-difference-calculator', label: 'Time Difference Calculator' },
                    { href: '/date-time-tools/time-calculators/8-hours-from-now', label: '8 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/24-hours-from-now', label: '24 Hours From Now' },
                ]}
            >
                <SEOBottomSection keyword="hours ago calculator" heading="Hours Ago Calculator" faqs={faqs}>
                    <p>The Hours Ago Calculator subtracts your entered hours from the current local time to find the exact time that many hours in the past. Useful for incident tracking, work logs, and time audits.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

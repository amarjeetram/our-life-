import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Add Subtract Time Calculator – Add or Subtract Hours & Minutes' },
    description: 'Add or subtract hours and minutes from any time with our free calculator. Pick a base time, enter hours and minutes, and get the exact result instantly.',
    keywords: 'add subtract time calculator, add hours to time, subtract hours from time, time calculator add hours, add time calculator',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/add-subtract-time-calculator' },
};

const faqs = [
    { q: 'How do I add hours to a time?', a: 'Select a base time, enter the hours and minutes you want to add, and click Add. The result shows instantly.' },
    { q: 'Can I subtract time too?', a: 'Yes! Toggle the Subtract button to find the time that many hours and minutes before your base time.' },
    { q: 'What is the use case for this calculator?', a: 'Great for scheduling, shift planning, cooking, travel, meetings, and any situation where you need to add or subtract an exact duration from a time.' },
    { q: 'Is this free?', a: 'Yes, completely free.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Add Subtract Time Calculator', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/add-subtract-time-calculator', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Add or subtract hours and minutes from any time.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: 'Add Subtract Time Calculator', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/add-subtract-time-calculator' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="add-subtract-time" title="Add / Subtract Time Calculator"
                subtitle="Pick a base time, enter hours and minutes, then add or subtract to get the result."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Hours From Now Calculator' },
                    { href: '/date-time-tools/time-calculators/time-difference-calculator', label: 'Time Difference Calculator' },
                    { href: '/date-time-tools/time-calculators/minutes-from-now-calculator', label: 'Minutes From Now' },
                ]}
            >
                <SEOBottomSection keyword="add subtract time calculator" heading="Add or Subtract Time Calculator" faqs={faqs}>
                    <p>Use the Add/Subtract Time Calculator to perform custom time math. Choose any base time, enter a duration (hours + minutes), and toggle between adding and subtracting to get an instant result.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

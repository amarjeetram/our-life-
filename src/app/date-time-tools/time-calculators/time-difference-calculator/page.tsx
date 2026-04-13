import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Time Difference Calculator – Hours & Minutes Between Two Times' },
    description: 'Calculate the difference between two times in hours and minutes with our free Time Difference Calculator. Pick a start and end time for instant results.',
    keywords: 'time difference calculator, hours between two times, time duration calculator, calculate time between two times, how many hours between',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/time-difference-calculator' },
};

const faqs = [
    { q: 'How do I calculate hours between two times?', a: 'Select your start time and end time in the calculator above. It instantly shows the total hours and minutes difference.' },
    { q: 'How many hours is 9am to 5pm?', a: '9am to 5pm is exactly 8 hours. Enter 09:00 and 17:00 in the calculator to verify.' },
    { q: 'Does it work across midnight?', a: 'This calculator works for same-day time ranges. For overnight durations, take the total as the absolute difference.' },
    { q: 'Is this free?', a: 'Yes, completely free.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Time Difference Calculator', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/time-difference-calculator', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Calculate hours and minutes between two times.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: 'Time Difference Calculator', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/time-difference-calculator' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="time-difference" title="Time Difference Calculator"
                subtitle="Pick two times to instantly calculate the exact hours and minutes between them."
                accentColor="#d97706"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Hours From Now Calculator' },
                    { href: '/date-time-tools/time-calculators/add-subtract-time-calculator', label: 'Add / Subtract Time' },
                    { href: '/date-time-tools/time-calculators/minutes-from-now-calculator', label: 'Minutes From Now' },
                ]}
            >
                <SEOBottomSection keyword="time difference calculator" heading="Time Difference Calculator" faqs={faqs}>
                    <p>The Time Difference Calculator shows you the exact number of hours and minutes between any two times. Use it to calculate shift durations, workout lengths, travel times, and work hours.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

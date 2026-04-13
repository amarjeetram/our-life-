import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '8 Hours From Now – What Time Will It Be in 8 Hours?' },
    description: 'What time is 8 hours from now? Find the exact time instantly with our free calculator. Perfect for shift scheduling and work hour planning.',
    keywords: '8 hours from now, what time is 8 hours from now, 8 hours time, time in 8 hours, 8 hour shift end time',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/8-hours-from-now' },
};

const faqs = [
    { q: 'What time is 8 hours from now?', a: 'The exact time 8 hours from now is shown in the result above, calculated automatically from your device\'s current local time.' },
    { q: 'How many minutes is 8 hours?', a: '8 hours = 480 minutes.' },
    { q: 'What is 8 hours from 9 AM?', a: '8 hours from 9:00 AM is 5:00 PM.' },
    { q: 'Why do I need 8 hours from now?', a: 'Common use cases include tracking shift end times, sleep schedules, meeting planning, and medication reminders.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '8 Hours From Now', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/8-hours-from-now', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Shows the exact time 8 hours from now.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: '8 Hours From Now', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/8-hours-from-now' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="exact-hours" exactHours={8}
                title="8 Hours From Now"
                subtitle="The exact time 8 hours from your current local time — great for shift tracking and scheduling."
                accentColor="#059669"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/4-hours-from-now', label: '4 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/12-hours-from-now', label: '12 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/24-hours-from-now', label: '24 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/2-hours-from-now', label: '2 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Custom Hours Calculator' },
                ]}
            >
                <SEOBottomSection keyword="8 hours from now" heading="8 Hours From Now" faqs={faqs}>
                    <p>8 hours is a standard work shift. Knowing what time is 8 hours from now helps you plan shift end times, sleep schedules, and deadlines. The result above updates in real time from your device's clock.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

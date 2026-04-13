import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '12 Hours From Now – What Time Will It Be in 12 Hours?' },
    description: 'What time is 12 hours from now? Get the exact future time instantly with our free calculator. Perfect for AM/PM conversions and half-day planning.',
    keywords: '12 hours from now, what time is 12 hours from now, 12 hours time, time in 12 hours, half day from now',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/12-hours-from-now' },
};

const faqs = [
    { q: 'What time is 12 hours from now?', a: 'The exact time 12 hours from now is shown in the result above, based on your device\'s local clock.' },
    { q: 'How many minutes is 12 hours?', a: '12 hours = 720 minutes.' },
    { q: 'What is 12 hours from noon?', a: '12 hours after 12:00 PM (noon) is 12:00 AM (midnight).' },
    { q: 'What is 12 hours from midnight?', a: '12 hours after 12:00 AM (midnight) is 12:00 PM (noon).' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '12 Hours From Now', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/12-hours-from-now', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Shows the exact time 12 hours from now.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: '12 Hours From Now', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/12-hours-from-now' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="exact-hours" exactHours={12}
                title="12 Hours From Now"
                subtitle="The exact time 12 hours from your current local time — instantly updated."
                accentColor="#d97706"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/8-hours-from-now', label: '8 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/24-hours-from-now', label: '24 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/4-hours-from-now', label: '4 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/2-hours-from-now', label: '2 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Custom Hours Calculator' },
                ]}
            >
                <SEOBottomSection keyword="12 hours from now" heading="12 Hours From Now" faqs={faqs}>
                    <p>12 hours is exactly half a day. If it's currently AM, 12 hours from now is PM — and vice versa. Use this for medication schedules, sleep reminders, flight arrivals, and any half-day planning. For a custom calculation, try our <strong>Hours From Now Calculator</strong>.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '24 Hours From Now – What Time Will It Be in 24 Hours?' },
    description: 'What time is 24 hours from now? Find the exact time and date instantly. 24 hours from now is the same time tomorrow — see the result based on your local clock.',
    keywords: '24 hours from now, what time is 24 hours from now, same time tomorrow, time in 24 hours, 24 hours from now date',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/24-hours-from-now' },
};

const faqs = [
    { q: 'What time is 24 hours from now?', a: '24 hours from now is the same time tomorrow. The exact result is shown above based on your device\'s local clock.' },
    { q: 'How many minutes is 24 hours?', a: '24 hours = 1,440 minutes.' },
    { q: 'Is 24 hours from now always the same time?', a: 'Yes, 24 hours from now is exactly the same time but on the next calendar day.' },
    { q: 'What date is 24 hours from now?', a: 'The result above shows both the time and date — it will be tomorrow\'s date at the same time as now.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '24 Hours From Now', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/24-hours-from-now', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Shows the exact time and date 24 hours from now.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: '24 Hours From Now', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/24-hours-from-now' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="exact-hours" exactHours={24}
                title="24 Hours From Now"
                subtitle="The exact time and date 24 hours from now — which is the same time tomorrow."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/12-hours-from-now', label: '12 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/8-hours-from-now', label: '8 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/4-hours-from-now', label: '4 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/2-hours-from-now', label: '2 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Custom Hours Calculator' },
                ]}
            >
                <SEOBottomSection keyword="24 hours from now" heading="24 Hours From Now" faqs={faqs}>
                    <p>24 hours from now is exactly 1,440 minutes or 1 full day into the future — same time, next day. The result above shows both the time and the date. For any custom hours beyond 24, use our <strong>Hours From Now Calculator</strong>.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

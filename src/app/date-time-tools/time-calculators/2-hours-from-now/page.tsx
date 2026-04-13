import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '2 Hours From Now – What Time Will It Be in 2 Hours?' },
    description: 'What time is 2 hours from now? Find the exact time instantly. Our calculator updates in real-time based on your current local time.',
    keywords: '2 hours from now, what time is 2 hours from now, 2 hours from now time, time in 2 hours',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/2-hours-from-now' },
};

const faqs = [
    { q: 'What time is 2 hours from now?', a: 'The exact time 2 hours from now is shown in the result box above. It updates automatically based on your device\'s current local time.' },
    { q: 'How many minutes is 2 hours?', a: '2 hours = 120 minutes.' },
    { q: 'Is 2 hours from now the same everywhere?', a: 'No — the result is based on your local time zone, so it may differ from other time zones.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '2 Hours From Now', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/2-hours-from-now', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Shows the exact time 2 hours from now.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: '2 Hours From Now', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/2-hours-from-now' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="exact-hours" exactHours={2}
                title="2 Hours From Now"
                subtitle="The exact time 2 hours from your current local time — updated automatically."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/4-hours-from-now', label: '4 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/8-hours-from-now', label: '8 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/12-hours-from-now', label: '12 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/24-hours-from-now', label: '24 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Custom Hours From Now' },
                ]}
            >
                <SEOBottomSection keyword="2 hours from now" heading="2 Hours From Now" faqs={faqs}>
                    <p>2 hours from now means exactly 120 minutes added to your current local time. The result above updates automatically based on your device clock. For any custom hour calculation, use our <strong>Hours From Now Calculator</strong>.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

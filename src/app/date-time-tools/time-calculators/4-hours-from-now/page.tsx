import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: '4 Hours From Now – What Time Will It Be in 4 Hours?' },
    description: 'What time is 4 hours from now? See the exact future time instantly, based on your current local time. Free, no signup required.',
    keywords: '4 hours from now, what time is 4 hours from now, in 4 hours, time in 4 hours',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/4-hours-from-now' },
};

const faqs = [
    { q: 'What time is 4 hours from now?', a: 'The exact time 4 hours from now is shown in the result box above, based on your device\'s local time.' },
    { q: 'How many minutes is 4 hours?', a: '4 hours = 240 minutes.' },
    { q: 'What is 4 hours after midnight?', a: '4 hours after midnight (12:00 AM) is 4:00 AM.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: '4 Hours From Now', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/4-hours-from-now', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Shows the exact time 4 hours from now.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: '4 Hours From Now', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/4-hours-from-now' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="exact-hours" exactHours={4}
                title="4 Hours From Now"
                subtitle="The exact time 4 hours from your current local time — updated automatically."
                accentColor="#0891b2"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/2-hours-from-now', label: '2 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/8-hours-from-now', label: '8 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/12-hours-from-now', label: '12 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/24-hours-from-now', label: '24 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Custom Hours From Now' },
                ]}
            >
                <SEOBottomSection keyword="4 hours from now" heading="4 Hours From Now" faqs={faqs}>
                    <p>4 hours from now equals 240 minutes added to your current local time. The result above updates in real time. For any custom number of hours, use the <strong>Hours From Now Calculator</strong>.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

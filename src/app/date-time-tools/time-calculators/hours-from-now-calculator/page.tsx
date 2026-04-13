import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Hours From Now Calculator – What Time Will It Be in X Hours?' },
    description: 'Find out what time it will be X hours from now with our free Hours From Now Calculator. Enter any number of hours and get the exact future time instantly.',
    keywords: 'hours from now, hours from now calculator, what time will it be in 4 hours, time calculator, hours from now time',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/hours-from-now-calculator' },
};

const faqs = [
    { q: 'How do I find the time X hours from now?', a: 'Enter the number of hours in the input above. The calculator instantly shows the exact future time based on your current local time.' },
    { q: 'What time is 4 hours from now?', a: 'Use the calculator above and enter 4. It will instantly show the exact time 4 hours from your current time.' },
    { q: 'Can I enter decimal values like 1.5 hours?', a: 'Yes! You can enter 1.5 for 1 hour 30 minutes, 2.5 for 2 hours 30 minutes, etc.' },
    { q: 'Is this calculator free?', a: 'Yes, 100% free with no signup required.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Hours From Now Calculator', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/hours-from-now-calculator', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Find what time it will be X hours from now.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: 'Hours From Now Calculator', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/hours-from-now-calculator' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="hours-from-now" title="Hours From Now Calculator"
                subtitle="Enter any number of hours to instantly see what time it will be from now."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/2-hours-from-now', label: '2 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/4-hours-from-now', label: '4 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/8-hours-from-now', label: '8 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/12-hours-from-now', label: '12 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/24-hours-from-now', label: '24 Hours From Now' },
                    { href: '/date-time-tools/time-calculators/hours-ago-calculator', label: 'Hours Ago Calculator' },
                ]}
            >
                <SEOBottomSection keyword="hours from now calculator" heading="Hours From Now Calculator" faqs={faqs}>
                    <p>Our Hours From Now Calculator tells you the exact time X hours into the future based on your device's current local time. Simply type the number of hours and the result updates instantly — no button needed.</p>
                    <p>You can also enter decimal values: 1.5 = 1h 30m, 2.5 = 2h 30m. For quick fixed-hour lookups, try <strong>2 hours from now</strong>, <strong>4 hours from now</strong>, or <strong>8 hours from now</strong>.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

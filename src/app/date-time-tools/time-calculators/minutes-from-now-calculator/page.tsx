import { Metadata } from 'next';
import TimeCalculatorClient from '@/components/TimeCalculatorClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Minutes From Now Calculator – What Time Will It Be in X Minutes?' },
    description: 'Find out what time it will be X minutes from now. Our free Minutes From Now Calculator gives you the exact future time based on your current local time instantly.',
    keywords: 'minutes from now, minutes from now calculator, what time is 30 minutes from now, 45 minutes from now, time in minutes',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-calculators/minutes-from-now-calculator' },
};

const faqs = [
    { q: 'What time is 30 minutes from now?', a: 'Enter 30 in the calculator above. It instantly shows the exact time 30 minutes from your current local time.' },
    { q: 'What time is 45 minutes from now?', a: 'Enter 45 in the box and the result updates immediately.' },
    { q: 'How accurate is this calculator?', a: 'It uses your device\'s local clock and is accurate to the minute.' },
    { q: 'Is this tool free?', a: 'Yes, 100% free.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Minutes From Now Calculator', url: 'https://smarttoolswala.com/date-time-tools/time-calculators/minutes-from-now-calculator', applicationCategory: 'Utility', operatingSystem: 'All', description: 'Find what time it will be X minutes from now.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Date & Time Tools', item: 'https://smarttoolswala.com/date-time-tools' },
                        { '@type': 'ListItem', position: 3, name: 'Time Calculators', item: 'https://smarttoolswala.com/date-time-tools/time-calculators' },
                        { '@type': 'ListItem', position: 4, name: 'Minutes From Now Calculator', item: 'https://smarttoolswala.com/date-time-tools/time-calculators/minutes-from-now-calculator' },
                    ]},
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeCalculatorClient
                mode="minutes-from-now" title="Minutes From Now Calculator"
                subtitle="Enter any number of minutes to instantly find the exact future time from now."
                accentColor="#059669"
                relatedLinks={[
                    { href: '/date-time-tools/time-calculators/hours-from-now-calculator', label: 'Hours From Now Calculator' },
                    { href: '/date-time-tools/time-calculators/add-subtract-time-calculator', label: 'Add / Subtract Time' },
                    { href: '/date-time-tools/time-calculators/time-difference-calculator', label: 'Time Difference Calculator' },
                ]}
            >
                <SEOBottomSection keyword="minutes from now calculator" heading="Minutes From Now Calculator" faqs={faqs}>
                    <p>Our Minutes From Now Calculator adds your entered minutes to the current local time. Perfect for cooking timers, meeting scheduling, or any short time-window planning.</p>
                </SEOBottomSection>
            </TimeCalculatorClient>
        </>
    );
}

import { Metadata } from 'next';
import TimeConverterClient from '@/components/TimeConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Seconds to Minutes Converter – Convert Seconds to Minutes Online' },
    description: 'Free Seconds to Minutes Converter. Enter any seconds and instantly get the result in minutes. 60 seconds = 1 minute.',
    keywords: 'seconds to minutes, seconds to minutes converter, convert seconds to minutes, 3600 seconds to minutes, how many minutes in seconds',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/seconds-to-minutes-converter' },
};

const faqs = [
    { q: 'How do I convert seconds to minutes?', a: 'Divide the number of seconds by 60. For example, 120 seconds ÷ 60 = 2 minutes.' },
    { q: 'How many seconds is 5 minutes?', a: '5 minutes = 300 seconds.' },
    { q: 'How many minutes is 3600 seconds?', a: '3600 seconds ÷ 60 = 60 minutes (1 hour).' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Seconds to Minutes Converter', url: 'https://smarttoolswala.com/date-time-tools/time-converters/seconds-to-minutes-converter', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeConverterClient
                mode="seconds-to-minutes" title="Seconds to Minutes"
                subtitle="Enter any number of seconds and instantly convert to minutes."
                accentColor="#0891b2"
                relatedLinks={[
                    { href: '/date-time-tools/time-converters/minutes-to-hours-converter', label: 'Minutes to Hours' },
                    { href: '/date-time-tools/time-converters/time-unit-converter', label: 'Master Time Converter' },
                    { href: '/date-time-tools/time-converters/how-many-seconds-in-a-day', label: 'Seconds in a Day' },
                ]}
            >
                <SEOBottomSection keyword="seconds to minutes converter" heading="Seconds to Minutes Converter" faqs={faqs}>
                    <p>Formula: <strong>Minutes = Seconds ÷ 60</strong>. Common conversions: 60 sec = 1 min, 3600 sec = 60 min, 86400 sec = 1440 min (1 day).</p>
                </SEOBottomSection>
            </TimeConverterClient>
        </>
    );
}

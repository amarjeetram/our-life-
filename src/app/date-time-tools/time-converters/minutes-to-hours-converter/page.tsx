import { Metadata } from 'next';
import TimeConverterClient from '@/components/TimeConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Minutes to Hours Converter – Convert Minutes to Hours Online' },
    description: 'Convert any number of minutes to hours instantly. Free Minutes to Hours Converter — 60 minutes = 1 hour.',
    keywords: 'minutes to hours, minutes to hours converter, convert minutes to hours, 90 minutes to hours, 120 minutes in hours',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/minutes-to-hours-converter' },
};

const faqs = [
    { q: 'How do I convert minutes to hours?', a: 'Divide minutes by 60. For example, 90 minutes ÷ 60 = 1.5 hours.' },
    { q: 'How many hours is 120 minutes?', a: '120 minutes = 2 hours.' },
    { q: 'How many hours is 1440 minutes?', a: '1440 minutes = 24 hours (1 full day).' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Minutes to Hours Converter', url: 'https://smarttoolswala.com/date-time-tools/time-converters/minutes-to-hours-converter', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeConverterClient
                mode="minutes-to-hours" title="Minutes to Hours"
                subtitle="Enter any number of minutes and instantly convert to hours."
                accentColor="#059669"
                relatedLinks={[
                    { href: '/date-time-tools/time-converters/seconds-to-minutes-converter', label: 'Seconds to Minutes' },
                    { href: '/date-time-tools/time-converters/hours-to-days-converter', label: 'Hours to Days' },
                    { href: '/date-time-tools/time-converters/how-many-minutes-in-a-day', label: 'Minutes in a Day' },
                ]}
            >
                <SEOBottomSection keyword="minutes to hours converter" heading="Minutes to Hours Converter" faqs={faqs}>
                    <p>Formula: <strong>Hours = Minutes ÷ 60</strong>. Common conversions: 60 min = 1 hr, 90 min = 1.5 hrs, 120 min = 2 hrs, 1440 min = 24 hrs.</p>
                </SEOBottomSection>
            </TimeConverterClient>
        </>
    );
}

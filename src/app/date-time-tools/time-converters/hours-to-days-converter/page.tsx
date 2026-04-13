import { Metadata } from 'next';
import TimeConverterClient from '@/components/TimeConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Hours to Days Converter – Convert Hours to Days Online' },
    description: 'Free Hours to Days Converter. Enter any number of hours and get the exact result in days. 24 hours = 1 day.',
    keywords: 'hours to days, hours to days converter, convert hours to days, 48 hours to days, 72 hours in days',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/hours-to-days-converter' },
};

const faqs = [
    { q: 'How do I convert hours to days?', a: 'Divide hours by 24. For example, 48 hours ÷ 24 = 2 days.' },
    { q: 'How many days is 72 hours?', a: '72 hours ÷ 24 = 3 days.' },
    { q: 'How many days is 100 hours?', a: '100 hours ÷ 24 = 4.167 days (4 days and 4 hours).' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Hours to Days Converter', url: 'https://smarttoolswala.com/date-time-tools/time-converters/hours-to-days-converter', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeConverterClient
                mode="hours-to-days" title="Hours to Days"
                subtitle="Enter any number of hours and instantly convert to days."
                accentColor="#d97706"
                relatedLinks={[
                    { href: '/date-time-tools/time-converters/minutes-to-hours-converter', label: 'Minutes to Hours' },
                    { href: '/date-time-tools/time-converters/days-to-years-converter', label: 'Days to Years' },
                    { href: '/date-time-tools/time-converters/how-many-hours-in-a-year', label: 'Hours in a Year' },
                ]}
            >
                <SEOBottomSection keyword="hours to days converter" heading="Hours to Days Converter" faqs={faqs}>
                    <p>Formula: <strong>Days = Hours ÷ 24</strong>. Common conversions: 24 hrs = 1 day, 48 hrs = 2 days, 72 hrs = 3 days, 168 hrs = 7 days (1 week).</p>
                </SEOBottomSection>
            </TimeConverterClient>
        </>
    );
}

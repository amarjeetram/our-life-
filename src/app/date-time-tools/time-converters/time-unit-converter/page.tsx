import { Metadata } from 'next';
import TimeConverterClient from '@/components/TimeConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Time Unit Converter – Convert Seconds, Minutes, Hours, Days & More' },
    description: 'Master time unit converter. Convert any time unit to all others at once — seconds, minutes, hours, days, weeks, months, and years. Free online tool.',
    keywords: 'time unit converter, convert time units, seconds to hours, minutes to days, hours to years, time conversion calculator',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/time-unit-converter' },
};

const faqs = [
    { q: 'How many seconds are in an hour?', a: '1 hour = 3,600 seconds.' },
    { q: 'How many minutes are in a day?', a: '1 day = 1,440 minutes.' },
    { q: 'How do I convert hours to days?', a: 'Divide hours by 24. For example, 48 hours ÷ 24 = 2 days. Use the converter above for instant results.' },
    { q: 'Is this tool free?', a: 'Yes, 100% free.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Time Unit Converter', url: 'https://smarttoolswala.com/date-time-tools/time-converters/time-unit-converter', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'BreadcrumbList', itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smarttoolswala.com' },
                        { '@type': 'ListItem', position: 2, name: 'Time Converters', item: 'https://smarttoolswala.com/date-time-tools/time-converters' },
                        { '@type': 'ListItem', position: 3, name: 'Time Unit Converter', item: 'https://smarttoolswala.com/date-time-tools/time-converters/time-unit-converter' },
                    ] },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeConverterClient
                mode="unit-converter" title="Time Unit Converter"
                subtitle="Enter a value, pick a unit, and instantly convert to all other time units."
                accentColor="#4f46e5"
                relatedLinks={[
                    { href: '/date-time-tools/time-converters/seconds-to-minutes-converter', label: 'Seconds to Minutes' },
                    { href: '/date-time-tools/time-converters/minutes-to-hours-converter', label: 'Minutes to Hours' },
                    { href: '/date-time-tools/time-converters/hours-to-days-converter', label: 'Hours to Days' },
                    { href: '/date-time-tools/time-converters/days-to-years-converter', label: 'Days to Years' },
                ]}
            >
                <SEOBottomSection keyword="time unit converter" heading="Time Unit Converter" faqs={faqs}>
                    <p>This master converter handles all 7 time units at once: seconds, minutes, hours, days, weeks, months, and years. Enter any value and get all conversions simultaneously.</p>
                </SEOBottomSection>
            </TimeConverterClient>
        </>
    );
}

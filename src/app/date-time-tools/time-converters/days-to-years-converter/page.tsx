import { Metadata } from 'next';
import TimeConverterClient from '@/components/TimeConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const metadata: Metadata = {
    title: { absolute: 'Days to Years Converter – Convert Days to Years Online' },
    description: 'Free Days to Years Converter. Enter any number of days and get the equivalent in years. 365 days = 1 year.',
    keywords: 'days to years, days to years converter, convert days to years, 1000 days in years, 10000 days to years',
    alternates: { canonical: 'https://smarttoolswala.com/date-time-tools/time-converters/days-to-years-converter' },
};

const faqs = [
    { q: 'How do I convert days to years?', a: 'Divide the number of days by 365.25 (accounting for leap years). For example, 730 days ÷ 365.25 ≈ 1.998 years.' },
    { q: 'How many years is 1000 days?', a: '1000 ÷ 365.25 ≈ 2.74 years.' },
    { q: 'How many years is 10,000 days?', a: '10,000 ÷ 365.25 ≈ 27.38 years.' },
];

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@graph': [
                    { '@type': 'WebApplication', name: 'Days to Years Converter', url: 'https://smarttoolswala.com/date-time-tools/time-converters/days-to-years-converter', applicationCategory: 'Utility', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
                    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
                ]
            })}} />
            <TimeConverterClient
                mode="days-to-years" title="Days to Years"
                subtitle="Enter any number of days and instantly convert to years."
                accentColor="#7c3aed"
                relatedLinks={[
                    { href: '/date-time-tools/time-converters/hours-to-days-converter', label: 'Hours to Days' },
                    { href: '/date-time-tools/time-converters/10000-days-in-years', label: '10,000 Days in Years' },
                    { href: '/date-time-tools/time-converters/time-unit-converter', label: 'Master Time Converter' },
                ]}
            >
                <SEOBottomSection keyword="days to years converter" heading="Days to Years Converter" faqs={faqs}>
                    <p>Formula: <strong>Years = Days ÷ 365.2425</strong>. Common conversions: 365 days ≈ 1 year, 730 days ≈ 2 years, 1825 days ≈ 5 years, 3650 days ≈ 10 years.</p>
                </SEOBottomSection>
            </TimeConverterClient>
        </>
    );
}

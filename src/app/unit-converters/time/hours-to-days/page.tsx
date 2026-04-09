import { Metadata } from 'next';
import TimeConverterClient from '@/components/TimeConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'Hours to Days Converter � Free Online Time Calculator' },
    description: 'Convert Hours to Days instantly with our free online time converter. Accurate conversions between seconds, minutes, hours, days, weeks, months, and years.',
    keywords: 'hours to days, hours to days, time converter, unit converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/time/hours-to-days',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Hours to Days Converter",
                "url": "https://smarttoolswala.com/unit-converters/time/hours-to-days",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Hours to Days instantly with our free online time converter. Accurate conversions between seconds, minutes, hours, days, weeks, months, and years.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Time", "item": "https://smarttoolswala.com/unit-converters#time" },
                    { "@type": "ListItem", "position": 4, "name": "Hours to Days", "item": "https://smarttoolswala.com/unit-converters/time/hours-to-days" }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-sky-50/40 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-sky-900 tracking-tight mb-4">
                        Hours to Days Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate hours to days conversion with a quick reference table.
                    </p>
                </div>
                <TimeConverterClient defaultFrom="hours" defaultTo="days" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">How to Convert Hours to Days</h2>
                    <p className="mb-6 leading-relaxed text-lg">
                        Converting <strong>Hours to Days</strong> is simply a matter of multiplying or dividing by the appropriate factor. Our free online tool handles this calculation instantly.
                    </p>
                    <p className="mb-8 leading-relaxed text-lg">
                        Just enter the amount of hours you wish to convert, and the result in days will be displayed immediately.
                    </p>
                </article>
            </main>
        </div>
    );
}

import { Metadata } from 'next';
import TimeConverterClient from '@/components/TimeConverterClient';

export const metadata: Metadata = {
    title: { absolute: 'Minutes to Seconds Converter � Free Online Time Calculator' },
    description: 'Convert Minutes to Seconds instantly with our free online time converter. Accurate conversions between seconds, minutes, hours, days, weeks, months, and years.',
    keywords: 'minutes to seconds, minutes to seconds, time converter, unit converter',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/time/minutes-to-seconds',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Minutes to Seconds Converter",
                "url": "https://smarttoolswala.com/unit-converters/time/minutes-to-seconds",
                "applicationCategory": "Utility",
                "operatingSystem": "All",
                "description": "Convert Minutes to Seconds instantly with our free online time converter. Accurate conversions between seconds, minutes, hours, days, weeks, months, and years.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                    { "@type": "ListItem", "position": 2, "name": "Unit Converters", "item": "https://smarttoolswala.com/unit-converters" },
                    { "@type": "ListItem", "position": 3, "name": "Time", "item": "https://smarttoolswala.com/unit-converters#time" },
                    { "@type": "ListItem", "position": 4, "name": "Minutes to Seconds", "item": "https://smarttoolswala.com/unit-converters/time/minutes-to-seconds" }
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
                        Minutes to Seconds Converter
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Free, instant and accurate minutes to seconds conversion with a quick reference table.
                    </p>
                </div>
                <TimeConverterClient defaultFrom="minutes" defaultTo="seconds" />
                <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 text-slate-700">
                    <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">How to Convert Minutes to Seconds</h2>
                    <p className="mb-6 leading-relaxed text-lg">
                        Converting <strong>Minutes to Seconds</strong> is simply a matter of multiplying or dividing by the appropriate factor. Our free online tool handles this calculation instantly.
                    </p>
                    <p className="mb-8 leading-relaxed text-lg">
                        Just enter the amount of minutes you wish to convert, and the result in seconds will be displayed immediately.
                    </p>
                </article>
            </main>
        </div>
    );
}

import { Metadata } from 'next';
import AddNameDateClient from '@/components/AddNameDateClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleAddNameDate from '@/components/articles/ArticleAddNameDate';

export const metadata: Metadata = {
    title: 'Add Name and Date to Photo Online – Free Tool',
    description: 'Easily add your name and date to passport size photos online. Perfect for TNPSC, SSC, UPPSC, and other government exam application forms.',
    keywords: 'add name and date to photo, photo with name and date online, tnpsc photo name date tool, ssc photo with name date, passport photo name date generator',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/add-name-date',
    },
};

const faqs = [
    { q: "Is this name and date photo tool free?", a: "Yes, our tool is 100% free with no hidden charges, daily limits, or watermarks." },
    { q: "What should be the background of my passport photo?", a: "Most government exams like SSC and TNPSC strictly recommend a plain white or light grey background." },
    { q: "Can I also compress the photo to 50KB?", a: "Absolutely! You can toggle the 'Compression Settings' and set the target KB exactly as you need." },
    { q: "Will the text block my face?", a: "No, the tool intelligently adds a proportional white strip at the very bottom margin so your original photograph area is unaffected." },
    { q: "How safe is uploading my personal photo?", a: "Your privacy is our priority. Images are processed instantly and we do not store your documents on our servers." },
];

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "Add Name & Date to Photo Tool",
                            "url": "https://smarttoolswala.com/govt-exam-tools/add-name-date",
                            "applicationCategory": "Utility",
                            "operatingSystem": "All",
                            "description": "Free online tool to add your name and date format exactly as required by TNPSC, SSC, and UPPSC exams.",
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqs.map(f => ({
                                "@type": "Question",
                                "name": f.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": f.a
                                }
                            }))
                        }
                    ])
                }}
            />
            <AddNameDateClient>
                <SEOBottomSection
                    keyword="add name and date to photo"
                    faqs={faqs}
                >
                    <ArticleAddNameDate />
                </SEOBottomSection>
            </AddNameDateClient>
        </>
    );
}

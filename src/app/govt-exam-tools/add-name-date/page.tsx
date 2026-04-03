import { Metadata } from 'next';
import AddNameDateClient from '@/components/AddNameDateClient';

export const metadata: Metadata = {
    title: 'Add Name and Date to Photo Online – Free Tool',
    description: 'Easily add your name and date to passport size photos online. Perfect for TNPSC, SSC, UPPSC, and other government exam application forms.',
    keywords: 'add name and date to photo, photo with name and date online, tnpsc photo name date tool, ssc photo with name date, passport photo name date generator',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/add-name-date',
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Add Name & Date to Photo Tool",
                        "url": "https://smarttoolswala.com/govt-exam-tools/add-name-date",
                        "applicationCategory": "Utility",
                        "operatingSystem": "All",
                        "description": "Free online tool to add your name and date format exactly as required by TNPSC, SSC, and UPPSC exams.",
                    })
                }}
            />
            <AddNameDateClient />
        </>
    );
}

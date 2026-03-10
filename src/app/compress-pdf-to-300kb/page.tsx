import { Metadata } from 'next';
import CompressPdfClient from '@/components/CompressPdfClient';
import SEOBottomSection from '@/components/SEOBottomSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


export const metadata: Metadata = {
    title: 'Compress PDF to 300KB Online Free – Reduce PDF Size',
    description: 'Easily reduce PDF file size to 300kb online for free. Secure, fully client-side tool to compress PDF to 300kb without losing quality.',
    keywords: 'compress pdf to 300kb, reduce pdf size to 300kb, convert pdf to 300kb, upsc pdf compressor, pdf size reducer',
    alternates: {
        canonical: 'https://smarttoolswala.com/compress-pdf-to-300kb',
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
                        "name": "300KB PDF Compressor",
                        "url": "https://smarttoolswala.com/compress-pdf-to-300kb",
                        "description": "Quickly optimize and compress your PDF document to 300KB directly in your browser.",
                        "applicationCategory": "Utility",
                        "operatingSystem": "All",
                        "browserRequirements": "Requires JavaScript",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }}
            />
            <CompressPdfClient
                targetSizeKB={300}
                subtitleOverride="Compress PDF to 300KB online instantly. Best PDF size reducer for UPSC, SSC, banking forms, and EPFO portals. 100% private, no files are uploaded."
            >
                <SEOBottomSection
                    keyword="compress pdf to 300kb"
                    faqs={[
                        { q: "How do I compress PDF to 300kb for free?", a: "Simply tap 'Select PDF' and choose your document. Our smart client-side processing removes invisible structural data and unused metadata to bring your PDF closer to the 300kb limit immediately." },
                        { q: "Is this safe to upload official government documents?", a: "Yes. In fact, your PDF never even leaves your device. The entire compression process runs directly inside your web browser using JavaScript, meaning 100% total privacy for your sensitive documents." },
                        { q: "Can I use this for UPSC, EPFO, and SSC forms?", a: "Absolutely. Most Indian government portals require PDF backups (like ID proofs or degree certificates) to be exactly between 10KB and 300KB. This tool helps optimize your files for those specific regulations." },
                        { q: "Why did my PDF size not shrink enough?", a: "If your PDF consists entirely of high-resolution scanned images without text, a metadata stripper will not be enough to compress the pixels. You may need to compress the images (using our Image Compressor tool) before converting them into a PDF." },
                        { q: "Will there be any watermarks added?", a: "No, we do not add any watermarks. Your PDF remains visually identical to the original." }
                    ]}
                >
                    <div style={{ marginTop: '32px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>How to Compress PDF to 300KB</h2>
                        <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '16px' }}>
                            Working with government portals and college admission websites often comes with strict file dimension and size limitations. The most common requirement for scanned documents and ID proofs is a maximum PDF size of 300KB.
                        </p>
                        <p style={{ color: '#475569', lineHeight: 1.8 }}>
                            With our <strong>Compress PDF to 300KB</strong> tool, we use advanced client-side processing logic. This means rather than uploading your personal and sensitive documents to a server (which is a major privacy concern), your phone or computer does all the work. It strips out hidden layers, empty data streams, and unused metadata, optimizing the PDF while ensuring zero text or quality loss.
                        </p>
                    </div>
                </SEOBottomSection>
            </CompressPdfClient>
        </>
    );
}

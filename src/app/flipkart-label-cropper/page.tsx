import { Metadata } from 'next';
import Script from 'next/script';
import FlipkartLabelCropperClient from '@/components/FlipkartLabelCropperClient';
import ArticleFlipkartLabelCropper from '@/components/articles/ArticleFlipkartLabelCropper';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
    title: 'Flipkart Label Cropper – Free Online Shipping Label Cutter Tool',
    description: 'Free Flipkart label cropper tool to crop shipping labels from A4 PDF invoices instantly. Quick label crop for thermal printing — 100% browser-based, no upload, no data leak.',
    keywords: 'flipkart label crop, flipkart label cropper, quick label crop, flipkart label, flipkart shipping label, flipkart label cutter, label cutter, flipkart label printing, quick crop tool, flipkart pdf, straight cut label, mrp label for flipkart',
    alternates: {
        canonical: 'https://smarttoolswala.com/flipkart-label-cropper',
    },
    openGraph: {
        title: 'Flipkart Label Cropper – Free Online Shipping Label Cutter',
        description: 'Instantly crop Flipkart shipping labels from invoice PDFs. Browser-based quick label crop tool — zero upload, zero privacy risk, free forever.',
        url: 'https://smarttoolswala.com/flipkart-label-cropper',
        type: 'website',
        siteName: 'SmartToolsWala',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Flipkart Label Cropper – Quick Label Crop Tool',
        description: 'Free browser-based Flipkart shipping label cutter. Crop in 1 click, download, and print on thermal label printer.',
    },
};

const faqs = [
    {
        q: 'What is a Flipkart label crop and why do sellers need it?',
        a: 'A Flipkart label crop refers to extracting only the shipping label portion from the full A4 invoice-plus-label PDF that Flipkart generates. Sellers need this because printing the entire A4 page on a thermal label roll wastes paper and can cause barcode scanning failures at the logistics hub.',
    },
    {
        q: 'Can I use this tool on my phone to crop a Flipkart shipping label?',
        a: 'Yes! Our flipkart label cutter works on all modern smartphone browsers — Chrome on Android, Safari on iPhone. Take a screenshot of your label, upload it here, choose the Top Half preset, and download the cropped shipping label.',
    },
    {
        q: 'Is it safe to upload Flipkart customer data to this tool?',
        a: 'Absolutely safe. Our tool is 100% browser-based using the HTML5 Canvas API. Your images are never uploaded to any server — everything is processed locally in your browser memory. When you close the tab, all data is permanently cleared.',
    },
    {
        q: 'What is the correct size for a Flipkart shipping label on a thermal printer?',
        a: 'The standard size for Flipkart shipping labels on thermal printers is 4 inches × 6 inches (100mm × 150mm). Set your thermal printer media size to 100×150mm and print at 203 DPI or 300 DPI for best barcode clarity.',
    },
    {
        q: 'What is the difference between a Flipkart label and a card label?',
        a: 'A card label is the small SKU/EAN barcode sticker placed on each individual product unit. A shipping label is the larger 4×6 label placed on the outside of the packed box with the buyer address and AWB number. Our tool primarily helps with cropping shipping labels.',
    },
    {
        q: 'Can I crop MRP labels for Flipkart using this tool?',
        a: 'Yes. Upload your MRP label image and use the Full Page preset to download it as a high-quality JPEG, then print it on 3×2 inch or 2×1.5 inch label sticker paper for Flipkart compliance.',
    },
    {
        q: 'Does this quick crop tool work for other platforms like Meesho or Amazon?',
        a: 'Yes! While specifically optimized for Flipkart label crop, the tool works for any label image from Meesho, Amazon, Myntra, Nykaa, or any other platform. Upload your label image and use the crop presets.',
    },
    {
        q: 'What format does the cropped label download in?',
        a: 'The cropped Flipkart shipping label downloads as a high-quality JPEG file (95% quality). JPEG is universally compatible with all printers and label software.',
    },
];

export default function FlipkartLabelCropperPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                name: 'SmartToolsWala',
                url: 'https://smarttoolswala.com',
                logo: 'https://smarttoolswala.com/logo.svg',
                sameAs: [
                    'https://twitter.com/smarttoolswala',
                    'https://github.com/smarttoolswala',
                    'https://www.youtube.com/@SmartToolsWala',
                ],
            },
            {
                '@type': 'WebApplication',
                name: 'Flipkart Label Cropper',
                url: 'https://smarttoolswala.com/flipkart-label-cropper',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'All',
                browserRequirements: 'Requires JavaScript',
                description:
                    'Free online Flipkart label cropper — crop shipping labels from A4 PDF invoice screenshots. Quick label crop with preset modes for thermal printing. 100% browser-based, zero server upload.',
                featureList: [
                    'Flipkart label crop — Top Half / Bottom Half / Top Third presets',
                    'Quick label crop with live canvas preview',
                    'Flipkart shipping label isolation for thermal printing',
                    'Browser-based — no file upload to server',
                    'Instant download and print support',
                    'Free forever, no watermark',
                ],
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
            },
            {
                '@type': 'HowTo',
                name: 'How to Crop a Flipkart Shipping Label',
                description:
                    'Step-by-step guide to crop the Flipkart shipping barcode label from an A4 PDF invoice screenshot for thermal label printing.',
                totalTime: 'PT30S',
                step: [
                    {
                        '@type': 'HowToStep',
                        position: 1,
                        name: 'Upload the Flipkart Label Image',
                        text: 'Take a screenshot of your Flipkart invoice PDF or download the label image. Upload or drag-drop it into the tool.',
                        url: 'https://smarttoolswala.com/flipkart-label-cropper#tool',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 2,
                        name: 'Choose a Crop Preset',
                        text: 'Select "Top Half (Shipping Label)" to extract the barcode label, or choose another preset based on your label layout.',
                        url: 'https://smarttoolswala.com/flipkart-label-cropper#tool',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 3,
                        name: 'Preview the Crop Area',
                        text: 'Check the live canvas preview with the orange dashed border showing the exact crop region.',
                        url: 'https://smarttoolswala.com/flipkart-label-cropper#tool',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 4,
                        name: 'Crop, Download, and Print',
                        text: 'Click "Crop Label" then "Download Label" to save the cropped Flipkart shipping label as a JPEG. Print directly on your thermal label printer.',
                        url: 'https://smarttoolswala.com/flipkart-label-cropper#tool',
                    },
                ],
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://smarttoolswala.com',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Image Tools',
                        item: 'https://smarttoolswala.com/image-tools',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'Flipkart Label Cropper',
                        item: 'https://smarttoolswala.com/flipkart-label-cropper',
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqs.map(f => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: f.a,
                    },
                })),
            },
        ],
    };

    return (
        <>
            <Script
                id="flipkart-label-cropper-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <FlipkartLabelCropperClient>
                {/* Ad — Below Tool, Above Article */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 my-4">
                    <AdBanner dataAdFormat="auto" dataFullWidthResponsive="true" />
                </div>

                {/* 4000-word SEO Article */}
                <div className="max-w-5xl mx-auto px-4 pb-20">
                    <ArticleFlipkartLabelCropper />
                </div>
            </FlipkartLabelCropperClient>
        </>
    );
}

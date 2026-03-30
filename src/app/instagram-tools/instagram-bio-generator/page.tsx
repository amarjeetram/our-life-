import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InstagramBioClient from "@/components/InstagramBioClient";
import ArticleInstagramBio from "@/components/articles/ArticleInstagramBio";

const SITE = "https://smarttoolswala.com";
const PAGE_URL = `${SITE}/instagram-tools/instagram-bio-generator`;

export const metadata: Metadata = {
    title: "Instagram Bio Generator – Create Stylish, Cool & Classy Bios",
    description: "Looking for an instagram bio generator? Create stylish, cool, and classy bios for boys and girls instantly. Free tool for attitude and cute profile quotes.",
    keywords: "instagram bio generator, instagram bio, instagram bio for boys, instagram bio for girls, instagram bio style, classy instagram bio, instagram bio ideas, instagram bio for boys stylish, best instagram bio",
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: "Instagram Bio Generator – Create Stylish, Cool & Classy Bios",
        description: "Create stylish, cool, and classy bios for boys and girls instantly. Free tool for attitude and cute profile quotes.",
        url: PAGE_URL,
        siteName: "SmartToolsWala",
        type: "website",
    },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Instagram Bio Generator",
      "url": "https://smarttoolswala.com/instagram-tools/instagram-bio-generator",
      "description": "Free Instagram bio generator tool to create stylish, cool, classy, funny, and professional Instagram bios instantly.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires a modern web browser",
      "isAccessibleForFree": true,
      "featureList": [
        "Generate 3 Instagram bio ideas instantly",
        "Supports multiple tones like professional, funny, aesthetic, bold, and minimalist",
        "Works for personal, creator, and business accounts",
        "One-click copy",
        "150-character optimized bios"
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    },
    {
      "@type": "Article",
      "headline": "Instagram Bio Generator – Create Stylish, Cool & Classy Bios",
      "description": "Use this free Instagram Bio Generator to create stylish, classy, funny, aesthetic, and attitude bios for boys, girls, creators, and brands.",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://smarttoolswala.com/instagram-tools/instagram-bio-generator"
      },
      "author": {
        "@type": "Organization",
        "name": "SmartToolsWala"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SmartToolsWala",
        "logo": {
          "@type": "ImageObject",
          "url": "https://smarttoolswala.com/logo.png"
        }
      },
      "datePublished": "2026-03-28",
      "dateModified": "2026-03-28",
      "inLanguage": "en",
      "image": "https://smarttoolswala.com/images/instagram-bio-generator.jpg"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an Instagram bio generator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An Instagram bio generator is a free tool that helps you create stylish, engaging, and copy-ready Instagram bios instantly based on your keywords, category, and tone."
          }
        },
        {
          "@type": "Question",
          "name": "How do I create the best Instagram bio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To create a strong Instagram bio, keep it short, add your niche or personality, use a few relevant emojis, and include a simple call to action like 'DM for collabs' or 'Link below'."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best Instagram bio for boys?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The best Instagram bio for boys should show personality, hobbies, or confidence in a short format. For example: 'Living life on my own terms 🚀 | Tech Geek 💻 | Fitness 🏋️ | 📍 Mumbai'."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best Instagram bio for girls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A great Instagram bio for girls can be aesthetic, simple, classy, or expressive. Example: 'Creating my own sunshine ✨ | Fashion & Art 🎨 | She/Her | 💌 DM for collab'."
          }
        },
        {
          "@type": "Question",
          "name": "How can I make my Instagram bio stylish?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can make your Instagram bio stylish by using clean spacing, line breaks, emojis, simple symbols, and readable stylish fonts for your name or headline."
          }
        },
        {
          "@type": "Question",
          "name": "Can I generate Instagram bios with stylish fonts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This tool creates the bio text structure and ideas. You can copy the result and paste it into a stylish font generator if you want a custom text style."
          }
        },
        {
          "@type": "Question",
          "name": "What are some classy Instagram bio ideas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Classy Instagram bios usually focus on elegance, confidence, and simplicity. Example: 'Elegance is an attitude 🕊️ | Founder at XYZ | Building brands | Let's connect 👇'."
          }
        },
        {
          "@type": "Question",
          "name": "What are good Instagram bio quotes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Short and meaningful quotes work best in Instagram bios. Examples include: 'Do it with passion or not at all' and 'Whatever is good for your soul, do that'."
          }
        },
        {
          "@type": "Question",
          "name": "How long should an Instagram bio be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Instagram bios can be up to 150 characters, so it is best to keep them short, clear, and easy to read."
          }
        },
        {
          "@type": "Question",
          "name": "Can I copy and paste generated bios directly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can copy any generated bio and paste it directly into the Edit Profile section of your Instagram account."
          }
        },
        {
          "@type": "Question",
          "name": "What should I write in an attitude Instagram bio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An attitude Instagram bio should be short, confident, and impactful. Example: 'I don’t follow rules, I make them 🦁 | King of my own world 👑'."
          }
        },
        {
          "@type": "Question",
          "name": "Are simple Instagram bios better?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simple Instagram bios often work very well because they are clean, readable, and easy to remember. They are especially good for personal and minimalist profiles."
          }
        },
        {
          "@type": "Question",
          "name": "Can this tool generate bio ideas for girls and boys?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, this Instagram Bio Generator can create bios for boys, girls, creators, businesses, and many different styles and profile types."
          }
        },
        {
          "@type": "Question",
          "name": "How do I choose a good Instagram bio style?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Choose a bio style that matches your profile. Use aesthetic for visual profiles, professional for brands, funny for meme pages, and bold for attitude-based accounts."
          }
        },
        {
          "@type": "Question",
          "name": "Is this Instagram bio generator free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the SmartToolsWala Instagram Bio Generator is completely free to use, requires no signup, and gives instant results."
          }
        }
      ]
    }
  ]
};

const faqData = [
    { q: "How many bios does this generator create?", a: "It generates 3 unique bio ideas based on your category, tone, and keywords. You can edit and copy any of them." },
    { q: "What is the Instagram bio character limit?", a: "Instagram allows up to 150 characters in the bio section. Our tool automatically keeps all generated bios within this limit." },
    { q: "Can I use this tool on mobile?", a: "Yes! The Instagram Bio Generator is fully mobile-friendly and works perfectly on all devices including Android and iPhone." },
    { q: "Is this tool really free?", a: "Yes, 100% free — no signup required, no watermark, no hidden charges." },
    { q: "What categories are available?", a: "Personal, Business, Creator, Fashion, Music, Gaming, and Lifestyle. More categories will be added soon." },
];

export default function InstagramBioPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main style={{ minHeight: "100vh", background: "#fafafa", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.4, background: "radial-gradient(circle at 20% 10%, #fce7f3 0%, transparent 40%), radial-gradient(circle at 80% 80%, #ede9fe 0%, transparent 40%), radial-gradient(circle at 50% 50%, #fff7ed 0%, transparent 50%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(#1a1a2e 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
                <div style={{ maxWidth: 780, margin: "0 auto", padding: "100px 20px 60px", position: "relative", zIndex: 1 }}>
                    <Link href="/instagram-tools" style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontSize: 13, fontWeight: 700, color: "#7c3aed",
                        textDecoration: "none", marginBottom: 24,
                    }}>
                        <ArrowLeft size={14} /> Back to Instagram Tools
                    </Link>

                    <InstagramBioClient />

                    <ArticleInstagramBio />
                </div>
            </main>
        </>
    );
}

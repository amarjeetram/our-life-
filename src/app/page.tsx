import HomeClient from "@/components/HomeClient";
import BlogSection from "@/components/BlogSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};


export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://smarttoolswala.com/#organization",
        "name": "SmartToolsWala",
        "url": "https://smarttoolswala.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://smarttoolswala.com/logo.svg",
          "width": "512",
          "height": "512"
        },
        "description": "SmartToolsWala provides a suite of free, high-performance online utility tools including image compression, converters, and SEO tools.",
        "sameAs": [
          "https://twitter.com/smarttoolswala",
          "https://github.com/smarttoolswala",
          "https://www.youtube.com/@SmartToolsWala"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "contact@smarttoolswala.com",
          "url": "https://smarttoolswala.com/contact"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://smarttoolswala.com/#website",
        "name": "SmartToolsWala",
        "url": "https://smarttoolswala.com/",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://smarttoolswala.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://smarttoolswala.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient>
        <BlogSection />
      </HomeClient>
    </>
  );
}


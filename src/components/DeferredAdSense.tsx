"use client";

import Script from "next/script";

// Loads the AdSense script immediately after the page becomes interactive.
// Removed the interaction-gate (scroll/mousemove listeners) because it was
// preventing Google Auto Ads from initializing correctly, which was causing
// near-zero ad impressions across the entire site.
export default function DeferredAdSense() {
    return (
        <Script
            id="adsense-script"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7117465882400046"
            strategy="afterInteractive"
            crossOrigin="anonymous"
        />
    );
}

"use client";

import Script from "next/script";

export default function DeferredGTM() {
    return (
        <>
            <Script id="gtm-script" src="https://www.googletagmanager.com/gtag/js?id=G-L992WKXBPV" strategy="lazyOnload" />
            <Script id="google-analytics" strategy="lazyOnload">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-L992WKXBPV');
        `}
            </Script>

            {/* Google AdSense Deferred Script */}
            <Script
                id="adsense-script"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7117465882400046"
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />
        </>
    );
}

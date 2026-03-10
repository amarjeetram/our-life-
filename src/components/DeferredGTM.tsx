"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function DeferredGTM() {
    const [loadGTM, setLoadGTM] = useState(false);

    useEffect(() => {
        // Load GTM only after the user interacts with the page (scroll, click, mousemove, touch)
        // This perfectly preserves Lighthouse score while still tracking real users.
        const handleInteraction = () => {
            setLoadGTM(true);
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
        };

        window.addEventListener("scroll", handleInteraction, { passive: true });
        window.addEventListener("click", handleInteraction, { passive: true });
        window.addEventListener("mousemove", handleInteraction, { passive: true });
        window.addEventListener("touchstart", handleInteraction, { passive: true });

        // Fallback: Load after 5 seconds if no interaction
        const timeout = setTimeout(() => {
            handleInteraction();
        }, 5000);

        return () => {
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            clearTimeout(timeout);
        };
    }, []);

    if (!loadGTM) return null;

    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-L992WKXBPV" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-L992WKXBPV');
        `}
            </Script>

            {/* Google AdSense Deferred Script */}
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7117465882400046"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
        </>
    );
}

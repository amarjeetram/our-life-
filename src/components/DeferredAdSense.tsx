"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function DeferredAdSense() {
    const [loadAd, setLoadAd] = useState(false);

    useEffect(() => {
        const handleInteraction = () => {
            setLoadAd(true);
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
        };

        window.addEventListener("scroll", handleInteraction, { passive: true, once: true });
        window.addEventListener("mousemove", handleInteraction, { passive: true, once: true });
        window.addEventListener("touchstart", handleInteraction, { passive: true, once: true });
        window.addEventListener("keydown", handleInteraction, { passive: true, once: true });

        // Fallback for dynamic load after 6 seconds of idle reading
        const timeout = setTimeout(handleInteraction, 6000);

        return () => {
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
            clearTimeout(timeout);
        };
    }, []);

    if (!loadAd) return null;

    return (
        <Script
            id="adsense-script"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7117465882400046"
            strategy="afterInteractive"
            crossOrigin="anonymous"
        />
    );
}

'use client';
import { useEffect, useState, useRef } from 'react';

type AdBannerProps = {
    dataAdSlot?: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: string;
    className?: string;
};

export default function AdBanner({
    dataAdSlot = "9681118312", // Default to the provided STW Banner Ads slot
    dataAdFormat = 'auto',
    dataFullWidthResponsive = 'true',
    className = '',
}: AdBannerProps) {
    const [isMounted, setIsMounted] = useState(false);
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Never call adsbygoogle in development mode since placeholder is rendered
        if (process.env.NODE_ENV === 'development') return;

        if (isMounted && adRef.current) {
            // If this ins element already has an ad or status, don't push again
            if (
                adRef.current.getAttribute('data-adsbygoogle-status') ||
                adRef.current.innerHTML.trim().length > 0
            ) {
                return;
            }

            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch {
                // Ignore duplicate or already-filled TagErrors silently
            }
        }
    }, [isMounted, dataAdSlot]);

    // Check if the provided slot is numeric (valid for AdSense)
    // Non-numeric slots (like "slot_blog_top") are treated as placeholders and fallback to default
    const isNumeric = /^\d+$/.test(dataAdSlot);
    const activeAdSlot = isNumeric ? dataAdSlot : "9681118312";

    // Show a visible placeholder during local development
    if (process.env.NODE_ENV === 'development') {
        return (
            <div className={`w-full flex justify-center items-center overflow-hidden my-6 min-h-[250px] bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-lg ${className}`}>
                <div className="text-center">
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">AdSense Advertisement</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Slot: {activeAdSlot} ({isNumeric ? 'Custom' : 'Fallback Default'})</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full flex justify-center overflow-hidden my-6 min-h-[250px] ${className}`}>
            {isMounted ? (
                <ins
                    ref={adRef}
                    key={activeAdSlot}
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%' }}
                    data-ad-client="ca-pub-7117465882400046"
                    data-ad-slot={activeAdSlot}
                    data-ad-format={dataAdFormat}
                    data-full-width-responsive={dataFullWidthResponsive}
                />
            ) : (
                // Render a stable placeholder with exact same dimensions during server-side render & hydration
                <div style={{ display: 'block', width: '100%', minHeight: '250px' }} />
            )}
        </div>
    );
}

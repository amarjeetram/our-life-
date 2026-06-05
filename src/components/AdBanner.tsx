'use client';
import { useEffect } from 'react';
import Script from 'next/script';

type AdBannerProps = {
    dataAdSlot?: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: string;
    className?: string;
};

export default function AdBanner({
    dataAdSlot = "7477322886", // Default to the provided STW Banner Ads slot
    dataAdFormat = 'auto',
    dataFullWidthResponsive = 'true',
    className = '',
}: AdBannerProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error', err);
        }
    }, []);

    // Show a visible placeholder during local development
    if (process.env.NODE_ENV === 'development') {
        return (
            <div className={`w-full flex justify-center items-center overflow-hidden my-6 min-h-[250px] bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg ${className}`}>
                <div className="text-center">
                    <p className="text-slate-500 font-bold text-lg">AdSense Advertisement</p>
                    
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full flex justify-center overflow-hidden my-6 min-h-[250px] ${className}`}>
            {/* AdSense Script loaded once globally via Next.js Script deduplication */}
            <Script
                id="adsbygoogle-init"
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7117465882400046"
                crossOrigin="anonymous"
            />
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-7117465882400046"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive}
            />
        </div>
    );
}

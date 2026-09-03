// NOTE: GA must NOT be deferred — every page view must be tracked immediately.
// Using afterInteractive so it loads as soon as JS is hydrated, not on user interaction.
import Script from "next/script";

export default function DeferredGTM() {
    return (
        <>
            <Script
                id="gtm-script"
                src="https://www.googletagmanager.com/gtag/js?id=G-L992WKXBPV"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-L992WKXBPV', {
                        send_page_view: true,
                        transport_type: 'beacon'
                    });
                `}
            </Script>
        </>
    );
}

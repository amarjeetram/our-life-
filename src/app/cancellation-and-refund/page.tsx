import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;


export const metadata: Metadata = {
    title: "Cancellation & Refund Policy | SmartToolsWala",
    description: "Cancellation and refund policy for SmartToolsWala services.",
};

export default function CancellationAndRefundPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#fafbff", fontFamily: "system-ui, sans-serif" }}>
            <div style={{
                background: "linear-gradient(160deg, #f8faff 0%, #ede9fe 60%, #faf5ff 100%)",
                padding: "80px 20px 60px", textAlign: "center", borderBottom: "1px solid #e8eaf0"
            }}>
                <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1" }}>
                    Legal
                </span>
                <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginTop: "10px", marginBottom: "16px" }}>
                    Cancellation & Refund
                </h1>
                <p style={{ fontSize: "17px", color: "#64748b", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                    Since SmartToolsWala is a completely free online service, cancellation and refunds are generally not applicable.
                </p>
            </div>

            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px" }}>
                {[
                    {
                        title: "1. Free Service",
                        body: "SmartToolsWala provides all of its core image compression and optimization services entirely free of charge. You do not need a subscription, credit card, or payment of any kind to use our available tools."
                    },
                    {
                        title: "2. No Billing or Subscriptions",
                        body: "Because our users are not charged for our services, there are no subscriptions or active billing cycles to cancel. You can simply close the browser and stop using the website at any time."
                    },
                    {
                        title: "3. Refunds",
                        body: "As no payments are collected by SmartToolsWala for compressing or downloading files, refund requests are not applicable."
                    },
                    {
                        title: "4. Premium/Future Services",
                        body: "If we ever introduce paid premium features in the future, a detailed cancellation and refund framework will be clearly defined and presented to users prior to any purchase."
                    }
                ].map((s) => (
                    <div key={s.title} style={{ marginBottom: "40px" }}>
                        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "10px", letterSpacing: "-0.01em" }}>{s.title}</h2>
                        <p style={{ fontSize: "16px", color: "#475569", lineHeight: 1.8 }}>{s.body}</p>
                    </div>
                ))}

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
                    <Link href="/contact-us" style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                        Contact Us
                    </Link>
                    <Link href="/" style={{ padding: "12px 24px", borderRadius: "12px", background: "#f1f5f9", color: "#374151", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}

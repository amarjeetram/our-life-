import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Shipping Policy | SmartToolsWala",
    description: "Shipping and delivery policy for SmartToolsWala. All of our services are fully digital and immediate.",
};

export default function ShippingPolicyPage() {
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
                    Shipping & Delivery
                </h1>
                <p style={{ fontSize: "17px", color: "#64748b", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                    Since SmartToolsWala is a digital utility website, there are no physical goods to be shipped.
                </p>
            </div>

            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px" }}>
                {[
                    {
                        title: "1. Digital Service Only",
                        body: "SmartToolsWala operates entirely online as a digital utility suite. We do not manufacture, sell, or ship any physical products."
                    },
                    {
                        title: "2. Delivery of Output",
                        body: "When you upload an image for compression or optimization, the delivery of the processed file happens instantly over the internet. You download your final file directly from your browser as soon as the processing is complete."
                    },
                    {
                        title: "3. No Delivery Charges",
                        body: "Because our goods are digital data downloaded directly after processing, there are no shipping charges, delivery timeframes, or shipping procedures."
                    },
                    {
                        title: "4. Technical Issues",
                        body: "If your processed image does not start downloading automatically, a manual 'Download' button is provided. If you face continued technical errors with downloading, please check your browser network settings or reach out via our Contact Us page."
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

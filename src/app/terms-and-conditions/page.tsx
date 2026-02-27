import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms & Conditions | SmartToolsWala",
    description: "Terms and conditions for using SmartToolsWala services and tools.",
};

export default function TermsAndConditionsPage() {
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
                    Terms & Conditions
                </h1>
                <p style={{ fontSize: "17px", color: "#64748b", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                    By using SmartToolsWala, you agree to the following terms and conditions.
                </p>
            </div>

            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px" }}>
                {[
                    {
                        title: "1. Acceptance of Terms",
                        body: "By accessing and using SmartToolsWala, you accept and agree to be bound by the terms and provisions of this agreement."
                    },
                    {
                        title: "2. Use of the Site",
                        body: "SmartToolsWala is provided for personal and non-commercial use. You agree not to misuse our service by attempting to overload the server, reverse engineer the platform, or submit malicious data."
                    },
                    {
                        title: "3. Service Availability",
                        body: "We aim to ensure the service is available at all times. However, we do not guarantee uninterrupted access and reserve the right to suspend or restrict access at any time without notice."
                    },
                    {
                        title: "4. Limitations of Liability",
                        body: "Under no circumstances shall SmartToolsWala be liable for any direct, indirect, special, incidental or consequential damages, including, but not limited to, loss of data or profit, arising out of the use of our image processing tools."
                    },
                    {
                        title: "5. Modifications",
                        body: "SmartToolsWala may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the current version of these terms."
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

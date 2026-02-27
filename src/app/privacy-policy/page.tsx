import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | SmartToolsWala",
    description: "Privacy Policy for SmartToolsWala. Learn how we handle your data securely. No images are stored on our servers.",
};

export default function PrivacyPolicyPage() {
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
                    Privacy Policy
                </h1>
                <p style={{ fontSize: "17px", color: "#64748b", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                    Last updated: February 2026. We respect your privacy. All file processing happens dynamically.
                </p>
            </div>

            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px" }}>
                {[
                    {
                        title: "1. Information Collection",
                        body: "When you use SmartToolsWala to compress or optimize images, we do not require you to create an account, provide your name, email, or any personal details. Our service is completely anonymous."
                    },
                    {
                        title: "2. Image Processing & Storage",
                        body: "Any image you upload is processed entirely on the server memory (RAM) dynamically. Once the compressed image is sent back to your browser, the file data is instantly discarded. We do not store, view, or share your images."
                    },
                    {
                        title: "3. Cookies and Analytics",
                        body: "We may use basic cookies or analytics tools (like Google Analytics) to monitor website traffic and performance. These tools collect standard internet log information and visitor behavior information in an anonymous form."
                    },
                    {
                        title: "4. Third-Party Links",
                        body: "Our website may contain links to third-party websites (like in our blog). We are not responsible for the privacy practices or the content of these third-party websites."
                    },
                    {
                        title: "5. Policy Updates",
                        body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page."
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

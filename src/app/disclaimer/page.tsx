import type { Metadata } from "next";
import Link from "next/link";



export const metadata: Metadata = {
    title: "Disclaimer | SmartToolsWala",
    description: "Read the disclaimer for SmartToolsWala. Understand limitations, third-party links, and usage terms for our free image compression tools.",
};

export default function DisclaimerPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#fafbff", fontFamily: "system-ui, sans-serif" }}>
            {/* Hero */}
            <div style={{
                background: "linear-gradient(160deg, #f8faff 0%, #ede9fe 60%, #faf5ff 100%)",
                padding: "80px 20px 60px", textAlign: "center", borderBottom: "1px solid #e8eaf0"
            }}>
                <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1" }}>
                    Legal
                </span>
                <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginTop: "10px", marginBottom: "16px" }}>
                    Disclaimer
                </h1>
                <p style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "480px", margin: "0 auto" }}>
                    Last updated: February 2026
                </p>
            </div>

            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px" }}>

                {[
                    {
                        title: "General Information",
                        body: "The information and tools provided on SmartToolsWala (smarttoolswala.com) are for general informational and utility purposes only. We make no warranty of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the services provided."
                    },
                    {
                        title: "Tool Accuracy",
                        body: "While we strive to ensure our image compression tools produce accurate results, output file sizes may vary slightly based on image content, format, and compression settings. We recommend verifying the final file size before submission to government portals or official forms."
                    },
                    {
                        title: "File Privacy",
                        body: "Files uploaded to SmartToolsWala are processed on our servers and immediately deleted after the compression is complete. We do not store, share, or sell your uploaded images. However, you are responsible for the content of files you upload."
                    },
                    {
                        title: "Third-Party Links",
                        body: "Our website may contain links to third-party websites, including government portals and external resources. These links are provided for convenience only. We have no control over the content or privacy practices of those websites and accept no responsibility for them."
                    },
                    {
                        title: "Limitation of Liability",
                        body: "SmartToolsWala shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services. Use of our tools is entirely at your own risk."
                    },
                    {
                        title: "Changes to This Disclaimer",
                        body: "We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated date. Continued use of our website constitutes acceptance of any revised disclaimer."
                    }
                ].map((s) => (
                    <div key={s.title} style={{ marginBottom: "36px", paddingBottom: "36px", borderBottom: "1px solid #f1f5f9" }}>
                        <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>{s.title}</h2>
                        <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8 }}>{s.body}</p>
                    </div>
                ))}

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
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

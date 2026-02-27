import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us | SmartToolsWala",
    description: "Learn about SmartToolsWala — India's #1 free image compression tool. Built for UPSC, SSC, banking, and web use. No signup required.",
};

export default function AboutPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#fafbff", fontFamily: "system-ui, sans-serif" }}>
            {/* Hero */}
            <div style={{
                background: "linear-gradient(160deg, #f8faff 0%, #ede9fe 60%, #faf5ff 100%)",
                padding: "80px 20px 60px", textAlign: "center", borderBottom: "1px solid #e8eaf0"
            }}>
                <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1" }}>
                    About Us
                </span>
                <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginTop: "10px", marginBottom: "16px" }}>
                    Who We Are
                </h1>
                <p style={{ fontSize: "17px", color: "#64748b", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                    SmartToolsWala is an India-based free online image compression platform built to help students, professionals, and developers compress images instantly — no signup, no limits.
                </p>
            </div>

            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px" }}>

                {[
                    {
                        title: "Our Mission",
                        body: "We make image compression simple, fast, and free for everyone in India. Whether you're applying for a government job, a bank form, or college admission — SmartToolsWala ensures your image meets the exact file size requirement without losing quality."
                    },
                    {
                        title: "Who We Built This For",
                        body: "UPSC, SSC, IBPS, railway, defense, and state government applicants who need images under a specific KB limit. Web developers and designers who need lightweight images. Students and professionals who need quick, hassle-free compression."
                    },
                    {
                        title: "Technology",
                        body: "Our compression engine is powered by Sharp — an industry-grade image processing library. We process files entirely on secure servers and delete them immediately after compression. Your files are never stored or shared."
                    },
                    {
                        title: "Contact & Feedback",
                        body: "We're constantly improving based on user feedback. If you face any issue, want to request a feature, or just want to say hi — head over to our Contact Us page."
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

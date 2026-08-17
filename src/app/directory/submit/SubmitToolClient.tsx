"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, SignInButton } from "@clerk/nextjs";
import {
  Sparkles, Globe, Tag, FileText, Link2, CheckCircle, ChevronDown, Loader2,
  ArrowLeft, ArrowRight, Image as ImageIcon, Code2, Share2, Cpu,
  Check, X, Zap, Award, Flame, Shield, Star, Crown, Clock, ExternalLink
} from "lucide-react";
import type { DirCategory, PricingType, SocialPlatform } from "@/types/directory";

const PRICING_OPTIONS: { value: PricingType; label: string; desc: string }[] = [
  { value: "free", label: "Free", desc: "No payment required" },
  { value: "freemium", label: "Freemium", desc: "Free tier + paid plans" },
  { value: "paid", label: "Paid", desc: "Requires subscription" },
  { value: "lifetime", label: "Lifetime Deal", desc: "One-time payment" },
  { value: "open_source", label: "Open Source", desc: "Free & open code" },
];

const SOCIAL_PLATFORMS: SocialPlatform[] = ["twitter", "github", "linkedin", "youtube", "discord"];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px",
  background: "var(--bg-tertiary)", border: "1px solid var(--border-light)",
  borderRadius: "12px", fontSize: "14px", color: "var(--text-primary)",
  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
};

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "36px", justifyContent: "center" }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "13px", transition: "all 0.3s",
            background: i < step ? "var(--brand-primary)" : i === step ? "linear-gradient(135deg, #f97316, #ef4444)" : "var(--bg-tertiary)",
            color: i <= step ? "white" : "var(--text-tertiary)",
            boxShadow: i === step ? "0 0 0 4px rgba(249,115,22,0.2)" : "none" }}>
            {i < step ? <CheckCircle size={16} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div style={{ width: "48px", height: "2px", background: i < step ? "var(--brand-primary)" : "var(--border-light)", transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, htmlFor, hint, required, children }: { label: string; htmlFor: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label htmlFor={htmlFor} style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {hint && <span style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "-4px" }}>{hint}</span>}
      {children}
    </div>
  );
}

interface SubmitToolClientProps { categories: DirCategory[]; }

export default function SubmitToolClient({ categories }: SubmitToolClientProps) {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro">("pro");

  const [form, setForm] = useState({
    name: "", tagline: "", description_short: "", description_long: "",
    website_url: "", logo_url: "", cover_url: "",
    category_id: "", pricing_type: "" as PricingType | "",
    starting_price: "", currency: "USD",
    ai_models: "", features: "", use_cases: "", tags: "",
    contact_email: user?.primaryEmailAddress?.emailAddress ?? "",
    support_url: "", docs_url: "", video_demo_url: "",
    is_open_source: false, has_api: false, has_mobile_app: false, has_chrome_ext: false,
    twitter: "", github: "", linkedin: "", youtube: "", discord: "",
    screenshot_url: "", screenshot_alt: "",
    meta_title: "", meta_description: "",
  });

  const update = (key: string, val: string | boolean) => setForm(p => ({ ...p, [key]: val }));

  const STEPS = ["Basic Info", "Details", "Features", "Media & Social", "Review"];

  const handleNext = () => {
    setError("");
    if (step === 0) {
      if (!form.name.trim()) return setError("Tool name is required.");
      if (!form.website_url.trim()) return setError("Website URL is required.");
      if (!form.description_short.trim()) return setError("Short description is required.");
      if (!form.pricing_type) return setError("Please select a pricing type.");
      try { new URL(form.website_url); } catch { return setError("Invalid website URL."); }
    }
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenPlanModal = () => {
    setError("");
    setShowPlanModal(true);
  };

  const executeSubmit = async (plan: "free" | "pro") => {
    setSelectedPlan(plan);
    setLoading(true); setError("");
    try {
      const social_links = SOCIAL_PLATFORMS
        .filter(p => form[p as keyof typeof form])
        .map(p => ({ platform: p, url: form[p as keyof typeof form] as string }));

      const screenshots = form.screenshot_url ? [{ url: form.screenshot_url, alt: form.screenshot_alt || undefined }] : [];

      const res = await fetch("/api/directory/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          tagline: form.tagline.trim() || undefined,
          description_short: form.description_short.trim(),
          description_long: form.description_long.trim() || undefined,
          website_url: form.website_url.trim(),
          logo_url: form.logo_url.trim() || undefined,
          cover_url: form.cover_url.trim() || undefined,
          category_id: form.category_id || undefined,
          pricing_type: form.pricing_type || "free",
          starting_price: form.starting_price ? Number(form.starting_price) : undefined,
          currency: form.currency,
          ai_models: form.ai_models.split(",").map(s => s.trim()).filter(Boolean),
          features: form.features.split("\n").map(s => s.trim()).filter(Boolean),
          use_cases: form.use_cases.split("\n").map(s => s.trim()).filter(Boolean),
          tags: form.tags.split(",").map(s => s.trim()).filter(Boolean),
          contact_email: form.contact_email.trim() || undefined,
          support_url: form.support_url.trim() || undefined,
          docs_url: form.docs_url.trim() || undefined,
          video_demo_url: form.video_demo_url.trim() || undefined,
          is_open_source: form.is_open_source,
          has_api: form.has_api,
          has_mobile_app: form.has_mobile_app,
          has_chrome_ext: form.has_chrome_ext,
          meta_title: form.meta_title.trim() || undefined,
          meta_description: form.meta_description.trim() || undefined,
          social_links,
          screenshots,
          is_featured: plan === "pro",
          submission_plan: plan,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Submission failed."); return; }
      setShowPlanModal(false);
      setSubmitted(true);
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  // If user has not chosen a plan yet, show the Plan Selection screen first!
  const [chosenPlan, setChosenPlan] = useState<"free" | "pro" | null>(null);

  // If user picks a plan from the initial screen
  const handleSelectInitialPlan = (plan: "free" | "pro") => {
    setChosenPlan(plan);
    setSelectedPlan(plan);
    setStep(1); // Move to Step 1 (Basic Info)
  };

  // Not signed in gate — shown when user has chosen a plan but needs to authenticate
  if (!isSignedIn && chosenPlan) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 20px 40px" }}>
        <div className="glass-card" style={{ borderRadius: "24px", padding: "48px 40px", textAlign: "center", maxWidth: "520px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: chosenPlan === "pro" ? "linear-gradient(135deg, #6366f1, #06b6d4)" : "linear-gradient(135deg, #f97316, #ef4444)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            {chosenPlan === "pro" ? <Crown size={32} color="white" /> : <Sparkles size={32} color="white" />}
          </div>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", marginBottom: "12px", background: chosenPlan === "pro" ? "rgba(99,102,241,0.15)" : "rgba(249,115,22,0.15)", color: chosenPlan === "pro" ? "#818cf8" : "#f97316", border: chosenPlan === "pro" ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(249,115,22,0.3)" }}>
            {chosenPlan === "pro" ? "🔥 PRO FEATURED PLAN SELECTED ($29)" : "✅ FREE STANDARD PLAN SELECTED ($0)"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-primary)", marginBottom: "12px" }}>Sign In to Submit Your Tool</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "28px", lineHeight: 1.6 }}>
            Please sign in or create an account to complete your tool details and submit under the <strong>{chosenPlan === "pro" ? "Pro Featured" : "Free Standard"}</strong> plan.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <SignInButton mode="modal">
              <button className="btn-primary" style={{ borderRadius: "14px", padding: "14px 28px", width: "100%", justifyContent: "center", fontSize: "15px", fontWeight: 800 }}>
                Sign In to Continue
              </button>
            </SignInButton>
            <button onClick={() => setChosenPlan(null)} style={{ background: "transparent", border: "none", color: "var(--text-tertiary)", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>
              ← Change Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 20px 40px" }}>
        <div style={{ textAlign: "center", maxWidth: "560px", padding: "0 20px" }}>
          <div style={{ width: "84px", height: "84px", borderRadius: "50%", background: selectedPlan === "pro" ? "linear-gradient(135deg, #6366f1, #06b6d4)" : "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: selectedPlan === "pro" ? "0 0 30px rgba(99,102,241,0.5)" : "0 0 24px rgba(16,185,129,0.3)" }}>
            {selectedPlan === "pro" ? <Crown size={42} color="white" /> : <CheckCircle size={42} color="white" />}
          </div>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "12px", background: selectedPlan === "pro" ? "rgba(99,102,241,0.15)" : "rgba(16,185,129,0.15)", color: selectedPlan === "pro" ? "#818cf8" : "#10b981", border: selectedPlan === "pro" ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(16,185,129,0.3)" }}>
            {selectedPlan === "pro" ? "🔥 PRO FEATURED SUBMISSION" : "✅ FREE STANDARD SUBMISSION"}
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "var(--text-primary)", marginBottom: "16px" }}>{selectedPlan === "pro" ? "Featured Tool Submitted!" : "Tool Submitted!"}</h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "32px" }}>
            <strong style={{ color: "var(--text-primary)" }}>{form.name}</strong> has been successfully submitted. We sent a receipt to <strong>{form.contact_email}</strong>.
            {selectedPlan === "pro" ? <span style={{ display: "block", marginTop: "12px", color: "#818cf8", fontWeight: 600 }}>⚡ Priority 24-Hour Express Queue Active!</span> : <span style={{ display: "block", marginTop: "12px", color: "var(--text-tertiary)" }}>Standard review takes 3–5 business days.</span>}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => router.push("/directory/dashboard/my-tools")} className="btn-primary" style={{ borderRadius: "14px", padding: "13px 28px" }}>View My Tools</button>
            <button onClick={() => router.push("/directory")} style={{ padding: "12px 24px", background: "var(--bg-primary)", border: "1px solid var(--border-light)", borderRadius: "14px", cursor: "pointer", fontWeight: 600, color: "var(--text-secondary)" }}>Browse Directory</button>
          </div>
        </div>
      </div>
    );
  }

  // If user hasn't chosen a plan yet, render the full Plan Selection screen!
  if (!chosenPlan) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-secondary)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "940px", margin: "0 auto", padding: "0 20px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.12))",
              border: "1px solid rgba(99,102,241,0.3)", borderRadius: "100px", padding: "6px 18px", marginBottom: "16px"
            }}>
              <Sparkles size={14} color="#818cf8" />
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#818cf8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                🚀 CHOOSE YOUR LISTING PACKAGE
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: "12px" }}>
              Submit Your AI Tool to Our Directory
            </h1>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.6 }}>
              Reach thousands of developers, creators & early adopters daily. Pick a plan to get started.
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px", marginBottom: "36px" }}>

            {/* FREE PLAN CARD */}
            <div className="glass-card" style={{
              borderRadius: "28px", padding: "34px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between",
              border: "1px solid var(--border-light)", transition: "all 0.3s"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>Standard Listing</span>
                  <span style={{ fontSize: "11px", fontWeight: 800, padding: "4px 12px", borderRadius: "100px", background: "rgba(255,255,255,0.08)", color: "var(--text-tertiary)", border: "1px solid var(--border-light)" }}>
                    FREE
                  </span>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <span style={{ fontSize: "42px", fontWeight: 900, color: "var(--text-primary)" }}>$0</span>
                  <span style={{ fontSize: "13px", color: "var(--text-tertiary)", marginLeft: "6px" }}>free forever</span>
                </div>

                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "24px" }}>
                  Basic directory listing with standard manual review queue. Ideal for indie side-projects.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}>
                  {[
                    { text: "Standard Directory Listing", ok: true },
                    { text: "Public Product Profile Page", ok: true },
                    { text: "Up to 3 Category Tags", ok: true },
                    { text: "Manual Review Queue (3–5 Days)", ok: true },
                    { text: "Glowing Featured Card Badge", ok: false },
                    { text: "Top Search & Category Ranking", ok: false },
                    { text: "High-DA Do-Follow SEO Backlink", ok: false },
                    { text: "Home Page Bento Grid Spotlight", ok: false },
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}>
                      {f.ok ? (
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(16,185,129,0.15)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check size={12} />
                        </div>
                      ) : (
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(239,68,68,0.1)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <X size={12} />
                        </div>
                      )}
                      <span style={{ color: f.ok ? "var(--text-secondary)" : "var(--text-tertiary)", textDecoration: f.ok ? "none" : "line-through" }}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => handleSelectInitialPlan("free")}
                style={{
                  width: "100%", marginTop: "32px", padding: "15px",
                  background: "var(--bg-tertiary)", border: "1px solid var(--border-light)",
                  borderRadius: "16px", fontWeight: 800, fontSize: "15px", color: "var(--text-primary)",
                  cursor: "pointer", transition: "all 0.2s"
                }}>
                Submit Free Listing ($0) →
              </button>
            </div>

            {/* PRO FEATURED PLAN CARD */}
            <div style={{
              background: "linear-gradient(145deg, rgba(99,102,241,0.1) 0%, rgba(6,182,212,0.08) 100%)",
              borderRadius: "28px", border: "2px solid rgba(99,102,241,0.5)",
              padding: "34px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between",
              position: "relative", boxShadow: "0 16px 50px rgba(99,102,241,0.25)"
            }}>
              <div style={{
                position: "absolute", top: "-14px", right: "24px",
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                color: "white", fontSize: "11px", fontWeight: 900,
                padding: "5px 16px", borderRadius: "100px", letterSpacing: "0.06em",
                boxShadow: "0 4px 16px rgba(99,102,241,0.4)"
              }}>
                🔥 10x MORE VISIBILITY
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Crown size={20} color="#818cf8" /> Pro Featured Plan
                  </span>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <span style={{ fontSize: "42px", fontWeight: 900, background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    $29
                  </span>
                  <span style={{ fontSize: "13px", color: "var(--text-tertiary)", marginLeft: "6px" }}>one-time fee</span>
                </div>

                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "24px" }}>
                  Express 24h approval guarantee, top directory placement, do-follow SEO link & maximum launch reach.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid rgba(99,102,241,0.2)", paddingTop: "20px" }}>
                  {[
                    { text: "⚡ Express 24-Hour Review Guarantee", bold: true },
                    { text: "⭐ Glowing Featured Badge on Card", bold: true },
                    { text: "🔝 Top Priority Placement in Search & Categories", bold: true },
                    { text: "🔗 High-DA SEO Do-Follow Backlink", bold: true },
                    { text: "🚀 Featured on Home Page Bento Grid", bold: true },
                    { text: "📢 Social Media & Newsletter Spotlight", bold: true },
                    { text: "📊 Direct Traffic & Click Analytics", bold: true },
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={12} />
                      </div>
                      <span style={{ color: "var(--text-primary)", fontWeight: f.bold ? 700 : 500 }}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => handleSelectInitialPlan("pro")}
                style={{
                  width: "100%", marginTop: "32px", padding: "16px",
                  background: "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #06b6d4 100%)",
                  border: "none", borderRadius: "16px", fontWeight: 900, fontSize: "15px",
                  color: "white", cursor: "pointer",
                  boxShadow: "0 8px 28px rgba(99,102,241,0.5)", transition: "all 0.25s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                }}>
                <Sparkles size={18} /> Select Pro Featured ($29) →
              </button>
            </div>

          </div>

          <p style={{ fontSize: "13px", color: "var(--text-tertiary)", textAlign: "center", margin: 0 }}>
            🔒 Safe & secure submission. You can manage or upgrade your tool anytime from your developer dashboard.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-secondary)", paddingTop: "100px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(239,68,68,0.12))", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "100px", padding: "6px 16px", marginBottom: "16px" }}>
            <Sparkles size={14} color="#f97316" />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#f97316", letterSpacing: "0.08em", textTransform: "uppercase" }}>Step {step + 1} of {STEPS.length}</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: "8px" }}>
            {step === 0 && "Tell us about your tool"}
            {step === 1 && "Add more details"}
            {step === 2 && "Features & filters"}
            {step === 3 && "Media & social links"}
            {step === 4 && "Review & select plan"}
          </h1>
        </div>

        <StepIndicator step={step} total={STEPS.length} />

        {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "12px 16px", color: "#ef4444", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}>⚠️ {error}</div>}

        <div className="glass-card" style={{ borderRadius: "24px", padding: "clamp(24px, 4vw, 40px)" }}>
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <Field label="Tool Name" htmlFor="name" required><input id="name" value={form.name} onChange={e => update("name", e.target.value)} placeholder="e.g. ChatGPT" style={inputStyle} /></Field>
              <Field label="Website URL" htmlFor="website_url" required><input id="website_url" type="url" value={form.website_url} onChange={e => update("website_url", e.target.value)} placeholder="https://..." style={inputStyle} /></Field>
              <Field label="Short Description" htmlFor="desc_short" required><textarea id="desc_short" rows={3} value={form.description_short} onChange={e => update("description_short", e.target.value)} style={inputStyle} /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <Field label="Category" htmlFor="category"><div style={{ position: "relative" }}><select id="category" value={form.category_id} onChange={e => update("category_id", e.target.value)} style={{ ...inputStyle, appearance: "none" }}><option value="">Select category</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><ChevronDown size={14} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }} /></div></Field>
                <Field label="Pricing Type" htmlFor="pricing" required><div style={{ position: "relative" }}><select id="pricing" value={form.pricing_type} onChange={e => update("pricing_type", e.target.value)} style={{ ...inputStyle, appearance: "none" }}><option value="">Select pricing</option>{PRICING_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}</select><ChevronDown size={14} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }} /></div></Field>
              </div>
            </div>
          )}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <Field label="Long Description" htmlFor="desc_long"><textarea id="desc_long" rows={6} value={form.description_long} onChange={e => update("description_long", e.target.value)} style={inputStyle} /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}><Field label="Starting Price" htmlFor="starting_price"><input id="starting_price" type="number" value={form.starting_price} onChange={e => update("starting_price", e.target.value)} style={inputStyle} /></Field><Field label="Currency" htmlFor="currency"><input id="currency" value={form.currency} onChange={e => update("currency", e.target.value)} style={inputStyle} /></Field></div>
              <Field label="Logo Image URL" htmlFor="logo_url"><input id="logo_url" type="url" value={form.logo_url} onChange={e => update("logo_url", e.target.value)} style={inputStyle} /></Field>
            </div>
          )}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <Field label="AI Models Used" htmlFor="models"><input id="models" value={form.ai_models} onChange={e => update("ai_models", e.target.value)} style={inputStyle} /></Field>
              <Field label="Key Features" htmlFor="features"><textarea id="features" rows={4} value={form.features} onChange={e => update("features", e.target.value)} style={inputStyle} /></Field>
              <Field label="Use Cases" htmlFor="use_cases"><textarea id="use_cases" rows={3} value={form.use_cases} onChange={e => update("use_cases", e.target.value)} style={inputStyle} /></Field>
              <Field label="Tags / Keywords" htmlFor="tags"><input id="tags" value={form.tags} onChange={e => update("tags", e.target.value)} style={inputStyle} /></Field>
            </div>
          )}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <Field label="Contact Email" htmlFor="email" required><input id="email" type="email" value={form.contact_email} onChange={e => update("contact_email", e.target.value)} style={inputStyle} /></Field>
              <Field label="Cover Image URL" htmlFor="cover_url"><input id="cover_url" type="url" value={form.cover_url} onChange={e => update("cover_url", e.target.value)} style={inputStyle} /></Field>
              {SOCIAL_PLATFORMS.map(p => <Field key={p} label={`${p} URL`} htmlFor={p}><input id={p} value={form[p as keyof typeof form] as string} onChange={e => update(p, e.target.value)} style={inputStyle} /></Field>)}
            </div>
          )}
          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ background: "var(--bg-tertiary)", borderRadius: "16px", padding: "20px" }}>
                <div style={{ fontSize: "20px", fontWeight: 900 }}>{form.name}</div>
                <div style={{ color: "var(--text-secondary)" }}>{form.tagline}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", gap: "12px" }}>
          {step > 0 ? <button onClick={() => setStep(s => s - 1)} style={{ padding: "13px 24px", background: "var(--bg-primary)", border: "1px solid var(--border-light)", borderRadius: "14px", cursor: "pointer" }}>Back</button> : <div />}
          {step < STEPS.length - 1 ? <button onClick={handleNext} className="btn-primary" style={{ padding: "13px 28px", borderRadius: "14px" }}>Next</button> : (
            <button onClick={handleOpenPlanModal} disabled={loading} style={{ padding: "13px 32px", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", border: "none", borderRadius: "14px", fontWeight: 800, cursor: "pointer" }}>Choose Plan & Submit</button>
          )}
        </div>
      </div>

      {showPlanModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(14px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px", overflowY: "auto"
        }}>
          <div style={{
            maxWidth: "880px", width: "100%", background: "var(--bg-primary)",
            borderRadius: "28px", border: "1px solid var(--border-light)",
            padding: "clamp(24px, 4vw, 40px)", position: "relative",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7)", margin: "auto"
          }}>
            {/* Close Button */}
            <button onClick={() => setShowPlanModal(false)} style={{
              position: "absolute", top: "20px", right: "20px", background: "var(--bg-tertiary)",
              border: "1px solid var(--border-light)", color: "var(--text-tertiary)",
              width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s"
            }}>
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.12))",
                border: "1px solid rgba(99,102,241,0.3)", borderRadius: "100px", padding: "6px 18px", marginBottom: "14px"
              }}>
                <Sparkles size={14} color="#818cf8" />
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#818cf8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  🚀 Select Listing Package
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: "8px" }}>
                Choose Your Tool's Listing Plan
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}>
                Promote your AI tool to thousands of creators & software buyers daily. Select a plan to finalize submission.
              </p>
            </div>

            {/* Plans Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "24px" }}>

              {/* FREE PLAN */}
              <div style={{
                background: "var(--bg-secondary)", borderRadius: "24px", border: "1px solid var(--border-light)",
                padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)" }}>Standard Listing</span>
                    <span style={{ fontSize: "11px", fontWeight: 800, padding: "4px 10px", borderRadius: "100px", background: "rgba(255,255,255,0.08)", color: "var(--text-tertiary)" }}>
                      FREE
                    </span>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "36px", fontWeight: 900, color: "var(--text-primary)" }}>$0</span>
                    <span style={{ fontSize: "13px", color: "var(--text-tertiary)", marginLeft: "6px" }}>free forever</span>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "20px" }}>
                    Standard directory listing for free & indie projects.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid var(--border-light)", paddingTop: "16px" }}>
                    {[
                      { text: "Standard Directory Listing", ok: true },
                      { text: "Public Product Profile Page", ok: true },
                      { text: "Manual Queue (3–5 Days Review)", ok: true },
                      { text: "Glowing Featured Card Badge", ok: false },
                      { text: "Top Search & Filter Ranking", ok: false },
                      { text: "High-DA Do-Follow SEO Backlink", ok: false },
                      { text: "Home Page Bento Spotlight", ok: false },
                    ].map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                        {f.ok ? (
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(16,185,129,0.15)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Check size={11} />
                          </div>
                        ) : (
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(239,68,68,0.1)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <X size={11} />
                          </div>
                        )}
                        <span style={{ color: f.ok ? "var(--text-secondary)" : "var(--text-tertiary)", textDecoration: f.ok ? "none" : "line-through" }}>
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => executeSubmit("free")} disabled={loading}
                  style={{
                    width: "100%", marginTop: "24px", padding: "13px",
                    background: "var(--bg-tertiary)", border: "1px solid var(--border-light)",
                    borderRadius: "14px", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)",
                    cursor: loading ? "not-allowed" : "pointer"
                  }}>
                  {loading && selectedPlan === "free" ? <Loader2 size={16} className="animate-spin" /> : "Submit Free Listing ($0)"}
                </button>
              </div>

              {/* PRO FEATURED PLAN */}
              <div style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))",
                borderRadius: "24px", border: "2px solid rgba(99,102,241,0.5)",
                padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between",
                position: "relative", boxShadow: "0 12px 36px rgba(99,102,241,0.2)"
              }}>
                <div style={{
                  position: "absolute", top: "-12px", right: "20px",
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                  color: "white", fontSize: "10px", fontWeight: 900,
                  padding: "4px 12px", borderRadius: "100px", letterSpacing: "0.05em"
                }}>
                  🔥 10x MORE VISIBILITY
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Crown size={18} color="#818cf8" /> Pro Featured Plan
                    </span>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "36px", fontWeight: 900, background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      $29
                    </span>
                    <span style={{ fontSize: "13px", color: "var(--text-tertiary)", marginLeft: "6px" }}>one-time fee</span>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "20px" }}>
                    Express approval, top directory placement & maximum launch traffic.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid rgba(99,102,241,0.2)", paddingTop: "16px" }}>
                    {[
                      { text: "⚡ Express 24-Hour Review Guarantee", bold: true },
                      { text: "⭐ Glowing Featured Badge on Card", bold: true },
                      { text: "🔝 Top Priority Placement in Search", bold: true },
                      { text: "🔗 SEO Do-Follow Backlink (DA Boost)", bold: true },
                      { text: "🚀 Featured on Home Page Bento Grid", bold: true },
                      { text: "📢 Social Media & Newsletter Shoutout", bold: true },
                    ].map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check size={11} />
                        </div>
                        <span style={{ color: "var(--text-primary)", fontWeight: f.bold ? 700 : 500 }}>
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => executeSubmit("pro")} disabled={loading}
                  style={{
                    width: "100%", marginTop: "24px", padding: "13px",
                    background: "linear-gradient(135deg, #6366f1, #818cf8 50%, #06b6d4)",
                    border: "none", borderRadius: "14px", fontWeight: 800, fontSize: "14px",
                    color: "white", cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 6px 20px rgba(99,102,241,0.45)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
                  }}>
                  {loading && selectedPlan === "pro" ? (
                    <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                  ) : (
                    <><Sparkles size={16} /> Select Pro Featured ($29)</>
                  )}
                </button>
              </div>

            </div>

            <p style={{ fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center", margin: 0 }}>
              🔒 Safe & secure submission. You can manage or upgrade your tool anytime.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
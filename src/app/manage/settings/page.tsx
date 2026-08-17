// src/app/manage/settings/page.tsx
import { requireAdmin } from "@/lib/directory/auth";
import { Settings } from "lucide-react";

export default async function ManageSettingsPage() {
  await requireAdmin();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>
          Settings
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          Platform-wide settings and configuration.
        </p>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "80px 40px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.06)",
          color: "#475569",
        }}
      >
        <Settings size={40} style={{ marginBottom: 16, opacity: 0.4 }} />
        <p style={{ fontSize: 16, fontWeight: 600, color: "#64748b" }}>Settings Panel</p>
        <p style={{ fontSize: 13, marginTop: 6 }}>
          Coming soon — platform configuration options.
        </p>
      </div>
    </div>
  );
}

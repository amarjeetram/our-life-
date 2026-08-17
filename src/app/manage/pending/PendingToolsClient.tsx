"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ExternalLink, Clock, Tag } from "lucide-react";
import Image from "next/image";

interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description_short: string | null;
  website_url: string;
  category_id: string | null;
  status: string;
  created_at: string;
  pricing_type: string | null;
  logo_url: string | null;
  dir_categories: { name: string; color: string } | null;
}

export default function PendingToolsClient({ tools: initial }: { tools: Tool[] }) {
  const [tools, setTools] = useState(initial);
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (id: string, action: "approved" | "rejected") => {
    setLoading(id);
    try {
      const res = await fetch(`/api/manage/tools/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
      if (res.ok) {
        setTools((prev) => prev.filter((t) => t.id !== id));
      }
    } finally {
      setLoading(null);
    }
  };

  if (tools.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 40px",
          color: "#64748b",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <CheckCircle size={48} color="#10b981" style={{ marginBottom: 16, opacity: 0.5 }} />
        <p style={{ fontSize: 18, fontWeight: 600, color: "#94a3b8" }}>All caught up!</p>
        <p style={{ fontSize: 14, marginTop: 6 }}>No pending tools to review.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {tools.map((tool) => (
        <div
          key={tool.id}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "24px 28px",
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              background: "rgba(139,92,246,0.15)",
              flexShrink: 0,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            {tool.logo_url ? (
              <img
                src={tool.logo_url}
                alt={tool.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "🔧"
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
                {tool.name}
              </h3>
              {(() => {
                const cat = tool.dir_categories || (tool as any).category;
                if (!cat) return null;
                return (
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 20,
                      background: `${cat.color ?? "#8b5cf6"}22`,
                      color: cat.color ?? "#8b5cf6",
                      fontWeight: 600,
                    }}
                  >
                    {cat.name}
                  </span>
                );
              })()}
              {tool.pricing_type && (
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 20,
                    background: "rgba(16,185,129,0.15)",
                    color: "#10b981",
                    fontWeight: 600,
                  }}
                >
                  {tool.pricing_type}
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 6px" }}>{tool.tagline ?? ""}</p>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px" }}>
              {(tool.description_short ?? "").slice(0, 200)}
              {(tool.description_short?.length ?? 0) > 200 ? "…" : ""}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12,
                  color: "#8b5cf6",
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={12} />
                {tool.website_url.replace(/^https?:\/\//, "").slice(0, 40)}
              </a>
              <span style={{ fontSize: 12, color: "#475569", display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={11} />
                {new Date(tool.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button
              onClick={() => handleAction(tool.id, "approved")}
              disabled={loading === tool.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 18px",
                borderRadius: 10,
                background: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.35)",
                color: "#10b981",
                fontSize: 13,
                fontWeight: 700,
                cursor: loading === tool.id ? "not-allowed" : "pointer",
                opacity: loading === tool.id ? 0.6 : 1,
                transition: "all 0.15s ease",
              }}
            >
              <CheckCircle size={15} />
              Approve
            </button>
            <button
              onClick={() => handleAction(tool.id, "rejected")}
              disabled={loading === tool.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 18px",
                borderRadius: 10,
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444",
                fontSize: 13,
                fontWeight: 700,
                cursor: loading === tool.id ? "not-allowed" : "pointer",
                opacity: loading === tool.id ? 0.6 : 1,
                transition: "all 0.15s ease",
              }}
            >
              <XCircle size={15} />
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

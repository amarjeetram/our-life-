"use client";

import { useState } from "react";
import { Search, ExternalLink, CheckCircle, Clock, XCircle, Eye, TrendingUp } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  website_url: string;
  status: string;
  created_at: string;
  pricing_type: string | null;
  logo_url: string | null;
  votes_count: number;
  views_count: number;
  dir_categories: { name: string; color: string } | null;
}

const statusStyles: Record<string, { bg: string; color: string; icon: React.ElementType; label: string }> = {
  approved: { bg: "rgba(16,185,129,0.12)", color: "#10b981", icon: CheckCircle, label: "Approved" },
  pending: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", icon: Clock, label: "Pending" },
  rejected: { bg: "rgba(239,68,68,0.12)", color: "#ef4444", icon: XCircle, label: "Rejected" },
};

export default function ManageToolsClient({ tools }: { tools: Tool[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = tools.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = t.name.toLowerCase().includes(q) || (t.tagline ?? "").toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "10px 14px",
            flex: 1,
            minWidth: 220,
          }}
        >
          <Search size={15} color="#64748b" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#f1f5f9",
              fontSize: 14,
              flex: 1,
            }}
          />
        </div>
        {["all", "approved", "pending", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
              border: statusFilter === s ? "1px solid #8b5cf6" : "1px solid rgba(255,255,255,0.08)",
              background: statusFilter === s ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.04)",
              color: statusFilter === s ? "#c4b5fd" : "#64748b",
              textTransform: "capitalize",
            }}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 120px 80px 80px 80px",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            fontSize: 12,
            fontWeight: 600,
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <span>Tool</span>
          <span>Category</span>
          <span>Status</span>
          <span style={{ textAlign: "center" }}>Votes</span>
          <span style={{ textAlign: "center" }}>Views</span>
          <span></span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#475569", fontSize: 14 }}>
            No tools match your filters.
          </div>
        ) : (
          filtered.map((tool, i) => {
            const s = statusStyles[tool.status] ?? statusStyles.pending;
            const StatusIcon = s.icon;
            return (
              <div
                key={tool.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 120px 80px 80px 80px",
                  padding: "14px 20px",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  alignItems: "center",
                  transition: "background 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {/* Name + tagline */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 2 }}>
                    {tool.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#475569",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tool.tagline ?? "—"}
                  </div>
                </div>

                {/* Category */}
                <div>
                  {(() => {
                    const cat = tool.dir_categories || (tool as any).category;
                    if (!cat) return <span style={{ color: "#334155", fontSize: 12 }}>—</span>;
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
                </div>

                {/* Status badge */}
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11,
                      padding: "3px 9px",
                      borderRadius: 20,
                      background: s.bg,
                      color: s.color,
                      fontWeight: 600,
                    }}
                  >
                    <StatusIcon size={11} />
                    {s.label}
                  </span>
                </div>

                {/* Votes */}
                <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, fontWeight: 600 }}>
                  {tool.votes_count}
                </div>

                {/* Views */}
                <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
                  {tool.views_count}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                  <a
                    href={`/directory/${tool.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View"
                    style={{
                      padding: "5px 8px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.06)",
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Eye size={13} />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

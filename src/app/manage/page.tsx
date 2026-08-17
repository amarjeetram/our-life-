// src/app/manage/page.tsx
// Admin overview — stats dashboard

import { requireAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import { Wrench, Clock, Users, FolderOpen, TrendingUp, CheckCircle } from "lucide-react";

async function getStats() {
  const db = supabaseServer();
  const [tools, pending, profiles, categories] = await Promise.all([
    db.from("dir_tools").select("id", { count: "exact", head: true }),
    db.from("dir_tools").select("id", { count: "exact", head: true }).eq("status", "pending"),
    db.from("dir_profiles").select("id", { count: "exact", head: true }),
    db.from("dir_categories").select("id", { count: "exact", head: true }),
  ]);
  return {
    tools: tools.count ?? 0,
    pending: pending.count ?? 0,
    profiles: profiles.count ?? 0,
    categories: categories.count ?? 0,
  };
}

export default async function ManagePage() {
  await requireAdmin();
  const stats = await getStats();

  const cards = [
    { label: "Total Tools", value: stats.tools, icon: Wrench, color: "#8b5cf6" },
    { label: "Pending Review", value: stats.pending, icon: Clock, color: "#f59e0b" },
    { label: "Total Users", value: stats.profiles, icon: Users, color: "#06b6d4" },
    { label: "Categories", value: stats.categories, icon: FolderOpen, color: "#10b981" },
  ];

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1200 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>
          Admin Overview
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          Monitor platform activity and manage content from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${card.color}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <card.icon size={22} color={card.color} />
            </div>
            <div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#f1f5f9" }}>{card.value}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <QuickLink href="/manage/pending" color="#f59e0b" icon={Clock} label="Review Pending Tools" />
        <QuickLink href="/manage/tools" color="#8b5cf6" icon={Wrench} label="Manage All Tools" />
        <QuickLink href="/manage/users" color="#06b6d4" icon={Users} label="Manage Users" />
        <QuickLink href="/manage/categories" color="#10b981" icon={FolderOpen} label="Manage Categories" />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  color,
  icon: Icon,
  label,
}: {
  href: string;
  color: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 20px",
        borderRadius: 10,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        color: color,
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 600,
        transition: "all 0.15s ease",
      }}
    >
      <Icon size={16} />
      {label}
    </a>
  );
}

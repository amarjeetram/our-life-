"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Clock,
  FolderOpen,
  Users,
  Flag,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";

const navItems = [
  { href: "/manage", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/manage/tools", label: "All Tools", icon: Wrench },
  { href: "/manage/pending", label: "Pending Review", icon: Clock },
  { href: "/manage/categories", label: "Categories", icon: FolderOpen },
  { href: "/manage/users", label: "Users", icon: Users },
  { href: "/manage/reports", label: "Reports", icon: Flag },
  { href: "/manage/settings", label: "Settings", icon: Settings },
];

export default function ManageShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0f", color: "#f1f5f9" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? 64 : 240,
          background: "linear-gradient(180deg, #0f0f1a 0%, #0a0a14 100%)",
          borderRight: "1px solid rgba(139,92,246,0.2)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s ease",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: collapsed ? "20px 14px" : "20px 20px",
            borderBottom: "1px solid rgba(139,92,246,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={20} color="#8b5cf6" />
              <span style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>
                Admin Panel
              </span>
            </div>
          )}
          {collapsed && <Shield size={20} color="#8b5cf6" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 6,
              padding: "4px 6px",
              cursor: "pointer",
              color: "#8b5cf6",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: collapsed ? "10px 0" : "10px 12px",
                  borderRadius: 8,
                  marginBottom: 4,
                  color: active ? "#c4b5fd" : "#94a3b8",
                  background: active ? "rgba(139,92,246,0.15)" : "transparent",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  transition: "all 0.15s ease",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderLeft: active ? "2px solid #8b5cf6" : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#c4b5fd";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                  }
                }}
              >
                <item.icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: collapsed ? "16px 8px" : "16px 20px",
            borderTop: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            title={collapsed ? "Sign Out" : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#ef4444",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              padding: collapsed ? "8px 0" : "8px 4px",
              width: "100%",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
          >
            <LogOut size={16} />
            {!collapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: "auto", minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}

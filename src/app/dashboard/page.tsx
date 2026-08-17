// src/app/dashboard/page.tsx
// Clean user dashboard — NO admin banners, NO admin links, NO /manage references

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import {
  Settings,
  LogOut,
  CreditCard,
  Sparkles,
  PlusCircle,
  Bookmark,
  ExternalLink,
  Bell,
  User,
} from "lucide-react";
import { getOrCreateDirProfile } from "@/lib/directory/auth";
import { getMyTools, getUserBookmarks } from "@/lib/directory/queries";
import Link from "next/link";

export const metadata = {
  title: "My Dashboard — SmartToolsWala",
};

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const profile = await getOrCreateDirProfile();

  const [myTools, bookmarks] = await Promise.all([
    getMyTools(user.id),
    profile ? getUserBookmarks(profile.id) : [],
  ]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-secondary)",
        paddingTop: "110px",
        paddingBottom: "80px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
                margin: "0 0 6px",
              }}
            >
              My{" "}
              <span className="text-gradient">Dashboard</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "14px" }}>
              Welcome back,{" "}
              <strong>
                {user.fullName || user.username || user.emailAddresses?.[0]?.emailAddress}
              </strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <Link
              href="/directory/submit"
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                borderRadius: "12px",
                padding: "10px 20px",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              <PlusCircle size={16} /> Submit AI Tool
            </Link>

            <SignOutButton redirectUrl="/">
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(239,68,68,0.1)",
                  color: "#ef4444",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="glass-card"
          style={{
            borderRadius: "24px",
            padding: "24px 28px",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName ?? "Avatar"}
              style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              {(user.fullName ?? user.username ?? "U")[0].toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: 4,
              }}
            >
              {user.fullName || user.username || "Your Account"}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              {user.emailAddresses?.[0]?.emailAddress}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link
              href="/dashboard/settings"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 16px",
                borderRadius: 10,
                background: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
                border: "1px solid var(--border-light)",
              }}
            >
              <Settings size={15} /> Settings
            </Link>
          </div>
        </div>

        {/* My Submitted Tools */}
        <div
          className="glass-card"
          style={{ borderRadius: "24px", padding: "28px", marginBottom: "28px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Sparkles size={20} color="var(--brand-primary)" />
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                My Submitted AI Tools ({myTools.length})
              </h2>
            </div>
            <Link
              href="/directory/submit"
              style={{
                fontSize: "13px",
                color: "var(--brand-primary)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              + Submit New
            </Link>
          </div>

          {myTools.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 20px",
                background: "var(--bg-tertiary)",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "38px", marginBottom: "12px" }}>🚀</div>
              <p
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 700,
                  margin: "0 0 6px",
                  fontSize: "15px",
                }}
              >
                No AI tools submitted yet
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  margin: "0 0 18px",
                }}
              >
                List your product on SmartToolsWala AI Directory to reach thousands of users.
              </p>
              <Link
                href="/directory/submit"
                className="btn-primary"
                style={{
                  borderRadius: "12px",
                  textDecoration: "none",
                  display: "inline-flex",
                  padding: "10px 22px",
                  fontSize: "13px",
                }}
              >
                Submit Your Product Now
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {myTools.map((tool) => (
                <div
                  key={tool.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "var(--bg-primary)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    {tool.logo_url ? (
                      <img
                        src={tool.logo_url}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <span
                        style={{ fontWeight: 900, color: "#f97316", fontSize: "18px" }}
                      >
                        {tool.name[0]}
                      </span>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: "15px",
                          color: "var(--text-primary)",
                        }}
                      >
                        {tool.name}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "6px",
                          background:
                            tool.status === "approved"
                              ? "rgba(16,185,129,0.15)"
                              : tool.status === "rejected"
                              ? "rgba(239,68,68,0.15)"
                              : "rgba(245,158,11,0.15)",
                          color:
                            tool.status === "approved"
                              ? "#10b981"
                              : tool.status === "rejected"
                              ? "#ef4444"
                              : "#f59e0b",
                        }}
                      >
                        {tool.status.toUpperCase()}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        marginTop: "2px",
                      }}
                    >
                      {tool.tagline || tool.description_short}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {tool.status === "approved" && (
                      <Link
                        href={`/directory/${tool.slug}`}
                        target="_blank"
                        style={{
                          color: "var(--brand-primary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "13px",
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        View Live <ExternalLink size={13} />
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/tools/${tool.id}/edit`}
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "13px",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <div
            className="glass-card"
            style={{ borderRadius: "24px", padding: "28px", marginBottom: "28px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <Bookmark size={20} color="#ec4899" />
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                My Bookmarks ({bookmarks.length})
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "14px",
              }}
            >
              {bookmarks.map(
                (b) =>
                  b.tool && (
                    <Link key={b.id} href={`/directory/${b.tool.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          padding: "14px",
                          background: "var(--bg-tertiary)",
                          borderRadius: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "var(--bg-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          {b.tool.logo_url ? (
                            <img
                              src={b.tool.logo_url}
                              alt=""
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <span style={{ fontWeight: 900, color: "#f97316" }}>
                              {b.tool.name[0]}
                            </span>
                          )}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: "14px",
                              color: "var(--text-primary)",
                            }}
                          >
                            {b.tool.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                            {b.tool.pricing_type}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
        )}

        {/* Account & Subscription Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Account Card */}
          <div
            className="glass-card"
            style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
                color: "var(--text-primary)",
              }}
            >
              <User size={20} />
              <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Account Details</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Email
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 600 }}>
                  {user.emailAddresses?.[0]?.emailAddress || "No email"}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Username
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 600 }}>
                  {user.username ?? "—"}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Member Since
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 600 }}>
                  {new Date(user.createdAt ?? Date.now()).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div
            className="glass-card"
            style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
                color: "var(--text-primary)",
              }}
            >
              <CreditCard size={20} />
              <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Subscription Plan</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Current Plan
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    background: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: "1px solid var(--border-light)",
                  }}
                >
                  Free Forever
                </div>
              </div>
              <div style={{ marginTop: "auto" }}>
                <a
                  href="/pricing"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f97316, #f59e0b)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 4px 14px rgba(249,115,22,0.3)",
                  }}
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>
          </div>

          {/* Notifications Card */}
          <div
            className="glass-card"
            style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
                color: "var(--text-primary)",
              }}
            >
              <Bell size={20} />
              <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Notifications</h2>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "20px 0",
                color: "var(--text-tertiary)",
              }}
            >
              <Bell size={28} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: 13, margin: 0, textAlign: "center" }}>
                Notification center coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
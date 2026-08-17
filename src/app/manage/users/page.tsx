// src/app/manage/users/page.tsx
import { requireAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";

export default async function ManageUsersPage() {
  await requireAdmin();

  const db = supabaseServer();
  const { data: users } = await db
    .from("dir_profiles")
    .select("id, display_name, email, role, avatar_url, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>
          Users
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          {users?.length ?? 0} registered users (latest 100).
        </p>
      </div>

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
            gridTemplateColumns: "2fr 1.5fr 120px 140px",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            fontSize: 12,
            fontWeight: 600,
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <span>User</span>
          <span>Email</span>
          <span>Role</span>
          <span>Joined</span>
        </div>

        {(users ?? []).map((user, i) => (
          <div
            key={user.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 120px 140px",
              padding: "14px 20px",
              borderBottom: i < (users?.length ?? 1) - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.display_name ?? ""}
                  style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(139,92,246,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#c4b5fd",
                  }}
                >
                  {(user.display_name ?? "?")[0].toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>
                {user.display_name ?? "Unnamed"}
              </span>
            </div>
            <span style={{ fontSize: 13, color: "#64748b" }}>{user.email ?? "—"}</span>
            <span>
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 9px",
                  borderRadius: 20,
                  background: user.role === "admin" ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.07)",
                  color: user.role === "admin" ? "#c4b5fd" : "#94a3b8",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {user.role}
              </span>
            </span>
            <span style={{ fontSize: 12, color: "#475569" }}>
              {new Date(user.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/lib/directory/auditLog.ts
// ============================================================
// Admin Audit Logging
// Every admin action writes an immutable record to dir_audit_logs.
// This runs server-side only — uses service role client.
// ============================================================

import { supabaseServer } from "./supabase";
import { NextRequest } from "next/server";
import { getClientIp } from "./rateLimit";

export type AuditAction =
  | "approve_tool"
  | "reject_tool"
  | "reset_tool_pending"
  | "delete_tool"
  | "edit_tool"
  | "feature_tool"
  | "create_category"
  | "update_category"
  | "delete_category"
  | "change_user_role"
  | "delete_user"
  | "update_settings"
  | "resolve_report";

export type AuditTargetType =
  | "tool"
  | "user"
  | "category"
  | "settings"
  | "report";

export interface AuditLogEntry {
  admin_id: string;           // dir_profiles.id of the acting admin
  action: AuditAction;
  target_type: AuditTargetType;
  target_id?: string;         // ID of the affected entity
  metadata?: Record<string, unknown>; // e.g., { old_status: 'pending', new_status: 'approved' }
  ip_address?: string;
}

/**
 * Write an audit log entry. Non-throwing — never fails the parent request.
 * If the insert fails, it's logged to console but the admin action succeeds.
 */
export async function writeAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    const db = supabaseServer();
    const { error } = await db.from("dir_audit_logs").insert({
      admin_id: entry.admin_id,
      action: entry.action,
      target_type: entry.target_type,
      target_id: entry.target_id ?? null,
      metadata: entry.metadata ?? null,
      ip_address: entry.ip_address ?? null,
    });

    if (error) {
      // Don't fail the admin action if logging fails
      console.error("[AuditLog] Failed to write audit log:", error.code, error.message);
    }
  } catch (err) {
    console.error("[AuditLog] Unexpected error writing audit log:", err);
  }
}

/**
 * Extract IP from a Next.js request for audit logging.
 * Hashes the IP to avoid storing PII in plain text.
 */
export async function getAuditIp(req: NextRequest): Promise<string> {
  const { createHash } = await import("crypto");
  const ip = getClientIp(req);
  if (ip === "unknown") return "unknown";
  // Store a hash of the IP — preserves traceability without storing PII
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

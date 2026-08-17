// src/lib/directory/validate.ts
// ============================================================
// Server-side input validation utilities for the Directory API
// NEVER trust client-provided data.
// ============================================================

// ─────────────────────────────────────────────────────────────
// Text Sanitization
// ─────────────────────────────────────────────────────────────

/**
 * Strip HTML tags and dangerous characters from user-supplied text.
 * Use for review text, bios, descriptions before storing.
 */
export function sanitizeText(input: unknown, maxLength = 5000): string {
  if (typeof input !== "string") return "";
  return input
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, "")           // strip all HTML tags
    .replace(/javascript:/gi, "")      // strip js: URIs
    .replace(/on\w+\s*=/gi, "")        // strip inline event handlers
    .replace(/data:/gi, "")            // strip data: URIs
    .trim();
}

/**
 * Sanitize a short single-line field (name, tagline, etc.)
 * Collapses whitespace, removes newlines and control chars.
 */
export function sanitizeLine(input: unknown, maxLength = 200): string {
  if (typeof input !== "string") return "";
  return input
    .slice(0, maxLength)
    .replace(/[\r\n\t]/g, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ─────────────────────────────────────────────────────────────
// URL Validation
// ─────────────────────────────────────────────────────────────

const SAFE_PROTOCOLS = ["https:", "http:"];

/**
 * Validate a URL: must be http/https, no javascript: or data: URIs.
 * Returns the normalized URL string or null if invalid.
 */
export function validateUrl(input: unknown): string | null {
  if (typeof input !== "string") return null;
  try {
    const url = new URL(input.trim());
    if (!SAFE_PROTOCOLS.includes(url.protocol)) return null;
    return url.href;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Email Validation
// ─────────────────────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function validateEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.trim().toLowerCase().slice(0, 254);
  return EMAIL_RE.test(email) ? email : null;
}

// ─────────────────────────────────────────────────────────────
// File Upload Validation
// ─────────────────────────────────────────────────────────────

/** Allowed image MIME types for logo/screenshot uploads */
export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
] as const;

/** Max file size: 5MB */
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Magic byte signatures for allowed image types.
 * NEVER trust the client-declared Content-Type alone.
 */
const MAGIC_BYTES: Array<{
  mime: string;
  offset: number;
  signature: number[];
}> = [
  { mime: "image/png",  offset: 0, signature: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/jpeg", offset: 0, signature: [0xff, 0xd8, 0xff] },
  { mime: "image/webp", offset: 8, signature: [0x57, 0x45, 0x42, 0x50] }, // 'WEBP' at offset 8
  // SVG: text-based, detect by looking for '<svg' in first 512 bytes
];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  detectedMime?: string;
}

/**
 * Validate an uploaded file buffer.
 * Checks: size, magic bytes, rejects executables.
 */
export function validateImageBuffer(
  buffer: Buffer,
  clientMime: string,
  filename?: string
): FileValidationResult {
  // 1. Size check
  if (buffer.length === 0) {
    return { valid: false, error: "File is empty" };
  }
  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`,
    };
  }

  // 2. Reject dangerous file extensions regardless of MIME
  if (filename) {
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";
    const DANGEROUS = ["exe", "bat", "cmd", "sh", "ps1", "php", "py", "js", "mjs", "ts", "rb", "dll", "so", "elf"];
    if (DANGEROUS.includes(ext)) {
      return { valid: false, error: "File type not allowed" };
    }
  }

  // 3. Magic bytes check (server-side)
  // JPEG
  if (
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { valid: true, detectedMime: "image/jpeg" };
  }

  // PNG
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { valid: true, detectedMime: "image/png" };
  }

  // WEBP: 'RIFF' at 0, 'WEBP' at 8
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, detectedMime: "image/webp" };
  }

  // SVG: check first 512 bytes for '<svg' (case-insensitive)
  const textHead = buffer.slice(0, 512).toString("utf-8").toLowerCase();
  if (
    clientMime === "image/svg+xml" &&
    (textHead.includes("<svg") || textHead.includes("<?xml"))
  ) {
    // Additional SVG safety: ensure no script tags
    const fullText = buffer.toString("utf-8").toLowerCase();
    if (fullText.includes("<script")) {
      return { valid: false, error: "SVG files with scripts are not allowed" };
    }
    return { valid: true, detectedMime: "image/svg+xml" };
  }

  return {
    valid: false,
    error: "File type not allowed. Only JPEG, PNG, WebP, and SVG are accepted.",
  };
}

/**
 * Generate a random filename safe for storage.
 * Never use client-provided filenames.
 */
export function generateSafeFilename(detectedMime: string): string {
  const ext =
    detectedMime === "image/jpeg" ? "jpg" :
    detectedMime === "image/png"  ? "png" :
    detectedMime === "image/webp" ? "webp" :
    detectedMime === "image/svg+xml" ? "svg" : "bin";

  const random = crypto.getRandomValues(new Uint8Array(16));
  const hex = Array.from(random)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${hex}.${ext}`;
}

// ─────────────────────────────────────────────────────────────
// CSRF / Origin Check
// ─────────────────────────────────────────────────────────────

/**
 * Verify that a multipart/form-data request originates from our own domain.
 * JSON requests are inherently CSRF-safe (browsers can't send cross-origin JSON).
 * Returns true if the origin is acceptable.
 */
export function isValidOrigin(req: import("next/server").NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  // In development, allow localhost
  if (!origin) return true; // Server-to-server calls have no Origin header
  if (process.env.NODE_ENV === "development") {
    if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
      return true;
    }
  }

  // Extract hostname from origin and compare to request host
  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

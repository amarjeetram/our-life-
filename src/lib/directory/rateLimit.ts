// src/lib/directory/rateLimit.ts
// ============================================================
// Rate Limiting — dual-mode:
//   Production : Upstash Redis (sliding window, works across
//                all serverless instances globally)
//   Development: In-memory LRU (single process, good enough
//                for local dev & fallback if Redis not set)
//
// USAGE:
//   const result = await rateLimit(req, 'submit_tool');
//   if (!result.allowed) return result.response; // 429
//
// SETUP (production):
//   Add to .env.local:
//     UPSTASH_REDIS_REST_URL=https://...
//     UPSTASH_REDIS_REST_TOKEN=...
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

// ─────────────────────────────────────────────────────────────
// Rate limit configurations per endpoint category
// ─────────────────────────────────────────────────────────────
export type RateLimitKey =
  | "submit_tool"    // 3 submissions per 24h per user
  | "review"         // 10 reviews per hour per user
  | "vote"           // 60 votes per hour per user
  | "bookmark"       // 60 bookmarks per hour per user
  | "view_track"     // 30 view tracks per minute per IP
  | "general_write"  // 30 writes per minute per IP (default)
  | "admin_action";  // 100 per minute per admin IP

interface RateLimitConfig {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in seconds */
  windowSec: number;
}

const CONFIGS: Record<RateLimitKey, RateLimitConfig> = {
  submit_tool:   { limit: 3,   windowSec: 86400  }, // 3 / day
  review:        { limit: 10,  windowSec: 3600   }, // 10 / hour
  vote:          { limit: 60,  windowSec: 3600   }, // 60 / hour
  bookmark:      { limit: 60,  windowSec: 3600   }, // 60 / hour
  view_track:    { limit: 30,  windowSec: 60     }, // 30 / min
  general_write: { limit: 30,  windowSec: 60     }, // 30 / min
  admin_action:  { limit: 100, windowSec: 60     }, // 100 / min
};

// ─────────────────────────────────────────────────────────────
// In-memory fallback (dev mode / when Redis not configured)
// IMPORTANT: Resets on cold start — only use for development!
// ─────────────────────────────────────────────────────────────
const memoryStore = new LRUCache<string, number[]>({
  max: 10_000,
  ttl: 24 * 60 * 60 * 1000, // 24h max TTL
});

function rateLimitMemory(identifier: string, config: RateLimitConfig): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const windowMs = config.windowSec * 1000;
  const cutoff = now - windowMs;

  const existing = memoryStore.get(identifier) ?? [];
  const recent = existing.filter((ts) => ts > cutoff);

  const resetAt = (recent[0] ?? now) + windowMs;
  const remaining = Math.max(0, config.limit - recent.length - 1);

  if (recent.length >= config.limit) {
    return { allowed: false, remaining: 0, resetAt };
  }

  recent.push(now);
  memoryStore.set(identifier, recent);
  return { allowed: true, remaining, resetAt };
}

// ─────────────────────────────────────────────────────────────
// Upstash Redis rate limiting (production)
// ─────────────────────────────────────────────────────────────
let _upstashRatelimit: Map<RateLimitKey, unknown> | null = null;

async function getUpstashLimiter(
  key: RateLimitKey,
  config: RateLimitConfig
): Promise<{ limit: (id: string) => Promise<{ success: boolean; remaining: number; reset: number }> } | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const { Redis } = await import("@upstash/redis");
    const { Ratelimit } = await import("@upstash/ratelimit");

    const redis = new Redis({ url, token });
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.limit, `${config.windowSec} s`),
      prefix: `rl:${key}`,
    });
    return limiter;
  } catch (e) {
    console.warn("[RateLimit] Upstash import failed, falling back to memory:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

/**
 * Apply rate limiting to a request.
 *
 * @param req        - Incoming NextRequest
 * @param key        - Which rate limit config to use
 * @param identifier - Custom identifier (e.g., user ID). Falls back to IP.
 *
 * @returns { allowed: true } or { allowed: false, response: NextResponse<429> }
 */
export async function rateLimit(
  req: NextRequest,
  key: RateLimitKey,
  identifier?: string
): Promise<{ allowed: true } | { allowed: false; response: NextResponse }> {
  const config = CONFIGS[key];
  const id = identifier ?? getClientIp(req) ?? "unknown";
  const storeKey = `${key}:${id}`;

  let success: boolean;
  let remaining: number;
  let resetAt: number;

  // Try Upstash first
  const upstash = await getUpstashLimiter(key, config);
  if (upstash) {
    const result = await upstash.limit(storeKey);
    success = result.success;
    remaining = result.remaining;
    resetAt = result.reset;
  } else {
    // In-memory fallback
    const result = rateLimitMemory(storeKey, config);
    success = result.allowed;
    remaining = result.remaining;
    resetAt = result.resetAt;
  }

  if (!success) {
    const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
    return {
      allowed: false,
      response: NextResponse.json(
        {
          error: "Too many requests. Please slow down and try again.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.max(1, retryAfter)),
            "X-RateLimit-Limit": String(config.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
          },
        }
      ),
    };
  }

  return { allowed: true };
}

/**
 * Extract the real client IP from common proxy headers.
 * Used as the default identifier when no user ID is available.
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ?? // Cloudflare
    "unknown"
  );
}

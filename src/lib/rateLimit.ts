/**
 * In-Memory Sliding Window Rate Limiter
 *
 * Tracks request timestamps per IP in a Map.
 * Works perfectly for single-server / serverless (per-instance) deployments.
 *
 * ⚠️  For multi-region / multi-instance production setups, use Redis:
 *     https://github.com/upstash/ratelimit
 */

interface RateLimitEntry {
    timestamps: number[]; // Unix ms timestamps of recent requests
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetInMs: number;
}

/**
 * Check if a given key (e.g. IP address) is within the rate limit.
 *
 * @param key      Unique identifier — typically the request IP
 * @param limit    Max requests allowed in the window (default: 5)
 * @param windowMs Time window in milliseconds (default: 60_000 = 1 minute)
 */
export function rateLimit(
    key: string,
    limit = 5,
    windowMs = 60_000
): RateLimitResult {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Retrieve or create entry
    let entry = store.get(key);
    if (!entry) {
        entry = { timestamps: [] };
        store.set(key, entry);
    }

    // Remove timestamps outside the current window (sliding window)
    entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

    const count = entry.timestamps.length;
    const allowed = count < limit;

    if (allowed) {
        entry.timestamps.push(now);
    }

    const oldest = entry.timestamps[0] ?? now;
    const resetInMs = Math.max(0, oldest + windowMs - now);

    return {
        allowed,
        remaining: Math.max(0, limit - entry.timestamps.length),
        resetInMs,
    };
}

/**
 * Extracts real client IP from a Next.js request object.
 * Respects X-Forwarded-For (set by Vercel / Nginx) and falls back.
 */
export function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();

    const realIp = request.headers.get('x-real-ip');
    if (realIp) return realIp.trim();

    return 'unknown';
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentSignature, logTransaction } from '@/lib/razorpay';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

const SECURE_HEADERS = {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
};

export async function POST(req: NextRequest) {
    // ── Rate Limiting ────────────────────────────────────────────────────
    // Throttle verify attempts to prevent brute force signature guessing.
    const ip = getClientIp(req);
    const { allowed, resetInMs } = rateLimit(`verify_${ip}`, 5, 60_000);

    if (!allowed) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
                status: 429,
                headers: {
                    ...SECURE_HEADERS,
                    'Retry-After': String(Math.ceil(resetInMs / 1000)),
                },
            }
        );
    }

    try {
        const body = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        // ── Input Validation ─────────────────────────────────────────────
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { error: 'Missing required payment verification fields.' },
                { status: 400, headers: SECURE_HEADERS }
            );
        }

        // Validate types — all must be non-empty strings
        if (
            typeof razorpay_order_id !== 'string' ||
            typeof razorpay_payment_id !== 'string' ||
            typeof razorpay_signature !== 'string'
        ) {
            return NextResponse.json(
                { error: 'Invalid payment verification data.' },
                { status: 400, headers: SECURE_HEADERS }
            );
        }

        // ── Server-Side HMAC SHA256 Verification ─────────────────────────
        // This is the critical security step. Even if the client sends any
        // payment IDs, we verify the cryptographic signature from Razorpay.
        // An attacker CANNOT forge this signature without RAZORPAY_KEY_SECRET.
        const isValid = verifyPaymentSignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            logTransaction({
                event: 'VERIFY_FAILED',
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                ip,
                extra: { reason: 'HMAC signature mismatch' },
            });

            return NextResponse.json(
                { error: 'Payment verification failed. Invalid signature.' },
                { status: 400, headers: SECURE_HEADERS }
            );
        }

        // ── Success ──────────────────────────────────────────────────────
        logTransaction({
            event: 'VERIFY_SUCCESS',
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            ip,
        });

        return NextResponse.json(
            { success: true, paymentId: razorpay_payment_id },
            { status: 200, headers: SECURE_HEADERS }
        );

    } catch (err: any) {
        console.error('[RAZORPAY] Verify error:', err);
        return NextResponse.json(
            { error: 'Internal server error during payment verification.' },
            { status: 500, headers: SECURE_HEADERS }
        );
    }
}

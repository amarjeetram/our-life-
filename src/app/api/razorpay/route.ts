import { NextRequest, NextResponse } from 'next/server';
import { getRazorpayInstance, logTransaction } from '@/lib/razorpay';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { randomUUID } from 'crypto';

// Secure headers for all payment API responses
const SECURE_HEADERS = {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
};

// Amount constraints
const MIN_AMOUNT_INR = 1;
const MAX_AMOUNT_INR = 50_000;

export async function POST(req: NextRequest) {
    // ── Rate Limiting ────────────────────────────────────────────────────
    const ip = getClientIp(req);
    const { allowed, remaining, resetInMs } = rateLimit(ip, 5, 60_000);

    if (!allowed) {
        return NextResponse.json(
            { error: 'Too many requests. Please wait a moment and try again.' },
            {
                status: 429,
                headers: {
                    ...SECURE_HEADERS,
                    'Retry-After': String(Math.ceil(resetInMs / 1000)),
                    'X-RateLimit-Remaining': '0',
                },
            }
        );
    }

    try {
        const body = await req.json();
        const { amount } = body;

        // ── Input Validation ─────────────────────────────────────────────
        const parsedAmount = parseFloat(amount);
        if (!amount || isNaN(parsedAmount)) {
            return NextResponse.json(
                { error: 'Amount must be a valid number.' },
                { status: 400, headers: SECURE_HEADERS }
            );
        }
        if (parsedAmount < MIN_AMOUNT_INR || parsedAmount > MAX_AMOUNT_INR) {
            return NextResponse.json(
                { error: `Amount must be between ₹${MIN_AMOUNT_INR} and ₹${MAX_AMOUNT_INR}.` },
                { status: 400, headers: SECURE_HEADERS }
            );
        }

        // ── Create Razorpay Order ─────────────────────────────────────────
        // UUID receipt ensures each order is unique → prevents replay attacks.
        // Razorpay receipt max = 40 chars, so we use a short unique string.
        const shortId = randomUUID().replace(/-/g, '').substring(0, 16);
        const receipt = `rcpt_${shortId}`; // 5 + 16 = 21 chars ✓
        const razorpay = getRazorpayInstance();

        const order = await razorpay.orders.create({
            amount: Math.round(parsedAmount * 100), // paise
            currency: 'INR',
            receipt,
            notes: { purpose: 'Donation to SmartToolsWala' },
        });

        logTransaction({
            event: 'ORDER_CREATED',
            orderId: order.id,
            amountInr: parsedAmount,
            ip,
        });

        // ── Response: NEVER include RAZORPAY_KEY_SECRET ───────────────────
        return NextResponse.json(
            {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID, // public key only
            },
            {
                status: 200,
                headers: {
                    ...SECURE_HEADERS,
                    'X-RateLimit-Remaining': String(remaining),
                },
            }
        );
    } catch (err: any) {
        // Log the full Razorpay error for debugging
        console.error('[RAZORPAY] Order creation error:', {
            message: err?.message,
            description: err?.error?.description,
            code: err?.error?.code,
            statusCode: err?.statusCode,
            raw: JSON.stringify(err),
        });
        return NextResponse.json(
            { error: 'Failed to create payment order. Please try again.' },
            { status: 500, headers: SECURE_HEADERS }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, logTransaction } from '@/lib/razorpay';

// Razorpay webhook events we handle
type RazorpayEvent = 'payment.captured' | 'payment.failed' | 'order.paid';

export async function POST(req: NextRequest) {
    // ── Read Raw Body ─────────────────────────────────────────────────────
    // IMPORTANT: Webhook signature is computed over the RAW body string.
    // Using req.json() would lose byte-for-byte accuracy → signature mismatch.
    const rawBody = await req.text();

    // ── Verify Webhook Signature ──────────────────────────────────────────
    // X-Razorpay-Signature is an HMAC SHA256 of raw body using RAZORPAY_WEBHOOK_SECRET.
    const receivedSignature = req.headers.get('x-razorpay-signature') ?? '';

    if (!receivedSignature) {
        console.warn('[WEBHOOK] Missing X-Razorpay-Signature header');
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let isValid = false;
    try {
        isValid = verifyWebhookSignature(rawBody, receivedSignature);
    } catch (err) {
        console.error('[WEBHOOK] Signature verification error:', err);
        return NextResponse.json({ error: 'Signature verification failed' }, { status: 500 });
    }

    if (!isValid) {
        console.warn('[WEBHOOK] Invalid signature — possible spoofed request');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 403 });
    }

    // ── Parse Event ───────────────────────────────────────────────────────
    let event: { event: RazorpayEvent; payload: any };
    try {
        event = JSON.parse(rawBody);
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const eventType = event?.event;
    const payment = event?.payload?.payment?.entity;
    const order = event?.payload?.order?.entity;

    // ── Handle Events ─────────────────────────────────────────────────────
    switch (eventType) {
        case 'payment.captured': {
            // Payment was successfully captured by Razorpay.
            // Safe fields only — NEVER log card/bank details.
            logTransaction({
                event: 'WEBHOOK_RECEIVED',
                paymentId: payment?.id,
                orderId: payment?.order_id,
                amountInr: payment?.amount ? payment.amount / 100 : undefined,
                extra: {
                    webhookEvent: 'payment.captured',
                    method: payment?.method,    // upi / card / netbanking
                    status: payment?.status,
                },
            });

            // TODO (production): Update your database record here
            // e.g., await db.donations.update({ paymentId: payment.id, status: 'captured' })
            break;
        }

        case 'payment.failed': {
            logTransaction({
                event: 'PAYMENT_FAILED',
                paymentId: payment?.id,
                orderId: payment?.order_id,
                amountInr: payment?.amount ? payment.amount / 100 : undefined,
                extra: {
                    webhookEvent: 'payment.failed',
                    errorCode: payment?.error_code,
                    errorDescription: payment?.error_description,
                    method: payment?.method,
                },
            });

            // TODO (production): Mark donation as failed in your database
            break;
        }

        case 'order.paid': {
            logTransaction({
                event: 'WEBHOOK_RECEIVED',
                orderId: order?.id,
                amountInr: order?.amount ? order.amount / 100 : undefined,
                extra: { webhookEvent: 'order.paid', status: order?.status },
            });
            break;
        }

        default:
            // Unknown event — log and ignore gracefully
            console.log('[WEBHOOK] Unhandled event type:', eventType);
    }

    // ── Respond 200 Quickly ───────────────────────────────────────────────
    // Razorpay expects a 200 response within a few seconds, otherwise it retries.
    return NextResponse.json({ received: true }, { status: 200 });
}

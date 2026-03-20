import Razorpay from 'razorpay';
import crypto from 'crypto';

// ─── Razorpay Singleton ────────────────────────────────────────────────────
// Created once and reused across API routes.
// RAZORPAY_KEY_SECRET is SERVER-ONLY — never sent to the client.
let razorpayInstance: Razorpay | null = null;

export function getRazorpayInstance(): Razorpay {
    if (!razorpayInstance) {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            throw new Error(
                'RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables.'
            );
        }

        razorpayInstance = new Razorpay({ key_id: keyId, key_secret: keySecret });
    }
    return razorpayInstance;
}

// ─── HMAC SHA256 Verification ─────────────────────────────────────────────
// Verifies that a payment response came from Razorpay and was not tampered with.
// Uses crypto.timingSafeEqual to prevent timing-based side-channel attacks.
export function verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    receivedSignature: string
): boolean {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) throw new Error('RAZORPAY_KEY_SECRET is not set.');

    // Razorpay signature = HMAC-SHA256( orderId + "|" + paymentId, keySecret )
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(body)
        .digest('hex');

    // timingSafeEqual prevents timing attacks (always runs in constant time).
    try {
        return crypto.timingSafeEqual(
            Buffer.from(expectedSignature, 'hex'),
            Buffer.from(receivedSignature, 'hex')
        );
    } catch {
        // Buffer lengths mismatched — signature is invalid
        return false;
    }
}

// ─── Webhook Signature Verification ──────────────────────────────────────
// Verifies that a webhook event was sent by Razorpay using RAZORPAY_WEBHOOK_SECRET.
export function verifyWebhookSignature(rawBody: string, receivedSignature: string): boolean {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error('RAZORPAY_WEBHOOK_SECRET is not set.');

    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

    try {
        return crypto.timingSafeEqual(
            Buffer.from(expectedSignature, 'hex'),
            Buffer.from(receivedSignature, 'hex')
        );
    } catch {
        return false;
    }
}

// ─── Safe Transaction Logger ──────────────────────────────────────────────
// Logs ONLY non-sensitive fields. Card numbers, CVV, bank details are NEVER logged.
export interface TransactionLog {
    event: 'ORDER_CREATED' | 'VERIFY_SUCCESS' | 'VERIFY_FAILED' | 'WEBHOOK_RECEIVED' | 'PAYMENT_FAILED';
    orderId?: string;
    paymentId?: string;
    amountInr?: number;
    ip?: string;
    timestamp: string;
    extra?: Record<string, unknown>;
}

export function logTransaction(data: Omit<TransactionLog, 'timestamp'>): void {
    const log: TransactionLog = {
        ...data,
        timestamp: new Date().toISOString(),
    };
    // In production, replace console.log with a proper logging service
    // (e.g., Datadog, LogRocket, Sentry breadcrumbs, or write to a DB).
    console.log('[RAZORPAY]', JSON.stringify(log));
}

import type { Metadata } from 'next';
import DonateClient from '@/components/DonateClient';

export const metadata: Metadata = {
    title: 'Support SmartToolsWala — Donate to Keep Tools Free',
    description: 'Help us keep SmartToolsWala 100% free. Donate any amount via Razorpay (UPI, Cards, Net Banking) or Buy Me a Coffee. Your support helps run servers and build new tools.',
    keywords: ['donate', 'support smarttoolswala', 'razorpay donation', 'buy me a coffee'],
    openGraph: {
        title: 'Support SmartToolsWala — Keep Free Tools Free',
        description: 'Your donation helps us run servers and keep all tools free. Every rupee counts!',
        url: 'https://smarttoolswala.com/donate',
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function DonatePage() {
    return <DonateClient />;
}

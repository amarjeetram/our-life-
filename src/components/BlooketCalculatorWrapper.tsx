"use client";

import dynamic from 'next/dynamic';

const BlooketCalculatorClient = dynamic(
    () => import('@/components/BlooketCalculatorClient')
);

export default function BlooketCalculatorWrapper() {
    return <BlooketCalculatorClient />;
}

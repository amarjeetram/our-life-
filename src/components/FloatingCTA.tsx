"use client";

import Link from "next/link";

interface Props {
    title: string;
    badge: string;
    buttonLink: string;
    gradient: string;
}

/** Fixed bottom CTA pill — must be a client component because of position:fixed */
export default function FloatingCTA({ title, badge, buttonLink, gradient }: Props) {
    return (
        <div style={{
            position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
            zIndex: 100, width: "calc(100% - 32px)", maxWidth: "420px",
            background: "#ffffff", borderRadius: "100px", padding: "8px 8px 8px 24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px"
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: gradient.includes('10b981') ? '#059669' : '#6366f1', textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {badge}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                    {title}
                </span>
            </div>
            <Link href={buttonLink} style={{
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: gradient, color: "#ffffff", border: "none",
                padding: "10px 18px", borderRadius: "100px",
                fontSize: "13px", fontWeight: 800, textDecoration: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
                Open Tool
            </Link>
        </div>
    );
}

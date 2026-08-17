// src/app/directory/layout.tsx
// Isolated layout — reuses existing Navbar/Footer
// Does NOT modify them

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "AI Tools Directory — SmartToolsWala",
    template: "%s | AI Tools Directory — SmartToolsWala",
  },
  description:
    "Discover the best AI tools and SaaS products. Browse, filter, and find tools by category, pricing, and features.",
};

export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
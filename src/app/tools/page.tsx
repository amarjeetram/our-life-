import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
    title: "All Free Online Tools Directory | SmartToolsWala",
    description: "Browse 100+ free online utility tools: image compressors, YouTube SEO extractors, GPA calculators, unit converters, and Instagram tools.",
    alternates: {
        canonical: "/tools",
    },
};

export default function ToolsPage() {
    return <ToolsClient />;
}

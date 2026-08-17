// src/app/directory/submit/page.tsx
// Multi-step Tool Submission Form (replaces /submit)

import type { Metadata } from "next";
import { getCategories } from "@/lib/directory/queries";
import SubmitToolClient from "./SubmitToolClient";

export const metadata: Metadata = {
  title: "Submit Your AI Tool",
  description: "Submit your AI tool or SaaS product to our directory. Reach thousands of developers and creators daily.",
};

export default async function SubmitToolPage() {
  const categories = await getCategories();
  return <SubmitToolClient categories={categories} />;
}
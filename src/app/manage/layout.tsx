// src/app/manage/layout.tsx
// Completely hidden admin area — returns 404 for non-admins
// Never linked from Navbar, Sidebar, Footer, or Dashboard

import { notFound } from "next/navigation";
import { getCurrentUserRole } from "@/lib/directory/auth";
import ManageShell from "./ManageShell";

export const metadata = {
  robots: "noindex, nofollow",
};

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getCurrentUserRole();

  // Anyone who is not an admin gets a real 404 — not a redirect
  if (role !== "admin") {
    notFound();
  }

  return <ManageShell>{children}</ManageShell>;
}

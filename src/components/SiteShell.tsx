"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ClientDropZone from "./ClientDropZone";
import { Suspense } from "react";

export default function SiteShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Navbar />}
            {!isAdmin && (
                <Suspense fallback={null}>
                    <ClientDropZone />
                </Suspense>
            )}
            <main>
                {children}
            </main>
            {!isAdmin && <Footer />}
        </>
    );
}

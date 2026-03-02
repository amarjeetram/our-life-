"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ClientDropZone from "./ClientDropZone";
import { Suspense } from "react";

export default function SiteShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <Suspense fallback={null}>
                <ClientDropZone />
            </Suspense>
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

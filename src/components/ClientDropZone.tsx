"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GlobalDropZone from "./GlobalDropZone";

export default function ClientDropZone() {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Return null if we are on server or on paths that shouldn't have the drop zone
    if (!mounted) return null;

    // Exclude global dropzone from reading pages/non-image tools
    const excludedPaths = [
        "/blog",
        "/youtube-",
        "/calculators",
        "/stylish-couple-name-maker",
        "/about-us",
        "/contact-us",
        "/privacy-policy",
        "/terms-and-conditions",
        "/disclaimer",
        "/donate",
        "/cancellation-and-refund",
        "/shipping-policy"
    ];

    const shouldExclude = excludedPaths.some(p => pathname.startsWith(p));
    
    if (shouldExclude) {
        return null;
    }

    return <GlobalDropZone />;
}

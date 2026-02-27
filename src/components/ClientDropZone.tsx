"use client";

import dynamic from "next/dynamic";

const GlobalDropZone = dynamic(() => import("./GlobalDropZone"), { ssr: false });

export default function ClientDropZone() {
    return <GlobalDropZone />;
}

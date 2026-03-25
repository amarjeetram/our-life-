"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Upload, Zap } from "lucide-react";
import toast from "react-hot-toast";

/**
 * GlobalDropZone — detects image drag anywhere on the page and shows a full-screen
 * overlay.
 * - On compress pages: fires "global-drop-compress" event so CompressImageClient
 *   handles files locally (no navigation, correct target size preserved).
 * - On homepage: fires "global-drop-home" for HeroUploadZone.
 * - On all other pages: navigates to /compress-image-to-20kb as default.
 */
export default function GlobalDropZone() {
    const router = useRouter();
    const pathname = usePathname();
    const [active, setActive] = useState(false);
    const [dropped, setDropped] = useState(false);
    const dragCounter = useRef(0);

    const isImageDrag = (e: DragEvent) => {
        if (!e.dataTransfer) return false;
        const types = Array.from(e.dataTransfer.types);
        if (types.includes("Files")) return true;
        const items = Array.from(e.dataTransfer.items);
        return items.some(item => item.kind === "file" && item.type.startsWith("image/"));
    };

    const handleDragEnter = useCallback((e: DragEvent) => {
        e.preventDefault();
        dragCounter.current += 1;
        if (isImageDrag(e)) setActive(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent) => {
        e.preventDefault();
        dragCounter.current -= 1;
        if (dragCounter.current <= 0) {
            dragCounter.current = 0;
            setActive(false);
        }
    }, []);

    const handleDragOver = useCallback((e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        dragCounter.current = 0;
        setActive(false);

        const rawFiles = Array.from(e.dataTransfer?.files ?? []);
        const imageFiles = rawFiles.filter(f => {
            if (!f.type.startsWith("image/")) return false;
            if (f.size > 20 * 1024 * 1024) {
                toast.error(`File ${f.name} is larger than 20MB limit.`);
                return false;
            }
            return true;
        }).slice(0, 10);
        if (!imageFiles.length) return;

        setDropped(true);

        // ── Homepage ──────────────────────────────────────────────────────────
        if (pathname === "/") {
            window.dispatchEvent(new CustomEvent("global-drop-home", { detail: { files: imageFiles } }));
            setTimeout(() => { setDropped(false); }, 300);
            return;
        }

        // ── Already on a compress page → stay here, fire local event ─────────
        const isCompressPage = /\/compress-image-to-\d+kb/.test(pathname) ||
            pathname === "/govt-exam-tools/tnpsc-photo-compressor";

        if (isCompressPage) {
            // CompressImageClient listens for this event (see useEffect below)
            window.dispatchEvent(new CustomEvent("global-drop-compress", { detail: { files: imageFiles } }));
            setTimeout(() => { setDropped(false); }, 300);
            return;
        }

        // ── Other pages → encode to base64, store in sessionStorage, navigate ──
        // Preferred method: store in memory immediately for fast redirect
        (window as any).__HERO_FILES__ = imageFiles;

        const results: { data: string; name: string }[] = [];
        let done = 0;
        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                results.push({ data: ev.target?.result as string, name: file.name });
                done += 1;
                if (done === imageFiles.length) {
                    try {
                        sessionStorage.setItem("hero_images", JSON.stringify(results));
                        // Remove target size, MB to KB tool doesn't need hardcoded 20KB limit
                    } catch { /* storage full */ }
                    setTimeout(() => {
                        setDropped(false);
                        router.push("/mb-to-kb-image-converter");
                    }, 600);
                }
            };
            reader.readAsDataURL(file);
        });
    }, [router, pathname]);

    useEffect(() => {
        window.addEventListener("dragenter", handleDragEnter);
        window.addEventListener("dragleave", handleDragLeave);
        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);
        return () => {
            window.removeEventListener("dragenter", handleDragEnter);
            window.removeEventListener("dragleave", handleDragLeave);
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("drop", handleDrop);
        };
    }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

    // Read target KB from pathname for overlay text
    const currentTargetKB = (() => {
        const m = pathname.match(/compress-image-to-(\d+)kb/);
        return m ? parseInt(m[1]) : 20;
    })();

    const isOnCompressPage = /compress-image-to-\d+kb/.test(pathname) ||
        pathname === "/govt-exam-tools/tnpsc-photo-compressor";

    if (!active && !dropped) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                background: dropped ? "rgba(99,102,241,0.18)" : "rgba(15,23,42,0.65)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "background 0.3s ease",
                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    width: "160px", height: "160px", borderRadius: "50%",
                    border: dropped ? "3px solid #6366f1" : "3px dashed rgba(255,255,255,0.6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: dropped
                        ? "0 0 0 12px rgba(99,102,241,0.2), 0 0 60px rgba(99,102,241,0.4)"
                        : "0 0 0 12px rgba(255,255,255,0.06)",
                    transition: "all 0.3s ease",
                    animation: dropped ? "none" : "pulse-ring 1.8s ease-in-out infinite",
                }}
            >
                {dropped
                    ? <Zap size={52} color="#6366f1" strokeWidth={1.8} />
                    : <Upload size={52} color="#fff" strokeWidth={1.5} />
                }
            </div>

            <div style={{ textAlign: "center" }}>
                <p style={{
                    fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "#fff",
                    letterSpacing: "-0.03em", marginBottom: "8px",
                    textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                }}>
                    {dropped ? "Processing…" : "Drop files here"}
                </p>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
                    {dropped
                        ? "Adding to tool ⚡"
                        : isOnCompressPage
                            ? `Release to compress to ${currentTargetKB}KB`
                            : pathname === "/"
                                ? "Release anywhere to load files"
                                : "Release to compress in MB/KB Tool"
                    }
                </p>
            </div>

            <style>{`
                @keyframes pulse-ring {
                    0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.15), 0 0 60px rgba(99,102,241,0); }
                    50%  { box-shadow: 0 0 0 20px rgba(255,255,255,0), 0 0 60px rgba(99,102,241,0.25); }
                    100% { box-shadow: 0 0 0 0 rgba(255,255,255,0), 0 0 60px rgba(99,102,241,0); }
                }
            `}</style>
        </div>
    );
}

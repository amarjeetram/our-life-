"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Zap, ChevronDown, ImagePlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Target size options — extend this as more tools are added
const SIZE_OPTIONS = [
    { label: "20 KB", value: "20", route: "/compress-image-to-20kb" },
    { label: "30 KB", value: "30", route: "/compress-image-to-30kb" },
    { label: "40 KB", value: "40", route: "/compress-image-to-50kb" },
    { label: "50 KB", value: "50", route: "/compress-image-to-50kb" },
    { label: "100 KB", value: "100", route: "/compress-image-to-100kb" },
    { label: "200 KB", value: "200", route: "/compress-image-to-200kb" },
];

interface PreviewFile {
    name: string;
    sizeKB: string;
    preview: string;
    id: string;
}

export default function HeroUploadZone() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<PreviewFile[]>([]);
    const [targetSize, setTargetSize] = useState(SIZE_OPTIONS[0]);
    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSizeDropdown, setShowSizeDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const processFiles = useCallback((rawFiles: File[]) => {
        const imageFiles = rawFiles.filter(f => f.type.startsWith("image/")).slice(0, 10);
        if (!imageFiles.length) return;

        imageFiles.forEach(file => {
            if (file.size > 20 * 1024 * 1024) {
                toast.error(`File ${file.name} is larger than 20MB limit. It will not be uploaded.`);
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setFiles(prev => {
                    if (prev.length >= 10) return prev;
                    const exists = prev.find(p => p.name === file.name);
                    if (exists) return prev;
                    return [...prev, {
                        name: file.name,
                        sizeKB: (file.size / 1024).toFixed(1),
                        preview: e.target?.result as string,
                        id: Math.random().toString(36).slice(2) + Date.now(),
                    }];
                });
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(Array.from(e.dataTransfer.files));
    }, [processFiles]);

    useEffect(() => {
        const handleGlobalDrop = (e: any) => {
            if (e.detail?.files) {
                processFiles(e.detail.files);
            }
        };
        window.addEventListener("global-drop-home", handleGlobalDrop);
        return () => window.removeEventListener("global-drop-home", handleGlobalDrop);
    }, [processFiles]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(Array.from(e.target.files ?? []));
        e.target.value = "";
    };

    const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

    const startCompression = () => {
        if (!files.length || isProcessing) return;
        setIsProcessing(true);
        setProgress(0);

        // Store ALL images in sessionStorage so the compress page can auto-compress them
        if (files.length) {
            try {
                const payload = files.map(f => ({ data: f.preview, name: f.name }));
                sessionStorage.setItem('hero_images', JSON.stringify(payload));
                sessionStorage.setItem('hero_target_size', targetSize.value);
                // Legacy single-file keys — clear so old code doesn't pick up stale data
                sessionStorage.removeItem('hero_image_data');
                sessionStorage.removeItem('hero_image_name');
            } catch {
                // sessionStorage full — silent fallback
            }
        }

        // Animate progress bar then redirect
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) { clearInterval(interval); return 95; }
                return prev + Math.random() * 18;
            });
        }, 100);
        setTimeout(() => {
            setProgress(100);
            clearInterval(interval);
            setTimeout(() => router.push(targetSize.route), 300);
        }, 1100);
    };

    const isEmpty = files.length === 0;

    return (
        <div style={{ maxWidth: "560px", margin: "0 auto 28px", position: "relative" }}>

            {/* Drop zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false); }}
                onDrop={handleDrop}
                onClick={() => isEmpty && inputRef.current?.click()}
                style={{
                    border: `2px dashed ${isDragging ? "#6366f1" : files.length ? "#c7d2fe" : "#c7d2fe"}`,
                    borderRadius: "24px",
                    background: isDragging ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(14px)",
                    boxShadow: isDragging
                        ? "0 8px 32px rgba(99,102,241,0.2)"
                        : "0 4px 24px rgba(0,0,0,0.07)",
                    transition: "all 0.22s ease",
                    transform: isDragging ? "scale(1.01)" : "scale(1)",
                    overflow: "visible",
                    cursor: isEmpty ? "pointer" : "default",
                }}
            >
                {/* Hidden input — multiple, accepts images, works on mobile */}
                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    capture={undefined}
                    onChange={handleInput}
                />

                {/* ── Empty state ── */}
                {isEmpty ? (
                    <div
                        key="empty"
                        className="native-fade-in"
                        style={{ padding: "clamp(24px, 5vw, 32px) clamp(16px, 4vw, 24px)", textAlign: "center" }}
                    >
                        <div style={{
                            width: "clamp(54px, 12vw, 62px)", height: "clamp(54px, 12vw, 62px)", borderRadius: "clamp(16px, 4vw, 20px)",
                            background: isDragging
                                ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                                : "linear-gradient(135deg, #ede9fe, #dbeafe)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 16px",
                            transition: "all 0.2s",
                            boxShadow: isDragging ? "0 6px 20px rgba(99,102,241,0.4)" : "none",
                        }}>
                            <Upload size={24} color={isDragging ? "#fff" : "#6366f1"} strokeWidth={2} />
                        </div>
                        <p style={{ fontSize: "clamp(16px, 4vw, 17px)", fontWeight: 800, color: "#1e293b", marginBottom: "6px", letterSpacing: "-0.01em" }}>
                            {isDragging ? "Release to upload 🎯" : "Drop images here"}
                        </p>
                        <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "18px" }}>
                            or{" "}
                            <span
                                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                                style={{ color: "#6366f1", fontWeight: 700, textDecoration: "underline", cursor: "pointer" }}
                            >
                                click to browse
                            </span>
                            {" "}· JPG, PNG, WEBP · Up to 10 files, Max 20MB/file
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
                            {["🖱 Drag & drop", "📁 Multi-select"].map(t => (
                                <span key={t} style={{
                                    fontSize: "11px", fontWeight: 600, color: "#64748b",
                                    background: "#f8faff", border: "1px solid #e0e7ff",
                                    borderRadius: "100px", padding: "4px 10px"
                                }}>{t}</span>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* ── Files loaded state ── */
                    <div
                        key="files"
                        className="native-fade-in"
                        style={{ padding: "20px" }}
                    >
                        {/* Preview grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "10px", marginBottom: "16px" }}>
                            {files.map((f, i) => (
                                <div
                                    key={f.id}
                                    className={`native-fade-in delay-${(i % 5) * 100}`}
                                    style={{ position: "relative", borderRadius: "14px", overflow: "hidden", aspectRatio: "1/1", background: "#f1f5f9" }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={f.preview} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    {/* Overlay with filename + size */}
                                    <div style={{
                                        position: "absolute", bottom: 0, left: 0, right: 0,
                                        background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                                        padding: "8px 6px 6px",
                                    }}>
                                        <p style={{ fontSize: "9px", color: "#fff", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                                        <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)" }}>{f.sizeKB} KB</p>
                                    </div>
                                    {/* Remove button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                                        style={{
                                            position: "absolute", top: "5px", right: "5px",
                                            width: "22px", height: "22px", borderRadius: "50%",
                                            background: "rgba(0,0,0,0.5)", border: "none",
                                            color: "#fff", cursor: "pointer",
                                            display: "flex", alignItems: "center", justifyContent: "center"
                                        }}
                                    >
                                        <X size={11} />
                                    </button>
                                </div>
                            ))}

                            {/* Add more button */}
                            {files.length < 10 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                                    style={{
                                        borderRadius: "14px", border: "2px dashed #c7d2fe",
                                        background: "#f8faff", cursor: "pointer",
                                        display: "flex", flexDirection: "column",
                                        alignItems: "center", justifyContent: "center",
                                        gap: "4px", aspectRatio: "1/1", color: "#6366f1"
                                    }}
                                >
                                    <ImagePlus size={20} />
                                    <span style={{ fontSize: "10px", fontWeight: 700 }}>Add more</span>
                                </button>
                            )}
                        </div>

                        {/* Target size + compress row */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "stretch" }}>
                            {/* Size dropdown */}
                            <div style={{ position: "relative", flexShrink: 0 }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowSizeDropdown(v => !v); }}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "6px",
                                        background: "#f8faff", border: "1.5px solid #e0e7ff",
                                        borderRadius: "14px", padding: "0 14px", height: "100%",
                                        minHeight: "50px", fontSize: "14px", fontWeight: 700,
                                        color: "#4338ca", cursor: "pointer",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    🎯 {targetSize.label}
                                    <ChevronDown size={14} style={{ transform: showSizeDropdown ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                                </button>
                                {showSizeDropdown && (
                                    <div
                                        className="native-fade-in"
                                        style={{
                                            position: "absolute", bottom: "calc(100% + 6px)", left: 0,
                                            background: "#fff", border: "1px solid #e0e7ff",
                                            borderRadius: "16px", padding: "6px",
                                            boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
                                            zIndex: 50, minWidth: "130px"
                                        }}
                                    >
                                        {SIZE_OPTIONS.map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={(e) => { e.stopPropagation(); setTargetSize(opt); setShowSizeDropdown(false); }}
                                                style={{
                                                    display: "block", width: "100%",
                                                    padding: "9px 12px", textAlign: "left",
                                                    background: targetSize.value === opt.value ? "#ede9fe" : "transparent",
                                                    border: "none", borderRadius: "10px",
                                                    fontSize: "14px", fontWeight: 700,
                                                    color: targetSize.value === opt.value ? "#6366f1" : "#374151",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {opt.label} {targetSize.value === opt.value && "✓"}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Compress button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); startCompression(); }}
                                disabled={isProcessing}
                                style={{
                                    flex: 1,
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                    background: isProcessing
                                        ? "#f1f5f9"
                                        : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    color: isProcessing ? "#94a3b8" : "#fff",
                                    border: "none", borderRadius: "14px",
                                    fontSize: "15px", fontWeight: 800,
                                    cursor: isProcessing ? "not-allowed" : "pointer",
                                    boxShadow: isProcessing ? "none" : "0 4px 16px rgba(99,102,241,0.38)",
                                    transition: "all 0.2s",
                                    letterSpacing: "-0.01em"
                                }}
                            >
                                {isProcessing
                                    ? <><Loader2 size={17} style={{ animation: "spin 0.75s linear infinite" }} /> Preparing…</>
                                    : <><Zap size={17} /> Compress to {targetSize.label}</>
                                }
                            </button>
                        </div>

                        {/* Progress bar */}
                        {isProcessing && (
                            <div
                                className="native-fade-in"
                                style={{ marginTop: "12px", overflow: "hidden" }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#6366f1" }}>Preparing files…</span>
                                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#6366f1" }}>{Math.round(progress)}%</span>
                                </div>
                                <div style={{ height: "6px", background: "#e0e7ff", borderRadius: "100px", overflow: "hidden" }}>
                                    <div
                                        style={{
                                            width: `${progress}%`,
                                            transition: "width 0.1s ease-out",
                                            height: "100%", borderRadius: "100px",
                                            background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)"
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

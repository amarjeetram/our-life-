"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
    Upload, Download, RefreshCw, ImageIcon,
    CheckCircle2, Crop, Palette, Monitor,
    Zap, Shield, Smartphone, LayoutTemplate
} from "lucide-react";

const BANNER_W = 1024;
const BANNER_H = 576;
type FitMode = "fill" | "fit" | "stretch";

const BADGES = [
    { Icon: Zap, label: "Free", color: "#7c3aed", bg: "#ede9fe" },
    { Icon: Shield, label: "No Watermark", color: "#0369a1", bg: "#e0f2fe" },
    { Icon: Download, label: "HD PNG", color: "#15803d", bg: "#dcfce7" },
    { Icon: LayoutTemplate, label: "Templates", color: "#a16207", bg: "#fef9c3" },
    { Icon: Smartphone, label: "Mobile OK", color: "#be185d", bg: "#fce7f3" },
];

const FIT_OPTIONS: { id: FitMode; label: string; desc: string }[] = [
    { id: "fill", label: "Fill & Crop", desc: "Fills canvas, trims edges" },
    { id: "fit", label: "Fit & Pad", desc: "Full image with side bars" },
    { id: "stretch", label: "Stretch", desc: "Forces exact fit" },
];

const PRESET_COLORS = [
    "#0f172a", "#1e1b4b", "#7f1d1d", "#14532d",
    "#1e3a5f", "#ffffff", "#f8fafc", "#6d28d9",
    "#b45309", "#374151",
];

function applyDraw(img: HTMLImageElement, ctx: CanvasRenderingContext2D, w: number, h: number, bg: string, fit: FitMode) {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    const ir = img.width / img.height, cr = w / h;
    let dw: number, dh: number, dx: number, dy: number;
    if (fit === "stretch") { dw = w; dh = h; dx = 0; dy = 0; }
    else if (fit === "fill") {
        if (ir > cr) { dh = h; dw = h * ir; } else { dw = w; dh = w / ir; }
        dx = (w - dw) / 2; dy = (h - dh) / 2;
    } else {
        if (ir > cr) { dw = w; dh = w / ir; } else { dh = h; dw = h * ir; }
        dx = (w - dw) / 2; dy = (h - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
}

export default function YoutubeBannerClient() {
    const [src, setSrc] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [bg, setBg] = useState("#0f172a");
    const [fit, setFit] = useState<FitMode>("fill");
    const [dragging, setDragging] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [ready, setReady] = useState(false);
    const [outUrl, setOutUrl] = useState<string | null>(null);
    const [outSize, setOutSize] = useState("");

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewRef = useRef<HTMLCanvasElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const drawPreview = useCallback(() => {
        if (!src || !previewRef.current) return;
        const cv = previewRef.current, ctx = cv.getContext("2d");
        if (!ctx) return;
        cv.width = 640; cv.height = 360;
        const img = new window.Image();
        img.onload = () => applyDraw(img, ctx, 640, 360, bg, fit);
        img.src = src;
    }, [src, bg, fit]);

    useEffect(() => { drawPreview(); }, [drawPreview]);

    const loadFile = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) return;
        setFileName(file.name); setReady(false); setOutUrl(null);
        const r = new FileReader();
        r.onload = (e) => setSrc(e.target?.result as string);
        r.readAsDataURL(file);
    }, []);

    const generate = () => {
        if (!src || !canvasRef.current) return;
        setProcessing(true);
        const cv = canvasRef.current; cv.width = BANNER_W; cv.height = BANNER_H;
        const ctx = cv.getContext("2d"); if (!ctx) return;
        const img = new window.Image();
        img.onload = () => {
            applyDraw(img, ctx, BANNER_W, BANNER_H, bg, fit);
            cv.toBlob((blob) => {
                if (!blob) return;
                setOutUrl(URL.createObjectURL(blob));
                setOutSize(`${(blob.size / 1024).toFixed(1)} KB`);
                setReady(true); setProcessing(false);
            }, "image/png");
        };
        img.src = src;
    };

    const download = () => {
        if (!outUrl) return;
        const a = document.createElement("a");
        a.href = outUrl; a.download = "youtube-banner-1024x576.png"; a.click();
    };

    const reset = () => {
        setSrc(null); setOutUrl(null); setReady(false); setFileName("");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <>
            <style>{`
                @keyframes yt-spin { to { transform: rotate(360deg); } }

                /* ── hero ── */
                .ytb-hero {
                    background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%);
                    border-radius: 20px;
                    padding: 24px 24px 20px;
                    margin-bottom: 14px;
                    color: #fff;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.25);
                    position: relative;
                    overflow: hidden;
                }
                .ytb-hero-top { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
                .ytb-hero-icon {
                    background: linear-gradient(135deg,#ff0000,#c00);
                    border-radius: 12px; width: 42px; height: 42px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 16px rgba(239,68,68,0.4);
                }
                .ytb-hero h1 {
                    margin: 0; font-size: 22px; font-weight: 900;
                    line-height: 1.15; color: #fff;
                }
                .ytb-hero-sub {
                    margin: 0 0 14px; font-size: 13px; color: #94a3b8; line-height: 1.6;
                }
                .ytb-badges { display: flex; flex-wrap: wrap; gap: 6px; }
                .ytb-badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 100px; padding: 5px 11px;
                    font-size: 11px; font-weight: 700; color: #e2e8f0;
                    white-space: nowrap;
                }
                .ytb-badge-dot {
                    width: 18px; height: 18px; border-radius: 50%;
                    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
                }

                /* ── upload ── */
                .ytb-upload {
                    border: 2px dashed #e2e8f0; border-radius: 18px;
                    padding: 36px 20px; text-align: center; cursor: pointer;
                    background: #fff; transition: all 0.18s; margin-bottom: 16px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
                }
                .ytb-upload.drag { border-color: #ef4444; background: #fff5f5; }
                .ytb-upload-icon {
                    width: 60px; height: 60px; border-radius: 16px;
                    background: #f1f5f9; margin: 0 auto 14px;
                    display: flex; align-items: center; justify-content: center;
                    color: #64748b; transition: all 0.18s;
                }
                .ytb-upload.drag .ytb-upload-icon { background: #fee2e2; color: #ef4444; }
                .ytb-upload h2 { font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 5px; }
                .ytb-upload p  { font-size: 12px; color: #64748b; margin: 0 0 18px; }
                .ytb-upload-btn {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: #ef4444; color: #fff; border-radius: 100px;
                    padding: 11px 24px; font-weight: 700; font-size: 14px;
                    box-shadow: 0 4px 16px rgba(239,68,68,0.3);
                }

                /* ── editor cards ── */
                .ytb-card {
                    background: #fff; border-radius: 18px; padding: 20px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
                }
                .ytb-card-title {
                    display: flex; align-items: center; gap: 7px;
                    font-size: 13px; font-weight: 800; color: #0f172a;
                    margin-bottom: 14px;
                }
                .ytb-settings { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                .ytb-fit-btn {
                    display: flex; align-items: center; justify-content: space-between;
                    width: 100%; padding: 10px 12px; border-radius: 10px;
                    margin-bottom: 7px; border: 2px solid #f1f5f9;
                    background: #fafbff; cursor: pointer; text-align: left;
                    transition: all 0.14s;
                }
                .ytb-fit-btn.active { border-color: #ef4444; background: #fff5f5; }

                /* ── action btns ── */
                .ytb-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
                .ytb-btn-gen {
                    flex: 1 1 160px; padding: 14px 20px; border-radius: 12px;
                    border: none; cursor: pointer; font-weight: 800; font-size: 14px;
                    background: linear-gradient(135deg,#ef4444,#dc2626); color: #fff;
                    display:flex; align-items:center; justify-content:center; gap: 8px;
                    box-shadow: 0 6px 20px rgba(239,68,68,0.35); transition: all 0.18s;
                }
                .ytb-btn-gen:disabled { background: #94a3b8; box-shadow: none; cursor: not-allowed; }
                .ytb-btn-dl {
                    flex: 1 1 160px; padding: 14px 20px; border-radius: 12px;
                    border: none; cursor: pointer; font-weight: 800; font-size: 14px;
                    background: linear-gradient(135deg,#10b981,#059669); color: #fff;
                    display:flex; align-items:center; justify-content:center; gap: 8px;
                    box-shadow: 0 6px 20px rgba(16,185,129,0.3);
                }
                .ytb-btn-reset {
                    padding: 14px 16px; border-radius: 12px; font-weight: 700; font-size: 13px;
                    border: 1.5px solid #e2e8f0; background:#fff; color:#64748b; cursor:pointer;
                    display:flex; align-items:center; gap:6px;
                }

                /* ── success ── */
                .ytb-success {
                    display:flex; align-items:center; gap:12px;
                    background:#f0fdf4; border:1.5px solid #86efac;
                    border-radius:14px; padding:14px 18px;
                }

                /* ── MOBILE ── */
                @media (max-width: 600px) {
                    .ytb-hero { padding: 18px 16px 16px; margin-bottom: 12px; border-radius: 16px; }
                    .ytb-hero h1 { font-size: 18px; }
                    .ytb-hero-sub { font-size: 12px; margin-bottom: 10px; }
                    .ytb-badge { font-size: 10px; padding: 4px 9px; }
                    .ytb-upload { padding: 28px 16px; border-radius: 14px; margin-bottom: 12px; }
                    .ytb-upload h2 { font-size: 15px; }
                    .ytb-settings { grid-template-columns: 1fr; }
                    .ytb-badge-dot { width: 16px; height: 16px; }
                }
            `}</style>

            {/* ── HERO ── */}
            <div className="ytb-hero">
                <div style={{
                    position: "absolute", top: -60, right: -60, width: 220, height: 220,
                    borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />
                <div className="ytb-hero-top">
                    <div className="ytb-hero-icon"><Monitor size={20} color="#fff" /></div>
                    <div>
                        <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            YouTube Tools — Free
                        </p>
                        <h1>1024×576 YouTube Banner Maker</h1>
                    </div>
                </div>
                <p className="ytb-hero-sub">
                    Upload your image, choose fit &amp; background, download 1024×576 PNG — free, no signup.
                </p>
                <div className="ytb-badges">
                    {BADGES.map(({ Icon, label, color, bg: badgeBg }) => (
                        <span key={label} className="ytb-badge">
                            <span className="ytb-badge-dot" style={{ background: badgeBg }}>
                                <Icon size={10} color={color} />
                            </span>
                            {label}
                        </span>
                    ))}
                </div>
            </div>


            {/* ── UPLOAD ── */}
            {!src && (
                <div
                    className={`ytb-upload${dragging ? " drag" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}
                    onClick={() => inputRef.current?.click()}
                >
                    <div className="ytb-upload-icon"><ImageIcon size={28} strokeWidth={1.5} /></div>
                    <h2>Drop your image here, or click to upload</h2>
                    <p>JPG · PNG · WEBP · Any resolution accepted</p>
                    <div className="ytb-upload-btn"><Upload size={15} /> Choose Image</div>
                    <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
                </div>
            )}

            {/* ── EDITOR ── */}
            {src && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                    {/* Preview */}
                    <div className="ytb-card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 7,
                            padding: "11px 16px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9",
                        }}>
                            {["#ef4444", "#f59e0b", "#10b981"].map(c => (
                                <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                            ))}
                            <span style={{ marginLeft: 4, fontSize: 12, fontWeight: 700, color: "#475569" }}>Live Preview</span>
                            <span style={{
                                marginLeft: "auto", fontSize: 10, fontWeight: 700,
                                background: "#ede9fe", color: "#6d28d9", padding: "2px 9px", borderRadius: 100,
                            }}>1024×576 px</span>
                        </div>
                        <div style={{ background: "#111827", display: "flex", justifyContent: "center", alignItems: "center", padding: 16 }}>
                            <canvas ref={previewRef} style={{ maxWidth: "100%", borderRadius: 5, display: "block" }} />
                        </div>
                        <div style={{ padding: "7px 16px", fontSize: 10, color: "#94a3b8", background: "#f8fafc" }}>
                            {fileName} · Processed locally — never leaves your browser
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="ytb-settings">
                        {/* Fit */}
                        <div className="ytb-card">
                            <div className="ytb-card-title"><Crop size={14} color="#ef4444" /> Image Fit</div>
                            {FIT_OPTIONS.map(opt => (
                                <button key={opt.id} onClick={() => setFit(opt.id)}
                                    className={`ytb-fit-btn${fit === opt.id ? " active" : ""}`}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: "#0f172a" }}>{opt.label}</div>
                                        <div style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}>{opt.desc}</div>
                                    </div>
                                    {fit === opt.id && <CheckCircle2 size={16} color="#ef4444" style={{ flexShrink: 0 }} />}
                                </button>
                            ))}
                        </div>

                        {/* Color */}
                        <div className="ytb-card">
                            <div className="ytb-card-title"><Palette size={14} color="#ef4444" /> Background</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>
                                {PRESET_COLORS.map(c => (
                                    <button key={c} onClick={() => setBg(c)} title={c} style={{
                                        width: 28, height: 28, borderRadius: 8, background: c, cursor: "pointer",
                                        border: bg === c ? "3px solid #ef4444" : "2px solid #e2e8f0",
                                        boxShadow: bg === c ? "0 0 0 2px rgba(239,68,68,0.2)" : "none",
                                        transform: bg === c ? "scale(1.15)" : "scale(1)",
                                        transition: "all 0.12s",
                                    }} />
                                ))}
                            </div>
                            <div style={{
                                display: "flex", alignItems: "center", gap: 8,
                                background: "#f8fafc", borderRadius: 8, padding: "7px 10px",
                                border: "1px solid #e2e8f0",
                            }}>
                                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>Custom</span>
                                <input type="color" value={bg} onChange={e => setBg(e.target.value)} style={{
                                    width: 30, height: 24, borderRadius: 5, border: "1px solid #e2e8f0", cursor: "pointer", padding: 2,
                                }} />
                                <code style={{
                                    fontSize: 11, fontWeight: 700, color: "#374151",
                                    background: "#fff", padding: "2px 8px", borderRadius: 5, border: "1px solid #e2e8f0",
                                }}>{bg}</code>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="ytb-actions">
                        <button onClick={generate} disabled={processing} className="ytb-btn-gen">
                            {processing
                                ? <><RefreshCw size={16} style={{ animation: "yt-spin 1s linear infinite" }} /> Generating…</>
                                : <><Monitor size={16} /> Generate 1024×576 Banner</>}
                        </button>
                        {ready && outUrl && (
                            <button onClick={download} className="ytb-btn-dl">
                                <Download size={16} /> Download HD PNG
                            </button>
                        )}
                        <button onClick={reset} className="ytb-btn-reset">
                            <RefreshCw size={14} /> Reset
                        </button>
                    </div>

                    {ready && (
                        <div className="ytb-success">
                            <div style={{
                                width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                                background: "linear-gradient(135deg,#10b981,#059669)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <CheckCircle2 size={18} color="#fff" />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontWeight: 800, color: "#065f46", fontSize: 14 }}>Banner is ready!</p>
                                <p style={{ margin: "2px 0 0", fontSize: 11, color: "#047857" }}>
                                    1024×576 · PNG · {outSize} · Click "Download HD PNG"
                                </p>
                            </div>
                        </div>
                    )}

                    <canvas ref={canvasRef} style={{ display: "none" }} />
                </div>
            )}
        </>
    );
}

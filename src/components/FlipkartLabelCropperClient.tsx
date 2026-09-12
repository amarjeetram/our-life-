'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Download, Scissors, RotateCcw, CheckCircle2, AlertCircle,
    Printer, Image as ImageIcon, Tag, Package, FileText, Loader2,
    ChevronLeft, ChevronRight, Upload, Check,
} from 'lucide-react';

interface CropPreset {
    name: string;
    label: string;
    description: string;
    cropFn: (w: number, h: number) => { x: number; y: number; w: number; h: number };
    icon: React.ReactNode;
    color: string;
}

const PRESETS: CropPreset[] = [
    {
        name: 'top-half',
        label: 'Top Half',
        description: 'Shipping barcode label (most Flipkart PDFs)',
        cropFn: (w, h) => ({ x: 0, y: 0, w, h: Math.floor(h / 2) }),
        icon: <Tag className="w-4 h-4" />,
        color: '#f97316',
    },
    {
        name: 'bottom-half',
        label: 'Bottom Half',
        description: 'Invoice / buyer details section',
        cropFn: (w, h) => ({ x: 0, y: Math.floor(h / 2), w, h: Math.floor(h / 2) }),
        icon: <Package className="w-4 h-4" />,
        color: '#3b82f6',
    },
    {
        name: 'top-third',
        label: 'Top Third',
        description: 'Compact label for thermal printers',
        cropFn: (w, h) => ({ x: 0, y: 0, w, h: Math.floor(h / 3) }),
        icon: <Scissors className="w-4 h-4" />,
        color: '#10b981',
    },
    {
        name: 'full',
        label: 'Full Page',
        description: 'Keep the full page as-is',
        cropFn: (w, h) => ({ x: 0, y: 0, w, h }),
        icon: <ImageIcon className="w-4 h-4" />,
        color: '#8b5cf6',
    },
];

const TRUST_BADGES = ['100% Browser-Based', 'Zero Data Upload', 'Instant Download', 'Print Ready', 'Free Forever'];

type StatusType = 'idle' | 'ready' | 'cropped' | 'error';

export default function FlipkartLabelCropperClient({ children }: { children?: React.ReactNode }) {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [imgName, setImgName] = useState<string>('flipkart-label');
    const [selectedPreset, setSelectedPreset] = useState<string>('top-half');
    const [status, setStatus] = useState<StatusType>('idle');
    const [croppedDataURL, setCroppedDataURL] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
    const [pdfLoading, setPdfLoading] = useState(false);
    const [totalPdfPages, setTotalPdfPages] = useState(0);
    const [currentPdfPage, setCurrentPdfPage] = useState(1);

    const pdfFileRef = useRef<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const originalImgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    /* ─── PDF Rendering ───────────────────────── */
    const renderPdfPage = useCallback(async (file: File, pageNum: number) => {
        setPdfLoading(true);
        try {
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
                'pdfjs-dist/build/pdf.worker.min.mjs',
                import.meta.url
            ).toString();
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            setTotalPdfPages(pdf.numPages);
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.5 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d')!;
            await page.render({ canvasContext: ctx, canvas, viewport }).promise;
            const src = canvas.toDataURL('image/jpeg', 0.97);
            const img = new Image();
            img.onload = () => {
                originalImgRef.current = img;
                setImgDims({ w: img.naturalWidth, h: img.naturalHeight });
                setImgSrc(src);
                setStatus('ready');
                setCroppedDataURL(null);
                setPdfLoading(false);
            };
            img.src = src;
        } catch {
            setStatus('error');
            setPdfLoading(false);
        }
    }, []);

    const loadFile = useCallback((file: File) => {
        setImgName(file.name.replace(/\.[^/.]+$/, ''));
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
            pdfFileRef.current = file;
            setCurrentPdfPage(1);
            renderPdfPage(file, 1);
            return;
        }
        setStatus('error');
    }, [renderPdfPage]);

    const handlePageChange = useCallback((newPage: number) => {
        if (!pdfFileRef.current || newPage < 1 || newPage > totalPdfPages) return;
        setCurrentPdfPage(newPage);
        setCroppedDataURL(null);
        renderPdfPage(pdfFileRef.current, newPage);
    }, [totalPdfPages, renderPdfPage]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) loadFile(file);
    }, [loadFile]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) loadFile(file);
    }, [loadFile]);

    const handleCrop = useCallback(() => {
        if (!originalImgRef.current || !imgDims.w) return;
        const preset = PRESETS.find(p => p.name === selectedPreset);
        if (!preset) return;
        const { x, y, w, h } = preset.cropFn(imgDims.w, imgDims.h);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(originalImgRef.current, x, y, w, h, 0, 0, w, h);
        setCroppedDataURL(canvas.toDataURL('image/jpeg', 0.95));
        setStatus('cropped');
    }, [imgDims, selectedPreset]);

    const handleDownload = useCallback(() => {
        if (!croppedDataURL) return;
        const a = document.createElement('a');
        a.href = croppedDataURL;
        a.download = `${imgName}-cropped-label.jpg`;
        a.click();
    }, [croppedDataURL, imgName]);

    const handlePrint = useCallback(() => {
        if (!croppedDataURL) return;
        const win = window.open('', '_blank');
        if (!win) return;
        win.document.write(`<html><head><title>Print Flipkart Label</title>
            <style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#fff;}
            img{max-width:100%;height:auto;print-color-adjust:exact;}@media print{body{margin:0;}}</style>
            </head><body><img src="${croppedDataURL}"/><script>window.onload=()=>{window.print();window.close();}<\/script></body></html>`);
        win.document.close();
    }, [croppedDataURL]);

    const handleReset = useCallback(() => {
        setImgSrc(null);
        setCroppedDataURL(null);
        setStatus('idle');
        setTotalPdfPages(0);
        setCurrentPdfPage(1);
        pdfFileRef.current = null;
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, []);

    /* ─── Preview Canvas Rendering ────────────── */
    useEffect(() => {
        const canvas = previewCanvasRef.current;
        if (!canvas || !originalImgRef.current || !imgDims.w) return;
        const img = originalImgRef.current;
        const preset = PRESETS.find(p => p.name === selectedPreset);
        if (!preset) return;
        const { x, y, w, h } = preset.cropFn(imgDims.w, imgDims.h);

        canvas.width = imgDims.w;
        canvas.height = imgDims.h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, imgDims.w, imgDims.h);

        // Darken non-crop area
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.fillRect(0, 0, imgDims.w, imgDims.h);

        // Highlight crop area sharply
        ctx.clearRect(x, y, w, h);
        ctx.drawImage(img, x, y, w, h, x, y, w, h);

        // Dashed border around crop box
        ctx.strokeStyle = preset.color || '#f97316';
        ctx.lineWidth = Math.max(4, Math.round(imgDims.w / 200));
        ctx.setLineDash([Math.round(imgDims.w / 60), Math.round(imgDims.w / 120)]);
        ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    }, [selectedPreset, imgDims, imgSrc]);

    const activePreset = PRESETS.find(p => p.name === selectedPreset) ?? PRESETS[0];

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', fontFamily: "'Inter', sans-serif" }}>

            {/* ─── Scoped Component CSS (Pure CSS Hover & Transitions) ─── */}
            <style>{`
                /* App Container & Layout */
                .fk-app-wrapper {
                    height: 100vh;
                    box-sizing: border-box;
                    padding-top: 82px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .fk-grid-layout {
                    flex: 1;
                    min-height: 0;
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    overflow: hidden;
                    border-top: 1px solid rgba(51, 65, 85, 0.4);
                }

                @media (max-width: 900px) {
                    .fk-app-wrapper {
                        height: auto;
                        min-height: 100vh;
                        overflow: visible;
                    }
                    .fk-grid-layout {
                        display: flex;
                        flex-direction: column;
                        height: auto;
                        overflow: visible;
                    }
                }

                /* Canvas styling */
                .fk-preview-canvas {
                    max-height: calc(100vh - 170px);
                    max-width: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    display: block;
                    margin: 0 auto;
                    border-radius: 8px;
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
                }

                /* Preset cards */
                .fk-preset-btn {
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 10px;
                    border: 1.5px solid #1e293b;
                    background: #111827;
                    color: #94a3b8;
                    font-size: 13px;
                    font-weight: 600;
                    text-align: left;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
                    outline: none;
                }

                .fk-preset-btn:hover {
                    background: #1e293b;
                    border-color: #334155;
                    color: #f1f5f9;
                }

                .fk-preset-btn.is-selected {
                    border-color: #f97316;
                    background: rgba(249, 115, 22, 0.08);
                    color: #ffffff;
                }

                /* Primary Action Button (Crop Label) */
                .fk-btn-primary {
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                    color: #ffffff;
                    font-weight: 800;
                    font-size: 14px;
                    border-radius: 10px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
                    transition: transform 0.1s ease, box-shadow 0.15s ease, filter 0.15s ease;
                    outline: none;
                }

                .fk-btn-primary:hover {
                    filter: brightness(1.1);
                    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.5);
                    transform: translateY(-1px);
                }

                .fk-btn-primary:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
                }

                /* Secondary Button (Download, Print) */
                .fk-btn-secondary {
                    padding: 10px 14px;
                    background: #1e293b;
                    border: 1.5px solid #334155;
                    color: #e2e8f0;
                    font-size: 13px;
                    font-weight: 700;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
                    outline: none;
                }

                .fk-btn-secondary:hover:not(:disabled) {
                    background: #27354a;
                    border-color: #475569;
                    color: #ffffff;
                }

                .fk-btn-secondary:disabled {
                    background: #111827;
                    border-color: #1e293b;
                    color: #475569;
                    cursor: not-allowed;
                    opacity: 0.55;
                }

                /* Outline Button (Upload New PDF) */
                .fk-btn-outline {
                    width: 100%;
                    padding: 9px;
                    background: transparent;
                    border: 1.5px dashed #334155;
                    color: #94a3b8;
                    font-size: 12px;
                    font-weight: 600;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
                    outline: none;
                }

                .fk-btn-outline:hover {
                    border-color: #64748b;
                    color: #f1f5f9;
                    background: rgba(255, 255, 255, 0.04);
                }

                /* Reset / Remove file button */
                .fk-icon-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: #1e293b;
                    border: 1px solid #334155;
                    color: #94a3b8;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
                    outline: none;
                }

                .fk-icon-btn:hover {
                    background: #ef4444;
                    border-color: #ef4444;
                    color: #ffffff;
                }

                /* Pagination buttons */
                .fk-page-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: #1e293b;
                    border: 1px solid #334155;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.15s ease, border-color 0.15s ease;
                    outline: none;
                }

                .fk-page-btn:hover:not(:disabled) {
                    background: #334155;
                    border-color: #475569;
                }

                .fk-page-btn:disabled {
                    opacity: 0.3;
                    cursor: default;
                }

                /* Hero select button */
                .fk-hero-btn {
                    padding: 13px 32px;
                    background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%);
                    color: #ffffff;
                    font-weight: 800;
                    font-size: 15px;
                    border-radius: 14px;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
                    transition: transform 0.15s ease, filter 0.15s ease;
                    outline: none;
                }

                .fk-hero-btn:hover {
                    transform: translateY(-2px);
                    filter: brightness(1.08);
                }

                .fk-hero-btn:active {
                    transform: translateY(0);
                }
            `}</style>

            {/* ── Hidden file input ── */}
            <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleFileChange} />

            {/* ════════════════════════════════════
                INITIAL STATE — Beautiful Drop Zone
            ════════════════════════════════════ */}
            {!imgSrc && !pdfLoading && (
                <section style={{ paddingTop: 104, paddingBottom: 48, paddingLeft: 16, paddingRight: 16 }}>
                    <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>

                        {/* Badge */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#fb923c', fontWeight: 700, fontSize: 13, marginBottom: 24 }}>
                            <Scissors size={14} />
                            Free Online Tool · No Upload · 100% Private
                        </div>

                        {/* H1 */}
                        <h1 style={{ fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, color: '#fff', margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                            Flipkart{' '}
                            <span style={{ background: 'linear-gradient(90deg,#f97316,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Label Cropper
                            </span>
                        </h1>

                        <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 36, lineHeight: 1.7, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
                            Instantly crop your <strong style={{ color: '#e2e8f0' }}>Flipkart shipping label</strong> from any A4 PDF invoice.
                            Quick label crop in 1 click — perfect for thermal printers.
                        </p>

                        {/* Trust badges */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 36 }}>
                            {TRUST_BADGES.map(b => (
                                <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(51,65,85,0.6)', borderRadius: 100, fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>
                                    <CheckCircle2 size={13} color="#34d399" />
                                    {b}
                                </span>
                            ))}
                        </div>

                        {/* Error state */}
                        {status === 'error' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, color: '#f87171', fontSize: 14, fontWeight: 600, marginBottom: 16, justifyContent: 'center' }}>
                                <AlertCircle size={16} /> Please upload a PDF file only.
                            </div>
                        )}

                        {/* Drop Zone */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            style={{
                                border: `2px dashed ${dragging ? '#f97316' : 'rgba(99,102,241,0.4)'}`,
                                borderRadius: 24,
                                padding: '56px 32px',
                                cursor: 'pointer',
                                background: dragging ? 'rgba(249,115,22,0.06)' : 'rgba(15,23,42,0.5)',
                                backdropFilter: 'blur(12px)',
                                transition: 'all 0.2s',
                                transform: dragging ? 'scale(1.01)' : 'scale(1)',
                            }}
                        >
                            <div style={{ width: 80, height: 80, margin: '0 auto 20px', borderRadius: 22, background: 'linear-gradient(135deg,rgba(249,115,22,0.2),rgba(245,158,11,0.2))', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
                                <Upload size={36} />
                            </div>
                            <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>
                                Drop your Flipkart PDF here
                            </p>
                            <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 24px', lineHeight: 1.6 }}>
                                Flipkart invoice or shipping label PDF — page renders instantly in preview
                            </p>
                            <button className="fk-hero-btn">
                                📄 Select PDF File
                            </button>
                            <p style={{ fontSize: 12, color: '#475569', marginTop: 16 }}>PDF format only · No server upload · 100% private</p>
                        </div>

                        {/* How it works */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 32 }}>
                            {[
                                { step: '1', title: 'Upload PDF', desc: 'Select your Flipkart invoice PDF' },
                                { step: '2', title: 'Choose Crop', desc: 'Pick Top Half for shipping label' },
                                { step: '3', title: 'Download', desc: 'Save & print on thermal printer' },
                            ].map(s => (
                                <div key={s.step} style={{ padding: '20px 16px', background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(51,65,85,0.4)', borderRadius: 16, textAlign: 'center' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#f59e0b)', color: '#fff', fontWeight: 900, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>{s.step}</div>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', margin: '0 0 4px' }}>{s.title}</p>
                                    <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════
                PDF LOADING STATE
            ════════════════════════════════════ */}
            {pdfLoading && (
                <div style={{ paddingTop: 140, paddingBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: '#94a3b8', fontSize: 15, fontWeight: 600 }}>
                    <Loader2 size={48} color="#f97316" style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Rendering PDF page {currentPdfPage}… please wait</span>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {/* ════════════════════════════════════
                PDF LOADED — Compact 1-Screen App
            ════════════════════════════════════ */}
            {imgSrc && !pdfLoading && (
                <div className="fk-app-wrapper">
                    <div className="fk-grid-layout">

                        {/* ── Left: PDF Canvas Preview ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b', minHeight: 0, overflow: 'hidden', background: '#0b1120' }}>
                            {/* Canvas centering area */}
                            <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflow: 'hidden' }}>
                                <canvas ref={previewCanvasRef} className="fk-preview-canvas" />
                            </div>

                            {/* Bottom bar with preset info and page navigation */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', borderTop: '1px solid #1e293b', background: '#070c18', minHeight: 46 }}>
                                <div style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: activePreset.color, display: 'inline-block' }} />
                                    <span>Selected Crop: <strong style={{ color: activePreset.color }}>{activePreset.label}</strong> ({activePreset.description})</span>
                                </div>

                                {totalPdfPages > 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <button onClick={() => handlePageChange(currentPdfPage - 1)} disabled={currentPdfPage <= 1} className="fk-page-btn" title="Previous page">
                                            <ChevronLeft size={16} />
                                        </button>
                                        <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                                            Page {currentPdfPage} of {totalPdfPages}
                                        </span>
                                        <button onClick={() => handlePageChange(currentPdfPage + 1)} disabled={currentPdfPage >= totalPdfPages} className="fk-page-btn" title="Next page">
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Right: Controls Panel ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: '#0f172a', overflow: 'hidden' }}>
                            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

                                {/* File info banner */}
                                <div style={{ background: '#1e293b', borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', flexShrink: 0 }}>
                                        <FileText size={16} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {imgName}.pdf
                                        </div>
                                        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                                            {imgDims.w}×{imgDims.h}px{totalPdfPages > 0 ? ` · ${totalPdfPages} page${totalPdfPages > 1 ? 's' : ''}` : ''}
                                        </div>
                                    </div>
                                    <button onClick={handleReset} title="Remove PDF" className="fk-icon-btn">
                                        <RotateCcw size={14} />
                                    </button>
                                </div>

                                {/* Crop Mode Presets */}
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                                        Select Crop Mode
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        {PRESETS.map(p => {
                                            const isSelected = selectedPreset === p.name;
                                            return (
                                                <button
                                                    key={p.name}
                                                    onClick={() => { setSelectedPreset(p.name); setCroppedDataURL(null); setStatus('ready'); }}
                                                    className={`fk-preset-btn ${isSelected ? 'is-selected' : ''}`}
                                                    style={isSelected ? { borderColor: p.color, background: `${p.color}15` } : {}}
                                                >
                                                    <span style={{
                                                        width: 28, height: 28, borderRadius: 7,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                                        background: isSelected ? p.color : '#1e293b',
                                                        color: isSelected ? '#fff' : '#64748b',
                                                        transition: 'all 0.15s ease'
                                                    }}>
                                                        {p.icon}
                                                    </span>
                                                    <span style={{ flex: 1, minWidth: 0 }}>
                                                        <span style={{ display: 'block', color: isSelected ? '#fff' : '#cbd5e1' }}>{p.label}</span>
                                                        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 400, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</span>
                                                    </span>
                                                    {isSelected && (
                                                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: `${p.color}25`, color: p.color, display: 'flex', alignItems: 'center', gap: 3 }}>
                                                            <Check size={11} /> ACTIVE
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Cropped preview thumbnail */}
                                {croppedDataURL && (
                                    <div style={{ background: '#141c2c', borderRadius: 10, padding: 10, border: '1px solid #1e293b' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 5 }}>
                                                <CheckCircle2 size={14} /> Ready to Download
                                            </span>
                                            <span style={{ fontSize: 10, color: '#64748b' }}>Label Cropped</span>
                                        </div>
                                        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #334155', maxHeight: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={croppedDataURL} alt="Cropped Flipkart label" style={{ maxWidth: '100%', maxHeight: 110, objectFit: 'contain', display: 'block' }} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Action Buttons (bottom controls) ── */}
                            <div style={{ padding: '14px 16px', borderTop: '1px solid #1e293b', background: '#0a0f1e', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <button onClick={handleCrop} className="fk-btn-primary">
                                    <Scissors size={16} /> Crop Label
                                </button>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                    <button
                                        onClick={handleDownload}
                                        disabled={!croppedDataURL}
                                        className="fk-btn-secondary"
                                        style={croppedDataURL ? { background: '#10b981', borderColor: '#10b981', color: '#fff' } : {}}
                                    >
                                        <Download size={14} /> Download
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        disabled={!croppedDataURL}
                                        className="fk-btn-secondary"
                                        style={croppedDataURL ? { background: '#3b82f6', borderColor: '#3b82f6', color: '#fff' } : {}}
                                    >
                                        <Printer size={14} /> Print
                                    </button>
                                </div>

                                <button onClick={() => fileInputRef.current?.click()} className="fk-btn-outline">
                                    <Upload size={13} /> Upload New PDF
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* ─── SEO Article & Ads below the tool ─── */}
            {children}
        </div>
    );
}

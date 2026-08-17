"use client";

import { useState, useRef, useCallback, useEffect, MouseEvent } from "react";
import {
    Upload, Download, RefreshCw, ImageIcon,
    CheckCircle2, Crop, Palette, Monitor,
    Zap, Shield, Smartphone,
    ZoomIn, RotateCw, Sun, Type, Layers, Sliders
} from "lucide-react";

const DEFAULT_W = 1024;
const DEFAULT_H = 576;
type FitMode = "fill" | "fit" | "stretch" | "pan";
type Tab = "crop" | "adjust" | "background" | "text" | "size";

interface TextOverlay {
    text: string; fontSize: number; color: string; fontFamily: string;
    x: number; y: number; bold: boolean; align: "left" | "center" | "right";
    shadow: boolean; opacity: number;
}

const BADGES = [
    { Icon: Zap, label: "Free", color: "#7c3aed", bg: "#ede9fe" },
    { Icon: Shield, label: "No Watermark", color: "#0369a1", bg: "#e0f2fe" },
    { Icon: Download, label: "HD PNG/JPG", color: "#15803d", bg: "#dcfce7" },
    { Icon: Crop, label: "Crop & Adjust", color: "#a16207", bg: "#fef9c3" },
    { Icon: Smartphone, label: "Mobile OK", color: "#be185d", bg: "#fce7f3" },
];

const PRESET_BG = [
    "#0f172a","#1e1b4b","#7f1d1d","#14532d",
    "#1e3a5f","#ffffff","#f8fafc","#6d28d9",
    "#b45309","#374151","#be185d","#0e7490",
];

const GRADIENTS = [
    { label: "None", value: "" },
    { label: "Dark Bottom", value: "linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)" },
    { label: "Dark Top", value: "linear-gradient(to bottom,rgba(0,0,0,0.7) 0%,transparent 60%)" },
    { label: "YouTube Red", value: "linear-gradient(135deg,rgba(255,0,0,0.4) 0%,rgba(200,0,0,0.1) 100%)" },
    { label: "Purple Dream", value: "linear-gradient(135deg,rgba(99,102,241,0.5) 0%,rgba(139,92,246,0.3) 100%)" },
    { label: "Golden Hour", value: "linear-gradient(135deg,rgba(251,191,36,0.4) 0%,rgba(245,158,11,0.2) 100%)" },
    { label: "Vignette", value: "radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.6) 100%)" },
];

const FONTS = ["Arial","Georgia","Impact","Verdana","Trebuchet MS","Times New Roman","Courier New","Comic Sans MS"];

const SIZES = [
    { label: "1024x576 (Standard)", w:1024, h:576 },
    { label: "2560x1440 (Max Quality)", w:2560, h:1440 },
    { label: "1280x720 (HD)", w:1280, h:720 },
    { label: "1920x1080 (Full HD)", w:1920, h:1080 },
    { label: "Custom Size", w:0, h:0 },
];

function SliderRow({ label, icon, value, min, max, step, display, onChange }:{
    label:string; icon:React.ReactNode; value:number; min:number; max:number; step:number; display:string; onChange:(v:number)=>void;
}) {
    const pct = ((value-min)/(max-min))*100;
    return (
        <div className="ytb-slider-wrap">
            <div className="ytb-slider-label">
                <span style={{display:"flex",alignItems:"center",gap:5}}>{icon}{label}</span>
                <span className="ytb-slider-val">{display}</span>
            </div>
            <input type="range" className="ytb-range" min={min} max={max} step={step} value={value}
                style={{"--pct":`${pct}%`} as React.CSSProperties}
                onChange={e=>onChange(parseFloat(e.target.value))} />
        </div>
    );
}

export default function YoutubeBannerClient() {
    const [src,setSrc] = useState<string|null>(null);
    const [imgEl,setImgEl] = useState<HTMLImageElement|null>(null);
    const [fileName,setFileName] = useState("");
    const [dragging,setDragging] = useState(false);
    const [processing,setProcessing] = useState(false);
    const [ready,setReady] = useState(false);
    const [outUrl,setOutUrl] = useState<string|null>(null);
    const [outSize,setOutSize] = useState("");
    const [activeTab,setActiveTab] = useState<Tab>("crop");

    const [outW,setOutW] = useState(DEFAULT_W);
    const [outH,setOutH] = useState(DEFAULT_H);
    const [sizeIdx,setSizeIdx] = useState(0);
    const [customW,setCustomW] = useState("1024");
    const [customH,setCustomH] = useState("576");

    const [scale,setScale] = useState(1);
    const [offsetX,setOffsetX] = useState(0);
    const [offsetY,setOffsetY] = useState(0);
    const [rotation,setRotation] = useState(0);
    const [fitMode,setFitMode] = useState<FitMode>("fill");

    const [brightness,setBrightness] = useState(100);
    const [contrast,setContrast] = useState(100);
    const [saturation,setSaturation] = useState(100);
    const [blur,setBlur] = useState(0);

    const [bgColor,setBgColor] = useState("#0f172a");
    const [gradient,setGradient] = useState("");
    const [fmt,setFmt] = useState<"png"|"jpg">("png");
    const [jpgQ,setJpgQ] = useState(92);

    const [txt,setTxt] = useState<TextOverlay>({
        text:"",fontSize:48,color:"#ffffff",fontFamily:"Impact",
        x:50,y:80,bold:false,align:"center",shadow:true,opacity:100
    });

    const [panning,setPanning] = useState(false);
    const dragRef = useRef<{x:number;y:number;ox:number;oy:number}|null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewRef = useRef<HTMLCanvasElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const draw = useCallback((cv:HTMLCanvasElement, w:number, h:number, img:HTMLImageElement)=>{
        const ctx = cv.getContext("2d"); if(!ctx) return;
        cv.width=w; cv.height=h;
        ctx.fillStyle=bgColor; ctx.fillRect(0,0,w,h);
        ctx.filter=[`brightness(${brightness}%)`,`contrast(${contrast}%)`,`saturate(${saturation}%)`,blur>0?`blur(${blur}px)`:""].filter(Boolean).join(" ");
        ctx.save();
        ctx.translate(w/2+offsetX*(w/640), h/2+offsetY*(h/360));
        ctx.rotate(rotation*Math.PI/180);
        const ir=img.width/img.height, cr=w/h;
        let dw:number,dh:number;
        if(fitMode==="stretch"){dw=w*scale;dh=h*scale;}
        else if(fitMode==="fill"||fitMode==="pan"){if(ir>cr){dh=h*scale;dw=dh*ir;}else{dw=w*scale;dh=dw/ir;}}
        else{if(ir>cr){dw=w*scale;dh=dw/ir;}else{dh=h*scale;dw=dh*ir;}}
        ctx.drawImage(img,-dw/2,-dh/2,dw,dh);
        ctx.restore(); ctx.filter="none";
        if(gradient){
            const t=document.createElement("canvas"); t.width=w; t.height=h;
            const tc=t.getContext("2d")!; tc.fillStyle=gradient; tc.fillRect(0,0,w,h);
            ctx.drawImage(t,0,0);
        }
        if(txt.text.trim()){
            const fs=txt.fontSize*(w/DEFAULT_W);
            ctx.font=`${txt.bold?"bold ":""}${fs}px ${txt.fontFamily}`;
            ctx.textAlign=txt.align; ctx.globalAlpha=txt.opacity/100;
            const tx=txt.align==="center"?w*(txt.x/100):txt.align==="left"?20:w-20;
            const ty=h*(txt.y/100);
            if(txt.shadow){ctx.shadowColor="rgba(0,0,0,0.8)";ctx.shadowBlur=fs*0.3;ctx.shadowOffsetX=2;ctx.shadowOffsetY=2;}
            ctx.fillStyle=txt.color; ctx.fillText(txt.text,tx,ty);
            ctx.shadowColor="transparent";ctx.shadowBlur=0;ctx.globalAlpha=1;
        }
    },[bgColor,brightness,contrast,saturation,blur,fitMode,scale,offsetX,offsetY,rotation,gradient,txt]);

    useEffect(()=>{if(imgEl&&previewRef.current)draw(previewRef.current,640,360,imgEl);},[imgEl,draw]);

    const loadFile = useCallback((file:File)=>{
        if(!file.type.startsWith("image/")) return;
        setFileName(file.name); setReady(false); setOutUrl(null);
        setScale(1);setOffsetX(0);setOffsetY(0);setRotation(0);
        setBrightness(100);setContrast(100);setSaturation(100);setBlur(0);
        setTxt(t=>({...t,text:""}));
        const r=new FileReader();
        r.onload=(e)=>{const s=e.target?.result as string;setSrc(s);const i=new window.Image();i.onload=()=>setImgEl(i);i.src=s;};
        r.readAsDataURL(file);
    },[]);

    const generate=()=>{
        if(!imgEl||!canvasRef.current) return;
        setProcessing(true);
        const w=sizeIdx===4?(parseInt(customW)||DEFAULT_W):outW;
        const h=sizeIdx===4?(parseInt(customH)||DEFAULT_H):outH;
        draw(canvasRef.current,w,h,imgEl);
        const mimeType=fmt==="jpg"?"image/jpeg":"image/png";
        const q=fmt==="jpg"?jpgQ/100:undefined;
        canvasRef.current.toBlob((blob)=>{
            if(!blob) return;
            setOutUrl(URL.createObjectURL(blob));
            setOutSize(`${(blob.size/1024).toFixed(1)} KB`);
            setReady(true);setProcessing(false);
        },mimeType,q);
    };

    const doDownload=()=>{
        if(!outUrl) return;
        const a=document.createElement("a"); a.href=outUrl;
        a.download=`youtube-banner-${outW}x${outH}.${fmt}`; a.click();
    };

    const reset=()=>{setSrc(null);setImgEl(null);setOutUrl(null);setReady(false);setFileName("");if(inputRef.current)inputRef.current.value="";};

    const onDown=(e:MouseEvent<HTMLCanvasElement>)=>{setPanning(true);dragRef.current={x:e.clientX,y:e.clientY,ox:offsetX,oy:offsetY};};
    const onMove=(e:MouseEvent<HTMLCanvasElement>)=>{if(!panning||!dragRef.current)return;setOffsetX(dragRef.current.ox+(e.clientX-dragRef.current.x));setOffsetY(dragRef.current.oy+(e.clientY-dragRef.current.y));};
    const onUp=()=>{setPanning(false);dragRef.current=null;};

    const pickSize=(i:number)=>{setSizeIdx(i);if(i!==4){setOutW(SIZES[i].w);setOutH(SIZES[i].h);}};

    const TABS:[Tab,React.ReactNode,string][]=[
        ["crop",<Crop size={14}/>,"Crop & Pan"],
        ["adjust",<Sun size={14}/>,"Adjustments"],
        ["background",<Palette size={14}/>,"Background"],
        ["text",<Type size={14}/>,"Text Overlay"],
        ["size",<Sliders size={14}/>,"Output Size"],
    ];

    return (
        <>
            <style>{`
                @keyframes yt-spin{to{transform:rotate(360deg);}}
                .ytb-hero{background:linear-gradient(145deg,#0f172a 0%,#1e1b4b 100%);border-radius:20px;padding:24px 24px 20px;margin-bottom:14px;color:#fff;box-shadow:0 12px 40px rgba(0,0,0,0.25);position:relative;overflow:hidden;}
                .ytb-hero-top{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
                .ytb-hero-icon{background:linear-gradient(135deg,#ff0000,#c00);border-radius:12px;width:42px;height:42px;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(239,68,68,0.4);}
                .ytb-hero h1{margin:0;font-size:22px;font-weight:900;line-height:1.15;color:#fff;}
                .ytb-hero-sub{margin:0 0 14px;font-size:13px;color:#94a3b8;line-height:1.6;}
                .ytb-badges{display:flex;flex-wrap:wrap;gap:6px;}
                .ytb-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:100px;padding:5px 11px;font-size:11px;font-weight:700;color:#e2e8f0;white-space:nowrap;}
                .ytb-badge-dot{width:18px;height:18px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;}
                .ytb-upload{border:2px dashed #e2e8f0;border-radius:18px;padding:52px 20px;text-align:center;cursor:pointer;background:#fff;transition:all 0.18s;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,0.04);}
                .dark .ytb-upload{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.12);}
                .ytb-upload.drag{border-color:#ef4444;background:#fff5f5;}
                .ytb-upload-icon{width:72px;height:72px;border-radius:18px;background:#f1f5f9;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;color:#64748b;transition:all 0.18s;}
                .ytb-upload.drag .ytb-upload-icon{background:#fee2e2;color:#ef4444;}
                .ytb-upload h2{font-size:18px;font-weight:800;color:#0f172a;margin:0 0 6px;}
                .dark .ytb-upload h2{color:#f1f5f9;}
                .ytb-upload p{font-size:13px;color:#64748b;margin:0 0 20px;}
                .ytb-upload-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;border-radius:100px;padding:13px 28px;font-weight:800;font-size:15px;box-shadow:0 6px 20px rgba(239,68,68,0.35);transition:transform 0.15s;}
                .ytb-upload-btn:hover{transform:translateY(-2px);}
                .ytb-card{background:#fff;border-radius:18px;padding:18px 20px;border:1px solid #e2e8f0;box-shadow:0 2px 10px rgba(0,0,0,0.04);transition:background 0.2s,border-color 0.2s;}
                .dark .ytb-card{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08);}
                .ytb-tabs{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;background:#f8fafc;border-radius:14px;padding:5px;border:1px solid #e2e8f0;margin-bottom:16px;}
                .dark .ytb-tabs{background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.08);}
                .ytb-tabs::-webkit-scrollbar{display:none;}
                .ytb-tab{display:flex;align-items:center;gap:6px;white-space:nowrap;padding:8px 14px;border-radius:10px;font-size:12px;font-weight:700;border:none;background:transparent;cursor:pointer;color:#64748b;transition:all 0.15s;}
                .ytb-tab.active{background:#fff;color:#ef4444;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
                .dark .ytb-tab.active{background:rgba(255,255,255,0.1);}
                .ytb-slider-wrap{margin-bottom:16px;}
                .ytb-slider-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;font-size:12px;font-weight:700;color:#475569;}
                .dark .ytb-slider-label{color:#94a3b8;}
                .ytb-slider-val{font-size:11px;font-weight:700;color:#fff;background:#ef4444;border-radius:100px;padding:1px 8px;min-width:42px;text-align:center;}
                input[type=range].ytb-range{width:100%;height:6px;accent-color:#ef4444;border-radius:3px;cursor:pointer;-webkit-appearance:none;appearance:none;background:linear-gradient(to right,#ef4444 var(--pct,50%),#e2e8f0 var(--pct,50%));outline:none;border:none;}
                .dark input[type=range].ytb-range{background:linear-gradient(to right,#ef4444 var(--pct,50%),rgba(255,255,255,0.1) var(--pct,50%));}
                .ytb-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px;}
                .ytb-btn-gen{flex:1 1 160px;padding:14px 20px;border-radius:12px;border:none;cursor:pointer;font-weight:800;font-size:14px;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 6px 20px rgba(239,68,68,0.35);transition:all 0.18s;}
                .ytb-btn-gen:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 28px rgba(239,68,68,0.45);}
                .ytb-btn-gen:disabled{background:#94a3b8;box-shadow:none;cursor:not-allowed;}
                .ytb-btn-dl{flex:1 1 160px;padding:14px 20px;border-radius:12px;border:none;cursor:pointer;font-weight:800;font-size:14px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 6px 20px rgba(16,185,129,0.3);transition:all 0.15s;}
                .ytb-btn-dl:hover{transform:translateY(-2px);}
                .ytb-btn-reset{padding:14px 16px;border-radius:12px;font-weight:700;font-size:13px;border:1.5px solid #e2e8f0;background:#fff;color:#64748b;cursor:pointer;display:flex;align-items:center;gap:6px;}
                .dark .ytb-btn-reset{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:#94a3b8;}
                .ytb-size-btn{display:flex;align-items:center;gap:8px;width:100%;padding:10px 14px;border-radius:10px;margin-bottom:6px;border:2px solid #f1f5f9;background:#fafbff;cursor:pointer;text-align:left;font-size:12px;font-weight:700;color:#374151;transition:all 0.14s;}
                .dark .ytb-size-btn{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08);color:#94a3b8;}
                .ytb-size-btn.active{border-color:#ef4444;background:#fff5f5;color:#ef4444;}
                .dark .ytb-size-btn.active{background:rgba(239,68,68,0.1);}
                .ytb-swatch{width:30px;height:30px;border-radius:8px;cursor:pointer;border:2px solid transparent;transition:all 0.12s;box-shadow:0 1px 4px rgba(0,0,0,0.15);}
                .ytb-swatch.active{border-color:#ef4444;transform:scale(1.15);box-shadow:0 0 0 3px rgba(239,68,68,0.2);}
                .ytb-preview-canvas{cursor:grab;max-width:100%;border-radius:5px;display:block;user-select:none;}
                .ytb-preview-canvas:active{cursor:grabbing;}
                .ytb-input{width:100%;padding:10px 12px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;font-weight:600;color:#0f172a;background:#f8fafc;outline:none;transition:border-color 0.15s;margin-bottom:12px;box-sizing:border-box;}
                .dark .ytb-input{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:#f1f5f9;}
                .ytb-input:focus{border-color:#ef4444;}
                .ytb-select{width:100%;padding:9px 12px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:13px;font-weight:600;color:#0f172a;background:#f8fafc;outline:none;cursor:pointer;margin-bottom:12px;}
                .dark .ytb-select{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:#f1f5f9;}
                .ytb-success{display:flex;align-items:center;gap:12px;background:#f0fdf4;border:1.5px solid #86efac;border-radius:14px;padding:14px 18px;}
                .dark .ytb-success{background:rgba(16,185,129,0.1);border-color:rgba(134,239,172,0.3);}
                .ytb-tip{background:linear-gradient(135deg,#eff6ff,#f0f9ff);border-left:3px solid #3b82f6;border-radius:10px;padding:10px 14px;font-size:12px;color:#1e40af;line-height:1.6;margin-top:12px;}
                .dark .ytb-tip{background:rgba(59,130,246,0.08);color:#93c5fd;}
                .ytb-fit-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-bottom:16px;}
                @media(max-width:600px){.ytb-hero{padding:18px 16px 16px;border-radius:16px;}.ytb-hero h1{font-size:18px;}.ytb-tab{padding:7px 10px;font-size:11px;}.ytb-fit-grid{grid-template-columns:1fr 1fr;}}
            `}</style>

            {/* HERO */}
            <div className="ytb-hero">
                <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle,rgba(239,68,68,0.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
                <div className="ytb-hero-top">
                    <div className="ytb-hero-icon"><Monitor size={20} color="#fff"/></div>
                    <div>
                        <p style={{margin:"0 0 2px",fontSize:10,fontWeight:700,color:"#ef4444",letterSpacing:"0.1em",textTransform:"uppercase"}}>YouTube Tools — Free</p>
                        <h1>1024x576 YouTube Banner Maker</h1>
                    </div>
                </div>
                <p className="ytb-hero-sub">Upload image, crop, adjust, add text, download HD. Free, no watermark, no signup.</p>
                <div className="ytb-badges">
                    {BADGES.map(({Icon,label,color,bg:bb})=>(
                        <span key={label} className="ytb-badge">
                            <span className="ytb-badge-dot" style={{background:bb}}><Icon size={10} color={color}/></span>
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            {/* UPLOAD */}
            {!src&&(
                <div className={`ytb-upload${dragging?" drag":""}`}
                    onDragOver={e=>{e.preventDefault();setDragging(true);}}
                    onDragLeave={()=>setDragging(false)}
                    onDrop={e=>{e.preventDefault();setDragging(false);const f=e.dataTransfer.files[0];if(f)loadFile(f);}}
                    onClick={()=>inputRef.current?.click()}
                >
                    <div className="ytb-upload-icon"><ImageIcon size={32} strokeWidth={1.5}/></div>
                    <h2>Drop your image here, or click to upload</h2>
                    <p>JPG · PNG · WEBP · Any resolution accepted</p>
                    <div className="ytb-upload-btn"><Upload size={15}/> Choose Image</div>
                    <input ref={inputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)loadFile(f);}}/>
                </div>
            )}

            {/* EDITOR */}
            {src&&imgEl&&(
                <div style={{display:"flex",flexDirection:"column",gap:14}}>

                    {/* Preview */}
                    <div className="ytb-card" style={{padding:0,overflow:"hidden"}}>
                        <div style={{display:"flex",alignItems:"center",gap:7,padding:"11px 16px",background:"#f8fafc",borderBottom:"1px solid #f1f5f9"}}>
                            {["#ef4444","#f59e0b","#10b981"].map(c=><div key={c} style={{width:9,height:9,borderRadius:"50%",background:c}}/>)}
                            <span style={{marginLeft:4,fontSize:12,fontWeight:700,color:"#475569"}}>Live Preview</span>
                            <span style={{fontSize:11,color:"#94a3b8",marginLeft:4}}>← Drag to pan image</span>
                            <span style={{marginLeft:"auto",fontSize:10,fontWeight:700,background:"#ede9fe",color:"#6d28d9",padding:"2px 9px",borderRadius:100}}>{outW}x{outH} px</span>
                        </div>
                        <div style={{background:"#111827",display:"flex",justifyContent:"center",alignItems:"center",padding:16}}>
                            <canvas ref={previewRef} className="ytb-preview-canvas"
                                onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}/>
                        </div>
                        <div style={{padding:"7px 16px",fontSize:10,color:"#94a3b8",background:"#f8fafc",display:"flex",justifyContent:"space-between"}}>
                            <span>{fileName}</span>
                            <span>Processed locally — never uploaded</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="ytb-card" style={{padding:"16px 16px 20px"}}>
                        <div className="ytb-tabs">
                            {TABS.map(([id,icon,lbl])=>(
                                <button key={id} className={`ytb-tab${activeTab===id?" active":""}`} onClick={()=>setActiveTab(id)}>
                                    {icon} {lbl}
                                </button>
                            ))}
                        </div>

                        {/* TAB: CROP & PAN */}
                        {activeTab==="crop"&&(
                            <div>
                                <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:8}}>Fit Mode</div>
                                <div className="ytb-fit-grid">
                                    {(["fill","fit","stretch","pan"] as FitMode[]).map(m=>(
                                        <button key={m} onClick={()=>setFitMode(m)} style={{
                                            padding:"9px 4px",borderRadius:10,border:"2px solid",
                                            borderColor:fitMode===m?"#ef4444":"#e2e8f0",
                                            background:fitMode===m?"#fff5f5":"#fafbff",
                                            color:fitMode===m?"#ef4444":"#64748b",
                                            fontWeight:800,fontSize:11,cursor:"pointer",transition:"all 0.14s",
                                        }}>
                                            {m==="fill"?"Fill & Crop":m==="fit"?"Fit & Pad":m==="stretch"?"Stretch":"Free Pan"}
                                        </button>
                                    ))}
                                </div>
                                <SliderRow label="Zoom / Scale" icon={<ZoomIn size={12}/>} value={scale} min={0.1} max={4} step={0.01} display={`${(scale*100).toFixed(0)}%`} onChange={setScale}/>
                                <SliderRow label="Horizontal (X)" icon={null} value={offsetX} min={-400} max={400} step={1} display={`${offsetX>=0?"+":""}${offsetX}px`} onChange={setOffsetX}/>
                                <SliderRow label="Vertical (Y)" icon={null} value={offsetY} min={-300} max={300} step={1} display={`${offsetY>=0?"+":""}${offsetY}px`} onChange={setOffsetY}/>
                                <SliderRow label="Rotation" icon={<RotateCw size={12}/>} value={rotation} min={-180} max={180} step={1} display={`${rotation}deg`} onChange={setRotation}/>
                                <button onClick={()=>{setScale(1);setOffsetX(0);setOffsetY(0);setRotation(0);}} style={{fontSize:12,color:"#ef4444",fontWeight:700,background:"none",border:"none",cursor:"pointer",padding:"4px 0"}}>
                                    Reset Position & Scale
                                </button>
                                <div className="ytb-tip">Drag the preview directly to reposition the image. Use sliders for precise control.</div>
                            </div>
                        )}

                        {/* TAB: ADJUSTMENTS */}
                        {activeTab==="adjust"&&(
                            <div>
                                <SliderRow label="Brightness" icon={<Sun size={12}/>} value={brightness} min={0} max={200} step={1} display={`${brightness}%`} onChange={setBrightness}/>
                                <SliderRow label="Contrast" icon={<Layers size={12}/>} value={contrast} min={0} max={200} step={1} display={`${contrast}%`} onChange={setContrast}/>
                                <SliderRow label="Saturation" icon={<Palette size={12}/>} value={saturation} min={0} max={300} step={1} display={`${saturation}%`} onChange={setSaturation}/>
                                <SliderRow label="Blur" icon={null} value={blur} min={0} max={20} step={0.5} display={`${blur}px`} onChange={setBlur}/>
                                <button onClick={()=>{setBrightness(100);setContrast(100);setSaturation(100);setBlur(0);}} style={{fontSize:12,color:"#ef4444",fontWeight:700,background:"none",border:"none",cursor:"pointer",padding:"4px 0"}}>
                                    Reset All Adjustments
                                </button>
                            </div>
                        )}

                        {/* TAB: BACKGROUND */}
                        {activeTab==="background"&&(
                            <div>
                                <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:10}}>Background Color</div>
                                <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14}}>
                                    {PRESET_BG.map(c=>(
                                        <button key={c} onClick={()=>setBgColor(c)} title={c}
                                            className={`ytb-swatch${bgColor===c?" active":""}`} style={{background:c}}/>
                                    ))}
                                </div>
                                <div style={{display:"flex",alignItems:"center",gap:8,background:"#f8fafc",borderRadius:8,padding:"8px 12px",border:"1px solid #e2e8f0",marginBottom:18}}>
                                    <span style={{fontSize:12,fontWeight:700,color:"#64748b"}}>Custom</span>
                                    <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} style={{width:34,height:26,borderRadius:6,border:"1px solid #e2e8f0",cursor:"pointer",padding:2}}/>
                                    <code style={{fontSize:11,fontWeight:700,color:"#374151",background:"#fff",padding:"2px 8px",borderRadius:5,border:"1px solid #e2e8f0"}}>{bgColor}</code>
                                </div>
                                <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:10}}>Gradient Overlay</div>
                                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                                    {GRADIENTS.map(g=>(
                                        <button key={g.label} onClick={()=>setGradient(g.value)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,border:"2px solid",borderColor:gradient===g.value?"#ef4444":"#e2e8f0",background:gradient===g.value?"#fff5f5":"#fafbff",cursor:"pointer",transition:"all 0.14s"}}>
                                            <span style={{width:36,height:20,borderRadius:5,flexShrink:0,background:g.value||"#e2e8f0",border:"1px solid rgba(0,0,0,0.1)"}}/>
                                            <span style={{fontSize:12,fontWeight:700,color:gradient===g.value?"#ef4444":"#374151"}}>{g.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: TEXT OVERLAY */}
                        {activeTab==="text"&&(
                            <div>
                                <input className="ytb-input" type="text" placeholder="Channel name, tagline..." value={txt.text} onChange={e=>setTxt(t=>({...t,text:e.target.value}))}/>
                                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                                    <div>
                                        <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:5}}>Font Family</div>
                                        <select className="ytb-select" value={txt.fontFamily} onChange={e=>setTxt(t=>({...t,fontFamily:e.target.value}))}>
                                            {FONTS.map(f=><option key={f} value={f}>{f}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:5}}>Alignment</div>
                                        <select className="ytb-select" value={txt.align} onChange={e=>setTxt(t=>({...t,align:e.target.value as "left"|"center"|"right"}))}>
                                            <option value="left">Left</option>
                                            <option value="center">Center</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{display:"flex",gap:10,marginBottom:14,alignItems:"center"}}>
                                    <div>
                                        <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:5}}>Color</div>
                                        <input type="color" value={txt.color} onChange={e=>setTxt(t=>({...t,color:e.target.value}))} style={{width:50,height:34,borderRadius:8,border:"1.5px solid #e2e8f0",cursor:"pointer",padding:2}}/>
                                    </div>
                                    <div>
                                        <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:5}}>Style</div>
                                        <div style={{display:"flex",gap:6}}>
                                            <button onClick={()=>setTxt(t=>({...t,bold:!t.bold}))} style={{padding:"7px 14px",borderRadius:8,border:"2px solid",borderColor:txt.bold?"#ef4444":"#e2e8f0",background:txt.bold?"#fff5f5":"#fafbff",fontWeight:900,fontSize:13,cursor:"pointer",color:txt.bold?"#ef4444":"#374151"}}>B</button>
                                            <button onClick={()=>setTxt(t=>({...t,shadow:!t.shadow}))} style={{padding:"7px 10px",borderRadius:8,border:"2px solid",borderColor:txt.shadow?"#ef4444":"#e2e8f0",background:txt.shadow?"#fff5f5":"#fafbff",fontWeight:700,fontSize:11,cursor:"pointer",color:txt.shadow?"#ef4444":"#374151"}}>Shadow</button>
                                        </div>
                                    </div>
                                </div>
                                <SliderRow label="Font Size" icon={null} value={txt.fontSize} min={12} max={200} step={1} display={`${txt.fontSize}px`} onChange={v=>setTxt(t=>({...t,fontSize:v}))}/>
                                <SliderRow label="Horizontal Position" icon={null} value={txt.x} min={0} max={100} step={1} display={`${txt.x}%`} onChange={v=>setTxt(t=>({...t,x:v}))}/>
                                <SliderRow label="Vertical Position" icon={null} value={txt.y} min={5} max={98} step={1} display={`${txt.y}%`} onChange={v=>setTxt(t=>({...t,y:v}))}/>
                                <SliderRow label="Opacity" icon={null} value={txt.opacity} min={10} max={100} step={1} display={`${txt.opacity}%`} onChange={v=>setTxt(t=>({...t,opacity:v}))}/>
                            </div>
                        )}

                        {/* TAB: OUTPUT SIZE */}
                        {activeTab==="size"&&(
                            <div>
                                <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:10}}>Output Dimensions</div>
                                {SIZES.map((s,i)=>(
                                    <button key={i} className={`ytb-size-btn${sizeIdx===i?" active":""}`} onClick={()=>pickSize(i)}>
                                        <Monitor size={13}/>{s.label}
                                        {sizeIdx===i&&<CheckCircle2 size={14} color="#ef4444" style={{marginLeft:"auto"}}/>}
                                    </button>
                                ))}
                                {sizeIdx===4&&(
                                    <div style={{display:"flex",gap:10,marginTop:10}}>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:5}}>Width (px)</div>
                                            <input className="ytb-input" style={{marginBottom:0}} type="number" value={customW} onChange={e=>{setCustomW(e.target.value);setOutW(parseInt(e.target.value)||DEFAULT_W);}}/>
                                        </div>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:5}}>Height (px)</div>
                                            <input className="ytb-input" style={{marginBottom:0}} type="number" value={customH} onChange={e=>{setCustomH(e.target.value);setOutH(parseInt(e.target.value)||DEFAULT_H);}}/>
                                        </div>
                                    </div>
                                )}
                                <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid #f1f5f9"}}>
                                    <div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:10}}>Download Format</div>
                                    <div style={{display:"flex",gap:8,marginBottom:14}}>
                                        {(["png","jpg"] as const).map(f=>(
                                            <button key={f} onClick={()=>setFmt(f)} style={{flex:1,padding:"10px",borderRadius:10,border:"2px solid",borderColor:fmt===f?"#ef4444":"#e2e8f0",background:fmt===f?"#fff5f5":"#fafbff",fontWeight:800,fontSize:14,cursor:"pointer",color:fmt===f?"#ef4444":"#374151"}}>
                                                {f.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                    {fmt==="jpg"&&<SliderRow label="JPG Quality" icon={null} value={jpgQ} min={50} max={100} step={1} display={`${jpgQ}%`} onChange={setJpgQ}/>}
                                </div>
                                <div className="ytb-tip">Use 2560x1440 for best YouTube quality. Preview is always shown at 640x360.</div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="ytb-actions">
                        <button onClick={generate} disabled={processing} className="ytb-btn-gen">
                            {processing?<><RefreshCw size={16} style={{animation:"yt-spin 1s linear infinite"}}/> Generating...</>:<><Monitor size={16}/> Generate {outW}x{outH} Banner</>}
                        </button>
                        {ready&&outUrl&&(
                            <button onClick={doDownload} className="ytb-btn-dl">
                                <Download size={16}/> Download {fmt.toUpperCase()}
                            </button>
                        )}
                        <button onClick={reset} className="ytb-btn-reset">
                            <RefreshCw size={14}/> Reset
                        </button>
                    </div>

                    {ready&&(
                        <div className="ytb-success">
                            <div style={{width:38,height:38,borderRadius:"50%",flexShrink:0,background:"linear-gradient(135deg,#10b981,#059669)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <CheckCircle2 size={18} color="#fff"/>
                            </div>
                            <div>
                                <p style={{margin:0,fontWeight:800,color:"#065f46",fontSize:14}}>Banner is ready!</p>
                                <p style={{margin:"2px 0 0",fontSize:11,color:"#047857"}}>{outW}x{outH} — {fmt.toUpperCase()} — {outSize}</p>
                            </div>
                        </div>
                    )}

                    <canvas ref={canvasRef} style={{display:"none"}}/>
                </div>
            )}
        </>
    );
}

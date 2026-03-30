"use client";

import { useState } from "react";
import { Copy, RefreshCw, CheckCircle2, Sparkles, User, Briefcase, Music, Gamepad2, ShoppingBag, Heart, Edit3 } from "lucide-react";

/* ── types & data ───────────────────────────────────────────────── */
type FitMode = "fill" | "fit" | "stretch"; // unused but keep import clean
const _ = null as unknown as FitMode;

const CATEGORIES = [
    { id: "personal",  label: "Personal",  Icon: User,      grad: "linear-gradient(135deg,#f77737,#fcaf45)" },
    { id: "business",  label: "Business",  Icon: Briefcase, grad: "linear-gradient(135deg,#405de6,#5851db)" },
    { id: "creator",   label: "Creator",   Icon: Sparkles,  grad: "linear-gradient(135deg,#833ab4,#c13584)" },
    { id: "fashion",   label: "Fashion",   Icon: ShoppingBag, grad: "linear-gradient(135deg,#e1306c,#fd1d1d)" },
    { id: "music",     label: "Music",     Icon: Music,     grad: "linear-gradient(135deg,#c13584,#f56040)" },
    { id: "gaming",    label: "Gaming",    Icon: Gamepad2,  grad: "linear-gradient(135deg,#405de6,#833ab4)" },
    { id: "lifestyle", label: "Lifestyle", Icon: Heart,     grad: "linear-gradient(135deg,#fd1d1d,#fcaf45)" },
];

const TONES = ["Professional", "Funny", "Aesthetic", "Bold", "Minimalist", "Inspirational"];

const TEMPLATES: Record<string, string[]> = {
    personal:  ["☕ Coffee addict | ✈️ Travel lover | Living my best life\n📩 DM anytime", "🌞 Soul full of sunshine\n🎯 Making memories & breaking limits\n🔗 Tap link below", "🌱 Just a human figuring it out\n📸 Living in the moment\n💬 She/Her | Open to chats"],
    business:  ["📈 Helping brands grow online\n🎯 Marketing | Strategy | Results\n📩 DM for business inquiries", "🏆 We make your vision reality\n💎 Premium quality, honest prices\n🛒 Order via link below", "🚀 Your success is our mission\n⭐ Trusted by 10K+ clients\n📅 Book a free consultation"],
    creator:   ["🎬 Turning ideas into viral content\n📺 YouTube | Blog | Podcast\n🔔 New video every Tuesday", "🎥 Creating content that actually matters\n👑 Content is king, consistency is queen\n🤝 Collab? Slide into DMs", "☕ Behind every great post is a lot of coffee\n💡 Lifestyle | Tips | Reels\n✨ Follow for daily inspo"],
    fashion:   ["👗 Style is a way to say who you are\n🔥 Outfit inspo | OOTDs | Trends\n🛍️ Shop my looks below", "💫 Fashion fades, style is eternal\n🤍 Minimal | Chic | Timeless\n📸 New looks every week", "💃 Wearing confidence every single day\n🖤 Street style | Looks | Fits\n🤝 Collab with us"],
    music:     ["🎵 Music is the language of the soul\n🎤 Singer | Songwriter | Producer\n🔗 New single — link below", "🎶 Notes, vibes & good energy only\n🎸 Performing live across India\n📩 Booking DMs open", "🎧 I don't make music, I make feelings\n🎹 Independent artist | Guitar | Vocals\n▶️ Stream my latest track"],
    gaming:    ["🎮 Born to game, forced to eat\n🖥️ PC gamer | Content creator | Clan leader\n💬 Join my Discord", "🏆 GG or no deal\n🔫 Streamer | BGMI | FPS Lover\n📺 Stream link below", "💀 Noobs fear me, pros respect me\n🎯 Competitive gaming | Tips & Tricks\n🔴 Watch live every night"],
    lifestyle: ["🧘 Living slow, thinking deep\n💚 Wellness | Mindfulness | Self-love\n💬 DM for a chat", "💪 Health is wealth — invest wisely\n🥗 Fitness | Food | Mental peace\n🔗 My routine — link below", "🌅 Chasing sunsets & good vibes\n✈️ Travel | Cafe hopping | Life lessons\n🌟 Come along for the ride"],
};

const TONE_FN: Record<string, (s: string) => string> = {
    "Funny":         s => s.replace("DM", "Slide into DMs").replace("every single", "every"),
    "Minimalist":    s => s.split("\n").slice(0, 2).join("\n"),
    "Bold":          s => s.split("\n").map(l => l.toUpperCase()).join("\n"),
    "Inspirational": s => "Believe. Achieve. Repeat.\n" + s,
    "Aesthetic":     s => s.replace(/\|/g, "·").replace(/\n/g, "\n "),
};

const MAX = 150;
const IG_GRAD = "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)";

const toStylishFont = (text: string, style: 'cursive' | 'bold') => {
    const cursive: Record<string, string> = {
        'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲',
        'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻',
        's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
        'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘',
        'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡',
        'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩'
    };
    const bold: Record<string, string> = {
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶',
        'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿',
        's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜',
        'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥',
        'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭'
    };
    const map = style === 'cursive' ? cursive : bold;
    return text.split('').map(c => map[c] || c).join('');
};

/* ── component ──────────────────────────────────────────────────── */
export default function InstagramBioClient() {
    const [cat,      setCat]      = useState("personal");
    const [tone,     setTone]     = useState("Professional");
    const [name,     setName]     = useState("");
    const [username, setUsername] = useState("");
    const [keywords, setKeywords] = useState("");
    const [bios,     setBios]     = useState<string[]>([]);
    const [loading,  setLoading]  = useState(false);
    const [copied,   setCopied]   = useState<number | null>(null);
    const [preview,  setPreview]  = useState(0); // which bio is shown in phone

    const generate = () => {
        setLoading(true); setBios([]);
        setTimeout(() => {
            const pool = TEMPLATES[cat] || TEMPLATES.personal;
            const kws  = keywords.trim() ? keywords.split(",").map(k => k.trim()).filter(Boolean) : [];
            const fn   = TONE_FN[tone] ?? ((s: string) => s);
            const gen  = pool.map((t, idx) => {
                let b = fn(t);
                if (name.trim()) b = `${name.trim()}\n` + b;
                if (kws.length) b += `\n${kws.slice(0, 3).join(" | ")}`;
                b = b.slice(0, MAX);
                if (idx === 0) return toStylishFont(b, 'cursive');
                if (idx === 1) return toStylishFont(b, 'bold');
                return b;
            });
            setBios(gen); setPreview(0); setLoading(false);
        }, 650);
    };

    const copyBio = (text: string, idx: number) => {
        navigator.clipboard.writeText(text);
        setCopied(idx); setTimeout(() => setCopied(null), 2000);
    };

    const selectedCat = CATEGORIES.find(c => c.id === cat)!;

    return (
        <>
            <style>{`
                @keyframes igSpin { to { transform:rotate(360deg); } }
                @keyframes igFade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

                /* ── hero ── */
                .igb-hero {
                    background: #1a1a2e;
                    border-radius: 24px; padding: 32px 28px 26px;
                    margin-bottom: 20px; position: relative; overflow: hidden;
                }
                .igb-hero-ring {
                    position: absolute; top: -60px; right: -60px;
                    width: 220px; height: 220px; border-radius: 50%;
                    border: 40px solid rgba(188,24,136,0.18);
                    pointer-events: none;
                }
                .igb-ig-logo {
                    width: 48px; height: 48px; border-radius: 14px;
                    background: ${IG_GRAD};
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 6px 20px rgba(220,39,67,0.5);
                    flex-shrink: 0;
                }
                .igb-hero h1 { margin:0; font-size:22px; font-weight:900; color:#fff; line-height:1.2; }
                .igb-hero-sub { margin:8px 0 18px; font-size:13px; color:#a78bfa; line-height:1.6; }
                .igb-badge {
                    display:inline-flex; align-items:center; gap:5px;
                    background:rgba(255,255,255,0.08);
                    border:1px solid rgba(255,255,255,0.12);
                    border-radius:100px; padding:5px 12px;
                    font-size:11px; font-weight:700; color:#e2e8f0;
                }

                /* ── card ── */
                .igb-card {
                    background:#fff; border-radius:20px;
                    border:1.5px solid #f1f5f9; padding:20px;
                    box-shadow:0 2px 12px rgba(0,0,0,0.04);
                    margin-bottom:14px;
                }
                .igb-label { font-size:12px; font-weight:800; color:#1a1a2e; margin-bottom:10px; display:flex; align-items:center; gap:6px; }
                .igb-input {
                    width:100%; padding:12px 14px; font-size:14px;
                    border:1.5px solid #e2e8f0; border-radius:12px;
                    outline:none; font-family:inherit; color:#0f172a;
                    transition:border 0.15s; box-sizing:border-box; background:#fafbff;
                }
                .igb-input:focus { border-color:#bc1888; background:#fff; }

                /* ── category highlights (Instagram story style) ── */
                .igb-cats { display:flex; gap:14px; overflow-x:auto; padding-bottom:6px; scrollbar-width:none; }
                .igb-cats::-webkit-scrollbar { display:none; }
                .igb-cat {
                    display:flex; flex-direction:column; align-items:center; gap:6px;
                    cursor:pointer; flex-shrink:0; background:none; border:none; padding:0;
                }
                .igb-cat-ring {
                    width:58px; height:58px; border-radius:50%;
                    background:#e2e8f0; /* default unglow */
                    display:flex; align-items:center; justify-content:center;
                    transition:all 0.15s;
                }
                .igb-cat-ring.active {
                    background: ${IG_GRAD};
                    box-shadow: 0 0 0 3px #fff, 0 0 0 5px #e1306c;
                }
                .igb-cat-inner {
                    width:50px; height:50px; border-radius:50%;
                    background:#f1f5f9;
                    display:flex; align-items:center; justify-content:center;
                    transition:background 0.15s;
                }
                .igb-cat.active .igb-cat-inner { background:#fff0f5; }
                .igb-cat-label { font-size:10px; font-weight:700; color:#64748b; }
                .igb-cat.active .igb-cat-label { color:#e1306c; }

                /* ── tone pills ── */
                .igb-tone-row { display:flex; flex-wrap:wrap; gap:8px; }
                .igb-tone {
                    padding:7px 16px; border-radius:100px; cursor:pointer;
                    border:1.5px solid #f1f5f9; background:#fafbff;
                    font-size:12px; font-weight:700; color:#64748b; transition:all 0.13s;
                }
                .igb-tone.active { border-color:#bc1888; background:#fff0f6; color:#bc1888; }

                /* ── generate btn ── */
                .igb-gen {
                    width:100%; padding:15px; border-radius:14px; border:none;
                    background:${IG_GRAD}; color:#fff;
                    font-weight:800; font-size:15px; cursor:pointer;
                    display:flex; align-items:center; justify-content:center; gap:9px;
                    box-shadow:0 6px 24px rgba(220,39,67,0.4);
                    transition:opacity 0.18s; margin-bottom:20px;
                }
                .igb-gen:disabled { opacity:0.5; cursor:not-allowed; }

                /* ── result + phone preview ── */
                .igb-results-wrap {
                    display:grid; grid-template-columns:1fr 220px; gap:16px;
                    align-items:start; animation:igFade 0.35s ease;
                }
                .igb-result {
                    background:#fafbff; border:1.5px solid #f3e8ff;
                    border-radius:14px; padding:16px; cursor:pointer;
                    transition:all 0.15s;
                }
                .igb-result:hover { border-color:#bc1888; background:#fff0f6; }
                .igb-result.active { border-color:#bc1888; background:#fff0f6; box-shadow:0 0 0 3px rgba(188,24,136,0.1); }
                .igb-editor {
                    width:100%; font-size:13px; color:#1e1b4b; line-height:1.75; font-weight:500;
                    border:none; outline:none; background:transparent; resize:none;
                    font-family:inherit; margin:0 0 6px; padding:0; display:block;
                }
                .igb-editor::placeholder { color:#94a3b8; }
                .igb-row { display:flex; align-items:center; justify-content:space-between; }
                .igb-chars { font-size:10px; font-weight:700; color:#94a3b8; }
                .igb-edit {
                    display:inline-flex; align-items:center; gap:5px;
                    padding:6px 14px; border-radius:100px; border:1.5px solid #e1306c; cursor:pointer;
                    background:transparent; color:#e1306c; font-size:11px; font-weight:700; transition:all 0.13s;
                }
                .igb-edit:hover { background:#fff0f5; }
                .igb-copy {
                    display:inline-flex; align-items:center; gap:5px;
                    padding:6px 14px; border-radius:100px; border:none; cursor:pointer;
                    background:#bc1888; color:#fff; font-size:11px; font-weight:700; transition:all 0.13s;
                }
                .igb-copy.done { background:#10b981; }

                /* ── phone mockup ── */
                .igb-phone {
                    width:200px; background:#fff;
                    border-radius:28px; border:8px solid #1a1a2e;
                    box-shadow:0 20px 60px rgba(0,0,0,0.25);
                    overflow:hidden; position:sticky; top:100px;
                }
                .igb-phone-top {
                    background:${IG_GRAD}; height:6px;
                }
                .igb-phone-body { padding:14px 12px; }
                .igb-phone-avatar {
                    width:52px; height:52px; border-radius:50%;
                    background:${IG_GRAD}; margin-bottom:8px;
                    display:flex; align-items:center; justify-content:center;
                    box-shadow:0 4px 10px rgba(188,24,136,0.4);
                    font-size:20px; color:#fff; font-weight:900;
                }
                .igb-phone-user { font-size:13px; font-weight:800; color:#0f172a; margin:0 0 1px; }
                .igb-phone-name { font-size:10px; color:#64748b; margin:0 0 8px; }
                .igb-phone-bio { font-size:10px; color:#1e293b; white-space:pre-line; line-height:1.6; }
                .igb-phone-flw {
                    display:flex; gap:12px; margin-top:10px; padding-top:10px;
                    border-top:1px solid #f1f5f9;
                }
                .igb-phone-stat { text-align:center; }
                .igb-phone-stat b { display:block; font-size:11px; font-weight:900; color:#0f172a; }
                .igb-phone-stat span { font-size:9px; color:#64748b; }

                /* ── tips ── */
                .igb-tips {
                    background:#fffbeb; border:1.5px solid #fde68a;
                    border-radius:14px; padding:16px 18px; margin-top:6px;
                }

                /* ── mobile ── */
                @media (max-width:640px) {
                    .igb-hero { padding:20px 16px 18px; }
                    .igb-hero h1 { font-size:19px; }
                    .igb-results-wrap { grid-template-columns:1fr; }
                    .igb-phone { 
                        position: relative; 
                        top: 0; 
                        width: 100%; 
                        max-width: 320px; 
                        margin: 20px auto 0;
                    }
                }
            `}</style>

            {/* ── HERO ── */}
            <div className="igb-hero">
                <div className="igb-hero-ring" />
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12, position:"relative" }}>
                    <div className="igb-ig-logo">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                    </div>
                    <div>
                        <p style={{ margin:"0 0 2px", fontSize:10, fontWeight:700, color:"#f09433", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                            Instagram Tools — Free
                        </p>
                        <h1>Instagram Bio Generator</h1>
                    </div>
                </div>
                <p className="igb-hero-sub">
                    Pick your category, set the tone, add keywords — get 3 professional bios ready to copy in seconds.
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {["Free","No Signup","150-char limit","1-click copy"].map(l => (
                        <span key={l} className="igb-badge">{l}</span>
                    ))}
                </div>
            </div>

            {/* ── INPUTS ── */}
            <div className="igb-card">
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <div>
                        <div className="igb-label"><User size={13} color="#bc1888" /> Name</div>
                        <input suppressHydrationWarning className="igb-input" placeholder="e.g. Priya Sharma" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <div className="igb-label">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bc1888" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            Username
                        </div>
                        <input suppressHydrationWarning className="igb-input" placeholder="e.g. @priya.creates" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                </div>
                <div style={{ marginTop:12 }}>
                    <div className="igb-label"><Sparkles size={13} color="#bc1888" /> Keywords / Niche <span style={{ fontWeight:500, color:"#94a3b8", fontSize:11 }}>(comma separated)</span></div>
                    <input suppressHydrationWarning className="igb-input" placeholder="e.g. travel, photography, Mumbai" value={keywords} onChange={e => setKeywords(e.target.value)} />
                </div>
            </div>

            {/* ── CATEGORY — Story Highlight Style ── */}
            <div className="igb-card">
                <div className="igb-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bc1888" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                    Your Category
                </div>
                <div className="igb-cats">
                    {CATEGORIES.map(({ id, label, Icon }) => (
                        <button suppressHydrationWarning key={id} onClick={() => setCat(id)} className={`igb-cat${cat === id ? " active" : ""}`}>
                            <div className={`igb-cat-ring${cat === id ? " active" : ""}`}>
                                <div className="igb-cat-inner">
                                    <Icon size={22} color={cat === id ? "#e1306c" : "#64748b"} />
                                </div>
                            </div>
                            <span className="igb-cat-label">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── TONE ── */}
            <div className="igb-card">
                <div className="igb-label"><Edit3 size={13} color="#bc1888" /> Tone</div>
                <div className="igb-tone-row">
                    {TONES.map(t => (
                        <button suppressHydrationWarning key={t} onClick={() => setTone(t)} className={`igb-tone${tone === t ? " active" : ""}`}>{t}</button>
                    ))}
                </div>
            </div>

            {/* ── GENERATE ── */}
            <button suppressHydrationWarning onClick={generate} disabled={loading} className="igb-gen">
                {loading
                    ? <><RefreshCw size={17} style={{ animation:"igSpin 1s linear infinite" }} /> Generating…</>
                    : <><Sparkles size={17} /> Generate Bio Ideas</>}
            </button>

            {/* ── RESULTS + PHONE PREVIEW ── */}
            {bios.length > 0 && (
                <div className="igb-results-wrap">
                    {/* Bio cards */}
                    <div>
                        <p style={{ fontSize:13, fontWeight:800, color:"#374151", marginBottom:10 }}>
                            Click to edit and preview your bio
                        </p>
                        {bios.map((bio, idx) => (
                            <div key={idx} className={`igb-result${preview === idx ? " active" : ""}`}
                                onClick={() => setPreview(idx)}
                                style={{ marginBottom:10 }}>
                                <textarea
                                    className="igb-editor"
                                    rows={4}
                                    value={bio}
                                    onChange={e => {
                                        const newBios = [...bios];
                                        newBios[idx] = e.target.value.slice(0, MAX);
                                        setBios(newBios);
                                    }}
                                    onClick={e => e.stopPropagation()}
                                    onFocus={() => setPreview(idx)}
                                />
                                <div className="igb-row">
                                    <span className="igb-chars">{bio.length}/{MAX} chars</span>
                                    <div style={{ display: "flex", gap: "6px" }}>
                                        <button onClick={e => {
                                            e.stopPropagation();
                                            (document.querySelectorAll('.igb-editor')[idx] as HTMLTextAreaElement)?.focus();
                                        }}
                                            className="igb-edit">
                                            <Edit3 size={12} /> Edit
                                        </button>
                                        <button onClick={e => { e.stopPropagation(); copyBio(bio, idx); }}
                                            className={`igb-copy${copied === idx ? " done" : ""}`}>
                                            {copied === idx
                                                ? <><CheckCircle2 size={12} /> Copied!</>
                                                : <><Copy size={12} /> Copy</>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Phone mockup */}
                    <div className="igb-phone">
                        <div className="igb-phone-top" />
                        <div className="igb-phone-body">
                            <div className="igb-phone-avatar">
                                {(name || username || "U").charAt(0).toUpperCase()}
                            </div>
                            <p className="igb-phone-user">
                                {username ? username.replace("@", "") : "yourhandle"}
                            </p>
                            <p className="igb-phone-name">{name || "Your Name"} · {selectedCat.label}</p>
                            <p className="igb-phone-bio">{bios[preview]}</p>
                            <div className="igb-phone-flw">
                                <div className="igb-phone-stat"><b>0</b><span>Posts</span></div>
                                <div className="igb-phone-stat"><b>1K</b><span>Followers</span></div>
                                <div className="igb-phone-stat"><b>250</b><span>Following</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── TIPS ── */}
            <div className="igb-tips">
                <p style={{ margin:"0 0 8px", fontWeight:800, fontSize:13, color:"#92400e" }}>Pro Tips for a Great Instagram Bio</p>
                <ul style={{ margin:0, paddingLeft:18, fontSize:12, color:"#78350f", lineHeight:1.85 }}>
                    <li>Keep it under 150 characters — Instagram's limit.</li>
                    <li>Use line breaks to separate sections clearly.</li>
                    <li>Add a CTA like "DM for collabs" or "Link below."</li>
                    <li>Include 1-2 niche keywords your audience searches.</li>
                    <li>Use · or | to separate ideas without using up too many characters.</li>
                </ul>
            </div>
        </>
    );
}

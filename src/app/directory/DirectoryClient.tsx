"use client";

import { useState, useCallback, useTransition } from "react";
import {
  Search, Filter, Sparkles, Star, ThumbsUp, Globe, Zap, X,
  ChevronDown, ChevronUp, Folder, ArrowLeft, Clock,
  Award, CheckCircle, ArrowRight, LayoutGrid, List, Flame,
  Shield, Code2, Smartphone, Chrome,
} from "lucide-react";
import type { DirCategory, DirToolWithCategory, PaginatedTools, DirFeatured, PricingType } from "@/types/directory";
import { formatPrice } from "@/types/directory";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PRICING_OPTIONS: { value: PricingType | ""; label: string; emoji: string }[] = [
  { value: "",            label: "All Pricing",  emoji: "✦" },
  { value: "free",        label: "Free",         emoji: "🆓" },
  { value: "freemium",    label: "Freemium",      emoji: "⚡" },
  { value: "paid",        label: "Paid",          emoji: "💎" },
  { value: "lifetime",    label: "Lifetime",      emoji: "♾️" },
  { value: "open_source", label: "Open Source",   emoji: "🔓" },
];

const SORT_OPTIONS = [
  { value: "newest",    label: "Newest",     icon: Clock },
  { value: "popular",   label: "Popular",    icon: Flame },
  { value: "top_rated", label: "Top Rated",  icon: Award },
  { value: "votes",     label: "Most Voted", icon: ThumbsUp },
];

const PRICING_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Free:          { bg: "rgba(16,185,129,0.1)",  text: "#34d399", border: "rgba(16,185,129,0.3)",  glow: "rgba(16,185,129,0.18)" },
  Freemium:      { bg: "rgba(139,92,246,0.1)",  text: "#a78bfa", border: "rgba(139,92,246,0.3)",  glow: "rgba(139,92,246,0.18)" },
  "Open Source": { bg: "rgba(234,179,8,0.1)",   text: "#fbbf24", border: "rgba(234,179,8,0.3)",   glow: "rgba(234,179,8,0.18)"  },
  Paid:          { bg: "rgba(239,68,68,0.1)",   text: "#f87171", border: "rgba(239,68,68,0.3)",   glow: "rgba(239,68,68,0.18)"  },
  Lifetime:      { bg: "rgba(249,115,22,0.1)",  text: "#fb923c", border: "rgba(249,115,22,0.3)",  glow: "rgba(249,115,22,0.18)" },
};

/* ── CSS Animations (injected once) ──────────────────────────────────────── */
const DIR_STYLES = `
  @keyframes dir-orb-1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.95)} }
  @keyframes dir-orb-2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,20px) scale(1.05)} 66%{transform:translate(30px,-40px) scale(0.9)} }
  @keyframes dir-orb-3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.08)} }
  @keyframes dir-spin  { to{transform:rotate(360deg)} }
  @keyframes dir-pulse { 0%{box-shadow:0 0 0 0 rgba(99,102,241,0.45)} 70%{box-shadow:0 0 0 12px rgba(99,102,241,0)} 100%{box-shadow:0 0 0 0 rgba(99,102,241,0)} }
  .dark .dir-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
  .dir-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
  .dark .dir-orb-1 { width:700px;height:700px;top:-260px;left:-120px;background:radial-gradient(circle,rgba(99,102,241,0.22) 0%,transparent 70%);animation:dir-orb-1 20s ease-in-out infinite; }
  .dark .dir-orb-2 { width:560px;height:560px;top:-120px;right:-100px;background:radial-gradient(circle,rgba(6,182,212,0.16) 0%,transparent 70%);animation:dir-orb-2 24s ease-in-out infinite; }
  .dark .dir-orb-3 { width:340px;height:340px;bottom:0;left:42%;background:radial-gradient(circle,rgba(139,92,246,0.13) 0%,transparent 70%);animation:dir-orb-3 16s ease-in-out infinite; }
  .dir-orb-1 { width:700px;height:700px;top:-260px;left:-120px;background:radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%);animation:dir-orb-1 20s ease-in-out infinite; }
  .dir-orb-2 { width:560px;height:560px;top:-120px;right:-100px;background:radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%);animation:dir-orb-2 24s ease-in-out infinite; }
  .dir-orb-3 { width:340px;height:340px;bottom:0;left:42%;background:radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%);animation:dir-orb-3 16s ease-in-out infinite; }
  .dir-hero-badge { animation:dir-pulse 3s infinite; }
  .dir-tool-card { will-change:transform,box-shadow; }
  .dir-cat-nav { display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none;-ms-overflow-style:none; }
  .dir-cat-nav::-webkit-scrollbar { display:none; }
  .dir-cat-pill { cursor:pointer;border:none;font-family:inherit;transition:all 0.2s cubic-bezier(0.4,0,0.2,1);white-space:nowrap;display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:100px;font-size:13px;font-weight:600;flex-shrink:0; }
  .dir-cat-pill:hover { transform:translateY(-2px); }
  .dir-sort-btn { cursor:pointer;border:none;font-family:inherit;transition:all 0.2s;display:flex;align-items:center;gap:5px; }
  .dir-sort-btn:hover { color:var(--text-primary)!important; }
  .dir-page-btn { cursor:pointer;border:none;font-family:inherit;transition:all 0.2s; }
  .dir-page-btn:hover:not(:disabled) { transform:translateY(-2px); }
  .dir-submit-link { transition:all 0.25s; display:inline-flex; align-items:center; gap:9px; }
  .dir-submit-link:hover { transform:translateY(-3px); box-shadow:0 14px 40px rgba(99,102,241,0.55)!important; }
  .dir-list-card { display:flex;align-items:center;gap:16px;padding:16px 20px;background:var(--bg-secondary);border:1px solid var(--border-light);border-radius:16px;transition:all 0.25s;text-decoration:none;color:inherit; }
  .dir-list-card:hover { border-color:rgba(99,102,241,0.4);background:linear-gradient(135deg,var(--bg-secondary),rgba(99,102,241,0.04));transform:translateX(4px);box-shadow:0 8px 24px rgba(0,0,0,0.08); }
  .dir-search-btn:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(99,102,241,0.6)!important; background-position:right center; }
  .dir-viewbtn { cursor:pointer;border:none;font-family:inherit;transition:all 0.2s;display:flex;align-items:center;justify-content:center; }
`;

const CAT_EMOJI: Record<string, string> = {
  image:"🖼️", video:"🎬", audio:"🎵", writing:"✍️", coding:"💻",
  marketing:"📣", seo:"🔍", chatbot:"🤖", education:"📚",
  productivity:"⚡", research:"🔬", automation:"⚙️", business:"💼",
  design:"🎨", developer:"🛠️", other:"🌐", ai:"🧠", finance:"💰",
  health:"🏥", legal:"⚖️", analytics:"📊", social:"📱",
};


/* ── Animated hero background ─────────────────────────────────────────── */
function AnimatedHeroBg() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", zIndex:0, background:"var(--bg-primary)" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 120% 80% at 50% -20%, rgba(99,102,241,0.22) 0%, rgba(6,182,212,0.12) 40%, transparent 70%)" }} />
      <div className="dir-orb dir-orb-1" />
      <div className="dir-orb dir-orb-2" />
      <div className="dir-orb dir-orb-3" />
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)", backgroundSize:"60px 60px", maskImage:"radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"120px", background:"linear-gradient(to top,var(--bg-primary),transparent)" }} />
    </div>
  );
}

function PricingBadge({ pricing_type, starting_price, currency }: Pick<DirToolWithCategory,"pricing_type"|"starting_price"|"currency">) {
  const label = formatPrice({ pricing_type, starting_price, currency });
  const baseLabel = Object.keys(PRICING_COLORS).find((k) => label.startsWith(k)) ?? label;
  const c = PRICING_COLORS[baseLabel];
  return (
    <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 9px", borderRadius:"100px",
      background: c?.bg ?? "rgba(255,255,255,0.07)", color: c?.text ?? "#888",
      border: `1px solid ${c?.border ?? "#333"}`, letterSpacing:"0.04em",
      boxShadow: c ? `0 0 8px ${c.glow}` : "none" }}>
      {label}
    </span>
  );
}

function ToolCard({ tool, featured = false }: { tool: DirToolWithCategory; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const catColor = tool.category?.color ?? "#6366f1";
  return (
    <Link href={`/directory/${tool.slug}`} style={{ textDecoration:"none", display:"block", height:"100%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="dir-tool-card"
        style={{
          background: hovered
            ? `linear-gradient(145deg, var(--bg-secondary) 0%, ${catColor}09 100%)`
            : "var(--bg-secondary)",
          border: `1px solid ${hovered ? catColor+"40" : "var(--border-light)"}`,
          borderRadius:"22px", overflow:"hidden", height:"100%",
          display:"flex", flexDirection:"column",
          transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",
          transform: hovered ? "translateY(-7px) scale(1.012)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 28px 56px -14px ${catColor}28, 0 0 0 1px ${catColor}1a, inset 0 1px 0 rgba(255,255,255,0.04)`
            : "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.02)",
          position:"relative",
        }}
      >
        {/* Hover glow overlay */}
        <div style={{
          position:"absolute", inset:0, borderRadius:"inherit", zIndex:0, pointerEvents:"none",
          background:`radial-gradient(ellipse at top left, ${catColor}09 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0, transition:"opacity 0.3s",
        }} />

        {featured && (
          <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:10,
            background:"linear-gradient(135deg, #f97316, #f59e0b)", color:"white",
            fontSize:"9px", fontWeight:800, padding:"3px 10px", borderRadius:"100px",
            letterSpacing:"0.1em", textTransform:"uppercase",
            display:"flex", alignItems:"center", gap:"4px",
            boxShadow:"0 4px 12px rgba(249,115,22,0.4)" }}>
            <Sparkles size={9} /> Featured
          </div>
        )}

        {/* Cover image */}
        <div style={{ height:"112px", position:"relative", flexShrink:0, overflow:"hidden",
          background: `linear-gradient(135deg, ${catColor}18, ${catColor}06)`, zIndex:1 }}>
          {tool.cover_url ? (
            <Image src={tool.cover_url} alt={tool.name} fill style={{ objectFit:"cover" }} unoptimized />
          ) : (
            <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center",
              background: `linear-gradient(135deg, ${catColor}18 0%, ${catColor}06 100%)`, position:"relative" }}>
              <div style={{ position:"absolute", inset:0, opacity:0.5,
                backgroundImage:`radial-gradient(circle at 30% 50%, ${catColor}30 0%, transparent 50%), radial-gradient(circle at 70% 50%, ${catColor}18 0%, transparent 50%)` }} />
              <div style={{ width:"52px", height:"52px", borderRadius:"16px",
                background: `${catColor}20`, border: `1.5px solid ${catColor}35`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"22px", fontWeight:900, color:catColor, position:"relative", zIndex:1 }}>
                {tool.name[0].toUpperCase()}
              </div>
            </div>
          )}
          {tool.category && (
            <div style={{ position:"absolute", top:"10px", right:"10px", zIndex:2,
              background:`rgba(0,0,0,0.48)`, backdropFilter:"blur(8px)",
              border: `1px solid ${catColor}40`,
              borderRadius:"8px", padding:"3px 10px", fontSize:"10px", fontWeight:700, color:catColor }}>
              {tool.category.name}
            </div>
          )}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"52px",
            background:"linear-gradient(to top, var(--bg-secondary), transparent)", zIndex:2 }} />
        </div>

        {/* Card body */}
        <div style={{ padding:"14px 18px 18px", flex:1, display:"flex", flexDirection:"column", gap:"10px", position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginTop:"-30px" }}>
            <div style={{ width:"52px", height:"52px", borderRadius:"15px",
              background:"var(--bg-primary)",
              border: `2px solid ${hovered ? catColor+"55" : "var(--border-light)"}`,
              flexShrink:0, overflow:"hidden", position:"relative",
              boxShadow: hovered ? `0 8px 24px ${catColor}30` : "0 4px 12px rgba(0,0,0,0.12)",
              transition:"all 0.3s" }}>
              {tool.logo_url ? (
                <Image src={tool.logo_url} alt={tool.name} fill style={{ objectFit:"cover" }} unoptimized />
              ) : (
                <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"20px", fontWeight:900, color:catColor,
                  background:`linear-gradient(135deg, ${catColor}15, ${catColor}08)` }}>
                  {tool.name[0].toUpperCase()}
                </div>
              )}
            </div>
            <div style={{ flex:1, minWidth:0, paddingTop:"22px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"5px", flexWrap:"wrap" }}>
                <h3 style={{ fontSize:"14px", fontWeight:800, color:"var(--text-primary)", margin:0,
                  whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"140px" }}>
                  {tool.name}
                </h3>
                {tool.is_verified && <CheckCircle size={13} color="#3b82f6" fill="#3b82f6" style={{ flexShrink:0 }} />}
              </div>
              <div style={{ marginTop:"5px" }}>
                <PricingBadge pricing_type={tool.pricing_type} starting_price={tool.starting_price} currency={tool.currency} />
              </div>
            </div>
          </div>

          <p style={{ fontSize:"12.5px", color:"var(--text-secondary)", margin:0, lineHeight:1.6,
            display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", flex:1 }}>
            {tool.tagline ?? tool.description_short ?? ""}
          </p>

          {tool.tags?.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
              {tool.tags.slice(0,3).map((tag) => (
                <span key={tag} style={{ fontSize:"10px", padding:"2px 8px",
                  background:"var(--bg-tertiary)", color:"var(--text-tertiary)",
                  borderRadius:"100px", fontWeight:600, border:"1px solid var(--border-light)" }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ display:"flex", alignItems:"center", gap:"12px", paddingTop:"10px",
            borderTop: `1px solid ${hovered ? catColor+"22" : "var(--border-light)"}`,
            transition:"border-color 0.3s" }}>
            <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"11px", color:"var(--text-tertiary)", fontWeight:600 }}>
              <ThumbsUp size={11} /> {tool.votes_count}
            </span>
            <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"11px", fontWeight:600,
              color: tool.avg_rating > 0 ? "#fbbf24" : "var(--text-tertiary)" }}>
              <Star size={11} fill={tool.avg_rating > 0 ? "#fbbf24" : "none"} color={tool.avg_rating > 0 ? "#fbbf24" : "currentColor"} />
              {tool.avg_rating > 0 ? tool.avg_rating.toFixed(1) : "—"}
            </span>
            <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"11px", color:"var(--text-tertiary)", fontWeight:600 }}>
              <Globe size={11} /> {tool.views_count.toLocaleString()}
            </span>
            <span style={{ marginLeft:"auto", display:"flex", alignItems:"center", justifyContent:"center",
              width:"28px", height:"28px", borderRadius:"9px",
              background: hovered ? `linear-gradient(135deg, ${catColor}, ${catColor}cc)` : "var(--bg-tertiary)",
              color: hovered ? "white" : "var(--text-tertiary)",
              boxShadow: hovered ? `0 4px 14px ${catColor}40` : "none",
              transition:"all 0.3s", flexShrink:0 }}>
              <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface DirectoryClientProps {
  categories: DirCategory[];
  initialTools: PaginatedTools;
  featured: DirFeatured[];
  initialSearch: string;
  initialCategory: string;
  categoryHeading?: { name: string; description: string; color: string; };
}

export default function DirectoryClient({
  categories, initialTools, featured, initialSearch, initialCategory, categoryHeading,
}: DirectoryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tools, setTools] = useState<PaginatedTools>(initialTools);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [pricing, setPricing] = useState(searchParams.get("pricing") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));
  const [showFilters, setShowFilters] = useState(false);
  const [hasApi, setHasApi] = useState(searchParams.get("has_api") === "true");
  const [hasMobile, setHasMobile] = useState(searchParams.get("mobile") === "true");
  const [hasChromeExt, setHasChromeExt] = useState(searchParams.get("chrome_ext") === "true");
  const [isOpenSource, setIsOpenSource] = useState(searchParams.get("open_source") === "true");
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchFocused, setSearchFocused] = useState(false);
  const [viewMode, setViewMode] = useState<"grid"|"list">("grid");

  const syncUrlParams = useCallback(
    (params: Record<string, string | boolean | undefined>) => {
      const urlParams = new URLSearchParams(window.location.search);
      Object.entries(params).forEach(([key, val]) => {
        if (val === undefined || val === "" || val === false) urlParams.delete(key);
        else urlParams.set(key, String(val));
      });
      window.history.replaceState(null, "", `${pathname}?${urlParams.toString()}`);
    },
    [pathname]
  );

  const fetchTools = useCallback(
    async (overrides: Record<string, unknown> = {}) => {
      const activeSearch  = overrides.q          !== undefined ? String(overrides.q)          : search;
      const activeCat     = overrides.category   !== undefined ? String(overrides.category)   : category;
      const activePricing = overrides.pricing    !== undefined ? String(overrides.pricing)    : pricing;
      const activeSort    = overrides.sort       !== undefined ? String(overrides.sort)       : sort;
      const activePage    = overrides.page       !== undefined ? String(overrides.page)       : String(page);
      const activeApi     = overrides.has_api    !== undefined ? Boolean(overrides.has_api)   : hasApi;
      const activeMobile  = overrides.mobile     !== undefined ? Boolean(overrides.mobile)    : hasMobile;
      const activeChrome  = overrides.chrome_ext !== undefined ? Boolean(overrides.chrome_ext): hasChromeExt;
      const activeOS      = overrides.open_source!== undefined ? Boolean(overrides.open_source): isOpenSource;

      const params = new URLSearchParams({
        sort: activeSort, page: activePage, limit: "24",
        ...(activeSearch  && { q: activeSearch }),
        ...(activeCat     && { category: activeCat }),
        ...(activePricing && { pricing: activePricing }),
        ...(activeApi     && { has_api: "true" }),
        ...(activeMobile  && { mobile: "true" }),
        ...(activeChrome  && { chrome_ext: "true" }),
        ...(activeOS      && { open_source: "true" }),
      });

      syncUrlParams({
        q: activeSearch, pricing: activePricing,
        sort: activeSort === "newest" ? undefined : activeSort,
        page: activePage === "1" ? undefined : activePage,
        has_api: activeApi, mobile: activeMobile, chrome_ext: activeChrome, open_source: activeOS,
      });

      const res = await fetch(`/api/directory/tools?${params}`);
      if (res.ok) { const data = await res.json(); setTools(data); }
    },
    [search, category, pricing, sort, page, hasApi, hasMobile, hasChromeExt, isOpenSource, syncUrlParams]
  );

  const handleSearch = () => {
    const q = searchInput.trim();
    setSearch(q); setPage(1);
    startTransition(() => fetchTools({ q, page: "1" }));
  };

  const handleCategoryClick = (slug: string) => {
    if (categoryHeading) {
      if (!slug) router.push("/directory");
      else router.push(`/directory/category/${slug}`);
      return;
    }
    const newCat = category === slug ? "" : slug;
    setCategory(newCat); setPage(1);
    startTransition(() => fetchTools({ category: newCat, page: "1" }));
  };

  const handleFilter = (key: string, val: string | boolean) => {
    setPage(1);
    const overrides: Record<string, unknown> = { page: "1" };
    if (key === "pricing")     { setPricing(val as string);       overrides.pricing      = val; }
    if (key === "sort")        { setSort(val as string);          overrides.sort         = val; }
    if (key === "has_api")     { setHasApi(val as boolean);       overrides.has_api      = val; }
    if (key === "mobile")      { setHasMobile(val as boolean);    overrides.mobile       = val; }
    if (key === "chrome_ext")  { setHasChromeExt(val as boolean); overrides.chrome_ext   = val; }
    if (key === "open_source") { setIsOpenSource(val as boolean); overrides.open_source  = val; }
    startTransition(() => fetchTools(overrides));
  };

  const activeFiltersCount = [pricing, hasApi, hasMobile, hasChromeExt, isOpenSource].filter(Boolean).length;

  const CAP_FEATURES = [
    { key:"has_api",     label:"Has API",           icon:<Code2 size={12}/>,       state:hasApi },
    { key:"mobile",      label:"Mobile App",         icon:<Smartphone size={12}/>,  state:hasMobile },
    { key:"chrome_ext",  label:"Chrome Extension",   icon:<Chrome size={12}/>,      state:hasChromeExt },
    { key:"open_source", label:"Open Source",        icon:<Shield size={12}/>,      state:isOpenSource },
  ];

  return (
    <>
      <style>{DIR_STYLES}</style>
      <div style={{ minHeight:"100vh", paddingBottom:"100px" }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        {!categoryHeading ? (
          <div style={{ position:"relative", paddingTop:"104px", paddingBottom:"68px", overflow:"hidden" }}>
            <AnimatedHeroBg />

            <div style={{ position:"relative", zIndex:2, maxWidth:"880px", margin:"0 auto", padding:"0 24px", textAlign:"center" }}>

              {/* Badge */}
              <div className="dir-hero-badge" style={{
                display:"inline-flex", alignItems:"center", gap:"8px", marginBottom:"30px",
                background:"linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.12) 100%)",
                border:"1px solid rgba(99,102,241,0.35)", borderRadius:"100px", padding:"7px 22px",
                backdropFilter:"blur(12px)",
              }}>
                <Sparkles size={13} color="#818cf8" />
                <span style={{ fontSize:"11px", fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase",
                  background:"linear-gradient(135deg, #818cf8, #06b6d4)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  AI Tools Directory
                </span>
              </div>

              {/* H1 */}
              <h1 style={{ fontSize:"clamp(38px, 6.5vw, 72px)", fontWeight:900, color:"var(--text-primary)",
                letterSpacing:"-0.04em", lineHeight:1.06, margin:"0 0 22px" }}>
                Discover the Best{" "}
                <span style={{ background:"linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #06b6d4 100%)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", display:"inline-block" }}>
                  AI Tools
                </span>
              </h1>

              <p style={{ fontSize:"clamp(15px, 2vw, 18px)", color:"var(--text-secondary)",
                margin:"0 auto 44px", maxWidth:"520px", lineHeight:1.72, fontWeight:400 }}>
                Browse{" "}
                <strong style={{ color:"var(--text-primary)", fontWeight:800 }}>{tools.total.toLocaleString()}+</strong>
                {" "}AI tools and SaaS products. Find the perfect tool for your workflow.
              </p>

              {/* Stat pills */}
              <div style={{ display:"flex", justifyContent:"center", gap:"10px", flexWrap:"wrap", marginBottom:"48px" }}>
                {[
                  { icon:<Sparkles size={14}/>, val:`${tools.total}+`,          label:"AI Tools" },
                  { icon:<LayoutGrid size={14}/>, val:`${categories.length}`,   label:"Categories" },
                  { icon:<Zap size={14}/>,       val:"100+",                    label:"Free Tools" },
                ].map((s) => (
                  <div key={s.label} style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"9px 20px",
                    background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:"100px", backdropFilter:"blur(12px)", transition:"all 0.2s",
                  }}>
                    <span style={{ color:"#818cf8", display:"flex", alignItems:"center" }}>{s.icon}</span>
                    <span style={{ fontWeight:800, color:"var(--text-primary)", fontSize:"13px" }}>{s.val}</span>
                    <span style={{ color:"var(--text-tertiary)", fontSize:"12px", fontWeight:500 }}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Premium Search Bar ── */}
              <div style={{ maxWidth:"760px", margin:"0 auto" }}>
                <div style={{
                  display:"flex", alignItems:"center", gap:"12px",
                  padding:"8px 8px 8px 20px",
                  borderRadius:"20px",
                  background:"rgba(255,255,255,0.05)",
                  backdropFilter:"blur(20px)",
                  border: searchFocused
                    ? "1.5px solid rgba(99,102,241,0.8)"
                    : "1.5px solid rgba(255,255,255,0.12)",
                  boxShadow: searchFocused
                    ? "0 0 0 4px rgba(99,102,241,0.15), 0 8px 32px rgba(99,102,241,0.2)"
                    : "0 2px 16px rgba(0,0,0,0.1)",
                  transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}>
                  {/* Icon box */}
                  <div style={{
                    flexShrink:0, display:"flex", alignItems:"center",
                    background: searchFocused
                      ? "linear-gradient(135deg, #6366f1, #06b6d4)"
                      : "rgba(255,255,255,0.07)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:"12px", padding:"10px",
                    transition:"all 0.3s",
                    boxShadow: searchFocused ? "0 4px 14px rgba(99,102,241,0.4)" : "none",
                  }}>
                    <Search size={17} color={searchFocused ? "white" : "rgba(255,255,255,0.45)"}
                      style={{ transition:"color 0.2s" }} />
                  </div>

                  {/* Input */}
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Search AI tools, categories, features..."
                    style={{
                      flex:1, border:"none", background:"transparent",
                      padding:"13px 0", fontSize:"15.5px",
                      color:"var(--text-primary)", outline:"none", fontWeight:500,
                      fontFamily:"inherit",
                    }}
                    suppressHydrationWarning
                  />

                  {/* Right: clear / hint + Search btn */}
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", flexShrink:0 }}>
                    {searchInput ? (
                      <button onClick={() => { setSearchInput(""); setSearch(""); startTransition(() => fetchTools({ q:"" })); }}
                        style={{
                          background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)",
                          cursor:"pointer", color:"rgba(255,255,255,0.5)",
                          padding:"6px", display:"flex", borderRadius:"8px",
                        }}>
                        <X size={14} />
                      </button>
                    ) : (
                      <kbd style={{
                        padding:"4px 9px", borderRadius:"7px",
                        background:"rgba(255,255,255,0.06)",
                        border:"1px solid rgba(255,255,255,0.12)",
                        fontSize:"11px", color:"rgba(255,255,255,0.35)",
                        fontFamily:"inherit", fontWeight:600, whiteSpace:"nowrap",
                      }}>↵ Enter</kbd>
                    )}
                    <button onClick={handleSearch} className="dir-search-btn" style={{
                      padding:"12px 28px",
                      background:"linear-gradient(135deg, #6366f1, #818cf8 60%, #06b6d4)",
                      color:"white", border:"none", borderRadius:"14px",
                      fontWeight:800, fontSize:"14px", cursor:"pointer",
                      display:"flex", alignItems:"center", gap:"7px",
                      whiteSpace:"nowrap", fontFamily:"inherit",
                      boxShadow:"0 4px 18px rgba(99,102,241,0.45)",
                      transition:"all 0.25s",
                    }}>
                      <Search size={14} /> Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom divider line */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", zIndex:3,
              background:"linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.45) 30%, rgba(6,182,212,0.45) 70%, transparent 100%)" }} />
          </div>

        ) : (
          /* Category heading */
          <div style={{ paddingTop:"100px", paddingBottom:"42px", borderBottom:"1px solid var(--border-light)",
            background:`linear-gradient(135deg, ${categoryHeading.color}0d 0%, transparent 60%)`,
            position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"400px", height:"400px",
              borderRadius:"50%", background:`radial-gradient(circle, ${categoryHeading.color}15, transparent 70%)`,
              pointerEvents:"none" }} />
            <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 24px", position:"relative", zIndex:1 }}>
              <Link href="/directory" style={{ display:"inline-flex", alignItems:"center", gap:"7px",
                color:"var(--text-secondary)", textDecoration:"none", fontSize:"13px", fontWeight:600,
                marginBottom:"24px", padding:"7px 14px", border:"1px solid var(--border-light)",
                borderRadius:"10px", background:"var(--bg-primary)" }}>
                <ArrowLeft size={13} /> Back to All AI Tools
              </Link>
              <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
                <div style={{ width:"64px", height:"64px", borderRadius:"20px",
                  background:`${categoryHeading.color}18`, border:`2px solid ${categoryHeading.color}40`,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                  boxShadow:`0 8px 24px ${categoryHeading.color}20` }}>
                  <Folder size={28} color={categoryHeading.color} />
                </div>
                <div>
                  <h1 style={{ fontSize:"clamp(26px, 4vw, 44px)", fontWeight:900, color:"var(--text-primary)",
                    margin:"0 0 8px", letterSpacing:"-0.03em" }}>
                    Best {categoryHeading.name}{" "}
                    <span style={{ background:`linear-gradient(135deg, ${categoryHeading.color}, ${categoryHeading.color}99)`,
                      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>AI Tools</span>
                  </h1>
                  <p style={{ fontSize:"15px", color:"var(--text-secondary)", margin:0, lineHeight:1.6, maxWidth:"640px" }}>
                    {categoryHeading.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"40px 24px 0" }}>

          {/* Category nav — horizontal scroll pills like SaaS directory */}
          <div style={{ marginBottom:"28px", paddingBottom:"28px", borderBottom:"1px solid var(--border-light)" }}>
            <div className="dir-cat-nav">
              {/* All Tools pill */}
              <button className="dir-cat-pill" onClick={() => handleCategoryClick("")}
                style={{
                  background: !category ? "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)" : "var(--bg-secondary)",
                  color: !category ? "white" : "var(--text-secondary)",
                  border: !category ? "none" : "1px solid var(--border-light)",
                  boxShadow: !category ? "0 4px 16px rgba(99,102,241,0.35)" : "none",
                  fontWeight: !category ? 700 : 600,
                }}>
                ✦ All Tools
              </button>

              {categories.map((cat) => {
                const active = category === cat.slug;
                const emoji = CAT_EMOJI[cat.slug.toLowerCase()] ?? "🔷";
                return (
                  <button key={cat.id} className="dir-cat-pill" onClick={() => handleCategoryClick(cat.slug)}
                    style={{
                      background: active ? `${cat.color ?? "#6366f1"}16` : "var(--bg-secondary)",
                      color: active ? (cat.color ?? "#6366f1") : "var(--text-secondary)",
                      border: active
                        ? `1.5px solid ${cat.color ?? "#6366f1"}60`
                        : "1px solid var(--border-light)",
                      fontWeight: active ? 700 : 600,
                      boxShadow: active ? `0 4px 18px ${cat.color ?? "#6366f1"}22` : "none",
                    }}>
                    <span style={{ fontSize:"15px", lineHeight:1 }}>{emoji}</span>
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toolbar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            gap:"12px", marginBottom:"24px", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" }}>
              {/* Sort */}
              <div style={{ display:"flex", background:"var(--bg-secondary)", border:"1px solid var(--border-light)",
                borderRadius:"14px", padding:"4px", gap:"2px" }}>
                {SORT_OPTIONS.map((s) => {
                  const Icon = s.icon;
                  const active = sort === s.value;
                  return (
                    <button key={s.value} className="dir-sort-btn" onClick={() => handleFilter("sort", s.value)}
                      style={{ padding:"7px 14px", borderRadius:"10px", fontSize:"12px", fontWeight:700,
                        background: active ? "var(--bg-primary)" : "transparent",
                        color: active ? "var(--text-primary)" : "var(--text-tertiary)",
                        boxShadow: active ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                        whiteSpace:"nowrap" }}>
                      <Icon size={11} /> {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Filter button */}
              <button onClick={() => setShowFilters(!showFilters)}
                style={{ display:"flex", alignItems:"center", gap:"7px", padding:"9px 16px",
                  background: showFilters || activeFiltersCount > 0 ? "rgba(99,102,241,0.12)" : "var(--bg-secondary)",
                  border:`1px solid ${showFilters || activeFiltersCount > 0 ? "rgba(99,102,241,0.45)" : "var(--border-light)"}`,
                  borderRadius:"12px", cursor:"pointer", fontSize:"12px", fontWeight:700, fontFamily:"inherit",
                  color: showFilters || activeFiltersCount > 0 ? "#818cf8" : "var(--text-secondary)",
                  transition:"all 0.2s" }}>
                <Filter size={13} />
                Filters
                {activeFiltersCount > 0 && (
                  <span style={{ background:"linear-gradient(135deg, #6366f1, #06b6d4)", color:"white",
                    borderRadius:"100px", padding:"1px 7px", fontSize:"10px", fontWeight:800,
                    minWidth:"18px", textAlign:"center" }}>
                    {activeFiltersCount}
                  </span>
                )}
                {showFilters ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>

            {/* Right: count + view toggle */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ fontSize:"13px", color:"var(--text-tertiary)", fontWeight:600 }}>
                {isPending ? (
                  <span style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                    <span style={{ width:"14px", height:"14px", border:"2px solid var(--border-light)",
                      borderTopColor:"#6366f1", borderRadius:"50%", animation:"dir-spin 0.8s linear infinite", display:"inline-block" }} />
                    Loading...
                  </span>
                ) : (
                  <><span style={{ fontWeight:800, color:"var(--text-primary)" }}>{tools.total.toLocaleString()}</span> tools found</>
                )}
              </div>
              <div style={{ display:"flex", background:"var(--bg-secondary)", border:"1px solid var(--border-light)",
                borderRadius:"10px", padding:"3px", gap:"2px" }}>
                {(["grid","list"] as const).map((m) => (
                  <button key={m} className="dir-viewbtn" onClick={() => setViewMode(m)}
                    style={{ padding:"6px 10px", borderRadius:"7px",
                      background: viewMode === m ? "var(--bg-primary)" : "transparent",
                      color: viewMode === m ? "var(--text-primary)" : "var(--text-tertiary)",
                      boxShadow: viewMode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
                    {m === "grid" ? <LayoutGrid size={14} /> : <List size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div style={{ background:"var(--bg-secondary)", border:"1px solid var(--border-light)",
              borderRadius:"20px", padding:"24px 28px", marginBottom:"28px",
              display:"flex", flexWrap:"wrap", gap:"32px", backdropFilter:"blur(8px)" }}>
              <div>
                <div style={{ fontSize:"10px", fontWeight:800, color:"var(--text-tertiary)",
                  textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"12px",
                  display:"flex", alignItems:"center", gap:"6px" }}>
                  <span style={{ width:"4px", height:"4px", borderRadius:"50%",
                    background:"linear-gradient(135deg, #6366f1, #06b6d4)", display:"inline-block" }} />
                  Pricing Model
                </div>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {PRICING_OPTIONS.map((p) => (
                    <button key={p.value} onClick={() => handleFilter("pricing", p.value)}
                      style={{ padding:"6px 14px", borderRadius:"100px", fontSize:"12px", fontWeight:700,
                        cursor:"pointer", transition:"all 0.15s", fontFamily:"inherit",
                        border:`1px solid ${pricing === p.value ? "rgba(99,102,241,0.5)" : "var(--border-light)"}`,
                        background: pricing === p.value ? "rgba(99,102,241,0.12)" : "var(--bg-primary)",
                        color: pricing === p.value ? "#818cf8" : "var(--text-secondary)",
                        display:"flex", alignItems:"center", gap:"5px" }}>
                      <span>{p.emoji}</span> {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize:"10px", fontWeight:800, color:"var(--text-tertiary)",
                  textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"12px",
                  display:"flex", alignItems:"center", gap:"6px" }}>
                  <span style={{ width:"4px", height:"4px", borderRadius:"50%",
                    background:"linear-gradient(135deg, #06b6d4, #a78bfa)", display:"inline-block" }} />
                  Capabilities
                </div>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {CAP_FEATURES.map((f) => (
                    <button key={f.key} onClick={() => handleFilter(f.key, !f.state)}
                      style={{ display:"flex", alignItems:"center", gap:"6px", padding:"6px 14px",
                        borderRadius:"100px", fontSize:"12px", fontWeight:700, cursor:"pointer",
                        transition:"all 0.15s", fontFamily:"inherit",
                        border:`1px solid ${f.state ? "rgba(99,102,241,0.5)" : "var(--border-light)"}`,
                        background: f.state ? "rgba(99,102,241,0.12)" : "var(--bg-primary)",
                        color: f.state ? "#818cf8" : "var(--text-secondary)" }}>
                      {f.icon} {f.label}
                      {f.state && <Zap size={10} color="#818cf8" fill="#818cf8" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active filter tags */}
          {(search || category) && (
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"24px", flexWrap:"wrap" }}>
              <span style={{ fontSize:"12px", color:"var(--text-tertiary)", fontWeight:600 }}>Showing results for:</span>
              {search && (
                <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 12px",
                  background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.3)",
                  borderRadius:"100px", fontSize:"12px", fontWeight:700, color:"#818cf8" }}>
                  &ldquo;{search}&rdquo;
                  <button onClick={() => { setSearch(""); setSearchInput(""); startTransition(()=>fetchTools({q:""})); }}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"#818cf8", padding:"0", display:"flex" }}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {category && (
                <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 12px",
                  background:"var(--bg-secondary)", border:"1px solid var(--border-light)",
                  borderRadius:"100px", fontSize:"12px", fontWeight:700, color:"var(--text-secondary)" }}>
                  {categories.find(c=>c.slug===category)?.name ?? category}
                  <button onClick={() => handleCategoryClick("")}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-tertiary)", padding:"0", display:"flex" }}>
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Featured Tools */}
          {featured.length > 0 && page === 1 && !search && !category && (
            <div style={{ marginBottom:"52px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
                <div style={{ width:"34px", height:"34px", borderRadius:"10px",
                  background:"linear-gradient(135deg, #f97316, #f59e0b)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 4px 14px rgba(249,115,22,0.38)" }}>
                  <Sparkles size={16} color="white" />
                </div>
                <div>
                  <span style={{ fontSize:"16px", fontWeight:800, color:"var(--text-primary)" }}>Featured Tools</span>
                  <span style={{ fontSize:"12px", color:"var(--text-tertiary)", fontWeight:500, marginLeft:"8px" }}>Editor&rsquo;s picks</span>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px, 1fr))", gap:"18px" }}>
                {featured.map((f) => f.tool && <ToolCard key={f.id} tool={f.tool} featured />)}
              </div>
              <div style={{ height:"1px", margin:"44px 0 0",
                background:"linear-gradient(90deg, transparent, var(--border-light), transparent)" }} />
            </div>
          )}

          {/* Tools Grid or List */}
          {tools.tools.length === 0 ? (
            <div style={{ textAlign:"center", padding:"100px 20px", background:"var(--bg-secondary)",
              borderRadius:"28px", border:"1px solid var(--border-light)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0,
                background:"radial-gradient(ellipse at center, rgba(99,102,241,0.05), transparent 70%)",
                pointerEvents:"none" }} />
              <div style={{ fontSize:"60px", marginBottom:"20px", position:"relative" }}>🔍</div>
              <h3 style={{ fontSize:"22px", fontWeight:800, color:"var(--text-primary)", marginBottom:"10px" }}>No tools found</h3>
              <p style={{ color:"var(--text-secondary)", fontSize:"14px", maxWidth:"360px", margin:"0 auto 28px" }}>
                Try a different search query or reset your active filters.
              </p>
              <button onClick={() => {
                setSearch(""); setSearchInput(""); setCategory(""); setPricing("");
                setHasApi(false); setHasMobile(false); setHasChromeExt(false); setIsOpenSource(false);
                startTransition(()=>fetchTools({q:"",category:"",pricing:"",has_api:false,mobile:false,chrome_ext:false,open_source:false}));
              }} style={{ padding:"12px 28px", background:"linear-gradient(135deg, #6366f1, #06b6d4)", color:"white",
                border:"none", borderRadius:"14px", fontWeight:800, fontSize:"14px", cursor:"pointer", fontFamily:"inherit",
                boxShadow:"0 6px 20px rgba(99,102,241,0.4)" }}>
                Clear All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px, 1fr))",
              gap:"18px", opacity: isPending ? 0.5 : 1, transition:"opacity 0.3s" }}>
              {tools.tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          ) : (
            /* List view */
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", opacity: isPending ? 0.5 : 1, transition:"opacity 0.3s" }}>
              {tools.tools.map((tool) => {
                const catColor = tool.category?.color ?? "#6366f1";
                return (
                  <Link key={tool.id} href={`/directory/${tool.slug}`} className="dir-list-card">
                    <div style={{ width:"48px", height:"48px", borderRadius:"14px", flexShrink:0,
                      overflow:"hidden", position:"relative",
                      background:`${catColor}12`, border:`1.5px solid ${catColor}30` }}>
                      {tool.logo_url
                        ? <Image src={tool.logo_url} alt={tool.name} fill style={{ objectFit:"cover" }} unoptimized />
                        : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:"18px", fontWeight:900, color:catColor }}>{tool.name[0]}</div>
                      }
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                        <span style={{ fontSize:"14px", fontWeight:800, color:"var(--text-primary)" }}>{tool.name}</span>
                        {tool.is_verified && <CheckCircle size={13} color="#3b82f6" fill="#3b82f6" />}
                        <PricingBadge pricing_type={tool.pricing_type} starting_price={tool.starting_price} currency={tool.currency} />
                      </div>
                      <p style={{ fontSize:"12.5px", color:"var(--text-secondary)", margin:0,
                        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {tool.tagline ?? tool.description_short ?? ""}
                      </p>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"16px", flexShrink:0 }}>
                      <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"12px", color:"var(--text-tertiary)", fontWeight:600 }}>
                        <ThumbsUp size={12} /> {tool.votes_count}
                      </span>
                      <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"12px",
                        color: tool.avg_rating > 0 ? "#fbbf24" : "var(--text-tertiary)", fontWeight:600 }}>
                        <Star size={12} fill={tool.avg_rating > 0 ? "#fbbf24" : "none"} />
                        {tool.avg_rating > 0 ? tool.avg_rating.toFixed(1) : "—"}
                      </span>
                    </div>
                    <ArrowRight size={16} color="var(--text-tertiary)" style={{ flexShrink:0 }} />
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {tools.totalPages > 1 && (
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"6px", marginTop:"56px" }}>
              <button className="dir-page-btn" disabled={page===1}
                onClick={() => { setPage(p=>p-1); startTransition(()=>fetchTools({page:String(page-1)})); }}
                style={{ padding:"9px 18px", borderRadius:"12px", border:"1px solid var(--border-light)",
                  background:"var(--bg-secondary)", color:"var(--text-secondary)",
                  opacity: page===1 ? 0.4 : 1, fontWeight:700, fontSize:"13px" }}>
                ← Prev
              </button>
              {Array.from({ length: Math.min(5, tools.totalPages) }, (_,i) => {
                const p = i + Math.max(1, page-2);
                if (p > tools.totalPages) return null;
                return (
                  <button key={p} className="dir-page-btn"
                    onClick={() => { setPage(p); startTransition(()=>fetchTools({page:String(p)})); }}
                    style={{ width:"40px", height:"40px", borderRadius:"12px",
                      border: page===p ? "none" : "1px solid var(--border-light)",
                      cursor:"pointer", fontWeight:800, fontSize:"13px",
                      background: page===p ? "linear-gradient(135deg, #6366f1, #06b6d4)" : "var(--bg-secondary)",
                      color: page===p ? "white" : "var(--text-secondary)",
                      boxShadow: page===p ? "0 6px 18px rgba(99,102,241,0.42)" : "none" }}>
                    {p}
                  </button>
                );
              })}
              <button className="dir-page-btn" disabled={page===tools.totalPages}
                onClick={() => { setPage(p=>p+1); startTransition(()=>fetchTools({page:String(page+1)})); }}
                style={{ padding:"9px 18px", borderRadius:"12px", border:"1px solid var(--border-light)",
                  background:"var(--bg-secondary)", color:"var(--text-secondary)",
                  opacity: page===tools.totalPages ? 0.4 : 1, fontWeight:700, fontSize:"13px" }}>
                Next →
              </button>
            </div>
          )}

          {/* Submit CTA */}
          <div style={{ marginTop:"88px", borderRadius:"28px", padding:"64px 48px", textAlign:"center",
            position:"relative", overflow:"hidden",
            background:"linear-gradient(145deg, rgba(99,102,241,0.08) 0%, rgba(6,182,212,0.05) 50%, rgba(139,92,246,0.07) 100%)",
            border:"1px solid rgba(99,102,241,0.2)" }}>
            <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"280px", height:"280px",
              borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"200px", height:"200px",
              borderRadius:"50%", background:"radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:0, borderRadius:"28px", pointerEvents:"none",
              backgroundImage:"linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)",
              backgroundSize:"40px 40px" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ width:"64px", height:"64px", borderRadius:"20px",
                background:"linear-gradient(135deg, #6366f1, #06b6d4)",
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 22px", boxShadow:"0 12px 32px rgba(99,102,241,0.42)" }}>
                <Sparkles size={28} color="white" />
              </div>
              <h2 style={{ fontSize:"clamp(24px, 3vw, 36px)", fontWeight:900, color:"var(--text-primary)",
                margin:"0 0 12px", letterSpacing:"-0.025em" }}>
                Built an AI tool?
              </h2>
              <p style={{ color:"var(--text-secondary)", fontSize:"16px", lineHeight:1.65,
                maxWidth:"440px", margin:"0 auto 32px", fontWeight:400 }}>
                Submit your product and reach thousands of developers, creators, and early adopters.
              </p>
              <Link href="/directory/submit" className="dir-submit-link"
                style={{ padding:"15px 36px", background:"linear-gradient(135deg, #6366f1, #06b6d4)",
                  color:"white", textDecoration:"none", borderRadius:"16px",
                  fontWeight:800, fontSize:"15px", boxShadow:"0 8px 28px rgba(99,102,241,0.45)" }}>
                <Sparkles size={17} /> Submit Your Tool <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

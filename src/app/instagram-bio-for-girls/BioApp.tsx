"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Copy, Check, Heart, Sparkles, Smartphone, User, Image, Trash2, Star, Camera, Heart as HeartIcon } from "lucide-react";
import {
  CUTE_BIOS,
  STYLISH_BIOS,
  VIP_BIOS,
  ATTITUDE_BIOS,
  AESTHETIC_BIOS,
  SAVAGE_BIOS,
  EMOTIONAL_BIOS,
  SHORT_BIOS,
  EMOJI_BIOS,
  LOVE_BIOS,
  FUNNY_BIOS,
  HINDI_BIOS,
  CLASSY_BIOS,
  TRENDING_BIOS,
  COOL_BIOS
} from "./biosData";

const CATEGORY_MAP = [
  { id: "all", label: "✨ All", bios: [] },
  { id: "cute", label: "🌸 Cute", bios: CUTE_BIOS },
  { id: "stylish", label: "💎 Stylish", bios: STYLISH_BIOS },
  { id: "vip", label: "👑 VIP", bios: VIP_BIOS },
  { id: "attitude", label: "🔥 Attitude", bios: ATTITUDE_BIOS },
  { id: "aesthetic", label: "🌙 Aesthetic", bios: AESTHETIC_BIOS },
  { id: "savage", label: "⚡ Savage", bios: SAVAGE_BIOS },
  { id: "emotional", label: "💔 Emotional", bios: EMOTIONAL_BIOS },
  { id: "short", label: "🎀 Short", bios: SHORT_BIOS },
  { id: "emoji", label: "💫 Emoji", bios: EMOJI_BIOS },
  { id: "love", label: "💖 Love", bios: LOVE_BIOS },
  { id: "funny", label: "😂 Funny", bios: FUNNY_BIOS },
  { id: "hindi", label: "🇮🇳 Hindi", bios: HINDI_BIOS },
  { id: "classy", label: "🌹 Classy", bios: CLASSY_BIOS },
  { id: "trending", label: "📈 Trending", bios: TRENDING_BIOS },
  { id: "cool", label: "🕶️ Cool", bios: COOL_BIOS },
];

const ALL_BIOS = [
  ...CUTE_BIOS, ...STYLISH_BIOS, ...VIP_BIOS, ...ATTITUDE_BIOS, ...AESTHETIC_BIOS,
  ...SAVAGE_BIOS, ...EMOTIONAL_BIOS, ...SHORT_BIOS, ...EMOJI_BIOS, ...LOVE_BIOS,
  ...FUNNY_BIOS, ...HINDI_BIOS, ...CLASSY_BIOS, ...TRENDING_BIOS, ...COOL_BIOS
];

CATEGORY_MAP[0].bios = ALL_BIOS;

const AVATAR_PRESETS = [
  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)"
];

export default function BioApp() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const [username, setUsername] = useState("princess_2026");
  const [fullName, setFullName] = useState("Priya | Content Creator");
  const [previewBio, setPreviewBio] = useState("✨ Made of stardust, sunshine & magic\n👑 Live like royalty\n🎀 Capturing sweet moments daily\n📩 DM for Collabs");
  const [isVerified, setIsVerified] = useState(true);
  const [avatarIndex, setAvatarIndex] = useState(1);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("insta_girl_bios_favs");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleFavorite = (bio: string) => {
    let updated;
    if (favorites.includes(bio)) {
      updated = favorites.filter(f => f !== bio);
    } else {
      updated = [...favorites, bio];
    }
    setFavorites(updated);
    try {
      localStorage.setItem("insta_girl_bios_favs", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = (bio: string, uniqueId: string) => {
    navigator.clipboard.writeText(bio);
    setCopiedIndex(uniqueId);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryInPreview = (bio: string) => {
    setPreviewBio(bio);
    const editorEl = document.getElementById("preview-section-title");
    if (editorEl) {
      editorEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredBios = useMemo(() => {
    let list = [];
    if (selectedCategory === "favorites") {
      list = favorites;
    } else {
      const cat = CATEGORY_MAP.find(c => c.id === selectedCategory);
      list = cat ? cat.bios : [];
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(b => b.toLowerCase().includes(q));
    }

    return list;
  }, [selectedCategory, searchQuery, favorites]);

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          margin: 32px 0;
          align-items: start;
        }
        @media (max-width: 900px) {
          .dashboard-container {
            grid-template-columns: 1fr;
          }
        }
        
        .explorer-card {
          background: white;
          border: 1.5px solid #ffd6e7;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(233,30,140,0.04);
        }
        .explorer-title {
          font-size: 1.4rem;
          font-weight: 850;
          color: #1a1a2e;
          margin-top: 0;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .search-wrapper {
          position: relative;
          margin-bottom: 20px;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #ff6b9d;
          width: 18px;
          height: 18px;
        }
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border: 1.5px solid #ffd6e7;
          border-radius: 12px;
          font-size: 0.95rem;
          color: #333;
          outline: none;
          transition: all 0.2s;
        }
        .search-input:focus {
          border-color: #c44dff;
          box-shadow: 0 0 0 3px rgba(196,77,255,0.15);
        }
        .category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
          max-height: 150px;
          overflow-y: auto;
          padding-right: 4px;
          padding-bottom: 8px;
          border-bottom: 1px solid #fff0f6;
        }
        .category-pills::-webkit-scrollbar {
          width: 4px;
        }
        .category-pills::-webkit-scrollbar-thumb {
          background: #ffd6e7;
          border-radius: 4px;
        }
        .pill-btn {
          padding: 8px 14px;
          border: 1px solid #ffd6e7;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          background: white;
          color: #555;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pill-btn:hover {
          background: #fff0f6;
          color: #e91e8c;
          border-color: #ffb3d1;
        }
        .pill-btn.active {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44dff 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(233,30,140,0.2);
        }
        .pill-btn-fav {
          border-color: #ffb3d1;
          color: #e91e8c;
        }
        .pill-btn-fav.active {
          background: linear-gradient(135deg, #ff3366 0%, #ff6b9d 100%);
          color: white;
        }
        
        .bios-scroll-container {
          max-height: 700px;
          overflow-y: auto;
          padding-right: 6px;
        }
        .bios-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .bios-scroll-container::-webkit-scrollbar-thumb {
          background: #ffd6e7;
          border-radius: 10px;
        }
        .bios-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #ff6b9d;
        }
        .bio-card-item {
          background: #fff9fc;
          border: 1px solid #ffe3ef;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 12px;
          transition: all 0.2s;
          position: relative;
        }
        .bio-card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(233,30,140,0.06);
          background: white;
          border-color: #ffb3d1;
        }
        .bio-text-display {
          font-size: 0.98rem;
          color: #222;
          line-height: 1.6;
          margin-bottom: 14px;
          white-space: pre-line;
          padding-right: 28px;
        }
        .bio-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #fff0f6;
          padding-top: 12px;
        }
        .action-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #e91e8c;
          padding: 6px 10px;
          border-radius: 8px;
          transition: background 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .action-icon-btn:hover {
          background: #fff0f6;
        }
        .fav-star-btn {
          position: absolute;
          right: 14px;
          top: 14px;
          background: none;
          border: none;
          cursor: pointer;
          color: #dbdbdb;
          padding: 4px;
          transition: transform 0.2s, color 0.2s;
        }
        .fav-star-btn:hover {
          transform: scale(1.2);
          color: #ff6b9d;
        }
        .fav-star-btn.active {
          color: #ff3366;
        }
        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #888;
        }
        .empty-state svg {
          margin: 0 auto 12px;
          color: #ffb3d1;
        }
      `}</style>

      {/* Left Column: Explorer */}
      <div className="explorer-card">
        <h3 className="explorer-title">
          <Sparkles width={20} height={20} style={{ color: "#e91e8c" }} /> Explore Bio Directory
        </h3>
        
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input suppressHydrationWarning={true}
            type="text"
            className="search-input"
            placeholder="Search bios (e.g. stardust, queen, attitude)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-pills">
          {CATEGORY_MAP.map((cat) => (
            <button suppressHydrationWarning={true}
              key={cat.id}
              className={`pill-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
          <button suppressHydrationWarning={true}
            className={`pill-btn pill-btn-fav ${selectedCategory === "favorites" ? "active" : ""}`}
            onClick={() => setSelectedCategory("favorites")}
          >
            ❤️ Favorites ({favorites.length})
          </button>
        </div>

        <div className="bios-scroll-container">
          {filteredBios.length > 0 ? (
            filteredBios.map((bio, index) => {
              const uniqueId = `${selectedCategory}-${index}`;
              const isFav = favorites.includes(bio);
              return (
                <div className="bio-card-item" key={uniqueId}>
                  <button suppressHydrationWarning={true}
                    className={`fav-star-btn ${isFav ? "active" : ""}`}
                    onClick={() => toggleFavorite(bio)}
                    title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    <HeartIcon width={18} height={18} fill={isFav ? "currentColor" : "none"} />
                  </button>
                  
                  <div className="bio-text-display">{bio}</div>
                  
                  <div className="bio-actions-row">
                    <button suppressHydrationWarning={true}
                      className="action-icon-btn"
                      onClick={() => handleCopy(bio, uniqueId)}
                    >
                      {copiedIndex === uniqueId ? (
                        <>
                          <Check width={14} height={14} style={{ color: "#2b8a3e" }} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy width={14} height={14} /> Copy Bio
                        </>
                      )}
                    </button>

                    <button suppressHydrationWarning={true}
                      className="action-icon-btn"
                      style={{ color: "#845ef7" }}
                      onClick={() => handleTryInPreview(bio)}
                    >
                      <Smartphone width={14} height={14} /> Try in Preview
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <Star width={32} height={32} />
              <p>No bios found matching your search.</p>
              {selectedCategory === "favorites" && (
                <p style={{ fontSize: "0.85rem", color: "#aaa" }}>Click the heart icon on any bio to save it here!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Live Mockup Editor */}
      <div className="preview-sticky-wrap">
        <style>{`
          .preview-sticky-wrap {
            position: sticky;
            top: 24px;
          }
          .preview-panel-card {
            background: linear-gradient(135deg, #fffcfd 0%, #fcf6ff 100%);
            border: 1.5px solid #e0c3fc;
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 4px 24px rgba(142,197,252,0.08);
          }
          .preview-header-label {
            font-size: 1.25rem;
            font-weight: 850;
            color: #845ef7;
            margin-top: 0;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .preview-inputs-section {
            background: white;
            border: 1px solid #ebd9fc;
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 24px;
          }
          .input-row-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 12px;
          }
          .input-field-block label {
            display: block;
            font-size: 0.78rem;
            font-weight: 700;
            color: #555;
            margin-bottom: 4px;
          }
          .input-field-block input, .input-field-block textarea {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ebd9fc;
            border-radius: 8px;
            font-size: 0.88rem;
            color: #333;
            outline: none;
            transition: border-color 0.2s;
            font-family: inherit;
          }
          .input-field-block input:focus, .input-field-block textarea:focus {
            border-color: #845ef7;
          }
          .avatar-selectors {
            margin-top: 10px;
          }
          .preset-circles-row {
            display: flex;
            gap: 8px;
            margin-top: 6px;
            align-items: center;
          }
          .preset-circle {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid transparent;
            transition: transform 0.2s;
          }
          .preset-circle:hover {
            transform: scale(1.15);
          }
          .preset-circle.active {
            border-color: #845ef7;
            box-shadow: 0 0 0 2px white inset;
          }
          .upload-avatar-label {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px dashed #c44dff;
            background: #faf5ff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #c44dff;
            transition: background 0.2s;
            overflow: hidden;
          }
          .upload-avatar-label:hover {
            background: #f3e8ff;
          }
          .char-counter-text {
            font-size: 0.72rem;
            text-align: right;
            margin-top: 2px;
            color: #888;
            font-weight: 700;
          }
          .char-counter-text.warn {
            color: #ff3366;
          }

          .instagram-phone-frame {
            background: white;
            border: 4.5px solid #1a1a2e;
            border-radius: 32px;
            padding: 20px 16px;
            box-shadow: 0 16px 48px rgba(26,26,46,0.12);
            position: relative;
          }
          .phone-top-notch {
            width: 60px;
            height: 14px;
            background: #1a1a2e;
            border-radius: 10px;
            margin: -10px auto 14px;
          }
          .insta-mockup-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #efefef;
            padding-bottom: 10px;
            margin-bottom: 14px;
          }
          .insta-mockup-username {
            font-weight: 800;
            font-size: 0.95rem;
            color: #262626;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .verified-badge-circle {
            background: #0095f6;
            color: white;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 7px;
            font-weight: 900;
            flex-shrink: 0;
          }
          .mockup-main-profile-row {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 12px;
          }
          .story-ring-border {
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            padding: 2px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .profile-pic-container {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #eee;
            border: 2px solid white;
            overflow: hidden;
            background-position: center;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 800;
            font-size: 1.2rem;
          }
          .stats-grid-row {
            display: flex;
            flex-grow: 1;
            justify-content: space-around;
            text-align: center;
          }
          .stat-mockup-num {
            font-weight: 800;
            font-size: 0.92rem;
            color: #262626;
          }
          .stat-mockup-lbl {
            font-size: 0.72rem;
            color: #8e8e8e;
          }
          .mockup-bio-details {
            margin-bottom: 16px;
            font-size: 0.88rem;
            color: #262626;
            line-height: 1.5;
          }
          .mockup-fullname {
            font-weight: 750;
            margin-bottom: 2px;
          }
          .mockup-bio-text {
            white-space: pre-line;
            margin-bottom: 4px;
          }
          .mockup-link-url {
            color: #00376b;
            font-weight: 600;
            text-decoration: none;
          }
          .mockup-actions-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 34px;
            gap: 6px;
            margin-bottom: 16px;
          }
          .mockup-pill-btn {
            background: #efefef;
            color: #262626;
            border: none;
            border-radius: 8px;
            padding: 7px 10px;
            font-size: 0.82rem;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
          }
          .mockup-pill-btn.primary {
            background: #0095f6;
            color: white;
          }
          .mockup-square-btn {
            background: #efefef;
            border: none;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #262626;
            cursor: pointer;
          }
          .mockup-highlights-row {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding-bottom: 4px;
          }
          .highlight-item-block {
            text-align: center;
            flex-shrink: 0;
          }
          .highlight-circle-ring {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px solid #dbdbdb;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 4px;
          }
          .highlight-circle-inner {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #fafafa;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8e8e8e;
          }
          .highlight-label-text {
            font-size: 0.65rem;
            color: #262626;
            max-width: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .mockup-grid-tabs {
            display: flex;
            border-top: 1px solid #dbdbdb;
            margin-top: 14px;
            padding-top: 8px;
            justify-content: space-around;
            color: #8e8e8e;
          }
        `}</style>

        <div className="preview-panel-card" id="preview-section-title">
          <h3 className="preview-header-label">
            <Smartphone width={20} height={20} /> Live Profile Preview Tool
          </h3>

          <div className="preview-inputs-section">
            <div className="input-row-grid">
              <div className="input-field-block">
                <label>Username</label>
                <input suppressHydrationWarning={true}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                  maxLength={30}
                />
              </div>
              <div className="input-field-block">
                <label>Display Name</label>
                <input suppressHydrationWarning={true}
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  maxLength={35}
                />
              </div>
            </div>

            <div className="input-field-block" style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label>Bio Text</label>
                <label style={{ fontSize: "0.72rem", color: isVerified ? "#0095f6" : "#666", cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
                  <input suppressHydrationWarning={true}
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    style={{ width: "auto", marginRight: "4px", cursor: "pointer" }}
                  />
                  Verified Badge
                </label>
              </div>
              <textarea suppressHydrationWarning={true}
                rows={4}
                value={previewBio}
                onChange={(e) => setPreviewBio(e.target.value)}
                maxLength={250}
              />
              <div className={`char-counter-text ${previewBio.length > 150 ? "warn" : ""}`}>
                {previewBio.length} / 150 characters {previewBio.length > 150 ? "(Exceeds limit!)" : ""}
              </div>
            </div>

            <div className="avatar-selectors">
              <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#555" }}>Profile Avatar</label>
              <div className="preset-circles-row">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button suppressHydrationWarning={true}
                    key={idx}
                    className={`preset-circle ${avatarIndex === idx && !customAvatar ? "active" : ""}`}
                    style={{ background: preset }}
                    onClick={() => {
                      setAvatarIndex(idx);
                      setCustomAvatar(null);
                    }}
                  />
                ))}
                <label className={`upload-avatar-label ${customAvatar ? "active" : ""}`}>
                  <input suppressHydrationWarning={true}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleAvatarUpload}
                  />
                  {customAvatar ? (
                    <img
                      src={customAvatar}
                      alt="avatar"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Image width={12} height={12} />
                  )}
                </label>
                {customAvatar && (
                  <button suppressHydrationWarning={true}
                    className="action-icon-btn"
                    style={{ color: "#ff3366", padding: "2px" }}
                    onClick={() => setCustomAvatar(null)}
                    title="Remove Custom Avatar"
                  >
                    <Trash2 width={14} height={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="instagram-phone-frame">
            <div className="phone-top-notch"></div>
            
            <div className="insta-mockup-header">
              <span className="insta-mockup-username">
                @{username} {isVerified && <span className="verified-badge-circle" title="Verified Account">✓</span>}
              </span>
              <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "#262626" }}>&middot;&middot;&middot;</span>
            </div>

            <div className="mockup-main-profile-row">
              <div className="story-ring-border">
                <div
                  className="profile-pic-container"
                  style={{
                    backgroundImage: customAvatar ? `url(${customAvatar})` : "none",
                    background: customAvatar ? "none" : AVATAR_PRESETS[avatarIndex]
                  }}
                >
                  {!customAvatar && fullName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="stats-grid-row">
                <div>
                  <div className="stat-mockup-num">214</div>
                  <div className="stat-mockup-lbl">posts</div>
                </div>
                <div>
                  <div className="stat-mockup-num">34.8K</div>
                  <div className="stat-mockup-lbl">followers</div>
                </div>
                <div>
                  <div className="stat-mockup-num">512</div>
                  <div className="stat-mockup-lbl">following</div>
                </div>
              </div>
            </div>

            <div className="mockup-bio-details">
              <div className="mockup-fullname">{fullName}</div>
              <div className="mockup-bio-text">{previewBio}</div>
              <a href="#" className="mockup-link-url" onClick={(e) => e.preventDefault()}>
                🔗 smarttoolswala.com/bio
              </a>
            </div>

            <div className="mockup-actions-grid">
              <button suppressHydrationWarning={true} className="mockup-pill-btn primary">Follow</button>
              <button suppressHydrationWarning={true} className="mockup-pill-btn">Message</button>
              <button suppressHydrationWarning={true} className="mockup-square-btn">
                <User width={14} height={14} />
              </button>
            </div>

            <div className="mockup-highlights-row">
              <div className="highlight-item-block">
                <div className="highlight-circle-ring">
                  <div className="highlight-circle-inner"><Star width={14} height={14} /></div>
                </div>
                <div className="highlight-label-text">Favs</div>
              </div>
              <div className="highlight-item-block">
                <div className="highlight-circle-ring">
                  <div className="highlight-circle-inner"><Camera width={14} height={14} /></div>
                </div>
                <div className="highlight-label-text">Outfits</div>
              </div>
              <div className="highlight-item-block">
                <div className="highlight-circle-ring">
                  <div className="highlight-circle-inner"><HeartIcon width={14} height={14} /></div>
                </div>
                <div className="highlight-label-text">Moments</div>
              </div>
              <div className="highlight-item-block">
                <div className="highlight-circle-ring">
                  <div className="highlight-circle-inner"><User width={14} height={14} /></div>
                </div>
                <div className="highlight-label-text">Me</div>
              </div>
            </div>

            <div className="mockup-grid-tabs">
              <span style={{ color: "#262626", borderTop: "1.5px solid #262626", padding: "8px 16px", margin: "-8px 0 0 0", display: "flex", justifyContent: "center", flexGrow: 1 }}><GridIcon /></span>
              <span style={{ display: "flex", justifyContent: "center", flexGrow: 1, paddingTop: "4px" }}><ReelsIcon /></span>
              <span style={{ display: "flex", justifyContent: "center", flexGrow: 1, paddingTop: "4px" }}><TagsIcon /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridIcon() {
  return (
    <svg aria-label="Posts Grid" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
      <rect fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x="3" y="3" width="18" height="18" rx="1" />
      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="10" x2="10" y1="3" y2="21" />
      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14" x2="14" y1="3" y2="21" />
      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="10" y2="10" />
      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="14" y2="14" />
    </svg>
  );
}

function ReelsIcon() {
  return (
    <svg aria-label="Reels" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
      <rect fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x="2" y="2" width="20" height="20" rx="5" />
      <path d="M10 9l5 3-5 3V9z" />
    </svg>
  );
}

function TagsIcon() {
  return (
    <svg aria-label="Tagged Photos" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
      <path d="M10.25 21a.75.75 0 01-.75-.75V15h-5.25a.75.75 0 010-1.5h5.25V8.25a.75.75 0 011.5 0v5.25h5.25a.75.75 0 010 1.5h-5.25v5.25a.75.75 0 01-.75.75z" />
    </svg>
  );
}

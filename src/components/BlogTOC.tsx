"use client";

import { useState, useEffect, useCallback } from 'react';
import { List } from 'lucide-react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface BlogTOCProps {
    headings: Heading[];
}

export default function BlogTOC({ headings }: BlogTOCProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(true);

    // Intersection observer to track which heading is in view
    useEffect(() => {
        const headingEls = headings
            .map(h => document.getElementById(h.id))
            .filter(Boolean) as HTMLElement[];

        if (headingEls.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the topmost visible heading
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0,
            }
        );

        headingEls.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [headings]);

    const handleClick = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top, behavior: 'smooth' });
            setActiveId(id);
        }
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="btoc-root">
            {/* Header */}
            <button
                className="btoc-header"
                onClick={() => setIsOpen(o => !o)}
                aria-expanded={isOpen}
            >
                <span className="btoc-header-left">
                    <span className="btoc-header-icon">
                        <List className="w-3.5 h-3.5" />
                    </span>
                    Table of Contents
                </span>
                <span className={`btoc-chevron ${isOpen ? 'btoc-chevron-open' : ''}`}>▾</span>
            </button>

            {/* Items */}
            {isOpen && (
                <nav className="btoc-nav" aria-label="Table of contents">
                    <ul className="btoc-list">
                        {headings.map((h, i) => {
                            const isActive = activeId === h.id;
                            return (
                                <li key={h.id} className={`btoc-item btoc-item-h${h.level}`}>
                                    <button
                                        onClick={() => handleClick(h.id)}
                                        className={`btoc-link ${isActive ? 'btoc-link-active' : ''}`}
                                        title={h.text}
                                    >
                                        {h.level === 2 && (
                                            <span className={`btoc-bullet ${isActive ? 'btoc-bullet-active' : ''}`} />
                                        )}
                                        {h.level === 3 && (
                                            <span className={`btoc-sub-line ${isActive ? 'btoc-sub-line-active' : ''}`} />
                                        )}
                                        <span className="btoc-link-text">{h.text}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}

            {/* Progress indicator */}
            <div className="btoc-progress-wrap">
                <div className="btoc-progress-label">
                    {activeId ? (
                        <>
                            <span className="btoc-progress-dot" />
                            Reading…
                        </>
                    ) : 'Scroll to start'}
                </div>
                <div className="btoc-progress-bar-track">
                    <div
                        className="btoc-progress-bar-fill"
                        style={{
                            width: activeId
                                ? `${Math.round(((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100)}%`
                                : '0%'
                        }}
                    />
                </div>
            </div>

            <style>{`
                /* ═══════════════════════════════════════════
                   BLOG TABLE OF CONTENTS — Light + Dark Mode
                ═══════════════════════════════════════════ */

                /* ── Root ── */
                .btoc-root {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 18px;
                    overflow: hidden;
                    font-family: inherit;
                    transition: background 0.2s, border-color 0.2s;
                }
                .dark .btoc-root {
                    background: #0d1117;
                    border-color: rgba(255,255,255,0.08);
                }

                /* ── Header ── */
                .btoc-header {
                    display: flex; align-items: center; justify-content: space-between;
                    width: 100%; padding: 0.9rem 1.1rem;
                    background: rgba(0,0,0,0.02);
                    border: none; border-bottom: 1px solid #e2e8f0;
                    cursor: pointer; transition: background 0.2s, border-color 0.2s;
                }
                .btoc-header:hover { background: rgba(0,0,0,0.04); }
                .dark .btoc-header {
                    background: rgba(255,255,255,0.02);
                    border-bottom-color: rgba(255,255,255,0.06);
                }
                .dark .btoc-header:hover { background: rgba(255,255,255,0.04); }

                .btoc-header-left {
                    display: flex; align-items: center; gap: 0.55rem;
                    font-size: 11px; font-weight: 800; color: #64748b;
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .dark .btoc-header-left { color: #94a3b8; }

                .btoc-header-icon {
                    width: 22px; height: 22px; border-radius: 6px;
                    background: linear-gradient(135deg,#6366f1,#8b5cf6);
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; flex-shrink: 0;
                }
                .btoc-chevron {
                    font-size: 14px; color: #94a3b8;
                    transition: transform 0.25s, color 0.2s; display: inline-block;
                    line-height: 1;
                }
                .dark .btoc-chevron { color: #475569; }
                .btoc-chevron-open { transform: rotate(180deg); }

                /* ── Nav / List ── */
                .btoc-nav {
                    padding: 0.75rem 0.85rem;
                    max-height: min(420px, calc(100vh - 180px));
                    overflow-y: auto;
                    overscroll-behavior: contain;
                }
                .btoc-nav::-webkit-scrollbar {
                    width: 4px;
                }
                .btoc-nav::-webkit-scrollbar-track {
                    background: transparent;
                }
                .btoc-nav::-webkit-scrollbar-thumb {
                    background: rgba(148, 163, 184, 0.2);
                    border-radius: 4px;
                }
                .dark .btoc-nav::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                }
                .btoc-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1px; }

                /* H3 items — indented */
                .btoc-item-h3 { padding-left: 0.85rem; }

                .btoc-link {
                    display: flex; align-items: flex-start; gap: 0.55rem;
                    width: 100%; text-align: left;
                    padding: 0.4rem 0.55rem; border-radius: 8px;
                    border: none; background: transparent; cursor: pointer;
                    transition: all 0.2s;
                }
                .btoc-link:hover { background: rgba(99,102,241,0.06); }
                .btoc-link-active { background: rgba(99,102,241,0.1) !important; }
                .dark .btoc-link:hover { background: rgba(255,255,255,0.04); }

                .btoc-link-text {
                    font-size: 12.5px; font-weight: 500; color: #64748b;
                    line-height: 1.45; transition: color 0.2s;
                    display: -webkit-box; -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical; overflow: hidden;
                }
                .dark .btoc-link-text { color: #475569; }
                .btoc-link:hover .btoc-link-text { color: #6366f1; }
                .dark .btoc-link:hover .btoc-link-text { color: #94a3b8; }
                .btoc-link-active .btoc-link-text { color: #6366f1 !important; font-weight: 700; }
                .dark .btoc-link-active .btoc-link-text { color: #818cf8 !important; }

                /* H2 bullet */
                .btoc-bullet {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #cbd5e1; flex-shrink: 0; margin-top: 5px;
                    transition: background 0.2s;
                }
                .dark .btoc-bullet { background: #1e293b; }
                .btoc-bullet-active { background: linear-gradient(135deg,#6366f1,#8b5cf6); }

                /* H3 line */
                .btoc-sub-line {
                    width: 10px; height: 1.5px;
                    background: #cbd5e1; flex-shrink: 0; margin-top: 8px;
                    border-radius: 1px; transition: background 0.2s;
                }
                .dark .btoc-sub-line { background: #1e293b; }
                .btoc-sub-line-active { background: #6366f1; }

                /* ── Progress ── */
                .btoc-progress-wrap {
                    padding: 0.75rem 1.1rem 0.85rem;
                    border-top: 1px solid #e2e8f0;
                    transition: border-color 0.2s;
                }
                .dark .btoc-progress-wrap { border-top-color: rgba(255,255,255,0.05); }
                .btoc-progress-label {
                    display: flex; align-items: center; gap: 0.4rem;
                    font-size: 10px; font-weight: 700; color: #94a3b8;
                    text-transform: uppercase; letter-spacing: 0.07em;
                    margin-bottom: 0.5rem;
                }
                .dark .btoc-progress-label { color: #334155; }
                .btoc-progress-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: #6366f1; flex-shrink: 0;
                    animation: btoc-pulse 1.5s ease-in-out infinite;
                }
                @keyframes btoc-pulse {
                    0%,100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                .btoc-progress-bar-track {
                    height: 3px; background: #e2e8f0;
                    border-radius: 2px; overflow: hidden;
                    transition: background 0.2s;
                }
                .dark .btoc-progress-bar-track { background: rgba(255,255,255,0.05); }
                .btoc-progress-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg,#6366f1,#8b5cf6);
                    border-radius: 2px;
                    transition: width 0.4s ease;
                }
            `}</style>
        </div>
    );
}

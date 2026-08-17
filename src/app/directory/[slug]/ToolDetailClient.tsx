"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import {
  ExternalLink,
  Star,
  ThumbsUp,
  Bookmark,
  Globe,
  Share2,
  CheckCircle,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Tag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { DirToolWithCategory, DirReview } from "@/types/directory";
import { formatPrice } from "@/types/directory";

interface ToolDetailClientProps {
  tool: DirToolWithCategory;
  similarTools: DirToolWithCategory[];
}

export default function ToolDetailClient({
  tool,
  similarTools,
}: ToolDetailClientProps) {
  const { isSignedIn } = useUser();
  const [voted, setVoted] = useState(tool.has_voted ?? false);
  const [votes, setVotes] = useState(tool.votes_count);
  const [isVoting, setIsVoting] = useState(false);
  const [bookmarked, setBookmarked] = useState(tool.is_bookmarked ?? false);
  const [copied, setCopied] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<DirReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [prosText, setProsText] = useState("");
  const [consText, setConsText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [reviewError, setReviewError] = useState("");

  // Fetch reviews on mount
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/directory/reviews?tool_id=${tool.id}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setLoadingReviews(false);
      }
    }
    fetchReviews();
  }, [tool.id]);

  const handleVote = async () => {
    if (!isSignedIn || isVoting) return; // prevent duplicate requests
    setIsVoting(true);
    try {
      const res = await fetch("/api/directory/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool_id: tool.id }),
      });
      if (res.ok) {
        const d = await res.json();
        setVoted(d.voted);
        setVotes((v) => (d.voted ? v + 1 : v - 1));
      }
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setIsVoting(false);
    }
  };

  const handleBookmark = async () => {
    if (!isSignedIn) return;
    const res = await fetch("/api/directory/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool_id: tool.id,
        action: bookmarked ? "remove" : "add",
      }),
    });
    if (res.ok) {
      const d = await res.json();
      setBookmarked(d.bookmarked);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: tool.name,
          text: tool.tagline ?? tool.description_short ?? "",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;
    setSubmittingReview(true);
    setReviewError("");
    setReviewSuccess("");

    try {
      const res = await fetch("/api/directory/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool_id: tool.id,
          rating,
          review_text: reviewText.trim() || undefined,
          pros: prosText.trim() || undefined,
          cons: consText.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setReviewError(data.error ?? "Failed to submit review");
        return;
      }

      setReviewSuccess("Thank you! Your review has been published.");
      setReviewText("");
      setProsText("");
      setConsText("");
      // Refetch reviews
      const freshRes = await fetch(`/api/directory/reviews?tool_id=${tool.id}`);
      if (freshRes.ok) {
        const freshData = await freshRes.json();
        setReviews(freshData);
      }
    } catch {
      setReviewError("Network error. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const price = formatPrice(tool);

  return (
    <div
      className="page-bg"
      style={{ paddingTop: "90px", paddingBottom: "80px", minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 20px" }}>
        {/* Breadcrumb / Back button */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <Link
            href="/directory"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={14} /> Directory
          </Link>
          {tool.category && (
            <>
              <span style={{ color: "var(--text-tertiary)", fontSize: "12px" }}>/</span>
              <Link
                href={`/directory/category/${tool.category.slug}`}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {tool.category.name}
              </Link>
            </>
          )}
          <span style={{ color: "var(--text-tertiary)", fontSize: "12px" }}>/</span>
          <span style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700 }}>
            {tool.name}
          </span>
        </div>

        {/* Hero Card */}
        <div
          className="glass-card"
          style={{ borderRadius: "24px", overflow: "hidden", marginBottom: "28px" }}
        >
          {tool.cover_url && (
            <div style={{ height: "240px", position: "relative" }}>
              <Image
                src={tool.cover_url}
                alt={tool.name}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
          )}

          <div style={{ padding: "32px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {/* Logo */}
              <div
                style={{
                  width: "84px",
                  height: "84px",
                  borderRadius: "20px",
                  background: "var(--bg-tertiary)",
                  flexShrink: 0,
                  overflow: "hidden",
                  border: "2px solid var(--border-light)",
                  position: "relative",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                {tool.logo_url ? (
                  <Image
                    src={tool.logo_url}
                    alt={tool.name}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "36px",
                      fontWeight: 900,
                      color: "#f97316",
                    }}
                  >
                    {tool.name[0].toUpperCase()}
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div style={{ flex: 1, minWidth: "240px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "6px",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "clamp(24px, 4vw, 34px)",
                      fontWeight: 900,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {tool.name}
                  </h1>
                  {tool.is_verified && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "rgba(59,130,246,0.1)",
                        color: "#3b82f6",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 9px",
                        borderRadius: "8px",
                        border: "1px solid rgba(59,130,246,0.2)",
                      }}
                    >
                      <ShieldCheck size={12} /> Verified
                    </span>
                  )}
                </div>

                {tool.tagline && (
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      margin: "0 0 14px",
                      fontSize: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    {tool.tagline}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {tool.category && (
                    <Link
                      href={`/directory/category/${tool.category.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span
                        style={{
                          background: `${tool.category.color ?? "#6366f1"}18`,
                          color: tool.category.color ?? "var(--brand-primary)",
                          border: `1px solid ${
                            tool.category.color ?? "var(--brand-primary)"
                          }33`,
                          padding: "4px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {tool.category.name}
                      </span>
                    </Link>
                  )}

                  <span
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--text-secondary)",
                      padding: "4px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {price}
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "13px",
                      color: "#f59e0b",
                      fontWeight: 700,
                    }}
                  >
                    <Star
                      size={14}
                      fill={tool.avg_rating > 0 ? "#f59e0b" : "none"}
                    />{" "}
                    {tool.avg_rating > 0
                      ? tool.avg_rating.toFixed(1)
                      : "No reviews"}{" "}
                    ({tool.reviews_count})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  minWidth: "180px",
                }}
              >
                <a
                  href={tool.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    borderRadius: "14px",
                    justifyContent: "center",
                    padding: "12px 22px",
                    fontWeight: 800,
                    fontSize: "15px",
                  }}
                >
                  Visit Website <ExternalLink size={16} />
                </a>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={handleVote}
                    disabled={isVoting}
                    title={
                      isSignedIn
                        ? voted
                          ? "Remove vote"
                          : "Upvote tool"
                        : "Sign in to vote"
                    }
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      cursor: isVoting ? "not-allowed" : isSignedIn ? "pointer" : "default",
                      border: `1px solid ${
                        voted ? "var(--brand-primary)" : "var(--border-light)"
                      }`,
                      background: voted
                        ? "rgba(99,102,241,0.12)"
                        : "var(--bg-primary)",
                      color: voted
                        ? "var(--brand-primary)"
                        : "var(--text-secondary)",
                      fontWeight: 700,
                      fontSize: "13px",
                      opacity: isVoting ? 0.6 : 1,
                      transition: "opacity 0.15s",
                    }}
                  >
                    {isVoting ? (
                      <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                    ) : (
                      <ThumbsUp size={14} />
                    )}{" "}
                    {votes}
                  </button>

                  <button
                    onClick={handleBookmark}
                    title={
                      isSignedIn
                        ? bookmarked
                          ? "Remove bookmark"
                          : "Bookmark tool"
                        : "Sign in to bookmark"
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      cursor: isSignedIn ? "pointer" : "default",
                      border: `1px solid ${
                        bookmarked ? "#f59e0b" : "var(--border-light)"
                      }`,
                      background: bookmarked
                        ? "rgba(245,158,11,0.12)"
                        : "var(--bg-primary)",
                      color: bookmarked ? "#f59e0b" : "var(--text-secondary)",
                    }}
                  >
                    <Bookmark size={14} fill={bookmarked ? "#f59e0b" : "none"} />
                  </button>

                  <button
                    onClick={handleShare}
                    title="Share tool"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-primary)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <Share2 size={14} />
                  </button>
                </div>
                {copied && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#10b981",
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Link copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2 Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* Main Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Short / Long Description */}
            <div
              className="glass-card"
              style={{ borderRadius: "20px", padding: "28px" }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "14px",
                }}
              >
                About {tool.name}
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {tool.description_long || tool.description_short || "No description provided."}
              </p>
            </div>

            {/* Key Features */}
            {tool.features?.length > 0 && (
              <div
                className="glass-card"
                style={{ borderRadius: "20px", padding: "28px" }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "16px",
                  }}
                >
                  Key Features
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {tool.features.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      <CheckCircle
                        size={16}
                        color="#10b981"
                        style={{ marginTop: "2px", flexShrink: 0 }}
                      />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots */}
            {tool.screenshots && tool.screenshots.length > 0 && (
              <div
                className="glass-card"
                style={{ borderRadius: "20px", padding: "28px" }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "16px",
                  }}
                >
                  Screenshots & Preview
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {tool.screenshots.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        borderRadius: "14px",
                        overflow: "hidden",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <Image
                        src={s.url}
                        alt={s.alt ?? tool.name}
                        width={s.width ?? 800}
                        height={s.height ?? 450}
                        style={{ width: "100%", height: "auto", display: "block" }}
                        unoptimized
                      />
                      {s.caption && (
                        <div
                          style={{
                            padding: "10px 14px",
                            fontSize: "13px",
                            color: "var(--text-tertiary)",
                            background: "var(--bg-tertiary)",
                          }}
                        >
                          {s.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div
              className="glass-card"
              style={{ borderRadius: "20px", padding: "28px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    User Reviews ({reviews.length})
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "4px",
                    }}
                  >
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                      }}
                    >
                      {tool.avg_rating > 0 ? tool.avg_rating.toFixed(1) : "0.0"}
                    </span>
                    <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                      out of 5 stars
                    </span>
                  </div>
                </div>
              </div>

              {/* Write Review Form */}
              {isSignedIn ? (
                <form
                  onSubmit={handleReviewSubmit}
                  style={{
                    background: "var(--bg-tertiary)",
                    borderRadius: "16px",
                    padding: "20px",
                    marginBottom: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    Write a Review for {tool.name}
                  </h3>

                  {/* Star Rating Select */}
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Your Rating
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                          }}
                        >
                          <Star
                            size={22}
                            fill={
                              (hoverRating || rating) >= star
                                ? "#f59e0b"
                                : "none"
                            }
                            color={
                              (hoverRating || rating) >= star
                                ? "#f59e0b"
                                : "var(--text-tertiary)"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Review Comment
                    </label>
                    <textarea
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience using this AI tool..."
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        fontSize: "13px",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", display: "block", marginBottom: "4px" }}>
                        Pros (Optional)
                      </label>
                      <input
                        value={prosText}
                        onChange={(e) => setProsText(e.target.value)}
                        placeholder="What did you like most?"
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: "8px",
                          border: "1px solid var(--border-light)",
                          background: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          fontSize: "12px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", display: "block", marginBottom: "4px" }}>
                        Cons (Optional)
                      </label>
                      <input
                        value={consText}
                        onChange={(e) => setConsText(e.target.value)}
                        placeholder="What could be improved?"
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: "8px",
                          border: "1px solid var(--border-light)",
                          background: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          fontSize: "12px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  {reviewError && (
                    <div style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600 }}>
                      ⚠️ {reviewError}
                    </div>
                  )}

                  {reviewSuccess && (
                    <div style={{ fontSize: "12px", color: "#10b981", fontWeight: 600 }}>
                      ✓ {reviewSuccess}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="btn-primary"
                    style={{
                      borderRadius: "10px",
                      padding: "9px 20px",
                      alignSelf: "flex-end",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                    }}
                  >
                    {submittingReview ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                    Submit Review
                  </button>
                </form>
              ) : (
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    borderRadius: "14px",
                    padding: "16px",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)", marginRight: "10px" }}>
                    Sign in to leave a review for {tool.name}
                  </span>
                  <SignInButton mode="modal">
                    <button
                      className="btn-primary"
                      style={{
                        padding: "6px 14px",
                        fontSize: "12px",
                        borderRadius: "8px",
                      }}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              )}

              {/* Review List */}
              {loadingReviews ? (
                <div style={{ color: "var(--text-tertiary)", fontSize: "13px" }}>
                  Loading reviews...
                </div>
              ) : reviews.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "var(--text-tertiary)",
                    fontSize: "14px",
                  }}
                >
                  No reviews yet. Be the first to review {tool.name}!
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{
                        padding: "16px",
                        borderRadius: "14px",
                        background: "var(--bg-primary)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              background: "var(--brand-primary)",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: 800,
                            }}
                          >
                            {rev.reviewer?.display_name?.[0]?.toUpperCase() ?? "U"}
                          </div>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "var(--text-primary)",
                            }}
                          >
                            {rev.reviewer?.display_name ?? "Verified User"}
                          </span>
                        </div>

                        <div style={{ display: "flex", gap: "2px" }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={12}
                              fill={s <= rev.rating ? "#f59e0b" : "none"}
                              color={s <= rev.rating ? "#f59e0b" : "var(--text-tertiary)"}
                            />
                          ))}
                        </div>
                      </div>

                      {rev.review_text && (
                        <p
                          style={{
                            fontSize: "13px",
                            color: "var(--text-secondary)",
                            lineHeight: 1.6,
                            margin: "0 0 8px",
                          }}
                        >
                          {rev.review_text}
                        </p>
                      )}

                      {(rev.pros || rev.cons) && (
                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                          {rev.pros && (
                            <div style={{ fontSize: "12px", color: "#10b981" }}>
                              <strong>Pros:</strong> {rev.pros}
                            </div>
                          )}
                          {rev.cons && (
                            <div style={{ fontSize: "12px", color: "#ef4444" }}>
                              <strong>Cons:</strong> {rev.cons}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Similar Tools Section */}
            {similarTools.length > 0 && (
              <div style={{ marginTop: "12px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "16px",
                  }}
                >
                  Similar AI Tools
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {similarTools.map((st) => (
                    <Link
                      key={st.id}
                      href={`/directory/${st.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="glass-card"
                        style={{
                          borderRadius: "16px",
                          padding: "16px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          height: "100%",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "10px",
                              background: "var(--bg-tertiary)",
                              overflow: "hidden",
                              flexShrink: 0,
                              position: "relative",
                            }}
                          >
                            {st.logo_url ? (
                              <Image
                                src={st.logo_url}
                                alt={st.name}
                                fill
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 800,
                                  color: "#f97316",
                                }}
                              >
                                {st.name[0]}
                              </div>
                            )}
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: 800,
                                color: "var(--text-primary)",
                              }}
                            >
                              {st.name}
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                              {st.category?.name}
                            </div>
                          </div>
                        </div>

                        {st.tagline && (
                          <p
                            style={{
                              fontSize: "12px",
                              color: "var(--text-secondary)",
                              margin: 0,
                              lineHeight: 1.4,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {st.tagline}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              className="glass-card"
              style={{ borderRadius: "20px", padding: "24px" }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "16px",
                }}
              >
                Tool Metadata
              </h3>
              {[
                { label: "Pricing", value: price },
                { label: "Category", value: tool.category?.name ?? "—" },
                { label: "Open Source", value: tool.is_open_source ? "Yes" : "No" },
                { label: "Has API", value: tool.has_api ? "Yes" : "No" },
                { label: "Mobile App", value: tool.has_mobile_app ? "Yes" : "No" },
                { label: "Chrome Ext.", value: tool.has_chrome_ext ? "Yes" : "No" },
                { label: "Views", value: tool.views_count.toLocaleString() },
                { label: "Upvotes", value: votes.toLocaleString() },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border-light)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--text-tertiary)",
                      fontWeight: 600,
                    }}
                  >
                    {r.label}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--text-primary)",
                      fontWeight: 700,
                    }}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
            </div>

            {tool.tags && tool.tags.length > 0 && (
              <div
                className="glass-card"
                style={{ borderRadius: "20px", padding: "20px" }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  Tags
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        background: "var(--bg-tertiary)",
                        color: "var(--text-tertiary)",
                        borderRadius: "8px",
                        fontWeight: 600,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tool.ai_models && tool.ai_models.length > 0 && (
              <div
                className="glass-card"
                style={{ borderRadius: "20px", padding: "20px" }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  AI Models
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {tool.ai_models.map((m) => (
                    <span
                      key={m}
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        background: "rgba(99,102,241,0.12)",
                        color: "var(--brand-primary)",
                        borderRadius: "8px",
                        fontWeight: 700,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tool.social_links && tool.social_links.length > 0 && (
              <div
                className="glass-card"
                style={{ borderRadius: "20px", padding: "20px" }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  Official Links
                </h3>
                {tool.social_links.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 0",
                      borderBottom: "1px solid var(--border-light)",
                      textDecoration: "none",
                      color: "var(--brand-primary)",
                      fontSize: "13px",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    <Globe size={14} /> {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
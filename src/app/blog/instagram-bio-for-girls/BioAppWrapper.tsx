"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const DynamicBioApp = dynamic(() => import("./BioApp"), {
  ssr: false,
});

export default function BioAppWrapper() {
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, load immediately
    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Preload 200px before reaching the viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="explorer-card" 
      style={{ 
        minHeight: "450px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "white",
        boxShadow: "0 4px 20px rgba(233,30,140,0.04)"
      }}
    >
      {hasIntersected ? (
        <DynamicBioApp />
      ) : (
        <div style={{ textAlign: "center" }}>
          <div className="spinner"></div>
          <p style={{ color: "#ff6b9d", fontWeight: "700", margin: 0 }}>Loading Interactive Directory & Previewer...</p>
        </div>
      )}
    </div>
  );
}

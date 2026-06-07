"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicBioApp = dynamic(() => import("./BioApp"), {
  ssr: false,
  loading: () => (
    <div 
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
      <div style={{ textAlign: "center" }}>
        <div className="spinner"></div>
        <p style={{ color: "#ff6b9d", fontWeight: "700", margin: 0 }}>Loading Interactive Directory & Previewer...</p>
      </div>
    </div>
  )
});

export default function BioAppWrapper() {
  return <DynamicBioApp />;
}

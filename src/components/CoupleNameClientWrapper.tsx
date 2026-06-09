"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicClient = dynamic(() => import("./CoupleNameClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8 bg-pink-50/20 rounded-3xl min-h-[300px]">
      <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function CoupleNameClientWrapper() {
  return <DynamicClient />;
}

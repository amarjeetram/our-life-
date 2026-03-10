import HomeClient from "@/components/HomeClient";
import BlogSection from "@/components/BlogSection";
import type { Metadata } from "next";

// Never serve stale static HTML — always render fresh on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};


export default function Home() {
  return (
    <HomeClient>
      <BlogSection />
    </HomeClient>
  );
}


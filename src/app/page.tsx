import HomeClient from "@/components/HomeClient";
import BlogSection from "@/components/BlogSection";
import type { Metadata } from "next";

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


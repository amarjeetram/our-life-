"use server";

import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { BlogPost } from "@/lib/firebase/firestore";

// A lightweight type representing a post without the potentially massive 'content' field
export type LightBlogPost = Omit<BlogPost, "content">;

export async function fetchAdminPostsAction(): Promise<LightBlogPost[]> {
    if (!db || typeof db.type !== "undefined" && db.type === "document") return []; // fallback if not initialized properly

    try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((d) => {
            const data = d.data();

            // Serialize timestamps safely
            let createdAt = null;
            let updatedAt = null;

            if (data.createdAt?.seconds) {
                createdAt = { seconds: data.createdAt.seconds };
            }
            if (data.updatedAt?.seconds) {
                updatedAt = { seconds: data.updatedAt.seconds };
            }

            return {
                id: d.id,
                title: data.title,
                slug: data.slug,
                status: data.status,
                thumbnailUrl: data.thumbnailUrl,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                tags: data.tags || [],
                createdAt,
                updatedAt,
            } as LightBlogPost;
        });
    } catch (error) {
        console.error("Failed to fetch admin posts via action:", error);
        return [];
    }
}

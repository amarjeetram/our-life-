import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    query,
    orderBy,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "./config";

export interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    content: string;
    thumbnailUrl?: string;
    status: "DRAFT" | "PUBLISHED";
    metaTitle: string;
    metaDescription: string;
    tags: string[];
    createdAt?: unknown;
    updatedAt?: unknown;
}

const COLLECTION = "posts";

// Create a new post
export async function createPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) {
    const docRef = await addDoc(collection(db, COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

// Update existing post
export async function updatePost(id: string, data: Partial<BlogPost>) {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

// Delete a post
export async function deletePost(id: string) {
    await deleteDoc(doc(db, COLLECTION, id));
}

// Get all posts (for admin)
export async function getAllPosts(): Promise<BlogPost[]> {
    if (!db || !db.type) return [];
    try {
        const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
    } catch { return []; }
}

// Get only published posts (for public blog)
export async function getPublishedPosts(): Promise<BlogPost[]> {
    if (!db || !db.type) return [];
    try {
        const q = query(
            collection(db, COLLECTION),
            where("status", "==", "PUBLISHED")
        );
        const snapshot = await getDocs(q);

        // Sort manually to avoid needing a Firestore composite index and strip 'content' to save bandwidth
        const posts = snapshot.docs.map((d) => {
            const data = d.data();
            const { content, ...rest } = data; // strip huge Base64 content
            return { id: d.id, ...rest } as BlogPost;
        });
        return posts.sort((a, b) => {
            const timeA = (a.createdAt as any)?.seconds || 0;
            const timeB = (b.createdAt as any)?.seconds || 0;
            return timeB - timeA;
        });
    } catch { return []; }
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!db || !db.type) return null;
    try {
        const q = query(collection(db, COLLECTION), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        const d = snapshot.docs[0];
        return { id: d.id, ...d.data() } as BlogPost;
    } catch { return null; }
}

// Get post by ID
export async function getPostById(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as BlogPost;
}

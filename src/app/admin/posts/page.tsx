"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts, deletePost, type BlogPost } from "@/lib/firebase/firestore";
import { Loader2, PlusCircle, Edit2, Trash2, Eye, EyeOff, Search } from "lucide-react";

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleting, setDeleting] = useState<string | null>(null);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await getAllPosts();
            setPosts(data);
        } catch (err) {
            console.error("Error loading posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        setDeleting(id);
        await deletePost(id);
        await loadPosts();
        setDeleting(null);
    };

    const filtered = posts.filter(
        (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">All Posts</h1>
                    <p className="text-gray-400 text-sm mt-1">{posts.length} total posts</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 text-sm"
                >
                    <PlusCircle className="w-4 h-4" />
                    New Post
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search posts by title or tag..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors text-sm"
                />
            </div>

            {/* Posts Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-violet-400 w-8 h-8" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-lg">No posts found</p>
                        <p className="text-sm mt-1">Create your first blog post to get started</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800 text-left">
                                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Title</th>
                                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Status</th>
                                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">Tags</th>
                                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Date</th>
                                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/60">
                            {filtered.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-white text-sm line-clamp-1 group-hover:text-violet-300 transition-colors">{post.title}</p>
                                        <p className="text-gray-500 text-xs mt-0.5">/blog/{post.slug}</p>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${post.status === "PUBLISHED"
                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                            }`}>
                                            {post.status === "PUBLISHED" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-gray-400 text-sm">
                                            {post.createdAt
                                                ? new Date((post.createdAt as { seconds: number }).seconds * 1000).toLocaleDateString("en-IN")
                                                : "—"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/posts/${post.id}`}
                                                className="p-2 text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all duration-200"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id!)}
                                                disabled={deleting === post.id}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 disabled:opacity-50"
                                                title="Delete"
                                            >
                                                {deleting === post.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

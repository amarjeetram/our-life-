"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAdminPostsAction, type LightBlogPost } from "@/app/admin/actions";
import { FileText, PlusCircle, Eye, EyeOff, TrendingUp, Loader2 } from "lucide-react";

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="text-gray-400 text-sm mt-0.5">{label}</p>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [posts, setPosts] = useState<LightBlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminPostsAction()
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading posts:", err);
                setLoading(false);
            });
    }, []);

    const published = posts.filter((p) => p.status === "PUBLISHED").length;
    const drafts = posts.filter((p) => p.status === "DRAFT").length;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-violet-400 w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-1">Welcome back, Admin! Here&apos;s your blog overview.</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 text-sm"
                >
                    <PlusCircle className="w-4 h-4" />
                    New Post
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard icon={FileText} label="Total Posts" value={posts.length} color="bg-violet-500/10 text-violet-400" />
                <StatCard icon={Eye} label="Published" value={published} color="bg-emerald-500/10 text-emerald-400" />
                <StatCard icon={EyeOff} label="Drafts" value={drafts} color="bg-amber-500/10 text-amber-400" />
            </div>

            {/* Recent Posts */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-violet-400" />
                        Recent Posts
                    </h2>
                    <Link href="/admin/posts" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                        View all →
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="bg-gray-900 border border-dashed border-gray-700 rounded-2xl p-12 text-center">
                        <FileText className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400 font-medium">No posts yet</p>
                        <p className="text-gray-600 text-sm mt-1">Create your first blog post to get started</p>
                        <Link
                            href="/admin/posts/new"
                            className="inline-flex items-center gap-2 mt-4 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-300 font-medium px-4 py-2 rounded-xl transition-all text-sm"
                        >
                            <PlusCircle className="w-4 h-4" /> Create Post
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {posts.slice(0, 5).map((post) => (
                            <div
                                key={post.id}
                                className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-gray-700 transition-colors group"
                            >
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${post.status === "PUBLISHED" ? "bg-emerald-400" : "bg-amber-400"}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-white text-sm truncate group-hover:text-violet-300 transition-colors">{post.title}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">
                                        {post.createdAt
                                            ? new Date((post.createdAt as { seconds: number }).seconds * 1000).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                            : "Just now"}
                                    </p>
                                </div>
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${post.status === "PUBLISHED"
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "bg-amber-500/10 text-amber-400"
                                    }`}>
                                    {post.status}
                                </span>
                                <Link href={`/admin/posts/${post.id}`} className="text-gray-500 hover:text-violet-400 transition-colors text-sm ml-2 flex-shrink-0">
                                    Edit
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

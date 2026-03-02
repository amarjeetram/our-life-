"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { createPost, updatePost, getPostById, type BlogPost } from "@/lib/firebase/firestore";
import { uploadImage } from "@/lib/firebase/storage";
import { useRouter } from "next/navigation";
import {
    Bold, Italic, Heading2, Heading3, List, ListOrdered, Link as LinkIcon,
    ImageIcon, Save, Loader2, Eye, EyeOff, ArrowLeft, X
} from "lucide-react";

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

interface PostEditorProps {
    postId?: string;
}

export default function PostEditor({ postId }: PostEditorProps) {
    const router = useRouter();
    const isEditing = !!postId;

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(isEditing);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({ inline: false }),
            Placeholder.configure({ placeholder: "Start writing your blog post here..." }),
        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none min-h-[400px] p-6 focus:outline-none text-gray-200 leading-relaxed",
            },
        },
    });

    // Auto-slug from title
    useEffect(() => {
        if (!isEditing) {
            setSlug(slugify(title));
        }
    }, [title, isEditing]);

    // Load post for editing
    useEffect(() => {
        if (isEditing && postId) {
            getPostById(postId)
                .then((post) => {
                    if (post) {
                        setTitle(post.title);
                        setSlug(post.slug);
                        setMetaTitle(post.metaTitle);
                        setMetaDescription(post.metaDescription);
                        setTags(post.tags);
                        setStatus(post.status);
                        setThumbnailUrl(post.thumbnailUrl || "");
                        editor?.commands.setContent(post.content);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        console.error('Failed to fetch post:', err);
                    }
                });
        }
    }, [isEditing, postId, editor]);

    // Helper: compress image via existing API, fallback to original if it fails
    const compressFile = async (file: File): Promise<File> => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("targetKB", "200");
            const res = await fetch("/api/compress", { method: "POST", body: formData });
            if (!res.ok) throw new Error(`Compress API error: ${res.status}`);
            const blob = await res.blob();
            return new File([blob], file.name, { type: blob.type });
        } catch (err) {
            console.warn("Compression failed, using original file:", err);
            return file; // fallback to original
        }
    };

    // Helper: Convert File to Base64 String for direct Database storage
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Thumbnail upload — independent of editor (Saves as Base64 in Database)
    const handleThumbnailUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // Reset input so same file can be re-selected
        e.target.value = "";
        setUploading(true);
        try {
            const compressed = await compressFile(file);
            const base64Str = await fileToBase64(compressed);
            setThumbnailUrl(base64Str);
        } catch (err) {
            console.error("Thumbnail upload failed:", err);
            alert("Thumbnail upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    }, []);

    // Editor image upload — inserts image into Tiptap editor (Saves as Base64 in Database)
    const handleEditorImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;
        e.target.value = "";
        setUploading(true);
        try {
            const compressed = await compressFile(file);
            const base64Str = await fileToBase64(compressed);
            editor.chain().focus().setImage({ src: base64Str, alt: file.name }).run();
        } catch (err) {
            console.error("Editor image upload failed:", err);
            alert("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    }, [editor]);

    const addTag = () => {
        const trimmed = tagInput.trim().toLowerCase();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
        }
        setTagInput("");
    };

    const setLink = () => {
        const url = window.prompt("Enter URL:");
        if (!url) return;
        editor?.chain().focus().setLink({ href: url }).run();
    };

    const handleSave = async () => {
        if (!title || !editor) return;
        setSaving(true);
        const data: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> = {
            title,
            slug,
            content: editor.getHTML(),
            thumbnailUrl,
            status,
            metaTitle: metaTitle || title,
            metaDescription,
            tags,
        };

        try {
            if (isEditing && postId) {
                await updatePost(postId, data);
            } else {
                await createPost(data);
            }
            router.push("/admin/posts");
        } catch {
            alert("Failed to save post. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-violet-400 w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/admin/posts")}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">{isEditing ? "Edit Post" : "Create New Post"}</h1>
                </div>
                <div className="flex items-center gap-3">
                    {/* Status Toggle */}
                    <button
                        onClick={() => setStatus(status === "DRAFT" ? "PUBLISHED" : "DRAFT")}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${status === "PUBLISHED"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            }`}
                    >
                        {status === "PUBLISHED" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {status}
                    </button>
                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={saving || !title}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-xl transition-all text-sm shadow-lg shadow-violet-500/25"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? "Saving..." : "Save Post"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Editor Area */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Post Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 text-2xl font-bold text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                    />

                    {/* Slug */}
                    <div className="flex items-center gap-3 px-1">
                        <span className="text-gray-500 text-sm">URL:</span>
                        <span className="text-gray-400 text-sm">/blog/</span>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="flex-1 bg-transparent text-violet-400 text-sm focus:outline-none border-b border-dashed border-gray-700 focus:border-violet-500 pb-0.5"
                        />
                    </div>

                    {/* Editor Toolbar */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-800">
                            {[
                                { icon: Bold, action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
                                { icon: Italic, action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
                                { icon: Heading2, action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }) },
                                { icon: Heading3, action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive("heading", { level: 3 }) },
                                { icon: List, action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
                                { icon: ListOrdered, action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
                                { icon: LinkIcon, action: setLink, active: editor?.isActive("link") },
                            ].map(({ icon: Icon, action, active }, i) => (
                                <button
                                    key={i}
                                    onMouseDown={(e) => { e.preventDefault(); action(); }}
                                    className={`p-2 rounded-lg transition-all text-sm ${active
                                        ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                            {/* Image Upload */}
                            <label className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                                <input type="file" accept="image/*" className="hidden" onChange={handleEditorImageUpload} />
                            </label>
                        </div>
                        {/* Editor Content */}
                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* Sidebar - SEO & Settings */}
                <div className="space-y-4">
                    {/* Thumbnail */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <h3 className="font-semibold text-white text-sm mb-3">Featured Image</h3>
                        {thumbnailUrl ? (
                            <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-40 object-cover rounded-xl" />
                                <button
                                    onClick={() => setThumbnailUrl("")}
                                    className="absolute top-2 right-2 p-1 bg-gray-900/80 text-gray-300 hover:text-white rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-violet-500/50 transition-colors group">
                                {uploading ? (
                                    <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
                                ) : (
                                    <>
                                        <ImageIcon className="w-8 h-8 text-gray-600 group-hover:text-violet-400 transition-colors" />
                                        <span className="text-gray-500 text-xs mt-2 group-hover:text-gray-400">Click to upload thumbnail</span>
                                    </>
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} disabled={uploading} />
                            </label>
                        )}
                    </div>

                    {/* SEO */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
                        <h3 className="font-semibold text-white text-sm">SEO Settings</h3>
                        <div>
                            <label className="text-xs text-gray-500 font-medium">Meta Title</label>
                            <input
                                type="text"
                                placeholder="SEO Title (max 60 chars)"
                                maxLength={60}
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                className="w-full mt-1.5 bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                            />
                            <p className="text-xs text-gray-600 mt-1">{metaTitle.length}/60</p>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 font-medium">Meta Description</label>
                            <textarea
                                placeholder="Brief description for search engines (max 160 chars)"
                                maxLength={160}
                                rows={3}
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                className="w-full mt-1.5 bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
                            />
                            <p className="text-xs text-gray-600 mt-1">{metaDescription.length}/160</p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
                        <h3 className="font-semibold text-white text-sm">Tags</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add a tag..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                            />
                            <button
                                onClick={addTag}
                                className="px-3 py-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 rounded-xl text-sm hover:bg-violet-600/30 transition-all"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full"
                                >
                                    {tag}
                                    <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="text-gray-500 hover:text-red-400">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import PostEditor from "@/components/admin/PostEditor";

export const metadata = {
    title: "Edit Post | Admin",
};

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PostEditor postId={id} />;
}

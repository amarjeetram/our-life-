export const AUTHOR_AVATARS: Record<string, string> = {
    'abhishek baghel': '/team/abhishek.webp',
    'abhishek': '/team/abhishek.webp',
};

export function getAuthorAvatar(author?: string | null): string | null {
    if (!author) return null;
    const lower = author.toLowerCase().trim();
    for (const [key, avatar] of Object.entries(AUTHOR_AVATARS)) {
        if (lower.includes(key)) {
            return avatar;
        }
    }
    return null;
}

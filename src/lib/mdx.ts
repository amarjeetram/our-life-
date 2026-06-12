import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Try multiple directories in case Next.js root differs from user root
const contentDirectory = path.join(process.cwd(), 'content', 'blogs');

// Ensure directory exists, or default to a fallback
const getValidDirectory = () => {
    if (fs.existsSync(contentDirectory)) return contentDirectory;
    const fallbackPath = path.join(process.cwd(), 'next-app', 'content', 'blogs');
    if (fs.existsSync(fallbackPath)) return fallbackPath;

    // If not exists, create it
    try {
        fs.mkdirSync(contentDirectory, { recursive: true });
        return contentDirectory;
    } catch {
        return contentDirectory;
    }
};

export type Post = {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    content: string;
    image?: string;
    tags?: string[];
    externalLink?: string;
};

export function getPostBySlug(slug: string): Post | null {
    try {
        const directory = getValidDirectory();
        const fullPath = path.join(directory, `${slug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // ALWAYS format dates to ISO Strings to prevent Next.js metadata compilation bugs (e.g., [object Object])
        let dateVal = data.date;
        if (dateVal instanceof Date) {
            dateVal = dateVal.toISOString();
        } else if (typeof dateVal === 'string') {
            try {
                dateVal = new Date(dateVal).toISOString();
            } catch (e) {
                // Keep original if parsing fails
            }
        }

        return {
            slug,
            title: data.title || 'Untitled',
            description: data.description || '',
            date: dateVal || new Date().toISOString(),
            author: data.author || 'SmartToolsWala',
            image: data.image,
            tags: Array.isArray(data.tags) ? data.tags : [],
            content,
        };
    } catch (e) {
        console.error("Error reading post:", slug, e);
        return null;
    }
}

export function getAllPosts(): Post[] {
    try {
        const directory = getValidDirectory();

        if (!fs.existsSync(directory)) {
            return [];
        }

        const slugs = fs.readdirSync(directory)
            .filter((file) => file.endsWith('.mdx'))
            .map((file) => file.replace(/\.mdx$/, ''));

        const posts = slugs
            .map((slug) => getPostBySlug(slug))
            .filter((post): post is Post => post !== null)
            // Filter out future posts
            .filter((post) => new Date(post.date).getTime() <= Date.now())
            // Sort posts by date in descending order
            .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

        return posts;
    } catch (e) {
        console.error("Error listing posts:", e);
        return [];
    }
}

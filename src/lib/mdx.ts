import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Pointing to the content/blogs directory, with fallback to next-app/content/blogs if root is missing
const rootDirectoryPath = path.join(process.cwd(), 'content', 'blogs');
const fallbackDirectoryPath = path.join(process.cwd(), 'next-app', 'content', 'blogs');
const postsDirectory = fs.existsSync(rootDirectoryPath) ? rootDirectoryPath : fallbackDirectoryPath;

export interface MDXPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    image?: string;
    tags?: string[];
    content: string;
}

export function getAllPosts(): MDXPost[] {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
                .replace(/(^-|-$)+/g, ''); // Remove leading/trailing hyphens
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || '',
                description: data.description || '',
                date: data.date || '',
                author: data.author || 'SmartToolsWala',
                image: data.image || null,
                tags: data.tags || [],
                content,
            };
        })
        // Sort posts by date in descending order (newest first)
        .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

    return posts;
}

export function getPostBySlug(slug: string): MDXPost | undefined {
    if (!fs.existsSync(postsDirectory)) return undefined;

    // Find the actual file name regardless of case (important for Vercel/Linux)
    const fileNames = fs.readdirSync(postsDirectory);
    const actualFileName = fileNames.find((fileName) => {
        const generatedSlug = fileName.replace(/\.mdx$/, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        return generatedSlug === slug.toLowerCase();
    });

    if (!actualFileName) return undefined;

    const fullPath = path.join(postsDirectory, actualFileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: slug.toLowerCase(),
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author || 'SmartToolsWala',
        image: data.image || null,
        tags: data.tags || [],
        content,
    };
}

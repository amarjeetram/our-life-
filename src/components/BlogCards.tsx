import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Play, FileText, Image as ImageIcon } from 'lucide-react';
import { Post } from '@/lib/mdx';

export default function BlogCards({ posts }: { posts: Post[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">No tools or articles found</h3>
                <p className="text-gray-500 mt-2 text-sm">Check back soon for new photo optimization guides.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => {
                // Determine icon and color based on index or category context
                const isImportant = index === 0;

                return (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                        {/* Image Container with matching aesthetic */}
                        <div className="aspect-video relative overflow-hidden bg-slate-50 flex items-center justify-center p-6 border-b border-gray-100">
                            {post.image ? (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 group-hover:scale-105 transition-transform duration-500">
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <ImageIcon className="w-16 h-16 text-indigo-400/50" />
                                    </div>
                                </div>
                            )}

                            {/* Floating Category Badge */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm
                                    ${isImportant ? 'bg-indigo-600 text-white' : 'bg-white/90 backdrop-blur-sm text-indigo-600 border border-indigo-100'}
                                `}>
                                    Guide
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow relative">
                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 mb-4">
                                <span className="flex items-center gap-1.5 text-indigo-700/80">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-1.5 shrink-0">
                                    <User className="w-3.5 h-3.5" />
                                    {post.author}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-[1.25rem] leading-[1.4] font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-3">
                                {post.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[15px] leading-relaxed text-gray-600 mb-6 line-clamp-3">
                                {post.description}
                            </p>

                            {/* Action Button */}
                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm font-bold text-indigo-600 flex items-center gap-1.5 group-hover:gap-2 transition-all">
                                    Read Article
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 transition-colors">
                                    <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

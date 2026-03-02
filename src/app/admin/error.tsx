"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Admin Panel Error Caught by Boundary:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong!</h1>

            <p className="text-gray-400 mb-8 max-w-md">
                We encountered an unexpected error while loading the admin panel.
                This is often caused by a temporary connection issue or a cached version of the app.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-8 text-left max-w-md w-full overflow-hidden">
                <p className="text-red-400 font-mono text-xs break-all">
                    {error.message || "Unknown error occurred"}
                </p>
                {error.stack && (
                    <p className="text-gray-600 font-mono text-[10px] mt-2 line-clamp-3">
                        {error.stack}
                    </p>
                )}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => {
                        // Force hard reload to clear chunk errors
                        if (error.message.includes("ChunkLoadError") || error.name === "ChunkLoadError") {
                            window.location.reload();
                        } else {
                            reset();
                        }
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl transition-all"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try again
                </button>

                <Link
                    href="/"
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}

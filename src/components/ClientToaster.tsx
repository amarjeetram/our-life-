"use client";

import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

export default function ClientToaster() {
    const { toasts } = useToasterStore();

    useEffect(() => {
        // Find visible toasts and dismiss all but the newest one
        const visibleToasts = toasts.filter((t) => t.visible);
        if (visibleToasts.length > 1) {
            // Dismiss all visible toasts except the last (newest) one
            visibleToasts.slice(0, -1).forEach((t) => {
                toast.dismiss(t.id);
            });
        }
    }, [toasts]);

    return <Toaster position="top-center" reverseOrder={false} />;
}


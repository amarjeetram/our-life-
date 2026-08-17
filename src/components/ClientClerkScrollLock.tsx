"use client";

import { useEffect } from "react";

export default function ClientClerkScrollLock() {
  useEffect(() => {
    const checkModal = () => {
      const modalElement = document.querySelector(
        '.clerk-modal-backdrop, .clerk-modal-portal, [data-clerk-modal], .clerk-active-modal-backdrop, [class*="clerk-modal"]'
      );
      if (modalElement) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        // Only reset if mobile drawer is not open
        const isDrawerOpen = document.querySelector('.mobile-drawer-open');
        if (!isDrawerOpen) {
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        }
      }
    };

    const observer = new MutationObserver(() => {
      checkModal();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    checkModal();

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

// ✅ SERVER COMPONENT — do NOT add "use client" here.
// Navbar and Footer each have their own "use client" where they need it.
// ClientDropZone is intentionally in layout.tsx (not here) to keep its Suspense
// boundary isolated from {children}, preventing CSR bailout on blog/tool pages.
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

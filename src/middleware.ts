import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pass the pathname to the root layout via a request header
// so it can conditionally hide Navbar/Footer on /admin/* routes.
// Firebase Auth is handled client-side in /admin/layout.tsx via onAuthStateChanged.
export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    response.headers.set("x-pathname", request.nextUrl.pathname);
    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

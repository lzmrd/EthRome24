import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/(auth)/action";
import { SessionData } from "./app/api/login/auth.types";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const session: SessionData = await getSession();

  // Allow static files and favicon
  if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  if (pathname === "/login" || pathname === "/sign-up") {
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url)); // Reindirizza all'home page
    }
    return NextResponse.next();
  }

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/fonts|favicon.ico|api/).*)',
  ],
};

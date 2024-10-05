import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/(auth)/action";
import { SessionData } from "./app/api/login/auth.types";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  if (pathname === "/login") {
    return NextResponse.next();
  }

  const session: SessionData = await getSession();

  if (!session.isLoggedIn) {
    if(pathname === "/sign-up"){

        return NextResponse.redirect(new URL("/sign-up", req.url));
    }
     else{

        return NextResponse.redirect(new URL("/login", req.url));
    } 
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/fonts|favicon.ico|api/).*)',
  ],
};

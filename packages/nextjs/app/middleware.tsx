import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./(auth)/action";
import { SessionData } from "./api/login/auth.types";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const session: SessionData = await getSession();

  if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  // Permettere l'accesso a login e sign-up
  if (pathname === "/login" || pathname === "/sign-up") {
    if (session.isLoggedIn) {
      // Se l'utente è già loggato, reindirizzalo alla home o a un'altra pagina
      return NextResponse.redirect(new URL("/", req.url)); // Reindirizza all'home page
    }
    return NextResponse.next();
  }

  // Se non è loggato e sta cercando di accedere a una pagina protetta
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

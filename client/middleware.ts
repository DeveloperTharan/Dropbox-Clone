import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateJWT } from "./utils/validate-jwt";
import { jwtDecode } from "jwt-decode";

const publicRoutes = ["/", "/auth"];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionToken = req.cookies.get("_dropbox_auth");
  const sessionId = req.cookies.get("_dropbox_auth_id");
  const isAuthenticated = !!sessionToken;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isAuthenticated && (isPublicRoute || nextUrl.pathname === "/auth")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute) {
    const callbackUrl = nextUrl.href;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)"],
};

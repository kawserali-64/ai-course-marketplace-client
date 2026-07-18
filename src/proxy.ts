import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get(
    "__Secure-better-auth.session_token"
  );

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/houses/add",
    "/houses/my-houses",
    "/houses/dashboard",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/houses/add/:path*",
    "/houses/my-houses/:path*",
    "/houses/dashboard/:path*",
  ],
};
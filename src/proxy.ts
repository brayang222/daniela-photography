import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";
  const { pathname, search } = req.nextUrl;
  const isLoginPage = pathname === "/login";
  const isAdminArea = pathname.startsWith("/admin");

  if (!isAdminArea) return;

  if (!isLoggedIn) {
    if (isLoginPage) return;
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  if (!isAdmin) {
    // No hay más de un rol en este sitio: si tiene sesión pero no es admin,
    // no tiene nada que hacer en /admin.
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/login"],
};

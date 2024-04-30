import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const response = NextResponse.next();
  const loggedIn = cookies.get("isLoggedIn")?.value === "true";
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  console.log("loggedIn", loggedIn);

  if (isAuthRoutes) {
    if (loggedIn) {
      return NextResponse.redirect(new URL("/", url));
    }

    return null;
  }

  if (!loggedIn) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
    return NextResponse.redirect(new URL(`/login?${searchParams}`, url));
  }

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

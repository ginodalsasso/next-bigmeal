import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const isProduction = process.env.NODE_ENV === "production";

const protectedRoutes = [
    "/ingredients",
    "/meals",
    "/household-products",
    "/categories",
    "/shopping-list",
    "/profile",
    "/dashboard",
    "/search-results",
];

const adminRoutes = ["/categories", "/dashboard"];

const dynamicRoutePatterns = [
    /^\/ingredients\/[a-zA-Z0-9-]+$/,
    /^\/household-products\/[a-zA-Z0-9-]+$/,
    /^\/meals\/[a-zA-Z0-9-]+$/,
];

const publicRoutes = ["/", "/login", "/register", "/offline", "/blocked"];

export async function proxy(req: NextRequest) {
    const { nextUrl } = req;
    const path = nextUrl.pathname;

    const cookieKey = isProduction
        ? "__Secure-authjs.session-token"
        : "authjs.session-token";

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: isProduction,
        salt: cookieKey,
        cookieName: cookieKey,
    });

    const isLoggedIn = !!token;
    const userStatus = token?.status as string | undefined;

    if (publicRoutes.includes(path)) {
        if (path === "/login" && isLoggedIn && userStatus === "APPROVED") {
            return NextResponse.redirect(new URL("/", nextUrl.origin));
        }
        return NextResponse.next();
    }

    const isProtectedRoute =
        protectedRoutes.some((route) => path.startsWith(route)) ||
        dynamicRoutePatterns.some((pattern) => pattern.test(path));

    if (isProtectedRoute) {
        if (!isLoggedIn) {
            const redirectUrl = new URL("/login", nextUrl.origin);
            redirectUrl.searchParams.set("callbackUrl", path);
            return NextResponse.redirect(redirectUrl);
        }

        if (userStatus !== "APPROVED") {
            return NextResponse.redirect(new URL("/blocked", nextUrl.origin));
        }

        const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));
        if (isAdminRoute && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", nextUrl.origin));
        }
    }

    const response = NextResponse.next();

    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "no-referrer-when-downgrade");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=()"
    );

    if (isProduction) {
        response.headers.set(
            "Strict-Transport-Security",
            "max-age=63072000; includeSubDomains; preload"
        );
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|.*\\.png$).*)",
    ],
};

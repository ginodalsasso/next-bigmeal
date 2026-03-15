import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const isProduction = process.env.NODE_ENV === "production";

// Routes protégées statiques
const protectedRoutes = [
    "/ingredients",
    "/meals",
    "household-products",
    "/categories",
    "/shopping-list",
    "/profile",
];

// Patterns pour les routes dynamiques
const dynamicRoutePatterns = [
    /^\/ingredients\/[a-zA-Z0-9-]+$/,
    /^\/household-products\/[a-zA-Z0-9-]+$/,
    /^\/meals\/[a-zA-Z0-9-]+$/,
    /^search-results\?query=[a-zA-Z0-9-]+$/,
    /^\/reset-token\/[a-zA-Z0-9-]+$/,
];

// Routes publiques accessibles sans authentification
const publicRoutes = ["/login", "/register", "/"];

export async function proxy(req: NextRequest) {
    const { nextUrl } = req;
    const path = nextUrl.pathname;

    const cookieKey = process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token';

    // Récupération du token JWT
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: isProduction,
        salt: cookieKey,
        cookieName: cookieKey,
        logger: console,
    });

    const isLoggedIn = !!token;
    const userStatus = token?.status as string | undefined;

    // Routes publiques : toujours accessibles
    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }

    // Routes réservées aux comptes bloqués/rejetés : évite les boucles de redirection
    if (path === "/blocked") {
        return NextResponse.next();
    }

    const isProtectedRoute =
        protectedRoutes.some((route) => path.startsWith(route)) ||
        dynamicRoutePatterns.some((pattern) => pattern.test(path));

    if (isProtectedRoute) {
        // Non connecté → login avec callbackUrl
        if (!isLoggedIn) {
            const redirectUrl = new URL("/login", nextUrl.origin);
            redirectUrl.searchParams.set("callbackUrl", encodeURIComponent(path));
            return NextResponse.redirect(redirectUrl);
        }

        // Connecté mais compte non approuvé → page dédiée
        if (userStatus !== "APPROVED") {
            return NextResponse.redirect(new URL("/blocked", nextUrl.origin));
        }
    }

    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "no-referrer-when-downgrade");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|.*\\.png$).*)"
    ],
};

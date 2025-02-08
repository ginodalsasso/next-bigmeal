import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { auth as middleware } from "@/lib/auth";

const protectedRoutes = [
    "/ingredients",
    "/meals",
    "/categories-ingredient",
    "/categories-meal",
    "/shopping-list",
];

const dynamicRoutePatterns = [
    /^\/ingredients\/[a-zA-Z0-9-]+$/, // Ex: /ingredients/tomate
    /^\/meals\/[a-zA-Z0-9-]+$/, // Ex: /meals/pizza
    /^\/=[a-zA-Z0-9-]+$/, // Ex: /=liste1
    /^\/reset-token\/=[a-zA-Z0-9-]+$/, // Ex: /reset-token/123456
];

const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = await getToken({ req });

    // Vérifie si la route est protégée ou publique
    const isProtectedRoute =
        protectedRoutes.some((route) => path.startsWith(route)) ||
        dynamicRoutePatterns.some((pattern) => pattern.test(path));

    const isPublicRoute = publicRoutes.includes(path);

    // Redirection si l'utilisateur N'EST PAS connecté et tente d'accéder à une route protégée
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirection si l'utilisateur EST connecté et tente d'accéder à /login ou /register
    if (isPublicRoute && token && path !== "/") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Ajout des headers de sécurité
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    return response;
}

// Appliquer le middleware sur toutes les routes sauf API et fichiers statiques
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

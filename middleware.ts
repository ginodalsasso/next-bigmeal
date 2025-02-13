import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Routes protégées statiques
const protectedRoutes = [
    "/ingredients",
    "/meals",
    "/categories-ingredient",
    "/categories-meal",
    "/shopping-list",
];

// Patterns pour les routes dynamiques
const dynamicRoutePatterns = [
    /^\/ingredients\/[a-zA-Z0-9-]+$/,
    /^\/meals\/[a-zA-Z0-9-]+$/,
    /^\/=[a-zA-Z0-9-]+$/,
    /^\/reset-token\/=[a-zA-Z0-9-]+$/,
];

// Routes publiques
const publicRoutes = ["/login", "/register", "/"];

export default auth((req) => {
    const { nextUrl } = req;
    const path = nextUrl.pathname;
    const isLoggedIn = !!req.auth;

    // Vérifie si la route actuelle est protégée
    const isProtectedRoute = 
        protectedRoutes.some(route => path.startsWith(route)) || 
        dynamicRoutePatterns.some(pattern => pattern.test(path));

    // Vérifie si la route actuelle est publique
    const isPublicRoute = publicRoutes.includes(path);

    // Redirection pour les routes protégées si non connecté
    if (isProtectedRoute && !isLoggedIn) {
        const redirectUrl = new URL("/login", nextUrl.origin);
        // redirection vers la page demandée après connexion
        redirectUrl.searchParams.set("callbackUrl", encodeURIComponent(path));
        return NextResponse.redirect(redirectUrl);
    }

    // Redirection des pages publiques vers la page d'accueil si connecté
    if (isPublicRoute && isLoggedIn && path !== "/") {
        return NextResponse.redirect(new URL("/", nextUrl.origin));
    }

    // Ajoute les en-têtes de sécurité
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    return response;
});


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = [
    "/ingredients",
    "/meals",
    "/categories-ingredient",
    "/categories-meal",
    "/shopping-list",
    "/profile",
];

const dynamicRoutePatterns = [
    /^\/ingredients\/[a-zA-Z0-9-]+$/, // Par exemple : /ingredients/nomdelingredient
    /^\/meals\/[a-zA-Z0-9-]+$/, // Par exemple : /meals/nomdurepas
    /^\/profile\/[a-zA-Z0-9-]+$/, // Par exemple : /profile/nomutilisateur
    
];

const publicRoutes = ["/login", "/register", "/"];

const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

const csp = `
    default-src 'self'; 
    script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'strict-dynamic'; 
    style-src 'self' 'unsafe-inline'; 
    img-src 'self' data:; 
    font-src 'self'; 
    connect-src 'self'; 
    frame-src 'none'; 
`.replace(/\s{2,}/g, ' ').trim(); // Remplace les espaces multiples par un seul espace


export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Vérifie si la route est une route protégée ou publique
    const isProtectedRoute =
        protectedRoutes.includes(path) || dynamicRoutePatterns.some((pattern) => pattern.test(path));
    const isPublicRoute = publicRoutes.includes(path);

    // Récupère le cookie de session
    const cookie = req.cookies.get("session")?.value;

    // Décrypte la session
    let session;
    if (cookie) {
        try {
            session = await decrypt(cookie);
        } catch (error) {
            console.error("Erreur lors de la vérification de la session:", error);
            session = null;
        }
    }

    // Redirection si la route est protégée et que l'utilisateur n'est pas connecté
    if (isProtectedRoute && (!session || !session?.userId)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Redirection si la route est publique et que l'utilisateur est connecté
    if (isPublicRoute && session?.userId && path !== "/") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    const response = NextResponse.next();
    response.headers.set("Content-Security-Policy", csp);
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    response.headers.set("X-XSS-Protection", "1; mode=block");


    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

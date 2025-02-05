import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = [
    "/ingredients",
    "/meals",
    "/categories-ingredient",
    "/categories-meal",
    "/shopping-list",
];

const dynamicRoutePatterns = [
    /^\/ingredients\/[a-zA-Z0-9-]+$/, // Par exemple : /ingredients/nomdelingredient
    /^\/meals\/[a-zA-Z0-9-]+$/, // Par exemple : /meals/nomdurepas
    /^\/=[a-zA-Z0-9-]+$/, // Par exemple : /=nomdeliste
    /^\/reset-token\/=[a-zA-Z0-9-]+$/, // Par exemple : /=nomdeliste
    
];

const publicRoutes = ["/login", "/register", "/"];


export default async function middleware(req: NextRequest) {
    
    const path = req.nextUrl.pathname;

    // Vérifie si la route est une route protégée ou p  ublique
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route)) || 
                            dynamicRoutePatterns.some(pattern => pattern.test(path));

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
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    response.headers.set("X-XSS-Protection", "1; mode=block");


    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

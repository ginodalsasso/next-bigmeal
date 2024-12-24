import { NextRequest, NextResponse } from "next/server";

const allowedRoutes = [
    "/",
    "/not-found",
    "/home",
    "/ingredients",
    "/meals",
    "/categories-ingredient",
    "/categories-meal",
];

// Liste des modèles pour routes dynamiques autorisées
const dynamicRoutePatterns = [
    /^\/ingredients\/[a-zA-Z0-9-]+$/, // Par exemple : /ingredients/nomdelingredient
    /^\/meals\/[a-zA-Z0-9-]+$/,      // Par exemple : /meals/nomdurepas
];

// function isAuthenticated(req: NextRequest) {
//     return !!req.cookies.get("auth-token");
// }

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/_next") || // Ressources statiques Next.js
        pathname.startsWith("/api") ||  // Requêtes API
        pathname.includes(".")          // Fichiers (CSS, JS, etc.)
    ) {
        return NextResponse.next();
    }

    if (allowedRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Vérifier si la route correspond à un modèle dynamique autorisé
    const isDynamicRouteAllowed = dynamicRoutePatterns.some((pattern) =>
        pattern.test(pathname)
    );

    if (isDynamicRouteAllowed) {
        return NextResponse.next();
    }

    // // Si la route est autorisée mais que l'utilisateur n'est pas authentifié
    // if (allowedRoutes.includes(pathname) && !isAuthenticated(req)) {
    //     return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    // }


    return NextResponse.redirect(new URL("/not-found", req.nextUrl.origin));
}

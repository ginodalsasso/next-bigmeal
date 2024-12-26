import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = [
    "/ingredients",
    "/meals",
    "/categories-ingredient",
    "/categories-meal",
];

const dynamicRoutePatterns = [
    /^\/ingredients\/[a-zA-Z0-9-]+$/, // Par exemple : /ingredients/nomdelingredient
    /^\/meals\/[a-zA-Z0-9-]+$/, // Par exemple : /meals/nomdurepas
];

const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Vérifie si la route est une route protégée ou publique
    const isProtectedRoute =
        protectedRoutes.includes(path) || dynamicRoutePatterns.some((pattern) => pattern.test(path));
    const isPublicRoute = publicRoutes.includes(path);

    // Décrypte la session
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    // Redirection si la route est protégée et que l'utilisateur n'est pas connecté
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Redirection si la route est publique et que l'utilisateur est connecté
    if (isPublicRoute && session?.userId && path !== "/") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

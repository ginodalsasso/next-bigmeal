import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const isProduction = process.env.NODE_ENV === "production"; // Vérifie si l'environnement est en production

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

export async function middleware(req: NextRequest) {
    const { nextUrl } = req; // L'URL de la requête en cours
    const path = nextUrl.pathname; // Le chemin de la requête ex: `/ingredients`
    

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
    response.headers.set("X-Content-Type-Options", "nosniff"); // Empêche le navigateur de deviner le type MIME
    response.headers.set("X-Frame-Options", "DENY"); // Empêche l'intégration du site dans un iframe (protection contre le clickjacking)
    response.headers.set("Referrer-Policy", "no-referrer-when-downgrade"); // Politique de référent pour éviter de divulguer des informations sensibles ex: l'URL de la page précédente
    response.headers.set("X-XSS-Protection", "1; mode=block"); // Active la protection contre certaines attaques XSS dans les navigateurs compatibles

    return response;
}

export const config = {
    // Empêche d'appliquer le middleware sur les fichiers statiques, les requêtes API, les images ou tout fichier au format `.png`
    matcher: [
        "/((?!_next/static|_next/image|.*\\.png$).*)"
    ],

};

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// const isProduction = process.env.NODE_ENV === "production"; // Vérifie si l'environnement est en production

const SECRET = process.env.AUTH_SECRET as string; // Clé secrète utilisée pour récupérer le jeton JWT

if (!SECRET) {
    throw new Error("AUTH_SECRET is not defined");
}

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
    /^\/reset-token\/[a-zA-Z0-9-]+$/,
];

// Routes publiques accessibles sans authentification
const publicRoutes = ["/login", "/register", "/"];

export async function middleware(req: NextRequest) {
    const { nextUrl } = req; // L'URL de la requête en cours
    const path = nextUrl.pathname; // Le chemin de la requête ex: `/ingredients`
    
    // Récupération du token JWT
    const token = await getToken({ req, secret: SECRET });

    const isLoggedIn = !!token; // Détermine si l'utilisateur est connecté avec un token valide
    console.log("TOKEN:", token); // Affiche le token dans la console pour le débogage
    console.log("isLoggedIn:", isLoggedIn); // Affiche si l'utilisateur est connecté ou non
    const userStatus = token?.status; // Récupère le statut de l'utilisateur s'il est connecté

    // Autoriser les routes publiques
    // Si l'utilisateur tente d'accéder à une route publique, autoriser l'accès
    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }

    // Vérification des routes protégées
    // Une route est considérée comme protégée si elle figure dans la liste des `protectedRoutes` 
    // ou si elle correspond à l'un des patterns dynamiques définis
    const isProtectedRoute =
        protectedRoutes.some((route) => path.startsWith(route)) || // Routes statiques protégées
        dynamicRoutePatterns.some((pattern) => pattern.test(path)); // Routes dynamiques protégées

    // Gestion des utilisateurs non approuvés
    // Redirige les utilisateurs connectés mais n'ayant pas le statut "APPROVED" vers la page `/login`
    if (isLoggedIn && userStatus !== "APPROVED") {
        const redirectUrl = new URL("/login", nextUrl.origin); // Redirection vers la page de login
        return NextResponse.redirect(redirectUrl); 
    }

    // Gestion des utilisateurs non connectés
    // Si une route est protégée, mais que l'utilisateur n'est pas connecté, redirige vers `/login` en conservant l'URL demandée
    // if (isProtectedRoute && !isLoggedIn) {
    //     const redirectUrl = new URL("/login", nextUrl.origin); // Redirection vers la page de login
    //     redirectUrl.searchParams.set("callbackUrl", encodeURIComponent(path)); // Ajoute l'URL demandée comme paramètre de callback
    //     return NextResponse.redirect(redirectUrl);
    // }

    console.log("TOKEN :", token);
    console.log("isLoggedIn :", isLoggedIn);
    console.log("Path accédé :", path);
    console.log("isProtectedRoute :", isProtectedRoute);
    console.log("userStatus :", userStatus);
    console.log("AUTH_SECRET :", SECRET); 
    console.log("NODE_ENV :", process.env.NODE_ENV);
    console.log("COOKIES PRESENT :", req.cookies);
    console.log("TOKEN GENERATED :", await getToken({ req, secret: process.env.AUTH_SECRET }));

    // Génération aléatoire d'un nonce
    // const nonce = crypto.randomUUID(); 

    // const cspOptions = `
    //     default-src 'self'; 
    //     script-src 'self' 'nonce-${nonce}'; 
    //     style-src 'self'; 
    //     img-src 'self' data:; 
    //     connect-src 'self'; 
    //     font-src 'self' data:;
    // `;

    // const ContentSecurityPolicy = isProduction ? cspOptions : "";

    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff"); // Empêche le navigateur de deviner le type MIME
    response.headers.set("X-Frame-Options", "DENY"); // Empêche l'intégration du site dans un iframe (protection contre le clickjacking)
    response.headers.set("Referrer-Policy", "no-referrer-when-downgrade"); // Politique de référent pour éviter de divulguer des informations sensibles ex: l'URL de la page précédente
    response.headers.set("X-XSS-Protection", "1; mode=block"); // Active la protection contre certaines attaques XSS dans les navigateurs compatibles
    // response.headers.set("Content-Security-Policy", ContentSecurityPolicy);

    return response;
}

export const config = {
    // Empêche d'appliquer le middleware sur les fichiers statiques, les requêtes API, les images ou tout fichier au format `.png`
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

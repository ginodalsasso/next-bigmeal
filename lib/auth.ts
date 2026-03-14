"server-only";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import { LoginConstraints } from "./constraints/forms_constraints";
import { getUserByEmail } from "./dal";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import rateLimit from "./security/rateLimit";
import { NextRequest } from "next/server";
import API_ROUTES from "./constants/api_routes";

const LIMIT = 5; // Nombre maximal de requêtes
const INTERVAL = 60 * 60 * 1000; // Intervalle en millisecondes (1 heure)

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { 
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // 1 jour
    },
    providers: [
        // Réglages de connexion avec email et mot de passe
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            // Fonction pour vérifier les identifiants
            authorize: async (credentials, req) => {
                try {
                    // Appliquer la limitation de débit
                    rateLimit(req as NextRequest, LIMIT, INTERVAL);

                    const { email, password } =
                        await LoginConstraints.parseAsync(credentials);

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) {
                        throw new Error("INVALID_CREDENTIALS");
                    }

                    if (!user.emailVerified) {
                        throw new Error("EMAIL_NOT_VERIFIED");
                    }

                    const response = await fetch(`${API_ROUTES.auth.verifyPassword}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            inputPassword: password,
                            hashedPassword: user.password,
                        }),
                    });
                    
                    const { isValid } = await response.json();
                    if (!isValid) {
                        throw new Error("Identifiants incorrects");
                    }

                    return {
                        ...user,
                        role: user.role ?? "USER", // Rôle par défaut
                        status: user.status ?? "PENDING", // Statut par défaut
                    }
                } catch (error) {
                    console.error("Authentication error:", error);
                    throw new Error((error as Error).message || "UNKNOWN_ERROR");
                    ;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Connexion initiale : on écrit les données dans le token
                token.id = user.id;
                token.role = user.role;
                token.status = user.status;
                token.statusCheckedAt = Date.now();
            } else if (token.id) {
                // Rafraîchissement : on re-vérifie le statut en DB toutes les 5 min
                const FIVE_MIN = 5 * 60 * 1000;
                const lastCheck = (token.statusCheckedAt as number) ?? 0;
                if (Date.now() - lastCheck > FIVE_MIN) {
                    const dbUser = await db.user.findUnique({
                        where: { id: token.id as string },
                        select: { role: true, status: true },
                    });
                    if (dbUser) {
                        token.role = dbUser.role;
                        token.status = dbUser.status;
                    }
                    token.statusCheckedAt = Date.now();
                }
            }
            return token;
        },

        // Ajout du rôle utilisateur à la session
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string; 
                session.user.status = token.status as string;
            }
            return session;
        },

        // Redirection après connexion
        async redirect({ url, baseUrl }) {
            // vérifiee si un callback est présent dans l'url pour rediriger sur la page demandée initialement
            const callbackUrl = new URL(url, baseUrl).searchParams.get("callbackUrl");
            // redirige vers la page d'accueil si pas de callback
            return callbackUrl ? decodeURIComponent(callbackUrl) : "/";
        },
    },
});

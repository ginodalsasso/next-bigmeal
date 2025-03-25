import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { LoginConstraints } from "./constraints/forms_constraints";
import { getUserByEmail } from "./dal";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import rateLimit from "./security/rateLimit";
import { NextRequest } from "next/server";
import API_ROUTES from "./constants/api_routes";

const prisma = new PrismaClient();

const LIMIT = 5; // Nombre maximal de requêtes
const INTERVAL = 60 * 60 * 1000; // Intervalle en millisecondes (1 heure)

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
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

                    if (user.status === "PENDING" || user.status === "REJECTED") {
                        throw new Error("ACCOUNT_NOT_ACTIVE");
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
        // Ajout du rôle utilisateur au token JWT
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        // Ajout du rôle utilisateur à la session
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string; 
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

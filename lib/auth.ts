"server-only";

import NextAuth, { CredentialsSignin } from "next-auth";
import type { Role } from "@/lib/types/schemas_interfaces";
import type { Status } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import { LoginConstraints } from "./constraints/forms_constraints";
import { getUserByEmail } from "./dal";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import rateLimit from "./security/rateLimit";
import { verifyPassword } from "./security/verifyPassword";
import { NextRequest } from "next/server";

const LIMIT = 5; // Nombre maximal de requêtes
const INTERVAL = 60 * 60 * 1000; // Intervalle en millisecondes (1 heure)

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30,  // 30 jours depuis la dernière activité
        updateAge: 60 * 60 * 24,    // renouvelle le cookie si la session a +24h
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
                    rateLimit(req as NextRequest, LIMIT, INTERVAL);

                    const { email, password } =
                        await LoginConstraints.parseAsync(credentials);

                    const user = await getUserByEmail(email);

                    if (!user || !user.password || !user.emailVerified) {
                        const err = new CredentialsSignin();
                        err.code = "INVALID_CREDENTIALS";
                        throw err;
                    }

                    const isValid = await verifyPassword(password, user.password);
                    if (!isValid) {
                        const err = new CredentialsSignin();
                        err.code = "INVALID_CREDENTIALS";
                        throw err;
                    }

                    return {
                        ...user,
                        role: (user.role ?? "USER") as Role,
                        status: (user.status ?? "PENDING") as Status,
                    };
                } catch (error) {
                    if (error instanceof CredentialsSignin) throw error;

                    // Erreur inattendue (DB, réseau, etc.)
                    console.error("Authentication error:", error);
                    const err = new CredentialsSignin();
                    err.code = "UNKNOWN_ERROR";
                    throw err;
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
                session.user.role = token.role as Role;
                session.user.status = token.status as Status;
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            const parsed = new URL(url, baseUrl);
            const callbackUrl = parsed.searchParams.get("callbackUrl");

            if (callbackUrl) {
                const decoded = decodeURIComponent(callbackUrl);
                // N'autoriser que les chemins relatifs pour éviter les redirections externes
                if (decoded.startsWith("/") && !decoded.startsWith("//")) {
                    return decoded;
                }
            }

            // Redirection interne sûre (ex: page d'origine avant auth)
            if (url.startsWith(baseUrl + "/") || url === baseUrl) return url;

            return "/";
        },
    },
});

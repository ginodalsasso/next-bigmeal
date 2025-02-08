import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { loginConstraints } from "./constraints/forms_constraints";
import { compare } from "bcryptjs";
import { getUserByEmail } from "./dal";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

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
            authorize: async (credentials) => {
                try {
                    const { email, password } =
                        await loginConstraints.parseAsync(credentials);

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) {
                        throw new Error("Invalid credentials");
                    }

                    const isValid = await compare(password, user.password);
                    if (!isValid) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        ...user,
                        role: user.role ?? "user", // Rôle par défaut
                    }
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
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
                token.role = user.role;
            }
            return token;
        },

        // Ajout du rôle utilisateur à la session
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string; 
            }
            return session;
        },

        async redirect() {
            return "/dashboard";
        },
    },
});

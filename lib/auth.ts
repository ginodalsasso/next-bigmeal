// import hash from "bcrypt";
// import { getUserByUsername, getUserRole } from "./dal";
// import { encrypt } from "./session";

// // Fonction pour connecter un utilisateur
// export async function signIn(username: string, password: string) {
//     const user = await getUserByUsername(username);

//     if (!user) {
//         throw new Error("Invalid username or password.");
//     }

//     const isPasswordValid = await hash.compare(password, user.password);

//     if (!isPasswordValid) {
//         throw new Error("Invalid username or password.");
//     }

//     // Créer un token JWT
//     const tokenDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours
//     const token = await encrypt({ userId: user.id, expiresAt: tokenDate });

//     return { token, user }; // Retourne le token et l'utilisateur
// }

// // Fonction pour vérifier si l'utilisateur connecté est admin
// export const verifyAdmin = async () => {
//     const user = await getUserRole();
//     if (!user || user.role !== "ADMIN") {
//         throw new Error("Unauthorized: Admin access required");
//     }
//     return user;
// };

// // Fonction pour vérifier si l'utilisateur connecté est un utilisateur ou un admin
// export const verifyUser = async () => {
//     const user = await getUserRole();
//     //
//     if (!user || (user.role !== "USER" && user.role !== "ADMIN")) {
//         throw new Error("Unauthorized: User access required");
//     }
//     return user;
// }

import NextAuth from "next-auth";
import authConfig from "./auth.config";
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
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
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

                    return user;
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
});

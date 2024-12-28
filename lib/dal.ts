import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import { db } from "./db";

// Vérification de la session utilisateur
export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value; // Récupération du cookie "session"
    if (!cookie) {
        console.error("Cookie de session introuvable");
        return null;
    }
    try {
        const session = await decrypt(cookie); // Décryptage du token JWT
        if (!session?.userId) {
            console.error("Session invalide");
            return null;
        }
        return { isAuth: true, userId: session.userId as string };
    } catch (error) {
        console.error("Erreur lors de la vérification de la session:", error);
        return null;
    }
});


export const getUserByUsername = (username: string) => {
    try{
        return db.user.findFirst({
            where: { username },
        });
    } catch(error) {
        console.error("Failed to fetch user", error);
        return null;
    }
}   


export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.userId, // Filtrer par l'ID utilisateur
            },
            select: {
                id: true, // Retourner seulement les colonnes nécessaires
                username: true,
                isAdmin: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }
        
        return user;
    } catch (error) {
        console.error("Failed to fetch user", error);
        return null;
    }
});

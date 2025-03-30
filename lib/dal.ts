"server-only";

import { cache } from "react";
import { db } from "./db";
import { getUserSession } from "./security/getSession";


export const getUserByEmail = async (email: string) => {
    return db.user.findUnique({
        where: { email },
    });
};


export const getUser = cache(async () => {
    const session = await getUserSession();
    if (!session) {
        throw new Error("Unauthorized: You must be logged in");
    };
    
    try {
        const user = await db.user.findUnique({
            where: {
                id: session.session?.user.id,
            },
            select: {
                id: true, // Retourner seulement les colonnes nécessaires
                email: true,
                role: true,
                status: true,
                shoppingList: {
                    where: {
                        isExpired: false, // Filtrer les listes de courses non expirées
                    },
                },
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
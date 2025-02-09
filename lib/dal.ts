import "server-only";

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
    console.log("session", session);
    try {
        const user = await db.user.findUnique({
            where: {
                id: session.session?.user.id,
            },
            select: {
                id: true, // Retourner seulement les colonnes nécessaires
                email: true,
                role: true,
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


// // Récupérer le panier de l'utilisateur
// export const getUserCart = cache(async () => {

//     const session = await verifySession();
//     if (!session) return null;

//     try {
//         // Grouper les articles du panier par liste de courses et calculer la somme des quantités
//         const groupedItems = await db.shoppingListItem.groupBy({
//             where: {
//                 shoppingList: {
//                     userId: session.userId,
//                     isExpired: false,
//                 },
//             },
//             by: ["shoppingListId"],
//             _count : true,
//             // _sum: { id : true, quantity: true },
//         });

//         // Extraire la quantité totale si des articles existent
//         const totalCartQuantity = groupedItems.length > 0
//             ? groupedItems[0]._count || null // groupedItems[0] contient la première liste de courses
//             : null;

//         return totalCartQuantity;

//     } catch (error) {
//         console.error("Failed to fetch cart", error);
//         return null;
//     }
// });

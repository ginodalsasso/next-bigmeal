// import "server-only";

// import { cookies } from "next/headers";
// import { decrypt } from "./session";
// import { cache } from "react";
import { db } from "./db";


export const getUserByEmail = async (email: string) => {
    return db.user.findUnique({
        where: { email },
    });
};

// // Vérification de la session utilisateur
// export const verifySession = cache(async () => {
//     const cookie = (await cookies()).get("session")?.value; // Récupération du cookie "session"
//     if (!cookie) {
//         console.error("Cookie de session introuvable");
//         return null;
//     }
//     try {
//         const session = await decrypt(cookie); // Décryptage du token JWT
//         if (!session?.userId) {
//             console.error("Session invalide");
//             return null;
//         }
//         return { isAuth: true, userId: session.userId as string };
//     } catch (error) {
//         console.error("Erreur lors de la vérification de la session:", error);
//         return null;
//     }
// });

// export const getUserByUsername = (username: string) => {
//     try{
//         return db.user.findFirst({
//             where: { username },
//         });
//     } catch(error) {
//         console.error("Failed to fetch user", error);
//         return null;
//     }
// }


// export const getUser = cache(async () => {
//     const session = await verifySession();
//     if (!session) return null;

//     try {
//         const user = await db.user.findUnique({
//             where: {
//                 id: session.userId, // Filtrer par l'ID utilisateur
//             },
//             select: {
//                 id: true, // Retourner seulement les colonnes nécessaires
//                 username: true,
//                 role: true,
//                 shoppingList: {
//                     where: {
//                         isExpired: false, // Filtrer les listes de courses non expirées
//                     },
//                 },
//             },
//         });

//         if (!user) {
//             throw new Error("User not found");
//         }

//         return user;
//     } catch (error) {
//         console.error("Failed to fetch user", error);
//         return null;
//     }
// });

// export const getUserRole = cache(async () => {
//     const session = await verifySession();
//     if (!session) return null;

//     try {
//         const userRole = await db.user.findUnique({
//             where: {
//                 id: session.userId, // Filtrer par l'ID utilisateur
//             },
//             select: {
//                 role: true,
//             },
//         });

//         if (!userRole) {
//             throw new Error("User not found");
//         }

//         return userRole;
//     } catch (error) {
//         console.error("Failed to fetch user role", error);
//         return null;
//     }
// });

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

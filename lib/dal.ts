import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { cache } from "react";

// Vérification de la session utilisateur
export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value; // Récupération du cookie "session"
    if (!cookie) {
        redirect("/login");
    }

    try {
        const session = await decrypt(cookie); // Décryptage du token JWT
        if (!session?.userId) {
            redirect("/login");
        }
        console.log("Session vérifiée :", session);
        return { isAuth: true, userId: session.userId };
    } catch (error) {
        console.error("Erreur lors de la vérification de la session:", error);
        redirect("/login");
    }
});


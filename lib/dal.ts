import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { cache } from "react";

// Vérification de la session utilisateur
export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value; // Récupération du cookie "session"
    const session = await decrypt(cookie); // Décryptage du token JWT

    if (!session?.userId) {
        redirect("/login");
    }

    return { isAuth: true, userId: session.userId };
});

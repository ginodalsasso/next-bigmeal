'server-only';

import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function verifyCSRFToken(req: NextRequest) {
    const csrfTokenHeader = req.headers.get("X-CSRF-Token"); // Token envoyé par le client
    const cookieStore = await cookies();
    // Récupération du cookie sécurisé
    const getCsrfTokenName = process.env.NODE_ENV === 'production' ? '__Host-authjs.csrf-token' : 'authjs.csrf-token';
    const csrfTokenCookie = cookieStore.get(getCsrfTokenName)?.value?.split("|")[0]; // Token stocké dans le cookie sécurisé

    if (!csrfTokenHeader || !csrfTokenCookie) {
        return false;
    }

    return csrfTokenHeader === csrfTokenCookie;
}


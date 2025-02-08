'server-only';

import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function verifyCSRFToken(req: NextRequest) {
    const csrfTokenHeader = req.headers.get("X-CSRF-Token"); // Token envoyé par le client
    const cookieStore = await cookies();
    const csrfTokenCookie = cookieStore.get("authjs.csrf-token")?.value?.split("|")[0]; // Token stocké dans le cookie sécurisé
    console.table({ csrfTokenHeader, csrfTokenCookie });

    if (!csrfTokenHeader || !csrfTokenCookie) {
        return false;
    }

    return csrfTokenHeader === csrfTokenCookie;
}


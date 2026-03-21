'server-only';

import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";


export async function verifyCSRFToken(req: NextRequest) {
    const csrfTokenHeader = req.headers.get("X-CSRF-Token");
    const cookieStore = await cookies();
    const getCsrfTokenName = process.env.NODE_ENV === 'production' ? '__Host-authjs.csrf-token' : 'authjs.csrf-token';
    const csrfTokenCookie = cookieStore.get(getCsrfTokenName)?.value?.split("|")[0];

    if (!csrfTokenHeader || !csrfTokenCookie) {
        return false;
    }

    // Comparaison en temps constant pour éviter les timing attacks
    try {
        const a = Buffer.from(csrfTokenHeader);
        const b = Buffer.from(csrfTokenCookie);
        return a.length === b.length && timingSafeEqual(a, b);
    } catch {
        return false;
    }
}


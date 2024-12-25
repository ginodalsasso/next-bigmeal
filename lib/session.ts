import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { JWTPayload } from "jose";

interface SessionPayload extends JWTPayload {
    userId: string;
    expiresAt: Date;
    // role?: string;
}  

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey); // Encodage de la clé secrète en UTF-8

// encrypt() permet de créer un token JWT
export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
}

// decrypt() permet de vérifier un token JWT
export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("Failed to verify session", error);
    }
}

// Création de la session utilisateur
export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours
    const session = await encrypt({ userId, expiresAt }); // Création du token JWT
    const cookieStore = await cookies(); // Récupération du cookieStore

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

// Mise à jour de la session utilisateur
export async function updateSession() {
    // Récupération du cookie "session"
    const session = (await cookies()).get("session")?.value; 
    const payload = await decrypt(session); // Décryptage du token JWT

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "lax",
        path: "/",
    });
}

// Suppression de la session utilisateur
export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

// LOGOUT FUNCTION A PLACER DANS LE BON REPERTOIRE
// import { cookies } from 'next/headers'
// import { deleteSession } from '@/app/lib/session'
 
// export async function logout() {
//   deleteSession()
//   redirect('/login')
// }
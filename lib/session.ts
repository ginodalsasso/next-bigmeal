import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { JWTPayload } from "jose";

interface SessionPayload extends JWTPayload {
    userId: string;
    expiresAt: Date;
    // role?: string;
}  

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not defined in environment variables");
}
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey); // Encodage de la clé secrète en UTF-8

// C'est ici que je pourrais proposer à l'utilisateur de se souvenir de son compte et dans le cas contraire suprrimer la date d'expiration
const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // Date d'expiration du token JWT

// encrypt() permet de créer un token JWT
export async function encrypt(payload: SessionPayload) {

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);

    return token;
}

// decrypt() permet de vérifier un token JWT
export async function decrypt(session: string | undefined = "") {
    try {
        const encodedKey = new TextEncoder().encode(secretKey);
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        
        return payload;
    } catch (error) {
        console.error("Erreur lors de la vérification du JWT:", error);
        throw error;
    }
}

// Création de la session utilisateur
export async function createSession(userId: string) {
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

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

// Suppression de la session utilisateur
export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

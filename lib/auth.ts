import hash from "bcrypt";
import { getUserByUsername } from "./utils";
import { encrypt } from "./session";

// Fonction pour connecter un utilisateur
export async function signIn(username: string, password: string) {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error("Invalid username or password.");
    }

    const isPasswordValid = await hash.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid username or password.");
    }

    // Créer un token JWT
    const tokenDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours
    const token = await encrypt({ userId: user.id, expiresAt: tokenDate });

    return { token, user }; // Retourne le token et l'utilisateur
}

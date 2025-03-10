import { verify } from "argon2";

export async function verifyPassword ( inputPassword: string,  hashedPassword: string ) {
    try {
        return await verify(hashedPassword, inputPassword);
    } catch {
        console.error("Invalid credentials");
        return false;
    }
};
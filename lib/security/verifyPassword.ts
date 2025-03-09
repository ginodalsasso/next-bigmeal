import bcrypt from "bcryptjs";

export async function verifyPassword (inputPassword: string, hashedPassword: string) {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch {
        console.error("Invalid credentials");
        return false;
    }
};
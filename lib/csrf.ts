import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export function generateCSRFToken() {
    return randomBytes(32).toString("hex");
}

export async function setCSRFToken() {
    const csrfToken = generateCSRFToken();
    const cookieStore = await cookies();
    cookieStore.set("csrfToken", csrfToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });
    return csrfToken;
}

export async function verifyCSRFToken(csrfToken: string | null) {
    const cookieStore = await cookies();
    const storedToken = cookieStore.get("csrfToken")?.value;
    if (!storedToken || storedToken !== csrfToken) {
        return false;
    }
}

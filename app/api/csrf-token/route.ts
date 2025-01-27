import { setCSRFToken } from "@/lib/csrf";
import { NextResponse } from "next/server";

export async function GET() {
    const csrfToken = await setCSRFToken(); // Génère et stocke un token dans un cookie
    if (!csrfToken) {
        return NextResponse.json({ error: "Failed to generate CSRF token." }, { status: 500 });
    }
    return NextResponse.json({ csrfToken });
}
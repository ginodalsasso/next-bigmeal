import { setCSRFToken } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if (req.method !== "GET") {
        const csrfToken = await setCSRFToken(); // Génère et stocke un token dans un cookie
        if (!csrfToken) {
            return NextResponse.json({ error: "Failed to generate CSRF token." }, { status: 500 });
        }
        return NextResponse.json({ csrfToken });
    } 
    // continue;
    return NextResponse.json( {status: 200});
}
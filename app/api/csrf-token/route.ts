import { setCSRFToken } from "@/lib/csrf";
import { NextResponse } from "next/server";

export async function GET() {
    const csrfToken = setCSRFToken(); // Génère et stocke un token dans un cookie
    return NextResponse.json({ csrfToken }); // Retourne le token en JSON
}
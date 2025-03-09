import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/security/verifyPassword";

export async function POST(req: Request) {
    try {
        const { inputPassword, hashedPassword } = await req.json();

        if (!inputPassword || !hashedPassword) {
            return NextResponse.json({ message: "Les champs sont requis" }, { status: 400 });
        }

        const isValid = await verifyPassword(inputPassword, hashedPassword);

        return NextResponse.json({ isValid }, { status: 200 });
    } catch (error) {
        console.error("[AUTH_ERROR]", error);
        return NextResponse.json(
            { message: "Erreur interne du serveur" }, 
            { status: 500 }
        );
    }
}

import { signIn } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Parse le corps de la requête
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required." },
                { status: 400 }
            );
        }
        const { token, user } = await signIn(username, password);

        
        await createSession(user.id); // Créer une session utilisateur

        return NextResponse.json({ success: true, user, token });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}


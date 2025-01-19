import { signIn } from "@/lib/auth";
import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validation = RegisterConstraints.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { username, password } = validation.data;

        // Authentifier l'utilisateur
        const { token, user } = await signIn(username, password);

        // Créer une session utilisateur
        await createSession(user.id);
        
        return NextResponse.json({ 
            success: true, 
            user, 
            token 
        });
        
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

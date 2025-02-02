import { signIn } from "@/lib/auth";
import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import rateLimit from "@/lib/rateLimit";

// Initialisation du rate limit : 5 requêtes par minute
const limiter = rateLimit(5, 60000); 

export async function POST(req: NextRequest) {
    try {
        // ✅ Appliquer la limitation de requêtes
        const res = NextResponse.next();
        await new Promise((resolve, reject) => {
            limiter(req, res, (error?: Error) => {
                if (error) {
                    reject(error); // Rejette la promesse en cas d'erreur
                } else {
                    resolve(true); // Résout la promesse si tout va bien
                }
            });
        });

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

        // Gestion des erreurs de rate limit (HTTP 429)
        if (error instanceof Error && error.message === "Too Many Requests") {
            return NextResponse.json({ error: "Trop de tentatives, réessayez plus tard." }, { status: 429 });
        }

        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

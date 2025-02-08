import { loginConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validation avec Zod
        const validation = loginConstraints.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await db.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            return NextResponse.json(
                { message: "Cet email est déjà utilisé." },
                { status: 409 }
            );
        }

        // Hasher le mot de passe et créer l'utilisateur
        const hashedPassword = await hash(password, 12);
        const user = await db.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("[REGISTER]", error);
        return NextResponse.json(
            { message: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}
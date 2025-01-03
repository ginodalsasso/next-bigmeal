import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
// import { createSession } from "@/lib/session";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validation avec Zod
        const validation = RegisterConstraints.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { username, password } = validation.data;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await db.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            return NextResponse.json(
                { message: "Ce pseudo est déjà utilisé." },
                { status: 409 }
            );
        }

        // Hasher le mot de passe et créer l'utilisateur
        const hashedPassword = await hash(password, 10);
        const user = await db.user.create({
            data: {
                username,
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
import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import rateLimit from "@/lib/security/rateLimit";
import { sendEmail } from "@/lib/services/email_service";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { date } from "zod";


const LIMIT = 5; // Nombre maximal de requêtes
const INTERVAL = 60 * 60 * 1000; // Intervalle en millisecondes (1 heure)

export async function POST(req: NextRequest) {
    // Appliquer la limitation de débit
    rateLimit(req, LIMIT, INTERVAL);

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

        if (!user.email) {
            return NextResponse.json(
                { message: "Erreur lors de la création de l'utilisateur." },
                { status: 500 }
            );
        }

        const secret = process.env.JWT_SECRET || 'default_secret';
        const generatedToken = jwt.sign(
            { email: user.email },
            secret
        );
        const resetLink = `${process.env.API_URL}/register/confirm-email/${generatedToken}`;


        const emailResult = await sendEmail(
            user.email,
            "Confirmation d'inscription", // Sujet de l'email
            `Veuillez confirmer votre inscription en cliquant sur ce lien: ${resetLink}`, // Corps de l'email
            "Un email de confirmation vous a été envoyé." // Message de succès
        );

        if (emailResult.status === 200) {
            return NextResponse.json({ message: emailResult.message }, { status: 200 });
        } else {
            return NextResponse.json({ message: emailResult.message }, { status: emailResult.status });
        }

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("[REGISTER_ERROR]", error);
        return NextResponse.json(
            { message: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}
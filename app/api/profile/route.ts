import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";
import bcrypt from "bcryptjs";
import { verifyCSRFToken } from "@/lib/security/csrf";

export async function GET() {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;

        // Vérification que l'utilisateur connecté correspond au username demandé
        const user = await db.user.findUnique({
            where: { email: session.user.email },
            include: {
                shoppingList: {
                    include: {
                        items: {
                            include: {
                                ingredient: true,
                            },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }       

        const body = await req.json();
        const { password, newPassword } = body;

        // Vérification que l'utilisateur connecté correspond au username demandé
        const user = await db.user.findUnique({
            where: { email: session.user.email },
        });
        if (!user) {
            return new Response(
                JSON.stringify({
                    message: "Utilisateur introuvable",
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password || "");
        if (!passwordMatch) {
            return new Response(
                JSON.stringify({
                    message: "Mot de passe incorrect",
                }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Mise à jour du mot de passe
        await db.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword },
        });

        return new Response(
            JSON.stringify({
                message: "Mot de passe réinitialisé avec succès",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import { UpdateUserStatusConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/security/getSession";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { error } = await getAdminSession();
        if (error) return error;

        // Récupération de tous les utilisateurs
        const users = await db.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });   

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error("[FETCH_USERS_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function PATCH(request: Request) {
    try {
        const { error } = await getAdminSession();
        if (error) return error;
        
        const { userId, status } = await request.json();

        if (!userId || !status) {
            return new Response(JSON.stringify({ 
                message: 'Erreur lors de la mise à jour du statut de l\'utilisateur' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const validationResult = UpdateUserStatusConstraints.safeParse({ userId, status });

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Mise à jour du statut de l'utilisateur
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { status },
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error("[UPDATE_USER_STATUS_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
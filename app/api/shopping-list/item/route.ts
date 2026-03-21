import { idConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getUserSession } from "@/lib/security/getSession";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH (req: NextRequest) {
    try {
        const { error, session } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();
        const { id, quantity } = body;

        const validationResult = idConstraints.safeParse({ id: body.id });
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Vérifie que l'item appartient à une liste de l'utilisateur courant
        const item = await db.shoppingListItem.findFirst({
            where: { id, shoppingList: { userId: session!.user.id } },
        });
        if (!item) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

        await db.shoppingListItem.update({
            where: { id },
            data: { quantity },
        });
        return NextResponse.json({ message: "Article mis à jour" }, { status: 200 });

    }
    catch (error) {
        console.error("[PATCH_ITEM_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function DELETE (req: NextRequest) {
    try {
        const { error, session } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();

        const validationResult = idConstraints.safeParse({ id: body.id });
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Vérifie que l'item appartient à une liste de l'utilisateur courant
        const item = await db.shoppingListItem.findFirst({
            where: { id: body.id, shoppingList: { userId: session!.user.id } },
        });
        if (!item) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

        await db.shoppingListItem.delete({ where: { id: body.id } });
        return NextResponse.json({ message: "Article supprimé" }, { status: 200 });

    } catch (error) {
        console.error("[DELETE_ITEM_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

import { idConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getUserSession } from "@/lib/security/getSession";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE (req: NextRequest) {
    try {
        const { error } = await getUserSession();
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


        await db.shoppingListItem.delete({ where: { id: body.id } });
        return NextResponse.json({ message: "Article supprimé" }, {status: 200});

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

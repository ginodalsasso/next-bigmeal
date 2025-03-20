import { newPreparationConstraints, updatePreparationConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }
        
            
        const body = await req.json();
        const { mealId, prepTime, cookTime } = body;
        
        const validationResult = newPreparationConstraints.safeParse(body);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }
        
        // Créer la préparation
        const newPreparation = await db.preparation.create({
            data: {
                mealId,
                prepTime,
                cookTime,
            },
        });
        return NextResponse.json(newPreparation, {status: 201});

    } catch (error) {
        console.error("[CREATE_PREPARATION_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }
        
        const body = await req.json();
        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ error: "Le corps de la requête est vide." }, { status: 400 });
        }
        const { id, prepTime, cookTime } = body;

        
        const validationResult = updatePreparationConstraints.safeParse(body);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Mettre à jour la préparation
        const updatedPreparation = await db.preparation.update({
            where: { id },
            data: {
                prepTime,
                cookTime,
            },
        });

        return NextResponse.json(updatedPreparation, {status: 200});

    } catch (error) {
        console.error("[UPDATE_PREPARATION_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }
        
        const { id } = await req.json();
        
        if (!id) {
            return NextResponse.json({ error: "L'id de la préparation est invalide." }, { status: 400 });
        }
        
        // Supprimer la préparation
        await db.preparation.delete({ where: { id } });

        return NextResponse.json({ message: "La préparation a été supprimée." }, { status: 200 });

    } catch (error) {
        console.error("[DELETE_PREPARATION_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
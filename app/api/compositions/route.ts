import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { CompositionFormType } from "@/lib/types/forms_interfaces";
import { idConstraints, newCompositionConstraints, updateCompositionConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getAdminSession, getUserSession } from "@/lib/security/getSession";


export async function POST(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }
            
        const body: CompositionFormType[] = await req.json();

        if (!Array.isArray(body)) {
            return NextResponse.json(
                { error: "Les données doivent être un tableau." }, 
                { status: 400 }
            );
        }

        if (body.length > 20) {
            return new NextResponse(
                JSON.stringify({ error: "Vous ne pouvez pas ajouter plus de 20 compositions à la fois." }), {
                status: 400,
            });
        }

        const validationResult = newCompositionConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Compter les compositions existantes pour vérifier si un ingrédient est déjà présent
        const existingCompositions = await db.composition.count({
            where: {
                mealId: body[0].mealId,
                ingredientId: { in: body.map(composition => composition.ingredientId) } // Vérifie si un ingrédient est déjà dans ce repas
            }
        });

        // Si un ou plusieurs ingrédients sont déjà présents, retourner une erreur
        if (existingCompositions > 0) {
            return new NextResponse(
                JSON.stringify({ error: "Un ou plusieurs ingrédients sont déjà présents dans ce repas." }), {
                status: 400,
            });
        }

        // Créer les compositions en base de données (s'il y en a plusieurs)
        await db.composition.createMany({
            data: body.map((comp) => ({
                ingredientId: comp.ingredientId,
                mealId: comp.mealId,
                quantity: comp.quantity,
                unit: comp.unit,
            })),
        });

        // Récupérer les compositions insérées pour les afficher
        const insertedCompositions = await db.composition.findMany({
            where: {
                mealId: body[0].mealId, // Filtrer sur le mealId
            },
            include: {
                ingredient: true, // Inclure les détails des ingrédients
            },
        });

        return NextResponse.json(insertedCompositions, { status: 201 });
    } catch (error) {
        console.error("[CREATE_COMPOSITIONS_ERROR]", error);
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
        const { error } = await getAdminSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }
        
        const body = await req.json();

        const validationResult = updateCompositionConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const updatedComposition = await db.composition.update({
            where: { id: body.id },
            data: {
                quantity: body.quantity,
                unit: body.unit,
            },
        });

        return NextResponse.json(updatedComposition, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_COMPOSITION_ERROR]", error);
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
        const { error } = await getAdminSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }
        
        const body = await req.json();

        const validationResult = idConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { id } = validationResult.data;
        await db.composition.delete({ where: { id } });

        return NextResponse.json({ message: "Composition supprimée" }, { status: 200 });
    } catch (error) {
        console.error("[DELETE_COMPOSITION_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { CompositionFormType } from "@/lib/types/forms_interfaces";
import { idConstraints, newCompositionConstraints, updateCompositionConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/csrf";
import { verifyAdmin } from "@/lib/auth";


export async function POST(req: NextRequest) {
    try {
        const csrfToken = req.headers.get("x-csrf-token");
        const csrfTokenVerified = await verifyCSRFToken(csrfToken);
        if (csrfTokenVerified === false) {
            return new NextResponse("CSRF Token is missing or invalid", {status: 403});
        }
            
        const body: CompositionFormType[] = await req.json();

        if (!Array.isArray(body)) {
            return NextResponse.json(
                { error: "Les données doivent être un tableau." }, 
                { status: 400 }
            );
        }

        const validationResult = newCompositionConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Créer les compositions en base de données
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
        return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const csrfToken = req.headers.get("x-csrf-token");
        const csrfTokenVerified = await verifyCSRFToken(csrfToken);
        if (csrfTokenVerified === false) {
            return new NextResponse("CSRF Token is missing or invalid", {status: 403});
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
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const csrfToken = req.headers.get("x-csrf-token");
        const csrfTokenVerified = await verifyCSRFToken(csrfToken);
        if (csrfTokenVerified === false) {
            return new NextResponse("CSRF Token is missing or invalid", {status: 403});
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
        return new NextResponse("Internal Error", { status: 500 });
    }
}

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { CompositionFormType } from "@/lib/types/forms_interfaces";
import { idConstraints } from "@/lib/constraints/forms_constraints";

export async function POST(req: NextRequest) {
    try {
        const body: CompositionFormType[] = await req.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: "Les données doivent être un tableau." }, { status: 400 });
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

export async function DELETE(req: NextRequest) {
    try {
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

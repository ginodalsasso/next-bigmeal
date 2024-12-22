import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { CompositionFormType } from "@/lib/types/forms_interfaces";

export async function POST(req: NextRequest){
    try {
        const body: CompositionFormType[] = await req.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: "Les données doivent être un tableau." }, { status: 400 });
        }

        // Créer les compositions en base de données
        await db.composition.createMany({ // const createdCompositions = 
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

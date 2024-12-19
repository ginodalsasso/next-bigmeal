// import { db } from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";


// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         console.log("[CREATE_COMPOSITION_BODY]", body);
//         const { ingredientId, mealId, quantity, unit } = body;

//         const newComposition = await db.composition.create({
//             data: {
//                 ingredientId,
//                 mealId,
//                 quantity,
//                 unit,
//             },
//         });

//         return NextResponse.json(newComposition, {status: 201});

//     } catch (error) {
//         console.error("[CREATE_COMPOSITION_ERROR]", error);
//         return new NextResponse("Internal Error", {status: 500 });
//     }
// }


import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { CompositionFormType } from "@/lib/types/forms_interfaces";

export async function POST(req: NextRequest) {
    try {
        const body: CompositionFormType[] = await req.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: "Les données doivent être un tableau." }, { status: 400 });
        }

        // Créer les compositions
        const createdCompositions = await db.composition.createMany({
            data: body.map((comp) => ({
                ingredientId: comp.ingredientId,
                mealId: comp.mealId,
                quantity: comp.quantity,
                unit: comp.unit,
            })),
        });

        // Récupérer les compositions insérées
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

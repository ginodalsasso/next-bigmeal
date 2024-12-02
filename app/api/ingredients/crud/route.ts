import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { idConstraints } from "@/lib/types/forms_constraints";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, season, categoryIngredientId } = body;

        // Créer l'ingrédient
        const newIngredient = await db.ingredient.create({
            data: {
                name,
                season,
                categoryIngredientId,
            },
        });

        return NextResponse.json(newIngredient, {status: 201});
    } catch (error) {
        console.error("[CREATE_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}

export async function PUT(req: NextRequest) {

    try {
        const body = await req.json();
        console.log(body);

        // // Valider et nettoyer les données
        // const validationResult = categoriesConstraints.extend({
        //     id: z.string(),
        // }).safeParse(body);

        // if (!validationResult.success) {
        //     return NextResponse.json(
        //         { error: validationResult.error.format() },
        //         { status: 400 }
        //     );
        // }

        // const { id, name } = validationResult.data; 
        const { id, name, categoryIngredientId } = body; 

        const updatedIngredient = await db.ingredient.update({
            where: { id },
            data: { 
                name,
                categoryIngredientId,
            },
            include: { categoryIngredient: true }
        });

        return NextResponse.json(updatedIngredient, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}

export async function DELETE (req: NextRequest) {
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
        await db.ingredient.delete({ where: { id } });

        return NextResponse.json({ message: "Ingredient supprimé" }, {status: 200});
    } catch (error) {
        console.error("[DELETE_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}
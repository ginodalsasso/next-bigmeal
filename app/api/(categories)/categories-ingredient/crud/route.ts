import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name } = body;

        // Créer l'ingrédient
        const newCategoryIngredient = await db.categoryIngredient.create({
            data: {
                name,
            },
        });

        return NextResponse.json(newCategoryIngredient, {status: 201});
    } catch (error) {
        console.error("[CREATE_CATEGORY_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}

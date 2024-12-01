import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";


type Context  = {
    params: Promise<{
        ingredientId: string
    }>
}
    export async function GET(req: NextRequest, context: Context  ) {

    const params = await context.params

    try {
        const ingredient = await db.ingredient.findUnique({
            where: {
                id: params.ingredientId,
            },
            include: {
                categoryIngredient: true,
                compositions: {
                    include: {
                        meal: true,
                    },
                },
            },
        });

        if (!ingredient) {
            return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
        }

        return NextResponse.json(ingredient);
    } catch (error) {
        console.error("Error fetching ingredient:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

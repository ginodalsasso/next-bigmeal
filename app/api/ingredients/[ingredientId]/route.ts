import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest, context: { params: { ingredientId: string } }) {
    const { ingredientId } = await context.params;
    try {
        const ingredient = await db.ingredient.findUnique({
            where: {
                id: ingredientId,
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
        console.log("[INGREDIENT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

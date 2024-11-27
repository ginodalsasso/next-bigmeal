import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { ingredientId: string } }) {
    const { ingredientId } = params;

    try {
        const ingredient = await db.ingredient.findUnique({
            where: {
                id: ingredientId
            },
            include: {
                categoryIngredient: true
            }
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

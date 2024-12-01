import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type Params = {
        ingredientId: string;
};

export async function GET(req: NextRequest, context: { params: Params }) {
    // const { ingredientId } = params;

    // if (!ingredientId) {
    //     return NextResponse.json({ error: "Ingredient ID is required" }, { status: 400 });
    // }

    try {
        const ingredientId = context.params.ingredientId;
        const ingredient = await db.ingredient.findUnique({
            where: { id: ingredientId },
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

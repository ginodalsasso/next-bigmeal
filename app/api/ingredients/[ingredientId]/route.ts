import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { ingredientId: string } } // Use destructuring here for correct typing
) {
    const { ingredientId } = params;

    if (!ingredientId) {
        return NextResponse.json({ error: "Ingredient ID is required" }, { status: 400 });
    }

    try {
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

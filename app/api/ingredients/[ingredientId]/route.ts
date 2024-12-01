import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// export async function GET(req: NextRequest, context: { params: { ingredientId: string } }) {
    export async function GET(req: NextRequest, { params }: { params: { ingredientId: string } }) {

    // const { ingredientId } = context.params; 
    const { ingredientId } = params;

    console.log("Fetching ingredient with ID:", ingredientId); // Debugging

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
        console.error("Error fetching ingredient:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

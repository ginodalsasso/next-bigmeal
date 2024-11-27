import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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

        return NextResponse.json(newIngredient, {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("[CREATE_INGREDIENT_ERROR]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}

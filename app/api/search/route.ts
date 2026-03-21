import { searchConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) return NextResponse.json({ meals: [], ingredients: [] });

    const validatedQuery = searchConstraints.safeParse({ query });

    if (!validatedQuery.success) {
        return NextResponse.json({
            message: validatedQuery.error.errors[0].message
        }, { status: 400 });
    }

    try {
        const [meals, ingredients] = await Promise.all([
            db.meal.findMany({
                take: 10,
                where: { name: { contains: query, mode: "insensitive" } },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    categoryMealId: true,
                    categoryMeal: { select: { id: true, name: true } },
                }
            }),
            db.ingredient.findMany({
                take: 10,
                where: { name: { contains: query, mode: "insensitive" } },
                select: {
                    id: true,
                    name: true,
                    season: true,
                    categoryIngredientId: true,
                    categoryIngredient: { select: { id: true, name: true } },
                }
            }),
        ]);

        return NextResponse.json({
            meals: meals.map((m) => ({ ...m, compositions: [], mealLikes: [] })),
            ingredients: ingredients.map((i) => ({ ...i, compositions: [], shoppingListItems: [] })),
        });
    } catch (error) {
        console.error("SEARCH_ERROR", error);
        return NextResponse.json({
            message: "Erreur serveur, veuillez réessayer plus tard"
        }, { status: 500 });
    }
}

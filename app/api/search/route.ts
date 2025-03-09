import { searchConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url); // récupère les paramètres de l'URL
    const query = searchParams.get("query"); // récupère la valeur du paramètre "query"

    if (!query ) return NextResponse.json([]); // retourne un tableau vide si aucun paramètre "query" n'est fourni

    const validatedQuery = searchConstraints.safeParse({ query });

    if (!validatedQuery.success) {
        return NextResponse.json({
            message: validatedQuery.error.errors[0].message
        }, { status: 400 });
    }

    try {
        const meals = await db.meal.findMany({
            where: { name: { contains: query, mode: "insensitive" } }, // Insensible à la casse
            select: { id: true, name: true },
        });

        const ingredients = await db.ingredient.findMany({
            where: { name: { contains: query, mode: "insensitive" } },
            select: { id: true, name: true },
        });

        return NextResponse.json([
            // fusionne les résultats des plats et des ingrédients dans un seul tableau
            ...meals.map((meal) => ({
                id: meal.id,
                name: meal.name,
            })),
            ...ingredients.map((ingredient) => ({
                id: ingredient.id,
                name: ingredient.name,
            })),
        ]);
    } catch (error) {
        console.error("SEARCH_ERROR", error);
        return NextResponse.json({
            message: "Erreur serveur, veuillez réessayer plus tard" 
        }, { status: 500 });
    }
}

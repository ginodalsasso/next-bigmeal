import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // adapte selon l'emplacement réel de ton client Prisma
import { searchConstraints } from "@/lib/constraints/forms_constraints";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    if (!query ) return NextResponse.json([]); // retourne un tableau vide si aucun paramètre "query" n'est fourni

    const validatedQuery = searchConstraints.safeParse({ query });

    if (!validatedQuery.success) {
        return NextResponse.json({
            message: validatedQuery.error.errors[0].message
        }, { status: 400 });
    }

    try {
        const ingredients = await db.ingredient.findMany({
            where: { name: { contains: query, mode: "insensitive" }}, // Insensible à la casse
            orderBy: { name: "asc" },
        });

        return NextResponse.json(ingredients);
    } catch (error) {
        console.error("[GET_INGREDIENTS_ERROR]", error);
        return NextResponse.json(
            { message: "Erreur lors de la récupération des ingrédients." },
            { status: 500 }
        );
    }
}

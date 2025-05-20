import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { session } = await getUserSession();
                
        const url = new URL(req.url); // URL de la requête
        // Gestion de la pagination
        const skip = parseInt(url.searchParams.get("skip") || "0", 10); // Début
        const take = parseInt(url.searchParams.get("take") || ITEMS_PER_PAGE, 10); // Quantité par page

        // Gestion des filtres
        const categories = url.searchParams.getAll("categories");

        // Récupérer les repas
        const meals = await db.meal.findMany({
            where: {
                mealLikes: {
                    some: {
                        userId: session?.user.id,
                    },
                },
                categoryMeal: categories.length > 0 ? {
                    name: { in: categories }, // Filtrer par catégorie
                } : undefined,
            },
            skip,
            take,
            orderBy: { name: 'desc' },
            select: {
                id: true,
                name: true,
                categoryMeal: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        console.table(meals);
        return NextResponse.json(meals, {status: 200}); 

    } catch(error) {
        console.error("[MEALS]", error); 
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

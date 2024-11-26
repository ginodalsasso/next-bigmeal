import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        // Récupérer les ingredients
        const ingredients = await db.ingredient.findMany({
            orderBy: { 
                name: 'desc'
            },
            include: { 
                categoryIngredient: true // Inclure la catégorie
            }
        }); 
        return NextResponse.json(ingredients);

    } catch(error) {
        console.log("[INGREDIENTS]", error); // Afficher l'erreur dans la console
        return new NextResponse("Internal Error", {status: 500 }); // Retourner une erreur 500
    }
}


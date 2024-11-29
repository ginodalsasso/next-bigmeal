import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        // Récupérer les ingredients
        const categoryIngredient = await db.categoryIngredient.findMany(); 
        return NextResponse.json(categoryIngredient);

    } catch(error) {
        console.log("[CATEGORY INGREDIENT]", error); // Afficher l'erreur dans la console
        return new NextResponse("Internal Error", {status: 500 }); // Retourner une erreur 500
    }
}


import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        // Récupérer les ingredients
        const categoryMeal = await db.categoryMeal.findMany(); 
        return NextResponse.json(categoryMeal);

    } catch(error) {
        console.log("[CATEGORY MEAL]", error); // Afficher l'erreur dans la console
        return new NextResponse("Internal Error", {status: 500 }); // Retourner une erreur 500
    }
}


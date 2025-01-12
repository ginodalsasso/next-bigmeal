import { getUserCart } from "@/lib/dal";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await getUserCart();

        if (!data) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401 }
            );
        }
        
        return new Response(
            JSON.stringify({ totalCartQuantity: data }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur dans l'API /api/auth/status :", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        // // Valider et nettoyer les données
        // const validationResult = mealConstraints.safeParse(body);

        // if (!validationResult.success) {
        //     return NextResponse.json(
        //         { error: validationResult.error.format() },
        //         { status: 400 }
        //     );
        // }

        const { id } = body;

        const updatedItem = await db.shoppingListItem.update({
            where: { id },
            data: { 
                isChecked: true
            },
        });

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_MEAL_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}

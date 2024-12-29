import { getUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        // Récupérer les listes de courses
        const shoppingList = await db.shoppingList.findMany({
            include: {
                meal: true,
                ingredient: true
            }
        });
        return NextResponse.json(shoppingList, { status: 200 });
    } catch (error) {
        console.log("[SHOPPING_LIST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const session = await getUser();

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();

        const { ingredientId } = body;

        // Créer la liste de courses
        const newShoppingList = await db.shoppingList.create({
            data: {
                // mealId,
                userId: session.id,
                ingredientId: ingredientId,
            }
        });
        return NextResponse.json(newShoppingList, { status: 201 });
    } catch (error) {
        console.error("[CREATE_SHOPPING_LIST_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
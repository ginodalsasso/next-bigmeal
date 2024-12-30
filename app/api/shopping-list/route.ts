import { getUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        // Récupérer les listes de courses
        const shoppingList = await db.shoppingList.findMany({
            include: {
                items: {
                    include: {
                        ingredient: true,
                    },
                },
            }
        });
        return NextResponse.json(shoppingList, { status: 200 });
    } catch (error) {
        console.log("[SHOPPING_LIST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function POST(req: NextRequest) {

    // Récupérer l'utilisateur
    const user = await getUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { ingredientId } = body;

        // Vérifier si une liste de courses existe
        let shoppingList = user.shoppingList[0];

        // Si aucune liste n'existe, en créer une nouvelle
        if (!shoppingList) {
            shoppingList = await db.shoppingList.create({
                data: { userId: user.id },
            });
        }

        // Ajouter un élément à la liste de courses
        const newItemToShoppingList = await db.shoppingListItem.create({
            data: {
                shoppingListId: shoppingList.id,
                ingredientId,
            },
        });

        // Retourner une réponse avec le nouvel élément
        return NextResponse.json(newItemToShoppingList, { status: 201 });
    } catch (error) {
        console.error("[CREATE_SHOPPING_LIST_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

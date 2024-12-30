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
        const { ingredientId, quantity } = body;

        // Vérifier si une liste de courses existe
        let shoppingList = user.shoppingList[0]; // Prendre la première liste de l'utilisateur

        if (!shoppingList) {
            // Si aucune liste n'existe, en créer une nouvelle
            shoppingList = await db.shoppingList.create({
                data: { userId: user.id },
            });
        }

        // Vérifier si l'ingrédient existe déjà dans la liste
        const existingItem = await db.shoppingListItem.findFirst({
            where: {
                shoppingListId: shoppingList.id,
                ingredientId,
            },
        });

        if (existingItem) {
            // Si l'élément existe, mettre à jour sa quantité
            const updatedItem = await db.shoppingListItem.update({
                where: {
                    id: existingItem.id,
                },
                data: {
                    quantity: existingItem.quantity + quantity,
                },
            });

            return NextResponse.json(updatedItem, { status: 200 });
        } else {
            // Sinon, créer un nouvel élément
            const newItemToShoppingList = await db.shoppingListItem.create({
                data: {
                    shoppingListId: shoppingList.id,
                    ingredientId,
                    quantity,
                },
            });

            return NextResponse.json(newItemToShoppingList, { status: 201 });
        }
    } catch (error) {
        console.error("[CREATE_SHOPPING_LIST_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

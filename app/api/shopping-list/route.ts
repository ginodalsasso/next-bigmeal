import { idConstraints, isCheckedShoppingListConstraints, ShoppingListConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/security/csrf";
import { getUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/security/getSession";

export async function GET() {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;

         // Récupérer les listes de courses
        const shoppingList = await db.shoppingList.findFirst({
            where: { 
            userId: session.user.id,
                isExpired: false
            },

            include: {
                items: {
                    include: {
                        ingredient: true,
                        meal: true
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

    try {
        const { session, error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const user = await getUser();
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const body = await req.json();

        // Valider et nettoyer les données
        const validationResult = ShoppingListConstraints.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { ingredientId, quantity, mealId = null } = body;

        // Vérifie si une liste de courses existe
        let shoppingList = user.shoppingList[0]; // Prendre la première liste de l'utilisateur
        if (!shoppingList) {
            // Si aucune liste n'existe, en créer une nouvelle
            shoppingList = await db.shoppingList.create({
                data: { userId: user.id },
            });
        }

        if (mealId) {
            // Si l'ingrédient est lié à un repas, créer un nouvel élément
            const newItem = await db.shoppingListItem.create({
                data: {
                    shoppingListId: shoppingList.id,
                    ingredientId,
                    quantity,
                    mealId,
                },
            });
            return NextResponse.json(newItem, { status: 201 });
        } else {
            // Vérifier si l'ingrédient existe déjà dans la liste (sans repas associé)
            const existingItem = await db.shoppingListItem.findFirst({
                where: {
                    shoppingListId: shoppingList.id,
                    ingredientId,
                    mealId: null, // Vérifie uniquement les ingrédients seuls
                },
            });

            if (existingItem) {
                // Si l'élément existe, mettre à jour sa quantité
                const updatedItem = await db.shoppingListItem.update({
                    where: { 
                        id: existingItem.id 
                    },
                    data: {
                        quantity: existingItem.quantity + quantity,
                    },
                });

                return NextResponse.json(updatedItem, { status: 200 });
            } else {
                // Sinon, créer un nouvel élément
                const newItem = await db.shoppingListItem.create({
                    data: {
                        shoppingListId: shoppingList.id,
                        ingredientId,
                        quantity,
                        mealId: null,
                    },
                });
                
                return NextResponse.json(newItem, { status: 201 });
            }
        }
    } catch (error) {
        console.error("[CREATE_SHOPPING_LIST_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}



export async function PUT(req: NextRequest) {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();
        // Si la propriété isChecked est présente dans le corps de la requête
        if ('isChecked' in body) {
            const validationResult = isCheckedShoppingListConstraints.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(
                    { error: validationResult.error.format() },
                    { status: 400 }
                );
            }

            const { id, isChecked } = body;

            const updatedItem = await db.shoppingListItem.update({
                where: { id },
                data: { isChecked },
            });

            return NextResponse.json(updatedItem, { status: 200 });
            
        // Si la propriété isExpired est présente dans le corps de la requête
        } else if ('isExpired' in body) {
            // Mise à jour de la propriété isExpired d'une liste
            const { id, isExpired } = body;

            if (typeof isExpired !== 'boolean') {
                return NextResponse.json(
                    { error: "Invalid data: isExpired must be a boolean" },
                    { status: 400 }
                );
            }

            const updatedList = await db.shoppingList.update({
                where: { id },
                data: { isExpired },
            });

            return NextResponse.json(updatedList, { status: 200 });
        } else {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }
    } catch (error) {
        console.error("[UPDATE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



export async function DELETE (req: NextRequest) {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }
        
        const body = await req.json();

        if (body.id) { // Si l' id est présent dans le corps de la requête
            const validationResult = idConstraints.safeParse({ id: body.id });
            if (!validationResult.success) {
                return NextResponse.json(
                    { error: validationResult.error.format() },
                    { status: 400 }
                );
            }

            await db.shoppingListItem.delete({ where: { id: body.id } });
            return NextResponse.json({ message: "Article supprimé" }, {status: 200});
        
        } else if (body.mealId) { // Si le mealId est présent dans le corps de la requête
            const validationResult = idConstraints.safeParse({ id: body.mealId });
            if (!validationResult.success) {
                return NextResponse.json(
                    { error: validationResult.error.format() },
                    { status: 400 }
                );
            }

            await db.shoppingListItem.deleteMany({ where: { mealId: body.mealId } });
            return NextResponse.json({ message: "Articles supprimés" }, {status: 200});
        } else {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

    } catch (error) {
        console.error("[DELETE_ITEM_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}



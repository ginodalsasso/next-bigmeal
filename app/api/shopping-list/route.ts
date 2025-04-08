import { idConstraints, isCheckedShoppingListConstraints, ShoppingListConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/security/getSession";

export async function GET() {
    try {
        const { session } = await getUserSession();

        const shoppingList = await db.shoppingList.findFirst({
            where: { 
                userId: session?.user.id,
                isExpired: false
            },
            include: {
                items: {
                    include: {
                        ingredient: true,
                        meal: true
                    }
                }
            }
        });

        if (!shoppingList) {
            return NextResponse.json(null, { status: 200 });
        }

        // Fusionner les items de la liste de courses ayant le même ingrédient et le même repas
        const groupedShoppingItems = Object.values(
            shoppingList.items.reduce((groupedItemsByKey, currentItem) => { // Prends la liste d'items et la réduit à un objet: { clé: item }
                // Clé unique pour regrouper les items: ingrédient + repas
                const uniqueKey = `${currentItem.ingredientId}-${currentItem.mealId ?? 'null'}`;
                console.log("uniqueKey", uniqueKey);
                // Si cette combinaison ingrédient/repas n'existe pas encore, on ajoute l'item tel quel
                if (!groupedItemsByKey[uniqueKey]) {
                    groupedItemsByKey[uniqueKey] = { ...currentItem }; // On copie l'item pour ne pas modifier l'original
                } else {
                    // Sinon, on additionne la quantité à celle déjà présente
                    groupedItemsByKey[uniqueKey].quantity += currentItem.quantity;
                }

                return groupedItemsByKey;
            }, {} as Record<string, typeof shoppingList.items[number]>) // Type: Record<clé, valeur>
        );

        return NextResponse.json(
            { ...shoppingList, items: groupedShoppingItems },
            { status: 200 }
        );

    } catch (error) {
        console.error("[FETCH_SHOPPING_LIST_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}



export async function POST(req: NextRequest) {

    try {
        const { error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const user = await getUser();
        if (!user) {
            return new NextResponse("Utilisateur introuvable", { status: 404 });
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
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}



export async function PUT(req: NextRequest) {
    try {
        const { error } = await getUserSession();
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
                    { error: "isExpired doit être un booléen" },
                    { status: 400 }
                );
            }

            const updatedList = await db.shoppingList.update({
                where: { id },
                data: { isExpired },
            });

            return NextResponse.json(updatedList, { status: 200 });
        } else {
            return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
        }
    } catch (error) {
        console.error("[UPDATE_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();

        const validationResult = idConstraints.safeParse({ id: body.id });
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        await db.shoppingList.delete({ where: { id: body.id } });
        return NextResponse.json({ message: "Liste supprimée" }, {status: 200});
    } catch (error) {
        console.error("[DELETE_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
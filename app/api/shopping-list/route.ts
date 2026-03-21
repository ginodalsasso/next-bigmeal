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
                        ingredient: {
                            select: {
                                id: true,
                                name: true,
                                categoryIngredient: {
                                    select: { id: true, name: true }
                                }
                            }
                        },
                        product: {
                            select: {
                                id: true,
                                name: true,
                                categoryHouseholdProduct: {
                                    select: { id: true, name: true }
                                }
                            }
                        },
                        meal: {
                            select: { id: true, name: true }
                        }
                    }
                }
            },
        });

        if (!shoppingList) {
            return NextResponse.json(null, { status: 200 });
        }

        // Tri JS : évite les orderBy sur relations imbriquées (N+1 sur MongoDB)
        shoppingList.items.sort((a, b) => {
            const catA = a.ingredient?.categoryIngredient?.name ?? a.product?.categoryHouseholdProduct?.name ?? "";
            const catB = b.ingredient?.categoryIngredient?.name ?? b.product?.categoryHouseholdProduct?.name ?? "";
            return catA.localeCompare(catB, "fr");
        });

        return NextResponse.json(shoppingList, { status: 200 });
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
            return new NextResponse("Le token CSRF est manquant ou invalide", { status: 403 });
        }

        const user = await getUser();
        if (!user) {
            return new NextResponse("Utilisateur introuvable", { status: 404 });
        }

        const body = await req.json();
        const { mealId = null, ingredientId, productId, unit, quantity} = body;

        
        // Valider et nettoyer les données
        const validationResult = ShoppingListConstraints.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Vérifie si une liste de courses existe
        let shoppingList = user.shoppingList[0]; // Prendre la première liste de l'utilisateur
        if (!shoppingList) {
            // Si aucune liste n'existe, en créer une nouvelle
            shoppingList = await db.shoppingList.create({
                data: { userId: user.id },
            });
        }
        // Vérifier si l'ingrédient (peu importe le repas) existe déjà dans la liste de courses basée sur ingredientId
        const existingItem = await db.shoppingListItem.findFirst({
            where: {
                shoppingListId: shoppingList.id,
                ingredientId,
                productId,
                unit: unit || null, // Unité peut être null si non spécifiée
                mealId: mealId
            },
        });

        if (existingItem) {
            // Si l'élément existe, ajouter à sa quantité
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
                    productId,
                    quantity,
                    unit: unit || null,
                    mealId: mealId || null,
                },
            });

            return NextResponse.json(newItem, { status: 201 });
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
        const { error, session } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();
        if ('isChecked' in body) {
            const validationResult = isCheckedShoppingListConstraints.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(
                    { error: validationResult.error.format() },
                    { status: 400 }
                );
            }

            const { id, isChecked } = body;

            // Vérifie que l'item appartient à une liste de l'utilisateur courant
            const item = await db.shoppingListItem.findFirst({
                where: { id, shoppingList: { userId: session!.user.id } },
            });
            if (!item) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

            const updatedItem = await db.shoppingListItem.update({
                where: { id },
                data: { isChecked },
            });

            return NextResponse.json(updatedItem, { status: 200 });

        } else if ('isExpired' in body) {
            const { id, isExpired } = body;

            if (typeof isExpired !== 'boolean') {
                return NextResponse.json(
                    { error: "isExpired doit être un booléen" },
                    { status: 400 }
                );
            }

            // Vérifie que la liste appartient à l'utilisateur courant
            const list = await db.shoppingList.findFirst({
                where: { id, userId: session!.user.id },
            });
            if (!list) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

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
        const { error, session } = await getUserSession();
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

        // Vérifie que la liste appartient à l'utilisateur courant
        const list = await db.shoppingList.findFirst({
            where: { id: body.id, userId: session!.user.id },
        });
        if (!list) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

        await db.shoppingList.delete({ where: { id: body.id } });
        return NextResponse.json({ message: "Liste supprimée" }, { status: 200 });
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
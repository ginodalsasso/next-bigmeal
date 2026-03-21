import { idConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getUserSession } from "@/lib/security/getSession";
import { getUser } from "@/lib/dal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing ou invalide", { status: 403 });
        }

        const user = await getUser();
        if (!user) {
            return new NextResponse("Utilisateur introuvable", { status: 404 });
        }

        const body = await req.json();
        const validation = idConstraints.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const { id: mealId } = validation.data;

        const meal = await db.meal.findUnique({
            where: { id: mealId },
            include: { compositions: true },
        });
        if (!meal) {
            return NextResponse.json({ error: "Repas introuvable" }, { status: 404 });
        }

        let shoppingList = user.shoppingList[0];
        if (!shoppingList) {
            shoppingList = await db.shoppingList.create({ data: { userId: user.id } });
        }

        const validCompositions = meal.compositions.filter(c => c.ingredientId);
        const ingredientIds = validCompositions.map(c => c.ingredientId);

        const existingItems = await db.shoppingListItem.findMany({
            where: { shoppingListId: shoppingList.id, mealId, ingredientId: { in: ingredientIds } },
        });
        const existingMap = new Map(existingItems.map(item => [item.ingredientId, item]));

        const toUpdate = validCompositions
            .filter(c => existingMap.has(c.ingredientId))
            .map(c => {
                const existing = existingMap.get(c.ingredientId)!;
                return db.shoppingListItem.update({
                    where: { id: existing.id },
                    data: { quantity: existing.quantity + c.quantity },
                });
            });

        const toCreate = validCompositions
            .filter(c => !existingMap.has(c.ingredientId))
            .map(c =>
                db.shoppingListItem.create({
                    data: {
                        shoppingListId: shoppingList.id,
                        mealId,
                        ingredientId: c.ingredientId,
                        quantity: c.quantity,
                        unit: c.unit,
                    },
                })
            );

        await db.$transaction([...toUpdate, ...toCreate]);

        return NextResponse.json({ message: "Repas ajouté à la liste de courses" }, { status: 201 });
    } catch (error) {
        console.error("[ADD_MEAL_TO_SHOPPING_LIST_ERROR]", error);
        return new Response(JSON.stringify({
            message: 'Erreur serveur, veuillez réessayer plus tard'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function DELETE (req: NextRequest) {
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

        await db.shoppingListItem.deleteMany({ where: { mealId: body.id } });
        return NextResponse.json({ message: "Articles supprimés" }, {status: 200});
        
    } catch (error) {
        console.error("[DELETE_ITEM_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

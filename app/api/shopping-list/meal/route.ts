import { idConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getUserSession } from "@/lib/security/getSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { error, session } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing ou invalide", { status: 403 });
        }

        const body = await req.json();
        const validation = idConstraints.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const { id: mealId } = validation.data;
        const userId = session!.user.id;

        const [meal, existingList] = await Promise.all([
            db.meal.findUnique({ where: { id: mealId }, include: { compositions: true } }),
            db.shoppingList.findFirst({ where: { userId, isExpired: false }, select: { id: true } }),
        ]);

        if (!meal) {
            return NextResponse.json({ error: "Repas introuvable" }, { status: 404 });
        }

        const shoppingList = existingList ?? await db.shoppingList.create({ data: { userId } });

        const validCompositions = meal.compositions.filter(c => c.ingredientId);

        if (validCompositions.length === 0) {
            return NextResponse.json({ message: "Aucun ingrédient à ajouter" }, { status: 200 });
        }

        const ingredientIds = validCompositions.map(c => c.ingredientId);

        const existingItems = await db.shoppingListItem.findMany({
            where: { shoppingListId: shoppingList.id, mealId, ingredientId: { in: ingredientIds } },
        });
        const existingMap = new Map(existingItems.map(item => [item.ingredientId, item]));

        const toUpdateOps = validCompositions
            .filter(c => existingMap.has(c.ingredientId))
            .map(c => {
                const existing = existingMap.get(c.ingredientId)!;
                return db.shoppingListItem.update({
                    where: { id: existing.id },
                    data: { quantity: existing.quantity + c.quantity },
                });
            });

        const toCreateData = validCompositions
            .filter(c => !existingMap.has(c.ingredientId))
            .map(c => ({
                shoppingListId: shoppingList.id,
                mealId,
                ingredientId: c.ingredientId,
                quantity: c.quantity,
                unit: c.unit,
            }));

        // createMany = 1 requête batch au lieu de N inserts séquentiels
        // Promise.all = updates en parallèle, sans overhead de transaction
        await Promise.all([
            toCreateData.length > 0
                ? db.shoppingListItem.createMany({ data: toCreateData })
                : Promise.resolve(),
            ...toUpdateOps,
        ]);

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

        // Restreint la suppression aux listes appartenant à l'utilisateur courant
        const userLists = await db.shoppingList.findMany({
            where: { userId: session!.user.id },
            select: { id: true },
        });
        const listIds = userLists.map(l => l.id);

        await db.shoppingListItem.deleteMany({
            where: { mealId: body.id, shoppingListId: { in: listIds } },
        });
        return NextResponse.json({ message: "Articles supprimés" }, { status: 200 });
        
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

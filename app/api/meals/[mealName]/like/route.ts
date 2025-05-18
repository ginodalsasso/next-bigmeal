import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ mealName: string }>;
}

export async function POST(req: NextRequest, { params }: Props) {
            
    const { mealName } = await params;

    if (!mealName) {
        return NextResponse.json({ error: "Meal ID is required" }, { status: 400 });
    }

    try {
        const { session, error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const meal = await db.meal.findUnique({
            where: {
                name: mealName,
            },
        });

        if (!meal) {
            return new Response(JSON.stringify({ 
                message: 'Repas introuvable' 
            }), { 
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Vérifier si le repas est déjà aimé
        const isLikedMeal = await db.mealLike.findUnique({
            where: {
                userId_mealId: {
                    userId: session.user.id,
                    mealId: meal.id,
                }
            },
        });

        if (isLikedMeal) {
            // Si le repas est déjà aimé, on le supprime
            await db.mealLike.delete({
                where: {
                    userId_mealId: {
                        userId: session.user.id,
                        mealId: meal.id,
                    }
                }
            });
            return NextResponse.json({ message: 'Repas retiré des favoris' });
        }

        // Sinon, on l'ajoute
        await db.mealLike.create({
            data: {
                userId: session.user.id,
                mealId: meal.id,
            }
        });
        return NextResponse.json({ message: 'Repas ajouté aux favoris' });
    } catch (error) {
        console.error("[API_ERROR] likedMealAPI", error);
        return NextResponse.json({ error: 'Erreur lors de la modification du statut du like' }, { status: 500 });
    }
}
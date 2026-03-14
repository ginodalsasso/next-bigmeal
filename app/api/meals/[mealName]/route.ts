import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type Props = {
    params: Promise<{ mealName: string }>;
}

export async function GET ( req: NextRequest, { params }: Props){
        
    const { mealName } = await params;

    if (!mealName) {
        return NextResponse.json({ error: "Meal ID is required" }, { status: 400 });
    }

    

    try {
        const meal = await db.meal.findUnique({
            where: { name: mealName },
            select: {
                id: true,
                name: true,
                description: true,
                categoryMeal: {
                    select: { id: true, name: true }
                },
                compositions: {
                    select: {
                        id: true,
                        quantity: true,
                        unit: true,
                        ingredient: {
                            select: { id: true, name: true }
                        }
                    }
                },
                preparation: {
                    select: {
                        id: true,
                        prepTime: true,
                        cookTime: true,
                        steps: {
                            select: { id: true, stepNumber: true, description: true, imageUrl: true },
                            orderBy: { stepNumber: "asc" }
                        }
                    }
                }
            },
        });

        if (!meal) {
            return NextResponse.json({ error: "Meal not found" }, { status: 404 });
        }

        return NextResponse.json(meal);
    } catch (error) {
        console.error("[FETCH_MEAL_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";

type Props = {
    params: Promise<{ ingredientName: string }>;
}

export async function GET( req: NextRequest, { params }: Props){

    const { error } = await getUserSession();
    if (error) return error;
        
    const { ingredientName } = await params;

    if (!ingredientName) {
        return NextResponse.json({ error: "Ingredient ID is required" }, { status: 400 });
    }

    try {
        const ingredient = await db.ingredient.findUnique({
            where: { name: ingredientName },
            include: {
                categoryIngredient: true,
                compositions: {
                    include: {
                        meal: true,
                    },
                },
            },
        });

        if (!ingredient) {
            return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
        }

        return NextResponse.json(ingredient);
    } catch (error) {
        console.error("Error fetching ingredient:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

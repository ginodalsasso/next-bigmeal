import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name } = body;

        // Créer l'ingrédient
        const newCategoryIngredient = await db.categoryIngredient.create({
            data: {
                name,
            },
        });

        return NextResponse.json(newCategoryIngredient, {status: 201});
    } catch (error) {
        console.error("[CREATE_CATEGORY_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}
    

export async function PUT (req: NextRequest) {
    try {
        const { id, name } = await req.json(); 
        const updatedArticle = await db.categoryIngredient.update({
            where: { id },
            data: { 
                name, 
            },
        });
        return NextResponse.json(updatedArticle);
    } catch (error) {
        console.error("[UPDATE_CATEGORY_INGREDIENT_ERROR]", error);
    }
}

export async function DELETE (req: NextRequest) {
    try {
        const { id } = await req.json();
        await db.categoryIngredient.delete({ where: { id } }); 
        return NextResponse.json({ message: "Catégorie supprimé" });
    } catch (error) {
        console.error("[DELETE_CATEGORY_INGREDIENT_ERROR]", error);
    }
}


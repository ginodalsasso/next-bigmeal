import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function GET() {
    try {
        const categoryMeal = await db.categoryMeal.findMany(); 

        return NextResponse.json(categoryMeal, {status: 200});
    } catch(error) {
        console.log("[CATEGORY MEAL]", error); 
        return new NextResponse("Internal Error", {status: 500 }); 
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name } = body;

        const newCategoryMeal = await db.categoryMeal.create({
            data: {
                name,
            },
        });

        return NextResponse.json(newCategoryMeal, {status: 201});
    } catch (error) {
        console.error("[CREATE_CATEGORY_MEAL_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}

export async function PUT (req: NextRequest) {
    try {
        const { id, name } = await req.json(); 
        const updatedArticle = await db.categoryMeal.update({
            where: { id },
            data: { 
                name, 
            },
        });

        return NextResponse.json(updatedArticle, {status: 201});
    } catch (error) {
        console.error("[UPDATE_CATEGORY_MEAL_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}


export async function DELETE (req: NextRequest) {
    try {
        const { id } = await req.json();

        await db.categoryMeal.delete({ where: { id } }); 

        return NextResponse.json({ message: "Catégorie supprimé" }, {status: 200});
    } catch (error) {
        console.error("[DELETE_CATEGORY_MEAL_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}

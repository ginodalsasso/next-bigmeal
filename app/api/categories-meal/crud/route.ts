import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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

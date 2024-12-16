import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { ingredientId, mealId, quantity, unit } = body;

        const newComposition = await db.composition.create({
            data: {
                ingredientId,
                mealId,
                quantity,
                unit,
            },
        });

        return NextResponse.json(newComposition, {status: 201});

    } catch (error) {
        console.error("[CREATE_COMPOSITION_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}
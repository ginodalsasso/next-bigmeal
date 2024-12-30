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
            include: {
                compositions: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        if (!meal) {
            return NextResponse.json({ error: "Meal not found" }, { status: 404 });
        }

        return NextResponse.json(meal);
    } catch (error) {
        console.error("Error fetching meal:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
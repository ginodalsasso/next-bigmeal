
import { NextRequest, NextResponse } from "next/server";
// import { compositionConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        const updatedComposition = await db.composition.update({
            where: { id: body.id },
            data: {
                quantity: body.quantity,
                unit: body.unit,
            },
        });

        return NextResponse.json(updatedComposition, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_COMPOSITION_ERROR]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


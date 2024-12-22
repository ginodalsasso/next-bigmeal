
import { NextRequest, NextResponse } from "next/server";
// import { compositionConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        // Vérifiez si body est un tableau ou un objet unique
        const compositions = Array.isArray(body) ? body : [body];

        // Validation des données
        // const validationResults = compositions.map((comp) => compositionConstraints.safeParse(comp));
        // const validationErrors = validationResults
        //     .map((result, index) => (!result.success ? { index, errors: result.error.format() } : null))
        //     .filter((error) => error !== null);

        // if (validationErrors.length > 0) {
        //     console.error("Validation errors:", validationErrors);
        //     return NextResponse.json(
        //         { error: validationErrors },
        //         { status: 400 }
        //     );
        // }

        // Mise à jour des compositions dans la base de données
        const updatedCompositions = await Promise.all(
            compositions.map(async (comp) => {
                return db.composition.update({
                    where: { id: comp.id },
                    data: {
                        quantity: comp.quantity,
                        unit: comp.unit,
                    },
                });
            })
        );
        return NextResponse.json(updatedCompositions, { status: 200 });
        
    } catch (error) {
        console.error("[UPDATE_COMPOSITION_ERROR]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
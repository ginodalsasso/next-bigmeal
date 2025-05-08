import { newStepConstraints, updateStepConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { getAdminSession, getUserSession } from "@/lib/security/getSession";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { StepFormType } from "@/lib/types/forms_interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body: StepFormType[] = await req.json();

        if (!Array.isArray(body)) {
            return NextResponse.json(
                { error: "Les données doivent être un tableau." }, 
                { status: 400 });
        }

        if (body.length > 20) {
            return NextResponse.json(
                { error: "Max 20 étapes à la fois." }, 
                { status: 400 }
            );
        }

        const validationResult = newStepConstraints.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.format() }, { status: 400 });
        }

        const preparationId = body[0].preparationId;

        const lastStep = await db.step.findFirst({
            where: { preparationId },
            orderBy: { stepNumber: "desc" },
            select: { stepNumber: true }
        });

        const lastNumber = lastStep?.stepNumber ?? 0; // Si aucune étape n'existe, on commence à 0 sinon on prend le dernier numéro d'étape

        const stepsToInsert = body.map((step, i) => ({
            preparationId,
            stepNumber: lastNumber + i + 1, // Incrémenter le numéro d'étape à partir du dernier
            description: step.description,
            imageUrl: step.imageUrl || ""
        }));

        await db.step.createMany({ data: stepsToInsert });

        const insertedSteps = await db.step.findMany({
            where: { preparationId },
            orderBy: { stepNumber: "asc" }
        });

        return NextResponse.json(insertedSteps, { status: 201 });

    } catch (error) {
        console.error("[CREATE_PREPARATION_STEPS_ERROR]", error);
        return new Response(JSON.stringify({
            message: 'Erreur serveur, veuillez réessayer plus tard'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const { error } = await getAdminSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();

        const { id, stepNumber, description, imageUrl } = body;

        const validationResult = updateStepConstraints.safeParse(body);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }


        const updatedStep = await db.step.update({
            where: { id },
            data: {
                stepNumber: stepNumber,
                description: description,
                imageUrl: imageUrl || ""
            }
        });

        return NextResponse.json(updatedStep, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_PREPARATION_STEPS_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const { error } = await getAdminSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const { id } = await req.json();

        // Récupérer l'étape à supprimer
        const stepToDelete = await db.step.findUnique({
            where: { id },
            select: { 
                stepNumber: true, // Récupérer le numéro de l'étape pour réindexer les étapes suivantes
                preparationId: true // Récupérer l'ID de la préparation pour filtrer les étapes à réindexer
            }
        });

        if (!stepToDelete) {
            return NextResponse.json(
                { error: "Étape non trouvée" },
                { status: 404 }
            );
        }

        const { stepNumber, preparationId } = stepToDelete;

        await db.step.delete({ where: { id } });

        // Réindexer les étapes suivantes
        await db.step.updateMany({
            where: {
                preparationId: preparationId,
                // Récupérer les étapes dont le numéro est supérieur à celui de l'étape supprimée
                stepNumber: { gt: stepNumber } // gt = greater than (supérieur à)
            },
            data: {
                stepNumber: {
                    decrement: 1 // Décrémenter le numéro de l'étape
                }
            }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[DELETE_PREPARATION_STEPS_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

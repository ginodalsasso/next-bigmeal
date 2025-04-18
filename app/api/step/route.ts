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
                { status: 400 }
            );
        }

        if (body.length > 20) {
            return new NextResponse(
                JSON.stringify({ error: "Vous ne pouvez pas ajouter plus de 20 étapes à la fois." }), {
                status: 400,
            });
        }
        
        const validationResult = newStepConstraints.safeParse(body);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Compter les etapes existantes pour vérifier si un numéro d'étape est déjà présent
        const existingSteps = await db.step.findMany({
            where: { preparationId: body[0].preparationId },
            select: { stepNumber: true }
        });
        
        const existingStepNumbers = new Set(existingSteps.map(step => step.stepNumber)); // Set regroupant les numéros d'étapes existants (évite les doublons et accélère la recherche)
        const duplicateSteps = body.some(step => existingStepNumbers.has(step.stepNumber)); // Vérifie si un numéro d'étape existe déjà

        if (duplicateSteps) {
            return NextResponse.json(
                { error: "Un ou plusieurs numéros d'étapes existent déjà pour cette préparation." },
                { status: 400 }
            );
        }
        
        // Créer plusieurs étapes en base de données
        await db.step.createMany({
            data: body.map(step => ({
                preparationId: step.preparationId,
                stepNumber: step.stepNumber,
                description: step.description,
                imageUrl: step.imageUrl || ""
            }))
        });
        // Récupérer les étapes insérées pour les afficher 
        const insertedSteps = await db.step.findMany({
            where: { 
                preparationId: body[0].preparationId 
            },
            orderBy: { 
                stepNumber: "asc" 
            }
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

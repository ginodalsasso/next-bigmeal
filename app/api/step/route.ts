import { newStepConstraints } from "@/lib/constraints/forms_constraints";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }
        
            
        const body = await req.json();
        const { preparationId, stepNumber, description, imageUrl } = body;
        
        const validationResult = newStepConstraints.safeParse(body);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }
        
        // Créer la préparation
        const newStep = await db.step.create({
            data: {
                preparationId,
                stepNumber,
                description,
                imageUrl
            },
        });
        console.log(newStep);
        return NextResponse.json(newStep, {status: 201});

    } catch (error) {
        console.error("[CREATE_PREPARATION_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categoriesConstraints, idConstraints } from "@/lib/constraints/forms_constraints";
import { z } from "zod";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getAdminSession } from "@/lib/security/getSession";



export async function GET() {
    try {
        const categoryMeal = await db.categoryMeal.findMany(
            {
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    name: true,
                },
            }
        ); 

        return NextResponse.json(categoryMeal, {status: 200});
    } catch(error) {
        console.error("[CATEGORY INGREDIENT_ERROR]", error); 
        return NextResponse.json(
            { message: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}


export async function POST(req: NextRequest) {
    try {
        const { error } = await getAdminSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();

        // Valider les données avec Zod
        const validationResult = categoriesConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() }, 
                { status: 400 }
            );
        }

        const { name } = validationResult.data;

        const newcategoryMeal = await db.categoryMeal.create({
            data: { name },
        });

        return NextResponse.json(newcategoryMeal, { status: 201 });
    } catch (error) {
        console.error("[CATEGORY INGREDIENT_ERROR]", error); 
        return NextResponse.json(
            { message: "Erreur interne du serveur." },
            { status: 500 }
        );
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
    
            // Valider et nettoyer les données
            const validationResult = categoriesConstraints.extend({
                id: z.string(),
            }).safeParse(body);
    
            if (!validationResult.success) {
                return NextResponse.json(
                    { error: validationResult.error.format() },
                    { status: 400 }
                );
            }
    
            const { id, name } = validationResult.data; 
    
            const updatedCategory = await db.categoryMeal.update({
                where: { id },
                data: { name },
            });
    
            return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error("[CATEGORY INGREDIENT_ERROR]", error); 
        return NextResponse.json(
            { message: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}


export async function DELETE (req: NextRequest) {
    try {
        const { error } = await getAdminSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }  
        
        const body = await req.json();

        const validationResult = idConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { id } = validationResult.data;
        await db.categoryMeal.delete({ where: { id } });

        return NextResponse.json({ message: "Catégorie supprimée" }, {status: 200});
    } catch (error) {
        console.error("[CATEGORY INGREDIENT_ERROR]", error); 
        return NextResponse.json(
            { message: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}


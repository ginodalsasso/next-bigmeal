import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categoriesConstraints, idConstraints } from "@/lib/constraints/forms_constraints";
import { z } from "zod";
// import { verifyAdmin } from "@/lib/auth";
import { verifyCSRFToken } from "@/lib/security/csrf";


export async function GET() {
    try {
        const categoryIngredient = await db.categoryIngredient.findMany(); 

        return NextResponse.json(categoryIngredient, {status: 200});
    } catch(error) {
        console.log("[CATEGORY INGREDIENT]", error); 
        return new NextResponse("Internal Error", {status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const csrfToken = req.headers.get("x-csrf-token");
        const csrfTokenVerified = await verifyCSRFToken(csrfToken);
        if (csrfTokenVerified === false) {
            return new NextResponse("CSRF Token is missing or invalid", {status: 403});
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

        const newCategoryIngredient = await db.categoryIngredient.create({
            data: { name },
        });

        return NextResponse.json(newCategoryIngredient, { status: 201 });
    } catch (error) {
        console.error("[CREATE_CATEGORY_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}


    
export async function PUT(req: NextRequest) {

        try {
            const isAdmin = await verifyAdmin();
            if (!isAdmin) {
                return new NextResponse("Unauthorized", {status: 401});
            }
            const csrfToken = req.headers.get("x-csrf-token");
            const csrfTokenVerified = await verifyCSRFToken(csrfToken);
            if (csrfTokenVerified === false) {
                return new NextResponse("CSRF Token is missing or invalid", {status: 403});
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
    
            const updatedCategory = await db.categoryIngredient.update({
                where: { id },
                data: { name },
            });
            
            return NextResponse.json(updatedCategory, { status: 200 });

    } catch (error) {
        console.error("[UPDATE_CATEGORY_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}


export async function DELETE (req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const csrfToken = req.headers.get("x-csrf-token");
        const csrfTokenVerified = await verifyCSRFToken(csrfToken);
        if (csrfTokenVerified === false) {
            return new NextResponse("CSRF Token is missing or invalid", {status: 403});
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
        await db.categoryIngredient.delete({ where: { id } });

        return NextResponse.json({ message: "Catégorie supprimée" }, {status: 200});
    } catch (error) {
        console.error("[DELETE_CATEGORY_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}


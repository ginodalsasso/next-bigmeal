import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categoriesConstraints, idConstraints } from "@/lib/constraints/forms_constraints";
import { z } from "zod";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getAdminSession } from "@/lib/security/getSession";


export async function GET() {
    try {
        const categoryHouseholdProduct = await db.categoryHousehold.findMany(
            {
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    name: true,
                },
            }
        ); 
        
        return NextResponse.json(categoryHouseholdProduct, {status: 200});
    } catch(error) {
        console.error("[CATEGORY HOUSEHOLD PRODUCT]", error); 
        return NextResponse.json(
            { message: "Erreur interne du serveur." },
            { status: 500, }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { error } = await getAdminSession();
        if (error) return error;
        
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("Token CSRF manquant ou invalide", { status: 403 });
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

        const newCategoryHousehold = await db.categoryHousehold.create({
            data: { name },
        });

        return NextResponse.json(newCategoryHousehold, { status: 201 });
    } catch (error) {
        console.error("[CREATE_CATEGORY_INGREDIENT_ERROR]", error);
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
            return new NextResponse("Token CSRF manquant ou invalide", { status: 403 });
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

        const updatedCategory = await db.categoryHousehold.update({
            where: { id },
            data: { name },
        });
        
        return NextResponse.json(updatedCategory, { status: 200 });

} catch (error) {
    console.error("[UPDATE_CATEGORY_HOUSEHOLD_ERROR]", error);
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
        return new NextResponse("Token CSRF manquant ou invalide", { status: 403 });
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
    await db.categoryHousehold.delete({ where: { id } });

    return NextResponse.json({ message: "Catégorie supprimée" }, {status: 200});
} catch (error) {
    console.error("[DELETE_CATEGORY_HOUSEHOLD_ERROR]", error);
    return NextResponse.json(
        { message: "Erreur interne du serveur." },
        { status: 500 }
    );
}
}


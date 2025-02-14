import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { idConstraints, ingredientConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/security/csrf";
import { getAdminSession } from "@/lib/security/getSession";


export async function GET() {
    try {
        // Récupérer les ingredients
        const ingredients = await db.ingredient.findMany({
            orderBy: { 
                name: 'desc'
            },
            include: { 
                categoryIngredient: true // Inclure la catégorie
            }
        }); 
        return NextResponse.json(ingredients, {status: 200}); 

    } catch(error) {
        console.log("[INGREDIENTS]", error); 
        return new NextResponse("Internal Error", {status: 500 });
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
        
        const validationResult = ingredientConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }
        const { name, season, categoryIngredientId } = body;

        // Créer l'ingrédient
        const newIngredient = await db.ingredient.create({
            data: {
                name,
                season,
                categoryIngredientId,
            },
        });
        return NextResponse.json(newIngredient, {status: 201});

    } catch (error) {
        console.error("[CREATE_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
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
        const validationResult = ingredientConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { id, name, season, categoryIngredientId } = body; 

        const updatedIngredient = await db.ingredient.update({
            where: { id },
            data: { 
                name,
                categoryIngredientId,
                season,
            },
            include: { categoryIngredient: true }
        });

        return NextResponse.json(updatedIngredient, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
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
        await db.ingredient.delete({ where: { id } });

        return NextResponse.json({ message: "Ingredient supprimé" }, {status: 200});
    } catch (error) {
        console.error("[DELETE_INGREDIENT_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}


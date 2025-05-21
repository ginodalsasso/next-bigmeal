import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { idConstraints, ingredientConstraints, urlConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getAdminSession, getUserSession } from "@/lib/security/getSession";
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";


export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);

        const data = {
            // Gestion de la pagination
            skip: parseInt(url.searchParams.get("skip") || "0", 10),
            take: parseInt(url.searchParams.get("take") || ITEMS_PER_PAGE.toString(), 10),

            // Gestion des filtres
            categories: url.searchParams.getAll("categories"),
            seasons: url.searchParams.getAll("seasons")
        };
        
        const validationResult = urlConstraints.safeParse(data);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { skip, take, categories, seasons } = validationResult.data;

        const ingredients = await db.ingredient.findMany({
            where: {
                categoryIngredient: categories.length > 0 ? {
                    name: { in: categories },
                } : undefined,

                season: seasons.length > 0 ? {
                    in: seasons,
                } : undefined,
            },
            skip: skip,
            take: take,
            orderBy: { name: 'desc' },
            select: {
                id: true,
                name: true,
                season: true,
                categoryIngredient: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(ingredients, { status: 200 });

    } catch (error) {
        console.error("[FETCH_INGREDIENTS_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { error } = await getUserSession();
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
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
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
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


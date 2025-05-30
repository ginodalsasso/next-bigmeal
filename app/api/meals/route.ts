import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { idConstraints, mealConstraints, urlConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getAdminSession, getUserSession } from "@/lib/security/getSession";
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";


export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url); // URL de la requête
        // Gestion de la pagination
        const data = {
            skip: parseInt(url.searchParams.get("skip") || "0", 10), // Début
            take: parseInt(url.searchParams.get("take") || ITEMS_PER_PAGE, 10), // Quantité par page
            categories: url.searchParams.getAll("categories"),
        };

        const validationResult = urlConstraints.safeParse(data);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { skip, take, categories } = validationResult.data;

        // Récupérer les repas
        const meals = await db.meal.findMany({
            where: {
                categoryMeal: categories.length > 0 ? {
                    name: { in: categories }, // Filtrer par catégorie
                } : undefined,
            },
            skip: skip,
            take: take,
            orderBy: { name: 'desc' },
            select: {
                id: true,
                name: true,
                categoryMeal: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        }); 

        return NextResponse.json(meals, {status: 200}); 

    } catch(error) {
        console.error("[MEALS]", error); 
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
        const { name, description, categoryMealId } = body;

        const validationResult = mealConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        // Créer le repas
        const newMeal = await db.meal.create({
            data: {
                name,
                description,
                categoryMealId,
            },
        });
        return NextResponse.json(newMeal, {status: 201});

    } catch (error) {
        console.error("[CREATE_MEAL_ERROR]", error);
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
        const validationResult = mealConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { id, name, description, categoryMealId } = body;

        const updatedMeal = await db.meal.update({
            where: { id },
            data: { 
                name,
                categoryMealId,
                description: description === "" ? null : description,
            },
            include: { categoryMeal: true }
        });

        return NextResponse.json(updatedMeal, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_MEAL_ERROR]", error);
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
        await db.meal.delete({ where: { id } });

        return NextResponse.json({ message: "Repas supprimé" }, {status: 200});
    } catch (error) {
        console.error("[DELETE_MEAL_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


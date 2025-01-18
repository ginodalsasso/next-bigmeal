import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { idConstraints, mealConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/csrf";


export async function GET() {
    try {
        // Récupérer les repas
        const meals = await db.meal.findMany({
            orderBy: { 
                name: 'desc'
            },
            include: { 
                categoryMeal: true // Inclure la catégorie
            }
        }); 
        return NextResponse.json(meals, {status: 200}); 

    } catch(error) {
        console.log("[MEALS]", error); 
        return new NextResponse("Internal Error", {status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const csrfToken = req.headers.get("x-csrf-token");
        const csrfTokenVerified = await verifyCSRFToken(csrfToken);
        if (csrfTokenVerified === false) {
            return new NextResponse("CSRF Token is missing or invalid", {status: 403});
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
        return new NextResponse("Internal Error", {status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const csrfToken = req.headers.get("x-csrf-token");
        const csrfTokenVerified = await verifyCSRFToken(csrfToken);
        if (csrfTokenVerified === false) {
            return new NextResponse("CSRF Token is missing or invalid", {status: 403});
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
        return new NextResponse("Internal Error", {status: 500 });
    }
}


export async function DELETE (req: NextRequest) {
    try {
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
        await db.meal.delete({ where: { id } });

        return NextResponse.json({ message: "Repas supprimé" }, {status: 200});
    } catch (error) {
        console.error("[DELETE_MEAL_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500 });
    }
}


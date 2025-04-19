import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { householdProductConstraints, idConstraints } from "@/lib/constraints/forms_constraints";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getAdminSession, getUserSession } from "@/lib/security/getSession";
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";


export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        // Gestion de la pagination
        const skip = parseInt(url.searchParams.get("skip") || "0", 10);
        const take = parseInt(url.searchParams.get("take") || ITEMS_PER_PAGE.toString(), 10);

        // Gestion des filtres
        const categories = url.searchParams.getAll("categories");

        const householdProducts = await db.product.findMany({
            where: {
                categoryHouseholdProduct: categories.length > 0 ? {
                    name: { in: categories },
                } : undefined,
            },
            skip,
            take,
            orderBy: { name: 'desc' },
            include: { categoryHouseholdProduct: true }
        });

        return NextResponse.json(householdProducts, { status: 200 });

    } catch (error) {
        console.error("[FETCH_PRODUCT_ERROR]", error);
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
        
        const validationResult = householdProductConstraints.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }
        const { name, categoryHouseholdProductId } = body;

        const newHouseholdProduct = await db.product.create({
            data: {
                name,
                categoryHouseholdProductId,
            },
        });
        return NextResponse.json(newHouseholdProduct, {status: 201});

    } catch (error) {
        console.error("[CREATE_PRODUCT_ERROR]", error);
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
        const validationResult = householdProductConstraints.safeParse(body);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }
        
        const { id, name, categoryHouseholdProductId } = body; 

        const updatedHouseholdProduct = await db.product.update({
            where: { id },
            data: { 
                name,
                categoryHouseholdProductId,
            },
            include: { categoryHouseholdProduct: true }
        });

        return NextResponse.json(updatedHouseholdProduct, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_PRODUCT_ERROR]", error);
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
        await db.product.delete({ where: { id } });

        return NextResponse.json({ message: "Produit supprimé" }, {status: 200});
    } catch (error) {
        console.error("[DELETE_PRODUCT_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


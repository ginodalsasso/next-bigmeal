import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { getUserSession } from "@/lib/security/getSession";
import { extractRecipeFromImage, extractRecipeFromUrl, extractRecipeFromText } from "@/lib/services/ai_import_service";
import { importRecipeToDB } from "@/lib/services/meal_import_db_service";
import { db } from "@/lib/db";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const urlInputSchema = z.object({
    url: z.string().url("URL invalide").max(2048),
});

const textInputSchema = z.object({
    text: z.string().min(100, "Le texte est trop court pour extraire une recette").max(50_000),
});


function hasValidImageMagicBytes(buffer: ArrayBuffer): boolean {
    const bytes = new Uint8Array(buffer.slice(0, 12));
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const png  = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
    const gif  = bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46;
    const webp = bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
    return jpeg || png || gif || webp;
}

export async function POST(req: NextRequest) {
    try {
        const { error } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token manquant ou invalide", { status: 403 });
        }

        const [mealCategories, ingredientCategories] = await Promise.all([
            db.categoryMeal.findMany({ select: { name: true } }),
            db.categoryIngredient.findMany({ select: { name: true } }),
        ]);

        const mealCategoryNames = mealCategories.map((c) => c.name);
        const ingredientCategoryNames = ingredientCategories.map((c) => c.name);

        const contentType = req.headers.get("content-type") ?? "";

        if (contentType.includes("multipart/form-data")) {
            return await imageProcessing(req, mealCategoryNames, ingredientCategoryNames);
        }

        if (contentType.includes("application/json")) {
            return await jsonProcessing(req, mealCategoryNames, ingredientCategoryNames);
        }

        return NextResponse.json(
            { error: "Content-Type non supporté" },
            { status: 415 }
        );
    } catch (error) {
        console.error("[IMPORT_RECIPE_ERROR]", error);
        const raw = error instanceof Error ? error.message : "";

        let message = "Erreur lors de l'import de la recette";
        if (raw.includes("403") || raw.includes("bloque")) message = "Ce site bloque les accès automatiques. Essayez l'onglet Image ou Texte.";
        else if (raw.includes("URL non autorisée")) message = "URL non autorisée";
        else if (raw.includes("trop court")) message = "Le contenu est trop court pour extraire une recette";
        else if (raw.includes("JSON")) message = "L'IA n'a pas retourné un format valide, réessayez";
        else if (raw.includes("timeout") || raw.includes("Timeout")) message = "L'analyse a pris trop de temps, réessayez";
        else if (raw.includes("Données de recette invalides")) message = "L'IA n'a pas pu structurer la recette correctement, réessayez";

        return NextResponse.json({ error: message }, { status: 500 });
    }
}

async function imageProcessing(req: Request, mealCategoryNames: string[], ingredientCategoryNames: string[]): Promise<NextResponse> {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
        return NextResponse.json({ error: "Fichier image requis" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
            { error: "Format d'image non supporté. Utilisez JPEG, PNG, GIF ou WebP." },
            { status: 400 }
        );
    }

    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { error: "L'image ne doit pas dépasser 5MB" },
            { status: 400 }
        );
    }

    // Lit le début du fichier pour vérifier les magic bytes avant de le convertir en base64
    const buffer = await file.arrayBuffer();

    if (!hasValidImageMagicBytes(buffer)) {
        return NextResponse.json(
            { error: "Le fichier ne semble pas être une image valide" },
            { status: 400 }
        );
    }

    const base64 = Buffer.from(buffer).toString("base64");

    const recipe = await extractRecipeFromImage(
        base64,
        file.type,
        mealCategoryNames,
        ingredientCategoryNames
    );
    const meal = await importRecipeToDB(recipe);

    return NextResponse.json(meal, { status: 201 });
}

async function jsonProcessing(req: Request, mealCategoryNames: string[], ingredientCategoryNames: string[]): Promise<NextResponse> {
    const body = await req.json();
    if ("text" in body) {
        const validation = textInputSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }
        const recipe = await extractRecipeFromText(
            validation.data.text,
            mealCategoryNames,
            ingredientCategoryNames
        );
        const meal = await importRecipeToDB(recipe);
        return NextResponse.json(meal, { status: 201 });
    }

    const validation = urlInputSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const recipe = await extractRecipeFromUrl(
        validation.data.url,
        mealCategoryNames,
        ingredientCategoryNames
    );
    const meal = await importRecipeToDB(recipe);
    return NextResponse.json(meal, { status: 201 });
}
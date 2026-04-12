import {
    AIRecipeResult,
    AIRecipeResultSchema,
    VALID_UNITS,
} from "@/lib/types/ai_import_types";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";

const models = {
    image: { name: "gemma4:31b-cloud", timeout: 50000 },
    text: { name: "gemma3:4b", timeout: 20000 },
    url: { name: "gemma3:4b", timeout: 20000 },
};

function getTimeout(modelName: string): number {
    const model = Object.values(models).find((model) => model.name === modelName);
    return model ? model.timeout : 20000; // timeout par défaut de 20s    
}

const UNIT_LIST = VALID_UNITS.join(", ");

function buildPrompt(
    mealCategories: string[],
    ingredientCategories: string[],
): string {
    return `
        Tu dois retourner UNIQUEMENT un objet JSON valide, sans markdown, sans explication, sans balises de code.

        Le JSON doit respecter exactement cette structure :
        {
        "name": "string (nom de la recette en français)",
        "description": "string optionnel (description courte)",
        "categoryMeal": "string (DOIT être exactement l'une de ces valeurs : ${mealCategories.join(", ")})",
        "prepTime": number (temps de préparation en minutes, entier >= 0),
        "cookTime": number optionnel (temps de cuisson en minutes, entier >= 0),
        "ingredients": [
            {
            "name": "string (nom en français, minuscules)",
            "quantity": number (positif),
            "unit": "string (DOIT être exactement l'une de : ${UNIT_LIST}. Choisir l'unité cohérente avec la recette : GRAM/KILOGRAM pour les solides pesés, LITER/CENTILITER/MILLILITER pour les liquides, TEASPOON/TABLESPOON/PINCH pour épices et condiments en petites doses, CUP pour les mesures volumétriques anglo-saxonnes, SLICE/HANDFUL/BUNCH pour des portions naturelles, PIECE pour tout le reste. Défaut : PIECE)",
            "categoryIngredient": "string (DOIT être exactement l'une de ces valeurs : ${ingredientCategories.join(", ")})"
            }
        ],
        "steps": [
            {
            "stepNumber": number (entier positif, commence à 1),
            "description": "string (description de l'étape)"
            }
        ]
        }

        Règles strictes :
        - Tous les textes en français
        - Les noms d'ingrédients en minuscules
        - categoryMeal DOIT être exactement l'une des valeurs listées ci-dessus (choisis la plus proche sémantiquement)
        - categoryIngredient DOIT être exactement l'une des valeurs listées ci-dessus (choisis la plus proche sémantiquement)
        - L'unité DOIT être exactement l'une de : ${UNIT_LIST} — choisie selon la nature de l'ingrédient et le contexte de la recette (ex: farine → GRAM, eau → MILLILITER, sel → TEASPOON, carotte / oignon, poireau / œuf → PIECE)
        - prepTime et cookTime en minutes (entiers)
        - Les étapes numérotées à partir de 1
        - Retourne UNIQUEMENT le JSON, rien d'autre
    `;
}

async function ollamaChat(
    model: string,
    prompt: string,
    base64Image?: string,
): Promise<string> {
    const timeout = getTimeout(model);
    const message: Record<string, unknown> = {
        role: "user",
        content: prompt,
    };

    if (base64Image) {
        message.images = [base64Image];
    }

    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model,
            messages: [message],
            stream: false,
            options: {
                temperature: 0.1, // basse température pour plus de cohérence et moins d'inventions
            },
        }),
        signal: AbortSignal.timeout(timeout),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Ollama error (${response.status}): ${err}`);
    }

    const data = (await response.json()) as { message?: { content?: string } };
    const text = data.message?.content;

    if (!text) throw new Error("Réponse vide de Ollama");
    return text;
}

export async function extractRecipeFromImage(
    base64Image: string,
    mimeType: string,
    mealCategories: string[],
    ingredientCategories: string[],
): Promise<AIRecipeResult> {
    // valide type MIME côté serveur pour éviter les erreurs de l'IA dues à des formats inattendus
    void mimeType;

    const prompt = `Analyse cette image de recette de cuisine.\n${buildPrompt(mealCategories, ingredientCategories)}`;
    const text = await ollamaChat(models.image.name, prompt, base64Image);

    return parseAndValidateAIResponse(text);
}

export async function extractRecipeFromText(
    text: string,
    mealCategories: string[],
    ingredientCategories: string[],
): Promise<AIRecipeResult> {
    if (text.trim().length < 100) {
        throw new Error("Le texte est trop court pour extraire une recette");
    }

    const prompt = `Voici le contenu textuel d'une recette de cuisine :\n\n${text.slice(0, 12000)}\n\n${buildPrompt(mealCategories, ingredientCategories)}`;
    const aiResponse = await ollamaChat(models.text.name, prompt);

    return parseAndValidateAIResponse(aiResponse);
}

// Protection contre les SSRF et les accès à des ressources internes potentiellement sensibles. On autorise localhost pour permettre l'import depuis une instance locale de Ollama, mais on bloque les autres IP privées courantes.
function isInternalUrl(rawUrl: string): boolean {
    try {
        const { hostname } = new URL(rawUrl);
        if (["localhost", "0.0.0.0", "::1"].includes(hostname)) return true;
        return /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.|169\.254\.|fc00:|fe80:)/.test(hostname);
    } catch {
        return true;
    }
}

export async function extractRecipeFromUrl(
    url: string,
    mealCategories: string[],
    ingredientCategories: string[],
): Promise<AIRecipeResult> {
    if (isInternalUrl(url)) {
        throw new Error("URL non autorisée");
    }

    const htmlResponse = await fetch(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Encoding": "gzip, deflate, br",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Upgrade-Insecure-Requests": "1",
        },
        signal: AbortSignal.timeout(20000),
    });

    if (!htmlResponse.ok) {
        if (htmlResponse.status === 403) {
            throw new Error(
                "Ce site bloque les accès automatiques (403). Essayez d'uploader une capture d'écran de la recette à la place.",
            );
        }
        throw new Error(
            `Impossible d'accéder à l'URL : ${htmlResponse.status}`,
        );
    }

    const html = await htmlResponse.text();
    const pageText = extractTextFromHtml(html);

    if (pageText.length < 100) {
        throw new Error(
            "Le contenu de la page est trop court pour extraire une recette",
        );
    }

    const prompt = `Voici le contenu textuel d'une page web contenant une recette de cuisine :\n\n${pageText.slice(0, 12000)}\n\n${buildPrompt(mealCategories, ingredientCategories)}`;
    const aiResponse = await ollamaChat(models.url.name, prompt);

    return parseAndValidateAIResponse(aiResponse);
}

function extractTextFromHtml(html: string): string {
    return html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, " ")
        .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, " ")
        .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/\s{2,}/g, " ")
        .trim();
}

// Evite les erreurs de validation dues à des unités ou quantités mal interprétées par l'IA
function sanitizeAIResponse(parsed: unknown): unknown {
    if (typeof parsed !== "object" || parsed === null) return parsed;

    const recipe = parsed as Record<string, unknown>;

    if (Array.isArray(recipe.ingredients)) {
        recipe.ingredients = recipe.ingredients.map((ing: Record<string, unknown>) => ({
            ...ing,
            quantity: typeof ing.quantity === "number" ? ing.quantity : 1,
            unit: VALID_UNITS.includes(ing.unit as typeof VALID_UNITS[number]) ? ing.unit : "PIECE",
        }));
    }

    return recipe;
}

function parseAndValidateAIResponse(raw: string): AIRecipeResult {
    const jsonMatch =
        raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/) ??
        raw.match(/(\{[\s\S]*\})/);
    const jsonStr = jsonMatch ? jsonMatch[1] : raw.trim();

    let parsed: unknown;
    try {
        parsed = JSON.parse(jsonStr);
    } catch {
        throw new Error("L'IA n'a pas retourné un JSON valide");
    }

    const sanitized = sanitizeAIResponse(parsed);

    const result = AIRecipeResultSchema.safeParse(sanitized);
    if (!result.success) {
        throw new Error(
            `Données de recette invalides : ${result.error.message}`,
        );
    }

    return result.data;
}

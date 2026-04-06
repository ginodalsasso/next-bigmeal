import API_ROUTES from "../constants/api_routes";
import { MealType } from "../types/schemas_interfaces";

export async function importRecipeFromTextAPI(text: string, csrfToken: string): Promise<MealType> {
    const response = await fetch(API_ROUTES.mealsImport, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error ?? "Erreur lors de l'import de la recette");
    }

    return data;
}

export async function importRecipeFromImageAPI(file: File, csrfToken: string): Promise<MealType> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(API_ROUTES.mealsImport, {
        method: "POST",
        headers: { "X-CSRF-Token": csrfToken },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error ?? "Erreur lors de l'import de la recette");
    }

    return data;
}

export async function importRecipeFromUrlAPI(url: string, csrfToken: string): Promise<MealType> {
    const response = await fetch(API_ROUTES.mealsImport, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error ?? "Erreur lors de l'import de la recette");
    }

    return data;
}

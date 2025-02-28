import API_ROUTES from "../constants/api_routes";

export async function createIngredientAPI(ingredientData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.ingredients, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(ingredientData),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création de l'ingrédient");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] createIngredientAPI", error);
        throw error;
    }
}


export async function updateIngredientAPI(ingredientData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.ingredients, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(ingredientData),
        });

        if (!response.ok) {
            throw new Error("Échec de la mise à jour de l'ingrédient");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] updateIngredientAPI", error);
        throw error;
    }
}

export async function fetchIngredientAPI(ingredientName: string) {
    try {
        const response = await fetch(`${API_ROUTES.ingredients}/${ingredientName}`);
        if (!response.ok) {
            throw new Error("Failed to fetch ingredient");
        }
        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] fetchIngredientAPI", error);
        throw error;
    }
}
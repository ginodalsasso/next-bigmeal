import API_ROUTES from "../constants/api_routes";

export async function createMealAPI(mealData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.meals, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(mealData),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création du repas");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] createMealAPI", error);
        throw error;
    }
}

export async function updateMealAPI(mealData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.meals, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(mealData),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du repas");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] updateMealAPI", error);
        throw error;
    }
}

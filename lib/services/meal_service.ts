import API_ROUTES from "../constants/api_routes";
import { MealFormData } from "../constraints/forms_constraints";
import { MealType } from "../types/schemas_interfaces";
import { MessageResponse } from "../types/api_responses";

export async function createMealAPI(mealData: MealFormData, csrfToken: string): Promise<MealType> {
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

export async function updateMealAPI(mealData: MealFormData, csrfToken: string): Promise<MealType> {
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

export async function likedMealAPI(mealName: string, csrfToken: string): Promise<MessageResponse> {
    try {
        const response = await fetch( `${API_ROUTES.meals}/${mealName}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du statut du like");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] likedMealAPI", error);
        throw error;
    }
}

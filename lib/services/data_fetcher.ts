import API_ROUTES from "../constants/api_routes";
import {
    CategoryHouseholdProductType,
    CategoryIngredientType,
    CategoryMealType,
    MealType,
} from "../types/schemas_interfaces";

export async function getCategoriesIngredient(): Promise<CategoryIngredientType[]> {
    try {
        const response = await fetch( API_ROUTES.categories.ingredient, { cache: 'no-store' });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}

export async function getCategoriesMeal(): Promise<CategoryMealType[]> {
    try {
        const response = await fetch( API_ROUTES.categories.meal, { cache: 'no-store' });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}

export async function getCategoriesHouseholdProduct(): Promise<CategoryHouseholdProductType[]> {
    try {
        const response = await fetch( API_ROUTES.categories.householdProduct, { cache: 'no-store' });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}



export async function getMeal(mealName: string): Promise<MealType> {
    try {
        const response = await fetch(`${API_ROUTES.meals}/${mealName}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération du repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer le repas.");
    }
}

export async function getLikedMeals(
        skip = 0,
        take = 10,
        categories: string[] = [],
): Promise<MealType[]> {
    try {
        const url = new URL(`${API_ROUTES.meals}/favorites`);
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('take', take.toString());

        categories.forEach(category => url.searchParams.append('categories', category));

        const response = await fetch(url.toString(), { cache: "no-store" });

        if (!response.ok) throw new Error("Erreur lors de la récupération des repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les repas.");
    }
}

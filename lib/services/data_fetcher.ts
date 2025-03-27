import API_ROUTES from "../constants/api_routes";

export async function getCategoriesIngredient() {
    try {
        const response = await fetch( API_ROUTES.categories.ingredient, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}

export async function getCategoriesMeal() {
    try {
        const response = await fetch( API_ROUTES.categories.meal, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}

export async function getIngredients() {
    try {
        const response = await fetch(`${API_ROUTES.ingredients}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des ingrédients.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les ingrédients.");
    }
}

export async function getMeals() {
    try {
        const response = await fetch( API_ROUTES.meals , { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les repas.");
    }
}

export async function getMeal(mealName: string) {
    try {
        const response = await fetch(`${API_ROUTES.meals}/${mealName}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération du repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer le repas.");
    }
}


export async function getUsers() {
    try {
        const response = await fetch(API_ROUTES.user.user, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les utilisateurs.");
    }
}
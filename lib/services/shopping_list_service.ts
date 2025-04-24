import API_ROUTES from "../constants/api_routes";
import { IngredientUnit } from "../types/enums";

export async function fetchShoppingListAPI() {
    try {
        const response = await fetch( API_ROUTES.shoppingList.list);
        if (!response.ok) throw new Error("Erreur lors de la récupération de la liste.");
        return response.json();
    } catch (error) {
        console.error("[API_ERROR] fetchShoppingList", error);
        throw error;
    }
}

export async function createShoppingListMealAPI(ingredientId: string, mealId: string, quantity: number, unit: IngredientUnit, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.shoppingList.list, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({
                ingredientId,
                mealId,
                quantity,
                unit,
            }),
        });
        if (!response.ok) throw new Error('Erreur lors de l\'ajout du repas à la liste de courses');
    } catch (error) {
        console.error("[API_ERROR] createShoppingListMeal", error);
        throw error;
    }
}


export async function createShoppingListIngredientAPI(ingredientId: string, quantity: number, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.shoppingList.list, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({
                ingredientId,
                quantity,
            }),
        });
        if (!response.ok) throw new Error('Erreur lors de l\'ajout de l\'ingrédient à la liste de courses');
    } catch (error) {
        console.error("[API_ERROR] createShoppingListIngredient", error);
        throw error;
    }
}

export async function createShoppingListProductAPI(productId: string, quantity: number, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.shoppingList.list, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({
                productId,
                quantity,
            }),
        });

        if (!response.ok) throw new Error('Erreur lors de l\'ajout du produit à la liste de courses');
    } catch (error) {
        console.error("[API_ERROR] createShoppingListProductAPI", error);
        throw error;
    }
}


export async function toggleItemCheckedAPI(id: string, isChecked: boolean, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.shoppingList.list, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({ id, isChecked }),
        });
        if (!response.ok) throw new Error("Erreur lors de la mise à jour de l'élément.");
    } catch (error) {
        console.error("[API_ERROR] toggleItemChecked", error);
        throw error;
    }
}

export async function markShoppingListAsExpiredAPI(id: string, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.shoppingList.list, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({ id, isExpired: true }),
        });
        if (!response.ok) throw new Error("Erreur lors de la mise à jour de la liste.");
    } catch (error) {
        console.error("[API_ERROR] markShoppingListAsExpired", error);
        throw error;
    }
}

export async function updateItemQuantityAPI(id: string, quantity: number, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.shoppingList.item, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({ id, quantity }),
        });
        if (!response.ok) throw new Error("Erreur lors de la mise à jour de la quantité.");
    } catch (error) {
        console.error("[API_ERROR] updateItemQuantity", error);
        throw error;
    }
}
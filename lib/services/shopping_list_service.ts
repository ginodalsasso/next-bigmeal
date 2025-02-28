import API_ROUTES from "../constants/api_routes";

export async function fetchShoppingListAPI() {
    try {
        const response = await fetch( API_ROUTES.shoppingList);
        if (!response.ok) throw new Error("Erreur lors de la récupération de la liste.");
        return response.json();
    } catch (error) {
        console.error("[API_ERROR] fetchShoppingList", error);
        throw error;
    }
}

export async function createShoppingListMealAPI(ingredientId: string, quantity: number , mealId: string, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.shoppingList, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({
                ingredientId,
                quantity,
                mealId,
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
        const response = await fetch( API_ROUTES.shoppingList, {
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


export async function toggleItemCheckedAPI(id: string, isChecked: boolean, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.shoppingList, {
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
        const response = await fetch( API_ROUTES.shoppingList, {
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


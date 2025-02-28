export async function fetchShoppingListAPI() {
    try {
        const response = await fetch("/api/shopping-list");
        if (!response.ok) throw new Error("Erreur lors de la récupération de la liste.");
        return response.json();
    } catch (error) {
        console.error("[API_ERROR] fetchShoppingList", error);
        throw error;
    }
}

export async function toggleItemCheckedAPI(id: string, isChecked: boolean, csrfToken: string) {
    try {
        const response = await fetch("/api/shopping-list", {
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
        const response = await fetch("/api/shopping-list", {
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

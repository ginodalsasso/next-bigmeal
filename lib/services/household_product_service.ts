import API_ROUTES from "../constants/api_routes";

export async function createHouseholdProductAPI(householdProductData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.householdProduct, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(householdProductData),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création du produit");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] createHouseholdProductAPI", error);
        throw error;
    }
}

export async function updateHouseholdProductAPI(householdProductData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.householdProduct, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(householdProductData),
        });

        if (!response.ok) {
            throw new Error("Échec de la mise à jour du produit");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] updateHouseholdProductAPI ", error);
        throw error;
    }
}
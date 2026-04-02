import API_ROUTES from "../constants/api_routes";
import { HouseholdProductFormType } from "../types/forms_interfaces";
import { HouseholdProductType } from "../types/schemas_interfaces";

export async function createHouseholdProductAPI(householdProductData: HouseholdProductFormType, csrfToken: string): Promise<HouseholdProductType> {
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

export async function updateHouseholdProductAPI(householdProductData: HouseholdProductFormType, csrfToken: string): Promise<HouseholdProductType> {
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

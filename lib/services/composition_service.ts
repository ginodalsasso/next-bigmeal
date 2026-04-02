import API_ROUTES from "../constants/api_routes";
import { CompositionFormType, UpdateCompositionFormType } from "../types/forms_interfaces";
import { CompositionType } from "../types/schemas_interfaces";

export async function createCompositionAPI(compositionData: CompositionFormType[], csrfToken: string): Promise<CompositionType[]> {
    try {
        const response = await fetch(API_ROUTES.compositions, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify(compositionData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erreur lors de la création de la composition");
        }

        return data;
    } catch (error) {
        console.error("[API_ERROR] createCompositionAPI", error);
        throw error;
    }
}


export async function updateCompositionAPI(compositionData: UpdateCompositionFormType, csrfToken: string): Promise<CompositionType> {
    try {
        const response = await fetch( API_ROUTES.compositions, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(compositionData),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de la composition");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] updateCompositionAPI", error);
        throw error;
    }
}

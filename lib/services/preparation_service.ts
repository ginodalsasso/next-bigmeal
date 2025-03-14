import API_ROUTES from "../constants/api_routes";

export async function createPreparationAPI(preparationData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.preparation, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(preparationData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur inconnue");
        }

        return data;
    } catch (error) {
        console.error("[API_ERROR] createPreparationAPI", error);
        throw error;
    }
}
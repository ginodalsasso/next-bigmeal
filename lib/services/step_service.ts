import API_ROUTES from "../constants/api_routes";

export async function createStepAPI(stepData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.step, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(stepData),
        });
        
        return response;
    } catch (error) {
        console.error("[API_ERROR] createStepAPI", error);
        throw error;
    }
}

export async function updateStepAPI(stepData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.step, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(stepData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur inconnue");
        }

        return data;
    } catch (error) {
        console.error("[API_ERROR] updateStepAPI", error);
        throw error;
    }
}
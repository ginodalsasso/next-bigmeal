import API_ROUTES from "../constants/api_routes";

export async function createCompositionAPI(compositionData: object, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.compositions, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(compositionData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur inconnue");
        }

        return data;
    } catch (error) {
        console.error("[API_ERROR] createCompositionAPI", error);
        throw error;
    }
}


export async function updateCompositionAPI(compositionData: object, csrfToken: string) {
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

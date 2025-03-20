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

export async function updatePreparationAPI(preparationData: object, csrfToken: string) {
    
    if (!preparationData || Object.keys(preparationData).length === 0) {
        throw new Error("Les données de mise à jour sont invalides.");
    }
    try {
        const response = await fetch( API_ROUTES.preparation, {
            method: "PUT",
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
        console.error("[API_ERROR] updatePreparationAPI", error);
        throw error;
    }
}


export async function deletePreparationAPI(preparationId: string, csrfToken: string) {
    try {
        const response = await fetch( `${API_ROUTES.preparation}/${preparationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Erreur inconnue");
        }
        
        return data;
    } catch (error) {
        console.error("[API_ERROR] deletePreparationAPI", error);
        throw error;
    }
}
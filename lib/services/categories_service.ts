export async function createCategoryAPI(name: string, csrfToken: string, apiUrl: string) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de la catégorie");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] createCategoryAPI", error);
        throw error;
    }
}


export async function updateCategoryAPI(id: string, name: string, csrfToken: string, apiUrl: string) {
    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify({ id, name }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de la catégorie");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] updateCategoryAPI", error);
        throw error;
    }
}

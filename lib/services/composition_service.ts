export async function createCompositionAPI(compositionData: object, csrfToken: string) {
    try {
        const response = await fetch("/api/compositions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(compositionData),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création des compositions");
        }

        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] createCompositionAPI", error);
        throw error;
    }
}


export async function updateCompositionAPI(compositionData: object, csrfToken: string) {
    try {
        const response = await fetch("/api/compositions", {
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

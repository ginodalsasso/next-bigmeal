export async function getCategoriesIngredient() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/categories-ingredient`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}

export async function getCategoriesMeal() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/categories-meal`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}

export async function getIngredients() {
    try {
        const response = await fetch(`/api/ingredients`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des ingrédients.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les ingrédients.");
    }
}

export async function getMeals() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/meals`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les repas.");
    }
}

export async function getMeal(mealName: string) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/meals/${mealName}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération du repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer le repas.");
    }
}
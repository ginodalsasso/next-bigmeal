import API_ROUTES from "../constants/api_routes";

export async function getCategoriesIngredient() {
    try {
        const response = await fetch( API_ROUTES.categories.ingredient, { next: { revalidate: 86400 } });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}

export async function getCategoriesMeal() {
    try {
        const response = await fetch( API_ROUTES.categories.meal, { next: { revalidate: 86400 } });
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}

export async function getCategoriesHouseholdProduct() {
    try {
        const response = await fetch( API_ROUTES.categories.householdProduct, { next: { revalidate: 86400 } }); // Revalidation tous les jours
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les catégories.");
    }
}


export async function getHouseholdProduct(
    skip = 0, 
    take = 10, 
    categories: string[] = [], 
) {
    try {
        const url = new URL(`${API_ROUTES.householdProduct}`);
        // Gestion de la pagination
        // skip = le nombre d'ingrédients à ignorer, take = le nombre d'ingrédients à récupérer
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('take', take.toString());

        // Gestion des filtres (qui sont des tableaux)
        categories.forEach(category => url.searchParams.append('categories', category));
    
        const response = await fetch(url.toString(), { cache: "no-store" });

        if (!response.ok) throw new Error("Erreur lors de la récupération des produits ménagers.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les produits ménagers.");
    }
}

export async function getIngredients(
    skip = 0, 
    take = 10, 
    categories: string[] = [], 
    seasons: string[] = []
) {
    try {
        const url = new URL(`${API_ROUTES.ingredients}`);
        // Gestion de la pagination
        // skip = le nombre d'ingrédients à ignorer, take = le nombre d'ingrédients à récupérer
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('take', take.toString());

        // Gestion des filtres (qui sont des tableaux)
        categories.forEach(category => url.searchParams.append('categories', category));
        seasons.forEach(season => url.searchParams.append('seasons', season));
    
        const response = await fetch(url.toString(), { cache: "no-store" });

        if (!response.ok) throw new Error("Erreur lors de la récupération des ingrédients.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les ingrédients.");
    }
}

export async function getMeals(
        skip = 0, 
        take = 10, 
        categories: string[] = [], 
)  {
    try {
        const url = new URL(`${API_ROUTES.meals}`);
        // Gestion de la pagination
        // skip = le nombre de repas à ignorer, take = le nombre de repas à récupérer
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('take', take.toString());

        // Gestion des filtres (qui sont des tableaux)
        categories.forEach(category => url.searchParams.append('categories', category));
    
        const response = await fetch(url.toString(), { cache: "no-store" });

        if (!response.ok) throw new Error("Erreur lors de la récupération des repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les repas.");
    }
}

export async function getMeal(mealName: string) {
    try {
        const response = await fetch(`${API_ROUTES.meals}/${mealName}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération du repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer le repas.");
    }
}

export async function getLikedMeals(
        skip = 0, 
        take = 10, 
        categories: string[] = [], 
)  {
    try {
        const url = new URL(`${API_ROUTES.meals}/favorites`);
        // Gestion de la pagination
        // skip = le nombre de repas à ignorer, take = le nombre de repas à récupérer
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('take', take.toString());

        // Gestion des filtres (qui sont des tableaux)
        categories.forEach(category => url.searchParams.append('categories', category));
    
        const response = await fetch(url.toString(), { cache: "no-store" });

        if (!response.ok) throw new Error("Erreur lors de la récupération des repas.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les repas.");
    }
}


export async function getUsers() {
    try {
        const response = await fetch(API_ROUTES.user.user, { cache: "no-store" });
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les utilisateurs.");
    }
}
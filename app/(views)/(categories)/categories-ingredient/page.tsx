import CategoryIngredient from "../_components/CategoryIngredient";

async function getCategories() {
    const response = await fetch(`${process.env.API_URL}/api/categories-ingredient`, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
    return response.json();
}

export default async function CategoryIngredientPage() {
    const categoryIngredient = await getCategories();
    
    return <CategoryIngredient fetchedCategories={categoryIngredient} />;
}

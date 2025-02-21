import CategoryMealList from "../_components/CategoryMealList";

async function getCategories() {
    const response = await fetch(`${process.env.API_URL}/api/categories-meal`, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
    return response.json();
}

export default async function CategoryMealPage() {
    const categoryMeal = await getCategories();
    
    return <CategoryMealList fetchedCategories={categoryMeal} />;
}

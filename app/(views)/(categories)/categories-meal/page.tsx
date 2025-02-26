import CategoryMealList from "../_components/CategoryMealList";
import { getCategoriesMeal } from "@/lib/data_fetcher";

async function getCategoriesMeal() {
    const response = await fetch(`${process.env.API_URL}/api/categories-meal`, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
    return response.json();
}

export default async function CategoryMealPage() {
    const categoryMeal = await getCategoriesMeal();
    
    return <CategoryMealList fetchedCategories={categoryMeal} />;
}

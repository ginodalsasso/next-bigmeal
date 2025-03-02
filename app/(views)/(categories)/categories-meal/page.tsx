// Composant des catégories de repas
import CategoryMealList from "../_components/CategoryMealList";
// Service de récupération des catégories de repas
import { getCategoriesMeal } from "@/lib/services/data_fetcher";


export default async function CategoryMealPage() {
    const categoryMeal = await getCategoriesMeal();
    
    
    // _________________________ RENDU _________________________
    return <CategoryMealList fetchedCategories={categoryMeal} />;
}

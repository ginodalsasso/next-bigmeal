// Composant des catégories de repas
import CategoryMealList from "../_components/CategoryMealList";
// Service de récupération des catégories de repas
import { getCategoriesMeal } from "@/lib/services/data_fetcher";

// Forcer le rendu SSR
export const dynamic = "force-dynamic";

export default async function CategoryMealPage() {
    const categoryMeal = await getCategoriesMeal();
    
    
    // _________________________ RENDU _________________________
    return <CategoryMealList fetchedCategories={categoryMeal} />;
}

// Composant des catégories d'ingrédients
import CategoryIngredientList from "../_components/CategoryIngredientList";
// Service de récupération des catégories d'ingrédients
import { getCategoriesIngredient } from "@/lib/services/data_fetcher";

// Forcer le rendu SSR
export const dynamic = "force-dynamic";

export default async function CategoryIngredientPage() {
    const categoryIngredient = await getCategoriesIngredient();
    

    // _________________________ RENDU _________________________
    return <CategoryIngredientList fetchedCategories={categoryIngredient} />;
}

// Composant des catégories d'ingrédients
import CategoryIngredientList from "../_components/CategoryIngredientList";
// Service de récupération des catégories d'ingrédients
import { getCategoriesIngredient } from "@/lib/services/data_fetcher";


export default async function CategoryIngredientPage() {
    const categoryIngredient = await getCategoriesIngredient();
    

    // _________________________ RENDU _________________________
    return <CategoryIngredientList fetchedCategories={categoryIngredient} />;
}

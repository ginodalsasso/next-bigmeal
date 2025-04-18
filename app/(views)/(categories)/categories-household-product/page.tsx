// Composant des catégories d'ingrédients
import CategoryHouseholdProductList from "../_components/CategoryHouseholdProductList";
// Service de récupération des catégories d'ingrédients
import { getCategoriesHouseholdProduct } from "@/lib/services/data_fetcher";

// Forcer le rendu SSR
export const dynamic = "force-dynamic";

export default async function CategoryIngredientPage() {
    const categoryHouseholdProduct = await getCategoriesHouseholdProduct();
    

    // _________________________ RENDU _________________________
    return <CategoryHouseholdProductList fetchedCategories={categoryHouseholdProduct} />;
}

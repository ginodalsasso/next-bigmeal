import CategoryIngredientList from "../_components/CategoryIngredientList";
import { getCategoriesIngredient } from "@/lib/services/data_fetcher";

export default async function CategoryIngredientPage() {
    const categoryIngredient = await getCategoriesIngredient();
    
    return <CategoryIngredientList fetchedCategories={categoryIngredient} />;
}

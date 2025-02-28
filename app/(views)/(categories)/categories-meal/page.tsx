import CategoryMealList from "../_components/CategoryMealList";
import { getCategoriesMeal } from "@/lib/data_fetcher";

export default async function CategoryMealPage() {
    const categoryMeal = await getCategoriesMeal();
    
    return <CategoryMealList fetchedCategories={categoryMeal} />;
}

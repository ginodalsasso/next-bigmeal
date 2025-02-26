import IngredientsList from "./_components/IngredientsList";
import { getIngredients } from "@/lib/data_fetcher";

export default async function IngredientPage() {
    const ingredients = await getIngredients();
    
    return <IngredientsList fetchedIngredients={ingredients} />;
}

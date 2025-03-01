// Composant de liste des ingrédients
import IngredientsList from "./_components/IngredientsList";

// Service de récupération des ingrédients
import { getIngredients } from "@/lib/services/data_fetcher";


export default async function IngredientPage() {
    const ingredients = await getIngredients();
    
    // _________________________ RENDU _________________________
    return <IngredientsList fetchedIngredients={ingredients} />;
}

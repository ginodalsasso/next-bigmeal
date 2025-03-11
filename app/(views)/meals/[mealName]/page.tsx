// Composant affichant un repas
import MealItem from "../_components/MealItem";

// Service de récupération d'un repas
import { getMeal } from "@/lib/services/data_fetcher";


export default async function MealDetailPage({ params }: { params: { mealName: string } }) {
    // Récupère le nom du repas dans les paramètres de la requête
    const mealName = params.mealName;
    const meal = await getMeal(mealName);
    
    // _________________________ RENDU _________________________
    return <MealItem fetchedMeal={meal} />;
}

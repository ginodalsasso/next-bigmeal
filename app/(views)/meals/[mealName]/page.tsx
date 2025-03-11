// Composant affichant un repas
import MealItem from "../_components/MealItem";

// Service de récupération d'un repas
import { getMeal } from "@/lib/services/data_fetcher";

type MealProps = {
    params: {
        mealName: string;
    };
};


export default async function MealDetailPage({ params }: MealProps) {
// Récupère le nom du repas dans les paramètres de la requête
    const mealName = params.mealName;
    const meal = await getMeal(mealName);
    
    // _________________________ RENDU _________________________
    return <MealItem fetchedMeal={meal} />;
}

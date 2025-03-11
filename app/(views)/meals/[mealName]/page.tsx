// Composant affichant un repas
import MealItem from "../_components/MealItem";

// Service de récupération d'un repas
import { getMeal } from "@/lib/services/data_fetcher";


export default async function MealDetailPage({ params }: { params: { mealName: string } }) {
    // Récupère le nom du repas dans les paramètres de la requête
    const mealName = params.mealName;

    if (!mealName) {
        return <div>Erreur : Aucun nom de repas fourni.</div>;
    }

    const meal = await getMeal(mealName);

    if (!meal) {
        return <div>Repas introuvable.</div>;
    }    
    // _________________________ RENDU _________________________
    return <MealItem fetchedMeal={meal} />;
}

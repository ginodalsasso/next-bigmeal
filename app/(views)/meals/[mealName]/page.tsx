// Composant affichant un repas
import MealItem from "../_components/MealItem";

// Service de récupération d'un repas
import { getMeal } from "@/lib/services/data_fetcher";

type MealDetailPageProps = {
    params: Promise<{ mealName: string }>
};


export default async function MealDetailPage({ params }: MealDetailPageProps) {
    // Récupère le nom du repas dans les paramètres de la requête
    const { mealName } = await params;

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

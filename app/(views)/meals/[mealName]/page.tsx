import MealItem from "../_components/MealItem";
import { getMeal } from "@/lib/data_fetcher";

export default async function MealDetailPage({ params }: { params: { mealName: string } }) {
    // Récupère le nom du repas dans les paramètres de la requête
    const meal = await getMeal(params.mealName);
    
    return <MealItem fetchedMeal={meal} />;
}

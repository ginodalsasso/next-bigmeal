// Composant listant les repas
import MealsList from "./_components/MealsList";

// Service de récupération des repas
import { getMeals } from "@/lib/services/data_fetcher";


export default async function MealPage() {
    const meals = await getMeals();
    
    // _________________________ RENDU __________________
    return <MealsList fetchedMeals={meals} />;
}

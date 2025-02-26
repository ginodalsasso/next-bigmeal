import MealsList from "./_components/MealsList";
import { getMeals } from "@/lib/data_fetcher";

export default async function MealPage() {
    const meals = await getMeals();
    
    return <MealsList fetchedMeals={meals} />;
}

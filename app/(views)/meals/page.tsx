import MealsList from "./_components/MealsList";

async function getMeals() {
    const response = await fetch(`${process.env.API_URL}/api/meals`, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des repas.");
    return response.json();
}

export default async function MealPage() {
    const meals = await getMeals();
    
    return <MealsList fetchedMeals={meals} />;
}

import MealItem from "../_components/MealItem";

async function getMeal(mealName: string) {
    const response = await fetch(`${process.env.API_URL}/api/meals/${mealName}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération du repas.");
    return response.json();
}

export default async function MealDetailPage({ params }: { params: { mealName: string } }) {
    // Récupère le nom du repas dans les paramètres de la requête
    const meal = await getMeal(params.mealName);
    
    return <MealItem fetchedMeal={meal} />;
}

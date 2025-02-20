import IngredientsList from "./_components/IngredientsList";

async function getIngredients() {
    const response = await fetch(`${process.env.API_URL}/api/ingredients`, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur lors de la récupération des ingrédients.");
    return response.json();
}

export default async function IngredientPage() {
    const ingredients = await getIngredients();
    
    return <IngredientsList fetchedIngredients={ingredients} />;
}

import ShoppingList from "./_components/ShoppingList";

async function getShoppingList() {
    const response = await fetch(`${process.env.API_URL}/api/shopping-list`, { cache: "no-store" });

    if (!response.ok) throw new Error("Erreur lors de la récupération de la liste de courses.");
    return response.json();
}

export default async function ShoppingListPage() {
    const shoppingList =  await getShoppingList();
    
    return <ShoppingList fetchedShoppingList={shoppingList} />;
}

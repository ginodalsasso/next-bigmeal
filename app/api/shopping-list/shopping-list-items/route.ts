import { getCart } from "@/lib/dal";

export async function GET() {
    try {
        const shoppingListData = await getCart();
        // Récupérer la liste de courses 
        const shoppingList = shoppingListData?.shoppingList || [];

        if (shoppingList.length === 0) {
            console.log("Aucune liste de courses trouvée.");
            return new Response(
                JSON.stringify({ message: "Aucune liste de courses", count: 0 }),
                { status: 200 }
            );
        }

        // Calculer le nombre total d'ingrédients
        const ingredientCount = shoppingList.reduce((total, list) => {
            const listQuantity = list.items.reduce((sum, item) => sum + item.quantity, 0);
            return total + listQuantity; // Ajouter la quantité de chaque liste
        }, 0); // Initialiser le total à 0


        console.log(`Nombre total d'ingrédients : ${ingredientCount}`);
        return new Response(
            JSON.stringify({ count: ingredientCount }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur dans l'API /api/auth/status :", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}

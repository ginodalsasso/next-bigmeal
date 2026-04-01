import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";
import ShoppingList from "./_components/ShoppingList";

export const dynamic = "force-dynamic";

export default async function ShoppingListPage() {
    try {
        const { session } = await getUserSession();

        const shoppingList = await db.shoppingList.findFirst({
            where: {
                userId: session?.user.id,
                isExpired: false,
            },
            include: {
                items: {
                    include: {
                        ingredient: {
                            select: {
                                id: true,
                                name: true,
                                season: true,
                                categoryIngredient: { select: { id: true, name: true } },
                            },
                        },
                        product: {
                            select: {
                                id: true,
                                name: true,
                                categoryHouseholdProduct: { select: { id: true, name: true } },
                            },
                        },
                        meal: { select: { id: true, name: true } },
                    },
                },
            },
        });

        if (shoppingList) {
            shoppingList.items.sort((a, b) => {
                const catA = a.ingredient?.categoryIngredient?.name ?? a.product?.categoryHouseholdProduct?.name ?? "";
                const catB = b.ingredient?.categoryIngredient?.name ?? b.product?.categoryHouseholdProduct?.name ?? "";
                return catA.localeCompare(catB, "fr");
            });
        }

        return <ShoppingList fetchedShoppingList={shoppingList} />;
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération de la liste de courses :", error);
        return (
            <div className="flex min-h-screen items-center justify-center text-center">
                <p className="text-warm-danger">Erreur lors de la récupération de la liste de courses.</p>
            </div>
        );
    }
}

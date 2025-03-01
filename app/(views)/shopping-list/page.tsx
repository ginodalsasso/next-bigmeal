'use client';

// Bibliothèques tierces
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Composants UI
import { Button } from "@/components/ui/button";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import { Separator } from "@radix-ui/react-separator";

// Types
import { ShoppingListType } from "@/lib/types/schemas_interfaces";

// Utils
import { dateToString } from "@/lib/utils";

// Services
import {  fetchShoppingListAPI, markShoppingListAsExpiredAPI, toggleItemCheckedAPI } from "@/lib/services/shopping_list_service";


// _________________________ COMPONENT _________________________
const ShoppingListPage = () => {
    const router = useRouter(); 
    const csrfToken = useCsrfToken();
    const [shoppingList, setShoppingList] = useState<ShoppingListType | null>(null);
    const [loading, setLoading] = useState(true);


    // _________________________ LOGIQUE _________________________
    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                const data: ShoppingListType = await fetchShoppingListAPI();
                setShoppingList(data);
            } catch (error) {
                console.error("Error fetching shoppingList:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchShoppingList();
    }, []);

    
    // Transformer un item en coché ou non
    const toggleItemChecked = async (id: string, currentChecked: boolean) => {
        try {
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            // Calcul de l'état cible (inversion de l'état actuel)
            const newCheckedState = !currentChecked;

            // Mise à jour optimiste (local)
            setShoppingList((prev) => prev && {
                ...prev,
                items: prev.items.map((item) => {
                    if (item.id === id) {
                        return { ...item, isChecked: newCheckedState };
                    }
                    return item;
                })
            });
            await toggleItemCheckedAPI(id, newCheckedState, csrfToken);

        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            toast.error("Impossible de mettre à jour l'élément.");
        }
    };

    // Marquer la liste de courses comme terminée
    const markShoppingListAsExpired = async () => {
        if (shoppingList) {
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            try {
                await markShoppingListAsExpiredAPI(shoppingList.id, csrfToken);

                toast.success("La liste de courses a été marquée comme terminée !");
                router.push('/'); // Redirection vers la page d'accueil
            } catch (error) {
                console.error("Erreur lors de la mise à jour :", error);
                toast.error("Impossible de marquer la liste comme terminée.");
            }
        }
    };

    // Vérifier si tous les ingrédients sont cochés
    const setShoppingListExpired = async () => {
        if (shoppingList) {
            // Vérifier si la liste de courses correspond à l'ID
            const list = shoppingList;
            if (list) {
                const items = list.items;
                // Vérifier si tous les items sont cochés
                const allChecked = items.every((item) => item.isChecked);

                if (allChecked) {
                    await markShoppingListAsExpired();
                } else {
                    toast.error("Tous les ingrédients ne sont pas cochés !");
                    return false;
                }
            }
        }
        return false;
    };


    // Suppression d'un ingrédient dans le state après suppression API
    const handleIngredientDeleted = (ingredientId: string) => {
        setShoppingList((prev) => prev && {
            ...prev,
            items: prev.items.filter((item) => item.id !== ingredientId)
        });
    };

    // Suppression d'un repas dans le state après suppression API
    const handleMealDeleted = (mealId: string) => {
        setShoppingList((prev) => prev && {
            ...prev,
            items: prev.items.filter((item) => item.mealId !== mealId)
        });
    }


    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (!shoppingList) return <div>Aucune liste de courses.</div>;

    const ingredientsAlone = shoppingList?.items.filter(item => !item.mealId);
    const ingredientsByMeal = shoppingList?.items.filter(item => item.mealId);

    return (
        <div>
            <div className="mb-4 text-right">
                <p className="text-lg font-bold">Date de création : {dateToString(shoppingList.createdAt)}</p>
                <p className="text-lg font-bold">{shoppingList?.items?.length} ingrédients à la liste.</p>
            </div>

            {/* Affichage des ingrédients seuls */}
            {ingredientsAlone && ingredientsAlone.length > 0 && (
                <div className="mb-8 border border-neutral-500 p-4">
                    <h2 className="text-center text-2xl">Ingrédients seuls</h2>
                    {ingredientsAlone.map((item) => (
                        <div key={item.id} >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2 size-4"
                                        checked={item.isChecked}
                                        onChange={() => toggleItemChecked(item.id, item.isChecked ?? false)}
                                    />
                                    <span className={item.isChecked ? "line-through" : ""}>
                                        {item.quantity} {item.ingredient?.name || "Ingrédient non défini"}
                                    </span>
                                </div>
                                <DeleteItem
                                    apiUrl="/api/shopping-list/item"
                                    id={item.id}
                                    onSubmit={handleIngredientDeleted}
                                />                            
                            </div>
                            <Separator className="my-2 h-px bg-neutral-800" />
                        </div>
                    ))}
                </div>
            )}
            
            {/* Affichage des ingrédients par repas */}
            {ingredientsByMeal && ingredientsByMeal.length > 0 && (
                <div className="mb-8 border border-neutral-500 p-4">
                    <h2 className="text-center text-2xl">Repas</h2>
                    {/* Parcourt les repas et les ingrédients associés */}
                    {Array.from(new Set(ingredientsByMeal.map(item => item.mealId))) // Extraire des IDs de repas uniques
                        .map(mealId => { // Parcourt chaque ID de repas unique
                            const mealItems = ingredientsByMeal.filter(item => item.mealId === mealId); //Filtre les ingrédients qui appartiennent à ce repas (mealId)
                            const mealName = mealItems[0]?.meal?.name || "Repas non défini"; // Récupère le nom du repas ou affiche "Repas non défini"
                        return (
                            <div key={mealId} className="mb-4">
                                <div className="flex items-center justify-between" >
                                    <h3 className="text-lg font-bold">
                                        {mealName}
                                    </h3>
                                    <DeleteItem
                                        apiUrl="/api/shopping-list/meal"
                                        id={mealId}
                                        onSubmit={handleMealDeleted}
                                    />                                </div>
                                <Separator className="my-2 h-px bg-neutral-800" />
                                {mealItems.map((item) => (
                                    <div key={item.id}>
                                        <div className="my-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2 size-4"
                                                checked={item.isChecked}
                                                onChange={() => toggleItemChecked(item.id, item.isChecked ?? false)}
                                            />
                                            <span className={item.isChecked ? "line-through" : ""}>
                                                {item.quantity} {item.ingredient?.name || "Ingrédient non défini"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <Separator className="my-4 h-px bg-neutral-800" />
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="mt-2 flex justify-end">
                <Button variant="default" className="w-full" onClick={setShoppingListExpired}>
                    J&apos;ai fini mes courses
                </Button>
            </div>
        </div>
    );
};

export default ShoppingListPage;
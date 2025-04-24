'use client';

// Bibliothèques tierces
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Composants UI
import { Button } from "@/components/ui/button";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import { Separator } from "@radix-ui/react-separator";

// Types
import { ShoppingListType } from "@/lib/types/schemas_interfaces";

// Utils
import { dateToString } from "@/lib/utils";

// Services
import {  fetchShoppingListAPI, markShoppingListAsExpiredAPI, toggleItemCheckedAPI, updateItemQuantityAPI } from "@/lib/services/shopping_list_service";
import { getCsrfToken } from "next-auth/react";
import { Minus, Plus } from "lucide-react";


// _________________________ COMPONENT _________________________
const ShoppingListPage = () => {
    const router = useRouter(); 
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
            const csrfToken = await getCsrfToken();
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
            const csrfToken = await getCsrfToken();
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
    const handleItemDeleted = (itemId: string) => {
        setShoppingList((prev) => prev && {
            ...prev,
            items: prev.items.filter((item) => item.id !== itemId)
        });
    };

    // Mise à jour de la quantité d'un ingrédient
    const updateItemQuantity = async (id: string, newQuatity: number) => {
        if (shoppingList) {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            try {
                setShoppingList((prev) => prev && { // Mise à jour optimiste (local)
                    ...prev,
                    items: prev.items.map((item) => { // itération sur les items
                        if (item.id === id) { // Si l'ID correspond, on met à jour la quantité
                            return { ...item, quantity: newQuatity }; // on retourne l'item avec la nouvelle quantité
                        }
                        return item;
                    })
                });

                await updateItemQuantityAPI(id, newQuatity, csrfToken);
            } catch (error) {
                console.error("Erreur lors de la modification:", error);
                toast.error("Impossible de mettre à jour l'élément.");
            }
        }
    }


    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (!shoppingList) return <div>Aucune liste de courses.</div>;

    const meals = Array.from(new Set(shoppingList.items.map(item => item.meal?.name).filter(Boolean)));

    return (
        <div>
            <div className="mb-4 text-right">
                <p className="text-lg font-bold">Date de création : {dateToString(shoppingList.createdAt)}</p>
                <p className="text-lg font-bold">{shoppingList.items.length} ingrédients à la liste.</p>
            </div>
            <h1 className="text-center text-2xl">Liste de courses</h1>

            {/* Affichage des repas */}
            {meals.length > 0 && (
                <div>
                    <h4 className="mb-2 mt-4 text-lg font-semibold">Plats :</h4>
                    <ul>
                        {meals.map((meal, index) => (
                            <li key={index} className="flex justify-between">
                                {meal}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Affichage des ingrédients */}
            <div className="mb-8 border border-neutral-500 p-4">
                {shoppingList.items.map((item) => ( console.log(item), // Debug
                    <div key={item.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 size-4"
                                    checked={item.isChecked}
                                    onChange={() => toggleItemChecked(item.id, item.isChecked ?? false)}
                                />

                                <div className="flex items-center">
                                    { item.quantity && item.quantity > 1 &&
                                        <button 
                                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus />
                                    </button>}

                                    <span className={item.isChecked ? "line-through" : ""}>
                                        {item.quantity} {item.unit?.toLowerCase() ?? ""} – {item.ingredient?.name || item.product?.name}

                                    </span>
                                    
                                    <button 
                                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus />
                                    </button>
                                </div>
                            </div>
                            <DeleteItem
                                apiUrl="/api/shopping-list/item"
                                id={item.id}
                                onSubmit={handleItemDeleted}
                            />
                        </div>
                        <Separator className="my-2 h-px bg-neutral-800" />
                    </div>
                ))}
            </div>

            <div className="mt-2 flex justify-end">
                <Button variant="default" className="w-full" onClick={setShoppingListExpired}>
                    J&apos;ai fini mes courses
                </Button>
            </div>
        </div>
    );
};

export default ShoppingListPage;
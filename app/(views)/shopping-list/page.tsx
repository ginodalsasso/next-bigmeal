'use client';

import { useCsrfToken } from "@/app/context/CsrfContext";
import DeleteItem from "@/components/layout/DeleteItem";
import { ShoppingListType } from "@/lib/types/schemas_interfaces";
import { countTotalQuantities, dateToString } from "@/lib/utils";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ShoppingListPage = () => {
    const csrfToken = useCsrfToken();
    const [shoppingList, setShoppingList] = useState<ShoppingListType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                const response = await fetch("/api/shopping-list");

                if (!response.ok) {
                    throw new Error("Failed to fetch shoppingList");
                }
                const data: ShoppingListType[] = await response.json();
                setShoppingList(data);
            } catch (error) {
                console.error("Error fetching shoppingList:", error);
                toast.error("Impossible de charger les listes de courses.");
            } finally {
                setLoading(false);
            }
        };
        fetchShoppingList();
    }, []);

    
    // Transformer un item en coché ou non
    const toggleItemChecked = async (id: string, currentChecked: boolean) => {
    try {
        // Calcul de l'état cible (inversion de l'état actuel)
        const newCheckedState = !currentChecked;

        // Mise à jour optimiste (local)
        setShoppingList((prev) =>
            prev.map((list) => ({
                ...list,
                items: list.items.map((item) =>
                    item.id === id ? { ...item, isChecked: newCheckedState } : item
                ),
            }))
        );

        // Appel API pour sauvegarder l'état
        const response = await fetch("/api/shopping-list", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({ id, isChecked: newCheckedState }),
        });

        if (!response.ok) {
            throw new Error("Failed to update item");
        }

        toast(`L'article a été ${newCheckedState ? "coché" : "décoché"} !`);

    } catch (error) {
        console.error("Erreur lors de la modification:", error);
        toast.error("Impossible de mettre à jour l'élément.");
    }
};

const setShoppingListExpired = async (id: string) => {
    if (shoppingList) {
        // Rechercher la liste de courses correspondante
        const list = shoppingList.find((list) => list.id === id);
        if (list) {
            const items = list.items;
            // Vérifier si tous les items sont cochés
            const allChecked = items.every((item) => item.isChecked);
            if (allChecked) {
                toast.success("Tous les items de cette liste sont cochés !");
                return true;
            } else {
                toast.error("Tous les items ne sont pas cochés.");
                return false;
            }
        }
    }
    toast.error("Liste introuvable.");
    return false;
};






    // Appel API pour supprimer un item du panier
    const deleteItem = async (id: string) => {
        try {
            const response = await fetch("/api/shopping-list", {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken, 
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete item from shoppingList");
            }

            // Supprimer le repas du state
            setShoppingList((prev) =>
                prev.map((list) => ({
                    ...list, // Garder les autres propriétés inchangées
                    items: list.items.filter((item) => item.id !== id), // Supprimer l'item
                }))
            );  
            toast("Article supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            toast.error("Impossible de supprimer l'élément.");
        }
    };

    if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;
    if (!shoppingList) return <div>Listes de courses introuvables.</div>;

    return (
        <div>
            <h1>Listes de courses</h1>
            <ul>
                {shoppingList.map((list) => (
                    <li key={list.id}>
                        <ul>
                            <li>{dateToString(list.createdAt)}</li>
                            <br />
                            <li>{list.items.length} ingrédients</li>
                            {list.items.map((item) => (
                                <li key={item.id}>
                                    <span className={item.isChecked ? "line-through" : ""}>
                                        {item.quantity} {item.ingredient ? item.ingredient.name : "Ingrédient non défini"}
                                    </span>
                                    <DeleteItem onDelete={() => deleteItem(item.id)} isDeleting={false} />
                                    <input
                                        type="checkbox"
                                        checked={item.isChecked}
                                        onChange={() => toggleItemChecked(item.id, item.isChecked ?? false)}
                                        />
                                </li>                               
                            ))}

                        </ul>
                        <button onClick={() => setShoppingListExpired(list.id)}>
                            Vérifier si tous les items sont cochés
                        </button>
                    </li>

                ))}
            </ul>
            <hr />
            {countTotalQuantities(shoppingList)} ingrédients au total

        </div>
    );
};

export default ShoppingListPage;

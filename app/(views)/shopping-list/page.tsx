'use client';

import DeleteItem from "@/components/layout/DeleteItem";
import { ShoppingListType } from "@/lib/types/schemas_interfaces";
import { countTotalQuantities, dateToString } from "@/lib/utils";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ShoppingListPage = () => {

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
            } finally {
                setLoading(false);
            }
        };
        fetchShoppingList();
    }, []);

    
    // Transformer un item en coché ou non
    const toggleItemChecked = async (id: string) => {
        try {
            const response = await fetch("/api/shopping-list/shopping-list-items", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to update item");
            }
            // Mettre à jour le repas dans le state
            const isChecked = await response.json();
            setShoppingList((prev) =>
                prev.map((list) => ({
                    ...list, // Garder les autres propriétés inchangées
                    items: list.items.map((item) =>
                        item.id === id ? { ...item, isChecked } : item
                    ),
                }))
            );

        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            // setError("Erreur lors de la modification.");
        }
    }


    // Appel API pour supprimer un item du panier
    const deleteItem = async (id: string) => {
        try {
            const response = await fetch("/api/shopping-list", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
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
            // setError("Erreur lors de la suppression.");
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
                                    {item.quantity} {item.ingredient ? item.ingredient.name : "Ingrédient non défini"}
                                    <DeleteItem onDelete={() => deleteItem(item.id)} isDeleting={false} />
                                    <input
                                        type="checkbox"
                                        checked={item.isChecked}
                                        onChange={() => toggleItemChecked(item.id)}
                                    />
                                </li>                               
                            ))}

                        </ul>
                    </li>

                ))}
            </ul>
            <hr />
            {countTotalQuantities(shoppingList)} ingrédients au total
        </div>
    );
};

export default ShoppingListPage;

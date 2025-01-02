'use client';

import { ShoppingListType } from "@/lib/types/schemas_interfaces";
import { countTotalQuantities, dateToString } from "@/lib/utils";
import { useState, useEffect } from "react";

const ShoppingListPage = () => {
    const [shoppingList, setshoppingList] = useState<ShoppingListType[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                const response = await fetch("/api/shopping-list");

                if (!response.ok) {
                    throw new Error("Failed to fetch shoppingList");
                }
                const data: ShoppingListType[] = await response.json();
                setshoppingList(data);
            } catch (error) {
                console.error("Error fetching shoppingList:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchShoppingList();
    }, []);


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
                            <li>{list.items.length} ingrédients</li>
                            {list.items.map((item) => (
                                <li key={item.id}>
                                    {item.quantity} {item.ingredient ? item.ingredient.name : "Ingrédient non défini"}
                                </li>
                            ))}

                        </ul>
                    </li>
                ))}
            </ul>
            {countTotalQuantities(shoppingList)} ingrédients au total
        </div>
    );
};

export default ShoppingListPage;

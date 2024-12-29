import { ShoppingListType } from "@/lib/types/schemas_interfaces";
import { useState, useEffect } from "react";

const ShoppingList = () => {
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
                        <p>{list.meal?.name}</p>
                        <p>{list.ingredient?.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;


// Bibliothèques tierces
import React, { useState } from "react";

// Types et utils
import { ShoppingListType } from "@/lib/types/schemas_interfaces";
import { dateToString } from "@/lib/utils";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import API_ROUTES from "@/lib/constants/api_routes";
import { ChevronRight } from "lucide-react";

// _________________________ TYPE _________________________
interface ShoppingListsProps {
    shoppingLists: ShoppingListType[];
}

// _________________________ COMPONENT _________________________
const ShoppingLists: React.FC<ShoppingListsProps> = ({ shoppingLists }) => {

    const [lists, setLists] = useState<ShoppingListType[]>(shoppingLists);

    // Fonction pour supprimer une liste de courses
    const handleShoppingListDeleted = (id: string) => {
        setLists((prev) => prev.filter((list) => list.id !== id));
    };

    return (
        <div>
            <h2 className="my-4 text-xl font-semibold">Listes de courses</h2>
            {lists.length > 0 ? (
                lists.map((list) => {

                    // Extraire les repas uniques pour cette liste spécifique
                    const meals = Array.from( // Création d'un tableau à partir d'un objet itérable
                        new Set( // Création d'un ensemble d'éléments uniques (pas de doublons)
                            list.items
                                .map((item) => item.meal?.name) // Récupération des noms de repas
                                .filter((mealName): mealName is string => !!mealName) // Filtrage des repas non nuls (!! = not nullish)
                        )
                    );

                    // Rendu de la liste de courses
                    return (
                        <div key={list.id} className="mb-6">
                            <details>
                                <summary className="flex cursor-pointer justify-between">
                                    <h3>
                                        Liste de courses du {dateToString(list.createdAt)}
                                    </h3>
                                    <ChevronRight />
                                </summary>
                                <div>
                                    {list.comment && <p>Commentaire: {list.comment}</p>}
                                    {/* Affichage des repas de la liste de courses */}
                                    {meals.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="mb-2 text-lg font-semibold">Plats :</h4>
                                            <ul>
                                                {meals.map((meal, index) => (
                                                    <li key={index}>{"- "}{meal}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Affichage des items de la liste de courses */}
                                    <h4 className="mb-2 mt-4 text-lg font-semibold">Ingrédients :</h4>
                                    <ul>
                                        {list.items.map((item) => (
                                            <li key={item.id}>
                                                <span>
                                                    {item.quantity}{" "}
                                                    {item.ingredient?.name || "Ingrédient inconnu"}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <DeleteItem
                                    apiUrl={API_ROUTES.shoppingList.list}
                                    id={list.id}
                                    onSubmit={handleShoppingListDeleted}
                                />
                            </details>

                        </div>
                    );
                })
            ) : (
                <p>Aucune liste de courses enregistrée.</p>
            )}
        </div>
    );
};

export default ShoppingLists;

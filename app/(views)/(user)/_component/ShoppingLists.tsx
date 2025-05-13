// Bibliothèques tierces
import React, { useState } from "react";

// Types et utils
import { ShoppingListType } from "@/lib/types/schemas_interfaces";
import { dateToString, translatedUnit } from "@/lib/utils";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import API_ROUTES from "@/lib/constants/api_routes";
import { ChevronDown, ShoppingCart, Utensils, ListChecks } from "lucide-react";

// _________________________ TYPE _________________________
interface ShoppingListsProps {
    shoppingLists: ShoppingListType[];
}

// _________________________ COMPONENT _________________________
const ShoppingLists: React.FC<ShoppingListsProps> = ({ shoppingLists }) => {
    const [lists, setLists] = useState<ShoppingListType[]>(shoppingLists);
    const [openListId, setOpenListId] = useState<string | null>(null);

    // Fonction pour supprimer une liste de courses
    const handleShoppingListDeleted = (id: string) => {
        setLists((prev) => prev.filter((list) => list.id !== id));
    };

    // Fonction pour gérer l'ouverture/fermeture des details
    const toggleDetails = (id: string) => {
        if (openListId === id) {
            setOpenListId(null);
        } else {
            setOpenListId(id);
        }
    };

    if (lists.length === 0) {
        return (
            <div className="py-10 text-center">
                <ShoppingCart className="mx-auto mb-3 text-gray-300" size={48} />
                <p className="text-gray-500">Aucune liste de courses enregistrée.</p>
                <p className="mt-1 text-sm text-gray-400">
                    Les listes que vous créerez apparaîtront ici.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-5 flex items-center text-xl font-semibold text-gray-800">
                <ShoppingCart className="mr-2" /> 
                Mes listes de courses
            </h2>
            <div className="space-y-4">
                {lists.map((list) => {
                    // Extraire les repas uniques pour cette liste spécifique
                    const meals = Array.from(
                        new Set(
                            list.items
                                .map((item) => item.meal?.name)
                                .filter((mealName): mealName is string => !!mealName)
                        )
                    );

                    const isOpen = openListId === list.id;

                    // Rendu de la liste de courses
                    return (
                        <div key={list.id} className="overflow-hidden rounded-lg border border-gray-300 bg-white">
                            <div 
                                className="flex cursor-pointer items-center justify-between bg-gray-50 p-4 hover:bg-gray-100"
                                onClick={() => toggleDetails(list.id)}
                            >
                                <div>
                                    <h3 className="font-medium text-gray-800">
                                        Liste du {dateToString(list.createdAt)}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {list.items.length} article{list.items.length > 1 ? 's' : ''}
                                    </p>
                                </div>
                                <ChevronDown 
                                    className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                                    size={20} 
                                />
                            </div>

                            {/* Si la liste est ouverte */}
                            {isOpen && (
                                <div className="p-4">
                                    {/* Commentaire */}
                                    {list.comment && (
                                        <div className="mb-4 rounded border border-gray-100 bg-gray-50 p-3 text-amber-800">
                                            <p className="text-sm">{list.comment}</p>
                                        </div>
                                    )}
                                    
                                    {/* Affichage des repas de la liste de courses */}
                                    {meals.length > 0 && (
                                        <div className="mb-5">
                                            <h4 className="mb-3 flex items-center font-medium text-gray-700">
                                                <Utensils className="mr-2" size={16} />
                                                Plats ({meals.length})
                                            </h4>
                                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                                {meals.map((meal, index) => (
                                                    <div key={index} className="rounded-md bg-emerald-50 px-3 py-2 text-emerald-800">
                                                        {meal}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Affichage des items de la liste de courses */}
                                    <div>
                                        <h4 className="mb-3 flex items-center font-medium text-gray-700">
                                            <ListChecks className="mr-2" size={16} />
                                            Ingrédients ({list.items.length})
                                        </h4>
                                        <ul className="divide-y divide-gray-100 rounded-md border border-gray-200 bg-gray-50">
                                            {list.items.map((item) => (
                                                <li key={item.id} className="flex items-center justify-between p-3">
                                                    <span>
                                                        <span className="font-medium text-gray-700">
                                                            {item.quantity}{item.unit ? translatedUnit(item.unit) + " " : "x "}
                                                        </span>
                                                        <span className="text-gray-700">
                                                            {item.ingredient?.name || "Ingrédient inconnu"}
                                                        </span>
                                                    </span>
                                                    {item.meal?.name && (
                                                        <span className="ml-3 text-xs text-gray-500">
                                                            Pour &quot;{item.meal.name}&quot;
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bouton supprimer */}
                                    <div className="mt-4 flex justify-end">
                                        <DeleteItem
                                            apiUrl={API_ROUTES.shoppingList.list}
                                            id={list.id}
                                            onSubmit={() => handleShoppingListDeleted(list.id)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShoppingLists;
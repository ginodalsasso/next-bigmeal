"use client";

import { useState } from "react";

import { dateToString, translatedUnit, ucFirst } from "@/lib/utils";
import DeleteItem from "@/components/catalog/DeleteItemDialog";
import API_ROUTES from "@/lib/constants/api_routes";
import { ChevronDown, ShoppingCart, Utensils, ListChecks } from "lucide-react";
import { Unit } from "@prisma/client";

type ShoppingListItem = {
    id: string;
    quantity: number;
    unit: Unit | null;
    ingredient: { id: string; name: string } | null;
    meal: { id: string; name: string } | null;
    product: { id: string; name: string } | null;
};

type ShoppingList = {
    id: string;
    comment: string | null;
    createdAt: Date;
    items: ShoppingListItem[];
};

interface ShoppingListsProps {
    shoppingLists: ShoppingList[];
}

const ShoppingLists: React.FC<ShoppingListsProps> = ({ shoppingLists }) => {
    const [lists, setLists] = useState<ShoppingList[]>(shoppingLists);
    const [openListId, setOpenListId] = useState<string | null>(null);

    const handleShoppingListDeleted = (id: string) => {
        setLists((prev) => prev.filter((list) => list.id !== id));
    };

    const toggleDetails = (id: string) => {
        setOpenListId(openListId === id ? null : id);
    };

    if (lists.length === 0) {
        return (
            <div className="rounded-xl border border-warm-border bg-warm-subtle py-10 text-center">
                <ShoppingCart className="mx-auto mb-3 text-warm-disabled" size={40} />
                <p className="text-sm font-medium text-warm-secondary">Aucune liste enregistrée.</p>
                <p className="mt-1 text-xs text-warm-disabled">
                    Les listes que vous créerez apparaîtront ici.
                </p>
            </div>
        );
    }

    return (
        <div className="card">
            <h2 className="h2-title">
                <ShoppingCart size={18} className="h2-icons" />
                Mes listes de courses
            </h2>
            <div className="space-y-2">
                {lists.map((list) => {
                    const meals = Array.from(
                        new Set(
                            list.items
                                .map((item) => item.meal?.name)
                                .filter((name): name is string => !!name)
                        )
                    );
                    const isOpen = openListId === list.id;

                    return (
                        <div key={list.id} className="card-content overflow-hidden">

                            {/* En-tête accordéon */}
                            <button
                                className="flex w-full cursor-pointer items-center justify-between p-3 text-left transition-colors hover:bg-warm-muted"
                                onClick={() => toggleDetails(list.id)}
                                aria-expanded={isOpen}
                            >
                                <div>
                                    <p className="text-sm font-medium text-warm-primary">
                                        Liste du {dateToString(list.createdAt)}
                                    </p>
                                    <p className="text-xs text-warm-secondary">
                                        {list.items.length} article{list.items.length > 1 ? "s" : ""}
                                    </p>
                                </div>
                                <ChevronDown
                                    className={`shrink-0 text-warm-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                    size={18}
                                    aria-hidden="true"
                                />
                            </button>

                            {isOpen && (
                                <div className="space-y-4 border-t border-warm-border p-3">

                                    {list.comment && (
                                        <div className="rounded-xl border border-warm-border bg-warm-muted px-3 py-2">
                                            <p className="text-sm text-warm-secondary">{list.comment}</p>
                                        </div>
                                    )}

                                    {meals.length > 0 && (
                                        <div>
                                            <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-warm-secondary">
                                                <Utensils size={13} />
                                                Plats ({meals.length})
                                            </h4>
                                            <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
                                                {meals.map((meal, index) => (
                                                    <div key={index} className="rounded-xl bg-warm-accent/10 px-3 py-1.5 text-sm font-medium text-warm-primary">
                                                        {ucFirst(meal)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-warm-secondary">
                                            <ListChecks size={13} />
                                            Ingrédients ({list.items.length})
                                        </h4>
                                        <ul className="divide-y divide-warm-border overflow-hidden rounded-xl border border-warm-border bg-warm-base">
                                            {list.items.map((item) => (
                                                <li key={item.id} className="flex items-center justify-between px-3 py-2 text-sm">
                                                    <span>
                                                        <span className="font-medium text-warm-primary">
                                                            {item.quantity}{item.unit ? " " + translatedUnit(item.unit) : "×"}{" "}
                                                        </span>
                                                        <span className="text-warm-primary">
                                                            {item.ingredient?.name || "Ingrédient inconnu"}
                                                        </span>
                                                    </span>
                                                    {item.meal?.name && (
                                                        <span className="ml-3 text-xs text-warm-secondary">
                                                            {item.meal.name}
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex justify-end">
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

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import DeleteItem from "@/components/layout/DeleteItemDialog";

import { ShoppingListType } from "@/lib/types/schemas_interfaces";
import { dateToString, translatedUnit, ucFirst } from "@/lib/utils";

import {
    fetchShoppingListAPI,
    markShoppingListAsExpiredAPI,
    toggleItemCheckedAPI,
    updateItemQuantityAPI,
} from "@/lib/services/shopping_list_service";
import { getCsrfToken } from "next-auth/react";
import { CheckCircle, Minus, Plus, ShoppingBag, Utensils } from "lucide-react";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import Link from "next/link";

const ShoppingListPage = () => {
    const router = useRouter();
    const [shoppingList, setShoppingList] = useState<ShoppingListType | null>(null);
    const [loading, setLoading] = useState(true);

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

    const toggleItemChecked = async (id: string, currentChecked: boolean) => {
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) return;
            const newCheckedState = !currentChecked;
            setShoppingList(
                (prev) =>
                    prev && {
                        ...prev,
                        items: prev.items.map((item) =>
                            item.id === id ? { ...item, isChecked: newCheckedState } : item
                        ),
                    }
            );
            await toggleItemCheckedAPI(id, newCheckedState, csrfToken);
        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            toast.error("Impossible de mettre à jour l'élément.");
        }
    };

    const markShoppingListAsExpired = async () => {
        if (shoppingList) {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) return;
            try {
                await markShoppingListAsExpiredAPI(shoppingList.id, csrfToken);
                toast.success("La liste de courses a été marquée comme terminée !");
                router.push("/");
            } catch (error) {
                console.error("Erreur lors de la mise à jour :", error);
                toast.error("Impossible de marquer la liste comme terminée.");
            }
        }
    };

    const setShoppingListExpired = async () => {
        if (shoppingList) {
            const allChecked = shoppingList.items.every((item) => item.isChecked);
            if (allChecked) {
                await markShoppingListAsExpired();
            } else {
                toast.error("Tous les ingrédients ne sont pas cochés !");
            }
        }
    };

    const handleItemDeleted = (itemId: string) => {
        setShoppingList(
            (prev) =>
                prev && {
                    ...prev,
                    items: prev.items.filter((item) => item.id !== itemId),
                }
        );
    };

    const handleMealDeleted = (mealId: string) => {
        setShoppingList((prev) =>
            prev && {
                ...prev,
                items: prev.items.filter((item) => item.mealId !== mealId),
            }
        );
    };

    const toggleAllItems = async () => {
        if (!shoppingList) return;
        const csrfToken = await getCsrfToken();
        if (!csrfToken) return;
        const allChecked = shoppingList.items.every((item) => item.isChecked);
        const newCheckedState = !allChecked;
        setShoppingList((prev) =>
            prev && { ...prev, items: prev.items.map((item) => ({ ...item, isChecked: newCheckedState })) }
        );
        try {
            await Promise.all(
                shoppingList.items.map((item) => toggleItemCheckedAPI(item.id, newCheckedState, csrfToken))
            );
        } catch (error) {
            console.error("Erreur lors de la sélection globale:", error);
            toast.error("Impossible de mettre à jour les éléments.");
        }
    };

    const updateItemQuantity = async (id: string, newQuantity: number) => {
        if (!shoppingList) return;
        const csrfToken = await getCsrfToken();
        if (!csrfToken) return;
        try {
            setShoppingList(
                (prev) =>
                    prev && {
                        ...prev,
                        items: prev.items.map((item) =>
                            item.id === id ? { ...item, quantity: newQuantity } : item
                        ),
                    }
            );
            await updateItemQuantityAPI(id, newQuantity, csrfToken);
        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            toast.error("Impossible de mettre à jour l'élément.");
        }
    };

    if (loading) return <LoadingSpinner />;

    if (!shoppingList) {
        return (
            <div className="mt-8 rounded-xl border border-warm-border bg-warm-subtle p-8 text-center">
                <ShoppingBag className="mx-auto mb-3 size-12 text-warm-disabled" />
                <h3 className="mb-1 text-base font-semibold text-warm-secondary">
                    Aucune liste de courses
                </h3>
                <p className="text-sm text-warm-disabled">
                    Ajoutez des ingrédients ou des repas pour commencer
                </p>
            </div>
        );
    }

    const meals = Array.from(
        new Map(
            shoppingList.items
                .filter((item) => item.mealId && item.meal)
                .map((item) => [item.mealId, { id: item.mealId!, name: item.meal!.name }])
        ).values()
    );

    const checkedItemsCount = shoppingList.items.filter((item) => item.isChecked).length;
    const progress = (checkedItemsCount / shoppingList.items.length) * 100;

    return (
        <div className="mx-auto max-w-2xl space-y-4">

            {/* En-tête */}
            <header className="header-card">
                <h1 className="h1-title">Liste de courses</h1>
                <div className="flex items-end justify-between">
                    <div className="text-left">
                        <p className="text-sm text-warm-secondary">
                            Créée le {dateToString(shoppingList.createdAt)}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-warm-accent">
                            {shoppingList.items.length} produit{shoppingList.items.length > 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-medium text-warm-secondary">
                            {checkedItemsCount} / {shoppingList.items.length}
                        </p>
                        <div className="mt-1 h-2 w-28 overflow-hidden rounded-full bg-warm-border">
                            <div
                                className="h-full bg-warm-accent transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Repas prévus */}
            {meals.length > 0 && (
                <div className="card">
                    <h2 className="h2-title">
                        <Utensils className="h2-icons" />
                        Repas prévus ({meals.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {meals.map((meal) => (
                            <div
                                key={meal.id}
                                className="flex items-center justify-between rounded-xl bg-warm-accent/10 px-3 py-2 text-sm"
                            >
                                <Link
                                    href={`/meals/${meal.name}`}
                                    className="font-medium text-warm-primary underline-offset-2 hover:underline"
                                >
                                    {ucFirst(meal.name)}
                                </Link>
                                <DeleteItem
                                    apiUrl="/api/shopping-list/meal"
                                    id={meal.id}
                                    onSubmit={handleMealDeleted}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Produits à acheter */}
            <div className="card">
                <div className="flex items-center justify-between">
                    <h2 className="h2-title">
                        <ShoppingBag className="h2-icons" />
                        Produits à acheter
                    </h2>
                    <button
                        onClick={toggleAllItems}
                        className="text-xs font-medium text-warm-accent hover:underline"
                    >
                        {shoppingList.items.every((item) => item.isChecked) ? "Tout désélectionner" : "Tout sélectionner"}
                    </button>
                </div>
                <div className="card-content divide-y divide-warm-border">
                    {shoppingList.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id={`item-${item.id}`}
                                    className="mt-0.5 size-4 cursor-pointer accent-warm-accent"
                                    checked={item.isChecked}
                                    onChange={() => toggleItemChecked(item.id, item.isChecked ?? false)}
                                />
                                <div>
                                    <label
                                        htmlFor={`item-${item.id}`}
                                        className={`cursor-pointer select-none text-sm font-medium transition-all duration-200 ${
                                            item.isChecked
                                                ? "text-warm-disabled line-through"
                                                : "text-warm-primary"
                                        }`}
                                    >
                                        {item.ingredient
                                            ? item.ingredient.name
                                            : item.product
                                            ? item.product.name
                                            : "Produit non trouvé"}
                                        <span className="ml-1 text-xs text-warm-secondary">
                                            {item.ingredient
                                                ? `(${item.ingredient.categoryIngredient.name})`
                                                : item.product
                                                ? `(${item.product.categoryHouseholdProduct.name})`
                                                : ""}
                                        </span>
                                    </label>

                                    <div className="mt-1 flex items-center gap-1.5">
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                            className="flex size-5 items-center justify-center rounded-full text-warm-secondary transition-colors active:bg-warm-subtle disabled:opacity-30"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className={`min-w-8 text-center text-xs ${
                                            item.isChecked ? "text-warm-disabled line-through" : "text-warm-secondary"
                                        }`}>
                                            {item.quantity}{" "}{(item.unit && translatedUnit(item.unit)) ?? "×"}
                                        </span>
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                            className="flex size-5 items-center justify-center rounded-full text-warm-secondary transition-colors active:bg-warm-subtle"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <DeleteItem
                                apiUrl="/api/shopping-list/item"
                                id={item.id}
                                onSubmit={handleItemDeleted}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Terminer */}
            <div className="pb-6">
                <Button variant="default" className="w-full" onClick={setShoppingListExpired}>
                    <CheckCircle className="button-icons" />
                    J&apos;ai terminé mes courses
                </Button>
            </div>
        </div>
    );
};

export default ShoppingListPage;

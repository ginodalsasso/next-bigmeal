"use client";

// Bibliothèques tierces
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Composants UI
import { Button } from "@/components/ui/button";
import DeleteItem from "@/components/layout/DeleteItemDialog";

// Types
import { ShoppingListType } from "@/lib/types/schemas_interfaces";

// Utils
import { dateToString, sortBy, translatedUnit, ucFirst } from "@/lib/utils";

// Services
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

// _________________________ COMPONENT _________________________
const ShoppingListPage = () => {
    const router = useRouter();
    const [shoppingList, setShoppingList] = useState<ShoppingListType | null>(
        null
    );
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
            setShoppingList(
                (prev) =>
                    prev && {
                        ...prev,
                        items: prev.items.map((item) => {
                            if (item.id === id) {
                                return { ...item, isChecked: newCheckedState };
                            }
                            return item;
                        }),
                    }
            );
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

                toast.success(
                    "La liste de courses a été marquée comme terminée !"
                );
                router.push("/"); // Redirection vers la page d'accueil
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
        setShoppingList(
            (prev) =>
                prev && {
                    ...prev,
                    items: prev.items.filter((item) => item.id !== itemId),
                }
        );
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
                setShoppingList(
                    (prev) =>
                        prev && {
                            // Mise à jour optimiste (local)
                            ...prev,
                            items: prev.items.map((item) => {
                                // itération sur les items
                                if (item.id === id) {
                                    // Si l'ID correspond, on met à jour la quantité
                                    return { ...item, quantity: newQuatity }; // on retourne l'item avec la nouvelle quantité
                                }
                                return item;
                            }),
                        }
                );

                await updateItemQuantityAPI(id, newQuatity, csrfToken);
            } catch (error) {
                console.error("Erreur lors de la modification:", error);
                toast.error("Impossible de mettre à jour l'élément.");
            }
        }
    };

    // _________________________ RENDU _________________________
    if (loading) return <LoadingSpinner />;
    if (!shoppingList)
        
        return (
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                <ShoppingBag className="mx-auto mb-3 size-12 text-gray-300" />
                <h3 className="mb-1 text-lg font-medium text-gray-500">
                    Aucune liste de courses
                </h3>
                <p className="text-sm text-gray-400">
                    Créez une nouvelle liste pour commencer vos courses
                </p>
            </div>
        );

    // Extraire les repas uniques de la liste de courses
    const meals = Array.from(
        new Set(
            shoppingList.items.map((item) => item.meal?.name).filter(Boolean)
        )
    );

    const checkedItemsCount = shoppingList.items.filter((item) => item.isChecked).length;
    const progress = (checkedItemsCount / shoppingList.items.length) * 100; // Calcul du pourcentage de progression

    return (
        <div className="mx-auto">
            {/* En-tête */}
            <div className="mb-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
                <h1 className="mb-2 text-center text-2xl font-bold text-emerald-700">
                    Liste de courses
                </h1>
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm text-gray-600">
                            Créée le {dateToString(shoppingList.createdAt)}
                        </p>
                        <p className="mt-1 text-sm font-medium text-emerald-700">
                            {shoppingList.items.length} Produits
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">
                            Progression
                        </p>
                        <div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            {checkedItemsCount} sur {shoppingList.items.length}{" "}
                            articles
                        </p>
                    </div>
                </div>
            </div>

            {/* Affichage des repas */}
            {meals.length > 0 && (
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <h2 className="h2-title">
                        <Utensils size={18} className="text-emerald-500" />
                        Repas prévus ({meals.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {meals.map((meal, index) => (
                            <div
                                key={index}
                                className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                            >
                                <Link href={`/meals/${meal}`} className="cursor-pointer underline active:text-black">
                                    {ucFirst(meal)}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Liste des ingrédients */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h2 className="h2-title">
                    <ShoppingBag size={18} className="text-emerald-500" />
                    Produits à acheter
                </h2>
                <div className="rounded-md border border-gray-200">
                    {shoppingList.items
                        .sort(
                            sortBy( (item) => item.ingredient?.name || item.product?.name || "" )
                        )
                        .map((item) => (
                            <div key={item.id}>
                                <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                id={`item-${item.id}`}
                                                className="size-5 cursor-pointer rounded-md"
                                                checked={item.isChecked}
                                                onChange={() =>
                                                    toggleItemChecked(
                                                        item.id,
                                                        item.isChecked ?? false
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* Affichage de la gestion de quantité */}
                                        <div>
                                            <label
                                                htmlFor={`item-${item.id}`}
                                                className={`cursor-pointer select-none font-medium transition-all duration-200 ${
                                                    item.isChecked
                                                        ? "text-gray-400 line-through"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {item.ingredient
                                                    ? item.ingredient.name
                                                    : item.product
                                                    ? item.product.name
                                                    : "Produit non trouvé"}
                                            </label>

                                            <div className="mt-1 flex items-center gap-2">
                                                <button
                                                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                    className="flex size-6 items-center justify-center rounded-full text-gray-500 active:bg-gray-200"
                                                    disabled={ item.quantity <= 1 }
                                                >
                                                    <Minus size={16} />
                                                </button>

                                                <span
                                                    className={`mx-1 text-sm ${
                                                        item.isChecked
                                                            ? "text-gray-400 line-through"
                                                            : "text-gray-600"
                                                    }`}
                                                >
                                                    {item.quantity}{" "}{(item.unit && translatedUnit(item.unit)) ??"x"}
                                                </span>

                                                <button
                                                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                    className="flex size-6 items-center justify-center rounded-full text-gray-500 active:bg-gray-200"
                                                >
                                                    <Plus size={16} />
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
                            </div>
                        ))}
                </div>
            </div>

            {/* Bouton terminer */}
            <div className="mb-10 mt-2 flex justify-end">
                <Button
                    variant="success"
                    className="w-full"
                    onClick={setShoppingListExpired}
                >
                    <CheckCircle className="mr-2 size-5" />
                    J&apos;ai terminé mes courses
                </Button>
            </div>
        </div>
    );
};

export default ShoppingListPage;

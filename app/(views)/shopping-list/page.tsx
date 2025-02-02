'use client';

import { useCsrfToken } from "@/app/context/CsrfContext";
import DeleteItem from "@/components/layout/DeleteItem";
import { Button } from "@/components/ui/button";
import { ShoppingListType } from "@/lib/types/schemas_interfaces";
import { dateToString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ShoppingListPage = () => {
    const csrfToken = useCsrfToken();
    const router = useRouter(); 
    const [shoppingList, setShoppingList] = useState<ShoppingListType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                const response = await fetch("/api/shopping-list");

                if (!response.ok) {
                    throw new Error("Failed to fetch shoppingList");
                }
                const data: ShoppingListType = await response.json();
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
            setShoppingList((prev) => prev && {
                ...prev,
                items: prev.items.map((item) => {
                    if (item.id === id) {
                        return { ...item, isChecked: newCheckedState };
                    }
                    return item;
                })
            });

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

    const markShoppingListAsExpired = async () => {
        if (shoppingList) {
            try {
                const response = await fetch(`/api/shopping-list`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": csrfToken,
                    },
                    body: JSON.stringify({ id: shoppingList.id, isExpired: true }),
                });

                if (!response.ok) {
                    throw new Error("Failed to mark shopping list as expired");
                }

                toast.success("La liste de courses a été marquée comme terminée !");
                router.push('/'); // Redirection vers la page d'accueil
            } catch (error) {
                console.error("Erreur lors de la mise à jour :", error);
                toast.error("Impossible de marquer la liste comme terminée.");
            }
        }
    };

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
            setShoppingList((prev) => prev && {
                ...prev,
                items: prev.items.filter((item) => item.id !== id)
            });
            toast("Article supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            toast.error("Impossible de supprimer l'élément.");
        }
    };

    // Appel API pour supprimer un repas du panier
    const deleteMeal = async (mealId: string) => {
        try {
            const response = await fetch("/api/shopping-list", {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken, 
                },
                body: JSON.stringify({ mealId }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete meal from shoppingList");
            }

            // Supprimer le repas du state
            setShoppingList((prev) => prev && {
                ...prev,
                items: prev.items.filter((item) => item.mealId !== mealId)
            });
            toast("Repas supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            toast.error("Impossible de supprimer le repas.");
        }
    };


    if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;
    if (!shoppingList) return <div>Aucune liste de courses.</div>;

    const ingredientsAlone = shoppingList?.items.filter(item => !item.mealId);
    const ingredientsByMeal = shoppingList?.items.filter(item => item.mealId);

    return (
        <div>
            <div className="mb-4">
                <p className="text-lg font-bold">Date de création : {dateToString(shoppingList.createdAt)}</p>
                <p className="text-lg font-bold">{shoppingList?.items?.length} ingrédients à la liste.</p>
            </div>

            {/* Affichage des ingrédients seuls */}
            {ingredientsAlone && ingredientsAlone.length > 0 && (
                <div>
                    <h2>Ingrédients seuls</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><span className="text-lg font-bold">Noms</span></TableHead>
                                <TableHead><span className="text-lg font-bold">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ingredientsAlone.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            className="mr-2 w-4 h-4"
                                            checked={item.isChecked}
                                            onChange={() => toggleItemChecked(item.id, item.isChecked ?? false)}
                                        />
                                        <span className={item.isChecked ? "line-through" : "text-base"}>
                                            {item.quantity} {item.ingredient?.name || "Ingrédient non défini"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <DeleteItem onDelete={() => deleteItem(item.id)} isDeleting={false} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            
            {/* Affichage des ingrédients par repas */}
            {ingredientsByMeal && ingredientsByMeal.length > 0 && (
                <div>
                    <h2>Ingrédients par repas</h2>
                    {Array.from(new Set(ingredientsByMeal.map(item => item.mealId))) // Extraire des IDs de repas uniques
                        .map(mealId => { // Parcourt chaque ID de repas unique
                            const mealItems = ingredientsByMeal.filter(item => item.mealId === mealId); //Filtre les ingrédients qui appartiennent à ce repas (mealId)
                            const mealName = mealItems[0]?.meal?.name || "Repas non défini"; // Récupère le nom du repas ou affiche "Repas non défini"
                        return (
                            <div key={mealId}>
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            {mealName}
                                        </TableHead>
                                        <TableHead>
                                            <DeleteItem onDelete={() => deleteMeal(mealId)} isDeleting={false} />
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                    <TableBody>
                                        {mealItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2 w-4 h-4"
                                                        checked={item.isChecked}
                                                        onChange={() => toggleItemChecked(item.id, item.isChecked ?? false)}
                                                    />
                                                    <span className={item.isChecked ? "line-through" : "text-base"}>
                                                        {item.quantity} {item.ingredient?.name || "Ingrédient non défini"}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="flex justify-end mt-2">
                <Button variant="default" className="w-full" onClick={setShoppingListExpired}>
                    J&apos;ai fini mes courses
                </Button>
            </div>
        </div>
    );
};

export default ShoppingListPage;
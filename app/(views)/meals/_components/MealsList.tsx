/* eslint-disable tailwindcss/no-custom-classname */
'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Types
import { CategoryMealType, MealType } from "@/lib/types/schemas_interfaces";

// Composants
import ItemView from "@/components/layout/ItemView";
import UpdateMeal from "./UpdateMeal";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";
import PopoverActions from "@/components/layout/PopoverActions";
import ShareButton from "@/components/ShareButton";

// Composants UI
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Constantes
import { notFound, useRouter } from "next/navigation";
import { Heart, Plus } from "lucide-react";
import { likedMealAPI } from "@/lib/services/meal_service";
import { getCsrfToken } from "next-auth/react";
import { URL } from "@/lib/constants/api_routes";

type MealsListProps = {
    fetchedMeals: MealType[];
    fetchedCategories?: CategoryMealType[] | [];
    fetchedlikedMeals: string[];
};

// _________________________ COMPOSANT _________________________
export default function MealsList( {
    fetchedMeals, 
    fetchedlikedMeals,
    fetchedCategories
}: MealsListProps) {

    // _________________________ ETATS _________________________
    const [meals, setMeals] = useState<MealType[]>(fetchedMeals);
    const [likedMeals, setLikedMeals] = useState<Set<string>>(new Set(fetchedlikedMeals)); // newSet pour stocker les ID des repas aimés ex: setLikedMeals(new Set(["id1", "id2"]))

    const router = useRouter();

    useEffect(() => {
        setMeals(fetchedMeals); // Pour les mises à jour de la liste de repas coté client
    }, [fetchedMeals]);

    
    // _________________________ CRUD _________________________

    // Suppression d'un repas dans le state après suppression API
    const updateMeal = async (updatedMeal: MealType): Promise<void> => {
        setMeals((prevMeals) =>
            prevMeals.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))
        );
        toast("Repas mis à jour avec succès");
    }


    // Suppression d'un repas dans le state après suppression API
    const handleMealDeleted = (id: string) => {
        setMeals((prev) => prev.filter((meal) => meal.id !== id));
    };

    // Fonction pour gérer le repas aimé
    const toggleLikeMeal = async (mealName: string) => {
        try {
            // Récupérer le CSRF Token
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }

            likedMealAPI(mealName, csrfToken); 

            setLikedMeals((prev) => {
                // stocker les ID des repas aimés dans un Set
                const likedMeals = new Set(prev);
                
                if (likedMeals.has(mealName)) {
                    likedMeals.delete(mealName);
                } else {
                    likedMeals.add(mealName);
                }
                return likedMeals;
            });
        } catch (error) {
            console.error("Erreur lors de la modification du statut du like", error);
            toast.error("Impossible de modifier le statut du like");
        }
    };



    // _________________________ FILTRAGE _________________________
    const filterOptions = (fetchedCategories ?? []).map(cat => cat.name); // Options de filtre

    // Fonction pour gérer le changement de filtre
    const handleFilterChange = (selectedFilters: string[]) => {
        const queryParams = new URLSearchParams();
    
        // Filtrer les catégories et les saisons pour preparer les paramètres de requête
        const meals = selectedFilters.filter(filter => (fetchedCategories ?? []).map(cat => cat.name).includes(filter));

        // Ajouter les filtres aux paramètres de requête
        meals.forEach(categorie => queryParams.append("categories", categorie.toLowerCase()));
    
        router.push(`/meals?${queryParams.toString()}`);
    };

    // _________________________ RENDU _________________________
    if (!meals) return  notFound();

    return (
        <>
            <h1 className="h1-title">Liste des repas</h1>
            <IsUser>
                <Button variant="success" className="w-full" onClick={() => router.push("/meals/create")}>
                    Ajouter un repas <Plus/>
                </Button>
            </IsUser>
            {/* Composant de filtre avec les options de filtre */}
            <FilterItems 
                options={filterOptions} 
                onFilterChange={handleFilterChange} 
            />

            {/* Liste des repas */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><span className="table-head">Repas</span></TableHead>
                        <IsAdmin>
                            <TableHead><span className="table-head">Actions</span></TableHead>
                        </IsAdmin>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {meals.map((meal) => (
                        <TableRow key={meal.id}>
                            <TableCell className="table-cell">
                                <div className="relative">
                                    <ItemView
                                        title={meal.name}
                                        details={{
                                            category: meal.categoryMeal?.name || "Non spécifié",
                                        }}
                                        linkToDetails={`/meals/${meal.name}`}
                                    />
                                    <div className="absolute bottom-0 right-2 flex gap-4">
                                        {typeof navigator.share === 'function' && (
                                            <ShareButton
                                                className="text-gray-400"
                                                title={`Recette : ${meal.name}`}
                                                text={`Découvre cette recette sur notre app !`}
                                                url={`${URL}/meals/${meal.name}`}
                                            />
                                        )}

                                        <Heart
                                            size={20}
                                            className={` cursor-pointer transition-colors hover:text-white ${
                                                likedMeals.has(meal.name) ? "fill-red-500 text-red-500" : "text-gray-400"
                                            }`}
                                            onClick={() => toggleLikeMeal(meal.name)}
                                        />
                                    </div>
                                    {/* Menu d'actions admin avec Popover */}
                                    <IsAdmin>
                                        <PopoverActions
                                            id={meal.id}
                                            apiUrl="/api/meals"
                                            onDelete={() => handleMealDeleted(meal.id)}
                                            renderEditForm={(onClose) => (
                                                <UpdateMeal
                                                    meal={meal}
                                                    onSubmit={updateMeal}
                                                    onClose={onClose}
                                                />
                                            )}
                                        />
                                    </IsAdmin>
                                </div>
                            </TableCell>

                            <TableCell>
                                {/* Ajouter le repas à la liste de courses */}
                                <AddToShoppingListForm type="meal" id={meal.name} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
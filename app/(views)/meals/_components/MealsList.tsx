/* eslint-disable tailwindcss/no-custom-classname */
'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Types
import { MealType } from "@/lib/types/schemas_interfaces";

// Composants
import ItemView from "@/components/layout/ItemView";
import UpdateMeal from "./UpdateMeal";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";
import PopoverActions from "@/components/layout/PopoverActions";

// Composants UI
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Constantes
import { CATEGORIES_MEALS } from "@/lib/constants/ui_constants";
import { notFound, useRouter } from "next/navigation";
import { Heart, Plus } from "lucide-react";
import { likedMealAPI } from "@/lib/services/meal_service";
import { getCsrfToken } from "next-auth/react";


// _________________________ COMPOSANT _________________________
export default function MealsList( {fetchedMeals}: { fetchedMeals: MealType[] }) {
    
    // _________________________ ETATS _________________________
    const [meals, setMeals] = useState<MealType[]>(fetchedMeals);
    const [likedMeals, setLikedMeals] = useState<Set<string>>(new Set()); // newSet pour stocker les ID des repas aimés ex: setLikedMeals(new Set(["id1", "id2"]))

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
                // stocker les ID des repas aimés dans un Se
                const likedMeals = new Set(prev);
                if (likedMeals.has(mealName)) {
                    likedMeals.delete(mealName);
                    toast("Repas retiré des favoris");
                } else {
                    likedMeals.add(mealName);
                    toast("Repas ajouté aux favoris");
                }
                return likedMeals;
            });
        } catch (error) {
            console.error("Erreur lors de la modification du statut du like", error);
            toast.error("Impossible de modifier le statut du like");
        }
    };



    // _________________________ FILTRAGE _________________________
    const filterOptions = CATEGORIES_MEALS; // Options de filtre

    // Fonction pour gérer le changement de filtre
    const handleFilterChange = (selectedFilters: string[]) => {
        const queryParams = new URLSearchParams();
    
        // Filtrer les catégories et les saisons pour preparer les paramètres de requête
        const meals = selectedFilters.filter(filter => CATEGORIES_MEALS.includes(filter));

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

                                    <Heart
                                        size={20}
                                        className={`cursor-pointer transition-colors ${
                                            likedMeals.has(meal.name) ? "fill-red-500 text-red-500" : "text-gray-400"
                                        }`}
                                        onClick={() => toggleLikeMeal(meal.name)}
                                    />

                                    {/* Menu d'actions admin avec Popover */}
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
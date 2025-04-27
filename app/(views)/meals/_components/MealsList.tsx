/* eslint-disable tailwindcss/no-custom-classname */
'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

// Types
import { MealType } from "@/lib/types/schemas_interfaces";

// Composants
import ItemView from "@/components/layout/ItemView";
import EditItem from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import UpdateMeal from "./UpdateMeal";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";

// Composants UI
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Constantes
import { CATEGORIES_MEALS } from "@/lib/constants/ui_constants";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";


// _________________________ COMPOSANT _________________________
export default function MealsList( {fetchedMeals}: { fetchedMeals: MealType[] }) {
    
    // _________________________ ETATS _________________________
    const [meals, setMeals] = useState<MealType[]>(fetchedMeals);

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
    if (!meals) return <div>Repas introuvables.</div>;

    return (
        <>
            {/* Filtres */}
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
                                <div className="lg:relative">
                                    <ItemView
                                        title={meal.name}
                                        details={{
                                            category: meal.categoryMeal?.name || "Non spécifié",
                                            // description: meal.description,
                                        }}
                                        linkToDetails={`/meals/${meal.name}`}
                                    />

                                    <IsAdmin>
                                        <div className="lg:absolute right-0 top-0 flex gap-4 mt-2">
                                            {/* Édition du repas */}
                                            <EditItem
                                                renderEditForm={(onClose) => (
                                                    <UpdateMeal
                                                        meal={meal} 
                                                        onSubmit={updateMeal}
                                                        onClose={onClose}
                                                    />
                                                )}
                                            />
                                            {/* Suppression du repas */}
                                            <DeleteItem
                                                apiUrl="/api/meals"
                                                id={meal.id}
                                                onSubmit={handleMealDeleted}
                                            />
                                        </div>
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
            <IsUser>
                <Button variant="success" className="w-full" onClick={() => router.push("/meals/create")}>
                    Ajouter un repas <Plus/>
                </Button>
            </IsUser>
        </>
    );
};
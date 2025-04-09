/* eslint-disable tailwindcss/no-custom-classname */
'use client';

// Bibliothèques tierces
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

// Types
import { MealType } from "@/lib/types/schemas_interfaces";

// Images
import add from "@/public/img/add.svg";

// Composants
import ItemView from "@/components/layout/ItemView";
import EditItem from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import UpdateMeal from "./UpdateMeal";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import SearchBar from "@/components/layout/FilterSearchbar";
import FilterCheckboxes from "@/components/layout/FilterItems";

// Composants UI
import { Button } from "@/components/ui/button";

// Constantes
import { CATEGORIES_MEALS } from "@/lib/constants/ui_constants";
import { useRouter } from "next/navigation";


// _________________________ COMPOSANT _________________________
export default function MealsList( {fetchedMeals}: { fetchedMeals: MealType[] }) {
    
    // _________________________ ETATS _________________________
    const [meals, setMeals] = useState<MealType[]>(fetchedMeals);
    
    const [searchQuery, setSearchQuery] = useState<string>(""); 
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const router = useRouter();
    
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

    // Fonction pour filtrer en fonction de la recherche et des filtres actifs
    const filteredMeals = meals.filter((meal) => {
        // Vérification du champ de recherche
        const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase())

        // Modification des chaines de caractères pour les saisons et catégories
        const selectedCategory = selectedFilters.map(filter => filter.toLowerCase());

        // Vérification des filtres actifs
        const category = meal.categoryMeal?.name || "Non spécifié";
        
        const matchesFilters =
            selectedFilters.length === 0 || // Aucun filtre => tout est affiché
            selectedCategory.includes(category);

        return matchesSearch && matchesFilters;
    });
        

    // _________________________ RENDU _________________________
    if (!meals) return <div>Repas introuvables.</div>;

    return (
        <>
            {/* Dialogue pour ajouter un repas ou une composition */}
            <div className="flex flex-row-reverse items-center justify-between gap-2 pb-2">
                <IsUser>
                    <Button variant="success" className="flex items-center gap-2" onClick={() => router.push("/meals/create")}>
                        <Image src={add} alt="Ajouter un repas" className="w-4" />
                        <span className="hidden sm:block">Ajouter un repas</span>
                    </Button>
                </IsUser>

                {/* Barre de recherche */}
                <SearchBar onSearch={(query) => setSearchQuery(query)} />
            </div>

            {/* Filtres */}
            <FilterCheckboxes 
                options={filterOptions} 
                onFilterChange={setSelectedFilters} 
            />
            {/* Liste des repas */}
            <div className="cards-wrapper">
                <div className="cards-list">
                    {filteredMeals.map((meal) => (
                        <div key={meal.id} className="card">
                            <ItemView
                                title={meal.name}
                                details={{
                                    category: meal.categoryMeal?.name || "Non spécifié",
                                    // description: meal.description,
                                }}
                                linkToDetails={`/meals/${meal.name}`}
                            />
                            <IsAdmin>
                                <div className="flex w-full gap-2">
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
                            
                            {/* Ajouter le repas à la liste de courses */}
                            <AddToShoppingListForm type="meal" id={meal.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import add from "@/public/img/add.svg";
import { MealType } from "@/lib/types/schemas_interfaces";

import ItemView from "@/components/layout/ItemView";
import EditItem from "@/components/layout/EditItemPopover";
import DeleteItem from "@/components/layout/DeleteItemDialog";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CreateMeal from "./_components/CreateMeal";
import UpdateMeal from "./_components/UpdateMeal";
import CreateComposition from "./_components/CreateComposition";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import SearchBar from "@/components/layout/Searchbar";
import { CATEGORIES_MEALS } from "@/lib/constants/constants";
import FilterCheckboxes from "@/components/layout/FilterCheckboxes";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// _________________________ COMPOSANT _________________________
const MealsPage = () => {
    // _________________________ ETATS _________________________
    const csrfToken = useCsrfToken();
    const [meals, setMeals] = useState<MealType[]>([]);
    const [currentStep, setCurrentStep] = useState<"createMeal" | "createComposition" | "chooseStep">("createMeal"); // étape pour la création de repas ou de composition
    const [createdMealId, setCreatedMealId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(""); 
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // _________________________ LOGIQUE _________________________
    // Récupérer les repas
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch("/api/meals");
                if (!response.ok) throw new Error("Failed to fetch meals");

                const data: MealType[] = await response.json();
                setMeals(data);
            } catch (error) {
                console.error("[FETCH_MEALS_ERROR", error);
                setError("Erreur lors de la récupération des repas");
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, []);

    // Réinitialiser l'étape à createMeal lorsque le dialogue est fermé
    useEffect(() => {
        if (!isDialogOpen) {
            setCurrentStep("createMeal");
            setCreatedMealId(null);
        }
    }, [isDialogOpen]);

    // Ajouter un repas
    const addMeal = (meal: MealType) => {
        setMeals((prevMeals) => [...prevMeals, meal]);
        setCreatedMealId(meal.id); // Enregistrer l'ID du repas créé
        setCurrentStep("chooseStep"); // Passer à l'étape de choix
    };

    // Ajouter une composition
    const addComposition = () => {
        toast("Composition ajoutée avec succès");
        setIsDialogOpen(false);
        setCurrentStep("createMeal"); // Revenir à l'étape de création de repas
        setCreatedMealId(null); // Réinitialiser l'ID du repas créé
    };

    const updateMeal = async (updatedMeal: MealType): Promise<void> => {
        setMeals((prevMeals) =>
            prevMeals.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))
        );
        toast("Repas mis à jour avec succès");
    }

    // Appel API pour supprimer un repas
    const deleteMeal = async (id: string) => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const response = await fetch("/api/meals", {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken, 
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error("Failed to delete meal");

            // Supprimer le repas du state
            setMeals((prev) => prev.filter((meal) => meal.id !== id));
            
            toast("Repas supprimé avec succès");
        } catch (error) {
            console.error("[DELETE_MEAL_ERROR]", error);
            setError("Erreur lors de la suppression.");
        }
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!meals) return <div>Repas introuvables.</div>;

    return (
        <>
            {/* Dialogue pour ajouter un repas ou une composition */}
            <div className="flex justify-between items-center flex-row-reverse gap-2 pb-2">
                <IsUser>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="success" className="flex items-center gap-2" onClick={() => setIsDialogOpen(true)}>
                                <Image src={add} alt="Ajouter un repas" className="w-4" />
                                <span className="hidden sm:block">Ajouter un repas</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {currentStep === "createMeal"
                                        ? "Ajouter un repas"
                                        : currentStep === "createComposition"
                                        ? "Ajouter une composition"
                                        : "Choisir une étape"}
                                </DialogTitle>
                                {currentStep === "createMeal" && (
                                    <CreateMeal
                                        onMealCreated={addMeal}
                                        onClose={() => setIsDialogOpen(false)}
                                    />
                                )}
                                {currentStep === "createComposition" && createdMealId && (
                                    <CreateComposition
                                        mealId={createdMealId}
                                        onSubmit={addComposition}
                                        onClose={() => {
                                            setIsDialogOpen(false);
                                            setCurrentStep("createMeal");
                                        }}
                                    />
                                )}
                                {currentStep === "chooseStep" && (
                                    <div>
                                        <Button onClick={() => setCurrentStep("createComposition")}>
                                            Ajouter une composition
                                        </Button>
                                        <Button onClick={() => setCurrentStep("createMeal")}>
                                            Ajouter un autre repas
                                        </Button>
                                    </div>
                                )}
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
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
                                <div className="flex gap-2 w-full">
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
                                        onDelete={() => deleteMeal(meal.id)}
                                        isDeleting={false}
                                    />
                                </div>
                            </IsAdmin>
                            <AddToShoppingListForm type="meal" id={meal.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MealsPage;

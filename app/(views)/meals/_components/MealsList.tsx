'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
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
import CreateMeal from "./CreateMeal";
import UpdateMeal from "./UpdateMeal";
import CreateComposition from "./CreateComposition";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import SearchBar from "@/components/layout/Searchbar";
import FilterCheckboxes from "@/components/layout/FilterItems";

// Composants UI
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Constantes
import { CATEGORIES_MEALS } from "@/lib/constants/ui_constants";


// _________________________ COMPOSANT _________________________
export default function MealsList( {fetchedMeals}: { fetchedMeals: MealType[] }) {
    
    // _________________________ ETATS _________________________
    const [meals, setMeals] = useState<MealType[]>(fetchedMeals);

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<"createMeal" | "createComposition" | "chooseStep">("createMeal"); // étape pour la création de repas ou de composition
    const [createdMealId, setCreatedMealId] = useState<string | null>(null);
    
    const [searchQuery, setSearchQuery] = useState<string>(""); 
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    
    // _________________________ CRUD _________________________
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

                                    {/* Titre du dialogue en fonction de l'étape */}
                                    {currentStep === "createMeal"
                                        ? "Ajouter un repas"
                                        : currentStep === "createComposition"
                                        ? "Ajouter une composition"
                                        : "Choisir une étape"}
                                </DialogTitle>

                                {/* Contenu du dialogue en fonction de l'étape */}
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
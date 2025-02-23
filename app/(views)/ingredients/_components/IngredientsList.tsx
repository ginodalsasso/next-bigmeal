'use client';

import React, { useState } from "react";
import Image from "next/image";
import add from "@/public/img/add.svg";
import { IngredientType } from "@/lib/types/schemas_interfaces";

import ItemView from "@/components/layout/ItemView";
import CreateIngredient from "./CreateIngredient";
import UpdateIngredient from "./UpdateIngredient";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { reversedTranslatedSeason, translatedSeason } from "@/lib/utils";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import EditItem from "@/components/layout/EditItemPopover";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import SearchBar from "@/components/layout/Searchbar";
import FilterCheckboxes from "@/components/layout/FilterCheckboxes";
import { CATEGORIES_INGREDIENTS, SEASONS } from "@/lib/constants/constants";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";


// _________________________ COMPOSANT _________________________
export default function IngredientList({ fetchedIngredients }: { fetchedIngredients: IngredientType[] }) {
    
    // _________________________ ETATS _________________________
    const csrfToken = useCsrfToken();
    const [ingredients, setIngredients] = useState<IngredientType[]>(fetchedIngredients);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);


    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // _________________________ CRUD _________________________
    // Fonction pour ajouter un ingrédient à la liste
    const addIngredient = (ingredient: IngredientType) => {
        // Ajouter l'ingrédient à la liste en conservant les anciens ingrédients
        setIngredients((prevIngredients) =>
            [...prevIngredients, ingredient]
        );
    };

    // Appel API pour mettre à jour un ingrédient
    const updateIngredient = async (updatedIngredient: IngredientType) => {
        setIngredients((prev) => // Remplacer l'ancien ingrédient par le nouveau
            prev.map((ingredient) =>
                ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
            )
        );
    };


    // Appel API pour supprimer un ingrédient
    const deleteIngredient = async (id: string) => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const response = await fetch("/api/ingredients", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error("Erreur lors de la suppression de l'ingrédient");

            setIngredients((prev) => 
                prev.filter((ingredient) => ingredient.id !== id)
            );
            
            toast("Ingrédient supprimé avec succès");
        } catch (error) {
            console.error("[DELETE_INGREDIENT_ERROR]", error);
            setError("Erreur lors de la suppression.");
        }
    };

    // _________________________ FILTRAGE _________________________
    const filterOptions = SEASONS.concat(CATEGORIES_INGREDIENTS); // Options de filtres

    // Fonction pour filtrer en fonction de la recherche et des filtres actifs
    const filteredIngredients = ingredients.filter((ingredient) => {
        // Vérification du champ de recherche
        const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Modification des chaines de caractères pour les saisons et catégories
        const selectedSeasons = selectedFilters.map(filter => reversedTranslatedSeason(filter));
        const selectedCategory = selectedFilters.map(filter => filter.toLowerCase());

        // Vérification des filtres actifs
        const category = ingredient.categoryIngredient?.name || "Non spécifié";
        const season = ingredient.season;
        
        const matchesFilters =
            selectedFilters.length === 0 || // Aucun filtre => tout est affiché
            selectedCategory.includes(category) || (season && selectedSeasons.includes(season)); 

        return matchesSearch && matchesFilters;
    });
    

    // _________________________ RENDU _________________________
    if (error) return <div>{error}</div>;
    if (!ingredients) return <div>Ingrédients introuvables.</div>;

    return (
        <>
            {/* Dialogue pour ajouter un ingrédient */}
            <div className="flex flex-col justify-between gap-2 pb-2 md:flex-row-reverse md:items-center">
                <IsUser>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="success" onClick={() => setIsDialogOpen(true)}>
                                <Image
                                    src={add}
                                    alt="Ajouter un ingrédient"
                                    width={18}
                                    height={18}
                                />
                                    Ajouter un ingrédient
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-center">Ajouter un ingrédient</DialogTitle>
                                {/* Formulaire de création d'ingrédient */}
                                <CreateIngredient
                                    onSubmit={addIngredient}
                                    onClose={() => setIsDialogOpen(false)}
                                />
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
            {/* Liste des ingrédients */}
            <div className="cards-wrapper">
                <div className="cards-list">
                    {filteredIngredients.map((ingredient) => (
                        <div key={ingredient.id} className="card">
                            <ItemView
                                title={ingredient.name}
                                details={{
                                    // Afficher la catégorie et la saison si elles existent
                                    ...(ingredient.categoryIngredient?.name && { category: ingredient.categoryIngredient.name }),
                                    ...(ingredient.season && { season: translatedSeason(ingredient.season) }),
                                }}
                            />
                            <IsAdmin>
                                <div className="flex w-full gap-2">
                                    <EditItem
                                        renderEditForm={(onClose) => (
                                            <UpdateIngredient
                                                ingredient={ingredient}
                                                onSubmit={async (updatedIngredient: IngredientType) => {
                                                    await updateIngredient(updatedIngredient);
                                                    onClose();
                                                }}
                                                onCancel={onClose}
                                            />
                                        )}
                                    />
                                    <DeleteItem onDelete={() => deleteIngredient(ingredient.id)} isDeleting={false} />
                                </div>
                            </IsAdmin>
                            {/* Ajouter l'ingrédient à la liste de courses */}
                            <AddToShoppingListForm type="ingredient" id={ingredient.id} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";

// Types
import { IngredientType } from "@/lib/types/schemas_interfaces";

// Composants
import ItemView from "@/components/layout/ItemView";
import CreateIngredient from "./CreateIngredient";
import UpdateIngredient from "./UpdateIngredient";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";
import PopoverActions from "@/components/layout/PopoverActions";

// Composants UI
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";import { Button } from "@/components/ui/button";

// Utils
import { reversedTranslatedSeason, translatedSeason } from "@/lib/utils";

// Constantes
import { CATEGORIES_INGREDIENTS, SEASONS } from "@/lib/constants/ui_constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";



// _________________________ COMPOSANT _________________________
export default function IngredientList({ fetchedIngredients }: { fetchedIngredients: IngredientType[] }) {
    
    // _________________________ ETATS _________________________
    const router = useRouter();
    const [ingredients, setIngredients] = useState<IngredientType[]>(fetchedIngredients);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        setIngredients(fetchedIngredients); // Pour les mises à jour de la liste d'ingrédients coté client
    }, [fetchedIngredients]);
    

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

    // Suppression d'une catégorie dans le state après suppression API
    const handleIngredientDeleted = (id: string) => {
        setIngredients((prev) => 
            prev.filter((ingredient) => ingredient.id !== id)
        );
    };

    // _________________________ FILTRAGE _________________________
    const filterOptions = SEASONS.concat(CATEGORIES_INGREDIENTS); // Options de filtres

    // Fonction pour gérer le changement de filtre
    const handleFilterChange = (selectedFilters: string[]) => {
        const queryParams = new URLSearchParams();
    
        // Filtrer les catégories et les saisons pour preparer les paramètres de requête
        const categories = selectedFilters.filter(filter => CATEGORIES_INGREDIENTS.includes(filter));
        const seasons = selectedFilters.filter(filter => SEASONS.includes(filter));

        // Ajouter les filtres aux paramètres de requête
        categories.forEach(categorie => queryParams.append("categories", categorie.toLowerCase()));
        seasons.forEach(season => queryParams.append("season", reversedTranslatedSeason(season)));
    
        router.push(`/ingredients?${queryParams.toString()}`);
    };

    // _________________________ RENDU _________________________
    if (!ingredients) return  notFound();
    
    return (
        <>
            <h1 className="h1-title">Liste des ingrédients</h1>
            {/* Dialogue pour ajouter un ingrédient */}
            <IsUser>
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button 
                            variant="success"                     
                            className="w-full"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            Ajouter un ingrédient <Plus/> 
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="my-4 text-center">Ajouter un ingrédient</DrawerTitle>
                        </DrawerHeader>
                        {/* Formulaire de création d'ingrédient */}
                        <CreateIngredient
                            onSubmit={addIngredient}
                            onClose={() => setIsDrawerOpen(false)}
                        />
                    </DrawerContent>
                </Drawer>
            </IsUser>
            <FilterItems
                options={filterOptions}
                onFilterChange={handleFilterChange}
            />

            {/* Liste des ingrédients */}
            <Table>
            <TableHeader>
                <TableRow>
                    <TableHead><span className="table-head">Ingrédients</span></TableHead>
                    <IsAdmin>
                        <TableHead><span className="table-head">Actions</span></TableHead>
                    </IsAdmin>
                </TableRow>
            </TableHeader>
            <TableBody>
                {ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                        <TableCell className="table-cell">
                            <div className="relative">
                                <div>
                                    <ItemView
                                        title={ingredient.name}
                                        details={{
                                            // Afficher la catégorie et la saison si elles existent
                                            ...(ingredient.categoryIngredient?.name && { category: ingredient.categoryIngredient.name }),
                                            ...(ingredient.season && { season: translatedSeason(ingredient.season) }),
                                        }}
                                    />
                                </div>
                                {/* Edition et suppression d'ingrédients */}
                                {/* Si l'utilisateur est admin, afficher les boutons d'édition et de suppression */}
                                <PopoverActions
                                    id={ingredient.id}
                                    apiUrl="/api/ingredients"
                                    onDelete={() => handleIngredientDeleted(ingredient.id)}
                                    renderEditForm={(onClose) => (
                                        <UpdateIngredient
                                            ingredient={ingredient}
                                            onSubmit={updateIngredient}
                                            onCancel={onClose}
                                        />
                                    )}
                                />
                            </div>
                        </TableCell>
                        
                        <TableCell>
                            {/* Ajouter l'ingrédient à la liste de courses */}
                            <AddToShoppingListForm type="ingredient" id={ingredient.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    );
};
'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


// Images
import add from "@/public/img/add.svg";

// Types
import { IngredientType } from "@/lib/types/schemas_interfaces";

// Composants
import ItemView from "@/components/layout/ItemView";
import CreateIngredient from "./CreateIngredient";
import UpdateIngredient from "./UpdateIngredient";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import EditItem from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";

// Composants UI
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";import { Button } from "@/components/ui/button";

// Utils
import { reversedTranslatedSeason, translatedSeason } from "@/lib/utils";

// Constantes
import { CATEGORIES_INGREDIENTS, SEASONS } from "@/lib/constants/ui_constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";



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
    if (!ingredients) return <div>Ingrédients introuvables.</div>;

    return (
        <>
        {/* Dialogue pour ajouter un ingrédient */}
        <div className="flex flex-col justify-between gap-2 pb-2 md:flex-row-reverse md:items-center">
            <IsUser>
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button variant="success" onClick={() => setIsDrawerOpen(true)}>
                            <Image
                                src={add}
                                alt="Ajouter un ingrédient"
                                width={18}
                                height={18}
                            />
                                Ajouter un ingrédient
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="text-center">Ajouter un ingrédient</DrawerTitle>
                            {/* Formulaire de création d'ingrédient */}
                            <CreateIngredient
                                onSubmit={addIngredient}
                                onClose={() => setIsDrawerOpen(false)}
                            />
                        </DrawerHeader>
                    </DrawerContent>
                </Drawer>
            </IsUser>
        </div>
        
        {/* Filtres */}
        <FilterItems 
            options={filterOptions} 
            onFilterChange={handleFilterChange} 
        />

        {/* Liste des ingrédients */}
        <div className="">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><span className="table-head">Noms</span></TableHead>
                        <IsAdmin>
                            <TableHead><span className="table-head">Actions</span></TableHead>
                        </IsAdmin>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ingredients.map((ingredient) => (
                        // <div key={ingredient.id} className="card">
                        <TableRow key={ingredient.id}>
                            <TableCell className="table-cell">
                                <div className="lg:relative">
                                    <ItemView
                                        title={ingredient.name}
                                        details={{
                                            // Afficher la catégorie et la saison si elles existent
                                            ...(ingredient.categoryIngredient?.name && { category: ingredient.categoryIngredient.name }),
                                            ...(ingredient.season && { season: translatedSeason(ingredient.season) }),
                                        }}
                                    />
                                    <div className="lg:absolute right-0 top-0">

                                        <IsAdmin>
                                            <div className="flex gap-4  mt-2">
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
                                                <DeleteItem
                                                    apiUrl="/api/ingredients"
                                                    id={ingredient.id}
                                                    onSubmit={handleIngredientDeleted}
                                                />
                                            </div>
                                        </IsAdmin>
                                    </div>
                                </div>
                            </TableCell>
                            
                            <TableCell>
                                {/* Crud admin */}
                                <div>

                                    {/* Ajouter l'ingrédient à la liste de courses */}
                                    <AddToShoppingListForm type="ingredient" id={ingredient.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </>
    );
};
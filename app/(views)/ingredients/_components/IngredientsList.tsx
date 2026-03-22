'use client';

import React, { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";

import { CategoryIngredientType, IngredientType } from "@/lib/types/schemas_interfaces";
import { reversedTranslatedSeason, translatedSeason, ucFirst } from "@/lib/utils";
import { SEASONS } from "@/lib/constants/ui_constants";

import CreateIngredient from "./CreateIngredient";
import UpdateIngredient from "./UpdateIngredient";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";
import PopoverActions from "@/components/layout/PopoverActions";
import ItemCard from "@/components/layout/ItemCard";
import ItemGrid from "@/components/layout/ItemGrid";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";



export default function IngredientList({
    fetchedIngredients,
    fetchedCategories,
}: {
    fetchedIngredients: IngredientType[];
    fetchedCategories: CategoryIngredientType[];
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [ingredients, setIngredients] = useState<IngredientType[]>(fetchedIngredients);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        setIngredients(fetchedIngredients);
    }, [fetchedIngredients]);

    const addIngredient = (ingredient: IngredientType) => {
        setIngredients((prev) => [...prev, ingredient]);
    };

    const updateIngredient = async (updatedIngredient: IngredientType) => {
        setIngredients((prev) =>
            prev.map((i) => (i.id === updatedIngredient.id ? updatedIngredient : i))
        );
    };

    const handleIngredientDeleted = (id: string) => {
        setIngredients((prev) => prev.filter((i) => i.id !== id));
    };

    const categoryOptions = fetchedCategories.map((cat) => cat.name);
    const filterGroups = [
        { label: "Catégorie", options: categoryOptions },
        { label: "Saison", options: SEASONS },
    ];
    const activeCategories = searchParams.getAll("categories");
    const activeSeasons = searchParams.getAll("season").map((s) => translatedSeason(s));
    const initialFilters = [...activeCategories, ...activeSeasons].filter((f) =>
        [...categoryOptions, ...SEASONS].includes(f)
    );

    const handleFilterChange = (selectedFilters: string[]) => {
        const params = new URLSearchParams();
        selectedFilters
            .filter((f) => categoryOptions.includes(f))
            .forEach((cat) => params.append("categories", cat));
        selectedFilters
            .filter((f) => SEASONS.includes(f))
            .forEach((s) => params.append("season", reversedTranslatedSeason(s)));
        router.replace(`/ingredients?${params.toString()}`);
    };

    if (!ingredients) return notFound();

    return (
        <>
            <h1 className="h1-title">Liste des ingrédients</h1>

            <IsUser>
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button className="w-full" onClick={() => setIsDrawerOpen(true)}>
                            Ajouter un ingrédient <Plus aria-hidden="true" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="my-4 text-center">Ajouter un ingrédient</DrawerTitle>
                        </DrawerHeader>
                        <CreateIngredient onSubmit={addIngredient} onClose={() => setIsDrawerOpen(false)} />
                    </DrawerContent>
                </Drawer>
            </IsUser>

            <FilterItems groups={filterGroups} initialFilters={initialFilters} onFilterChange={handleFilterChange} />

            <ItemGrid
                items={ingredients}
                emptyMessage="Aucun ingrédient trouvé."
                renderItem={(ingredient) => (
                    <ItemCard
                        adminActions={
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
                        }
                        footer={<AddToShoppingListForm type="ingredient" id={ingredient.id} />}
                    >
                        <div className="flex flex-1 flex-col gap-1.5 p-3 pr-8">
                            <p className="line-clamp-2 text-sm font-semibold leading-snug text-warm-primary">
                                {ucFirst(ingredient.name)}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {ingredient.categoryIngredient?.name && (
                                    <span className="rounded-full bg-warm-accent/15 px-2 py-0.5 text-xs font-medium text-warm-primary">
                                        {ingredient.categoryIngredient.name}
                                    </span>
                                )}
                                {ingredient.season && (
                                    <span className="rounded-full bg-warm-border px-2 py-0.5 text-xs font-medium text-warm-secondary">
                                        {translatedSeason(ingredient.season)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </ItemCard>
                )}
            />
        </>
    );
}
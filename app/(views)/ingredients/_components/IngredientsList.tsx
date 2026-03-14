'use client';

import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
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

    const filterOptions = SEASONS.concat(fetchedCategories.map((cat) => cat.name));

    const handleFilterChange = (selectedFilters: string[]) => {
        const params = new URLSearchParams();
        selectedFilters
            .filter((f) => fetchedCategories.map((c) => c.name).includes(f))
            .forEach((cat) => params.append("categories", cat.toLowerCase()));
        selectedFilters
            .filter((f) => SEASONS.includes(f))
            .forEach((s) => params.append("season", reversedTranslatedSeason(s)));
        router.push(`/ingredients?${params.toString()}`);
    };

    if (!ingredients) return notFound();

    return (
        <>
            <h1 className="h1-title">Liste des ingrédients</h1>

            <IsUser>
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button variant="success" className="w-full" onClick={() => setIsDrawerOpen(true)}>
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

            <FilterItems options={filterOptions} onFilterChange={handleFilterChange} />

            {ingredients.length === 0 ? (
                <p className="py-12 text-center text-sm text-zinc-500">Aucun ingrédient trouvé.</p>
            ) : (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="list">
                    {ingredients.map((ingredient) => (
                        <li key={ingredient.id}>
                            <article className="relative flex h-full flex-col rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">

                                {/* Menu actions en haut à droite */}
                                <div className="absolute right-1 top-1 z-10">
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

                                {/* Contenu principal */}
                                <div className="flex flex-1 flex-col gap-1.5 p-3 pr-8">
                                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
                                        {ucFirst(ingredient.name)}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {ingredient.categoryIngredient?.name && (
                                            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                                                {ingredient.categoryIngredient.name}
                                            </span>
                                        )}
                                        {ingredient.season && (
                                            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                                                {translatedSeason(ingredient.season)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Footer — ajouter à la liste de courses */}
                                <div className="border-t border-zinc-100 px-3 py-2">
                                    <AddToShoppingListForm type="ingredient" id={ingredient.id} />
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
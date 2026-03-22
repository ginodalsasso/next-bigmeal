"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart, Plus } from "lucide-react";
import { getCsrfToken } from "next-auth/react";
import { notFound, useRouter, useSearchParams } from "next/navigation";

import { CategoryMealType, MealType } from "@/lib/types/schemas_interfaces";
import { likedMealAPI } from "@/lib/services/meal_service";
import { URL } from "@/lib/constants/api_routes";
import { ucFirst } from "@/lib/utils";

import UpdateMeal from "./UpdateMeal";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";
import PopoverActions from "@/components/layout/PopoverActions";
import ItemCard from "@/components/layout/ItemCard";
import ItemGrid from "@/components/layout/ItemGrid";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";

type MealsListProps = {
    fetchedMeals: MealType[];
    fetchedCategories?: CategoryMealType[] | [];
    fetchedlikedMeals: string[];
};

export default function MealsList({
    fetchedMeals,
    fetchedlikedMeals,
    fetchedCategories,
}: MealsListProps) {
    const [meals, setMeals] = useState<MealType[]>(fetchedMeals);
    const [likedMeals, setLikedMeals] = useState<Set<string>>(
        new Set(fetchedlikedMeals),
    );
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setMeals(fetchedMeals);
    }, [fetchedMeals]);

    const updateMeal = async (updatedMeal: MealType): Promise<void> => {
        setMeals((prev) =>
            prev.map((m) => (m.id === updatedMeal.id ? updatedMeal : m)),
        );
        toast("Repas mis à jour avec succès");
    };

    const handleMealDeleted = (id: string) => {
        setMeals((prev) => prev.filter((m) => m.id !== id));
    };

    const toggleLikeMeal = async (mealName: string) => {
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) return;
            likedMealAPI(mealName, csrfToken);
            setLikedMeals((prev) => {
                const next = new Set(prev);
                if (next.has(mealName)) {
                    next.delete(mealName);
                } else {
                    next.add(mealName);
                }
                return next;
            });
        } catch {
            toast.error("Impossible de modifier le statut du like");
        }
    };

    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
    }, []);

    const categoryOptions = (fetchedCategories ?? []).map((cat) => cat.name);
    const filterGroups = [{ label: "Catégorie", options: categoryOptions }];
    const initialFilters = searchParams.getAll("categories").filter((f) => categoryOptions.includes(f));

    const handleFilterChange = (selectedFilters: string[]) => {
        const params = new URLSearchParams();
        selectedFilters
            .filter((f) => categoryOptions.includes(f))
            .forEach((cat) => params.append("categories", cat));
        router.replace(`/meals?${params.toString()}`);
    };

    if (!meals) return notFound();

    return (
        <>
            <h1 className="h1-title">Liste des repas</h1>

            <IsUser>
                <Button
                    className="w-full"
                    onClick={() => router.push("/meals/create")}
                >
                    Ajouter un repas <Plus aria-hidden="true" />
                </Button>
            </IsUser>

            <FilterItems
                groups={filterGroups}
                initialFilters={initialFilters}
                onFilterChange={handleFilterChange}
            />

            <ItemGrid
                items={meals}
                emptyMessage="Aucun repas trouvé."
                renderItem={(meal) => (
                    <ItemCard
                        adminActions={
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
                        }
                        footer={
                            <div className="flex items-center justify-between">
                                <AddToShoppingListForm type="meal" id={meal.id} />
                                <div className="flex items-center gap-3">
                                    {canShare && (
                                        <ShareButton
                                            className="text-warm-disabled hover:text-warm-accent"
                                            title={`Recette : ${meal.name}`}
                                            text="Découvre cette recette sur notre app !"
                                            url={`${URL}/meals/${meal.name}`}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        aria-label={
                                            likedMeals.has(meal.name)
                                                ? "Retirer des favoris"
                                                : "Ajouter aux favoris"
                                        }
                                        aria-pressed={likedMeals.has(meal.name)}
                                        onClick={() => toggleLikeMeal(meal.name)}
                                        className="flex size-8 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent"
                                    >
                                        <Heart
                                            size={18}
                                            aria-hidden="true"
                                            className={`transition-colors ${
                                                likedMeals.has(meal.name)
                                                    ? "fill-warm-danger text-warm-danger"
                                                    : "text-warm-disabled hover:text-warm-danger"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        }
                    >
                        <Link
                            href={`/meals/${meal.name}`}
                            className="flex flex-1 flex-col gap-1 rounded-t-xl p-3 pr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent focus-visible:ring-offset-1"
                            aria-label={`Voir la recette ${ucFirst(meal.name)}`}
                        >
                            <p className="line-clamp-2 text-sm font-semibold leading-snug text-warm-primary">
                                {ucFirst(meal.name)}
                            </p>
                            {meal.categoryMeal && (
                                <span className="mt-0.5 w-fit rounded-full bg-warm-accent/15 px-2 py-0.5 text-xs font-medium text-warm-primary">
                                    {meal.categoryMeal.name}
                                </span>
                            )}
                        </Link>
                    </ItemCard>
                )}
            />
        </>
    );
}

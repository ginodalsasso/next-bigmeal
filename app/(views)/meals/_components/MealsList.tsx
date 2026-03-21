"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart, Plus } from "lucide-react";
import { getCsrfToken } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";

import { CategoryMealType, MealType } from "@/lib/types/schemas_interfaces";
import { likedMealAPI } from "@/lib/services/meal_service";
import { URL } from "@/lib/constants/api_routes";
import { ucFirst } from "@/lib/utils";

import UpdateMeal from "./UpdateMeal";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";
import PopoverActions from "@/components/layout/PopoverActions";
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

    const filterOptions = (fetchedCategories ?? []).map((cat) => cat.name);

    const handleFilterChange = (selectedFilters: string[]) => {
        const params = new URLSearchParams();
        selectedFilters
            .filter((f) =>
                (fetchedCategories ?? []).map((c) => c.name).includes(f),
            )
            .forEach((cat) => params.append("categories", cat));
        router.push(`/meals?${params.toString()}`);
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
                options={filterOptions}
                onFilterChange={handleFilterChange}
            />

            {meals.length === 0 ? (
                <p className="py-12 text-center text-sm text-warm-secondary">
                    Aucun repas trouvé.
                </p>
            ) : (
                <ul
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
                    role="list"
                >
                    {meals.map((meal) => (
                        <li key={meal.id}>
                            <article className="relative flex h-full flex-col rounded-xl border border-warm-border bg-warm-subtle shadow-sm transition-shadow hover:shadow-md">
                                <IsAdmin>
                                    <div className="absolute right-1 top-1 z-10">
                                        <PopoverActions
                                            id={meal.id}
                                            apiUrl="/api/meals"
                                            onDelete={() =>
                                                handleMealDeleted(meal.id)
                                            }
                                            renderEditForm={(onClose) => (
                                                <UpdateMeal
                                                    meal={meal}
                                                    onSubmit={updateMeal}
                                                    onClose={onClose}
                                                />
                                            )}
                                        />
                                    </div>
                                </IsAdmin>

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

                                <div className="flex items-center justify-between border-t border-warm-border px-3 py-2">
                                    <AddToShoppingListForm
                                        type="meal"
                                        id={meal.name}
                                    />

                                    <div className="flex items-center gap-3">
                                        {typeof navigator !== "undefined" &&
                                            typeof navigator.share ===
                                                "function" && (
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
                                            aria-pressed={likedMeals.has(
                                                meal.name,
                                            )}
                                            onClick={() =>
                                                toggleLikeMeal(meal.name)
                                            }
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
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

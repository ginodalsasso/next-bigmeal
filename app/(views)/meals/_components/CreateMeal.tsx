"use client";

import { useEffect, useState, SubmitEvent } from "react";
import Link from "next/link";

import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import { MealFormType } from "@/lib/types/forms_interfaces";
import { CreateMealProps } from "@/lib/types/props_interfaces";

import { mealConstraints } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { ucFirst } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { getCategoriesMeal } from "@/lib/services/data_fetcher";
import { createMealAPI } from "@/lib/services/meal_service";

const CreateMeal: React.FC<CreateMealProps> = ({ onSubmit }) => {
    const [categories, setCategories] = useState<CategoryMealType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const { error, setError, submit, isLoading } = useCrudForm<MealFormType>(
        mealConstraints,
        ["name", "description", "categoryMealId"]
    );

    useEffect(() => {
        getCategoriesMeal()
            .then(setCategories)
            .catch(() => setError({ general: "Erreur lors de la récupération des catégories." }));
    }, [setError]);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await submit({
            form: {
                name: formData.get("mealName") as string,
                description: (formData.get("mealDescription") as string) === "" ? undefined : (formData.get("mealDescription") as string),
                categoryMealId: formData.get("categoryMealId") as string,
            },
            apiCall: createMealAPI,
            onSuccess: onSubmit,
            successMessage: "Repas créé avec succès",
            errorMessage: "Erreur lors de la création du repas.",
        });
    };

    return (
        <form className="drawer-form" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="drawer-label-input">
                <label htmlFor="mealName">Nom du repas</label>
                <input
                    className="input-text-select"
                    type="text"
                    id="mealName"
                    name="mealName"
                    placeholder="Carbonara, Couscous, etc."
                    autoComplete="off"
                    required
                />
                <FormErrorMessage message={error?.name} />
            </div>

            <div className="drawer-label-input">
                <label htmlFor="mealDescription">Description du repas (optionnelle)</label>
                <textarea
                    className="input-text-select"
                    id="mealDescription"
                    name="mealDescription"
                    placeholder="Quelque chose à ajouter ?"
                    defaultValue=""
                />
                <FormErrorMessage message={error?.description} />
            </div>

            <div className="drawer-label-input">
                <label htmlFor="categoryMealId">Catégorie du repas</label>
                <div className="flex gap-2">
                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className={`label-filter ${selectedCategory === category.id ? "sticker-bg-white" : "sticker-bg-black"}`}
                            onClick={() => setSelectedCategory(category.id)}
                            htmlFor={`category-${category.id}`}
                        >
                            <input
                                id={`category-${category.id}`}
                                type="radio"
                                name="categoryMealId"
                                value={category.id}
                                className="hidden"
                                checked={selectedCategory === category.id}
                                onChange={() => setSelectedCategory(category.id)}
                            />
                            {ucFirst(category.name)}
                        </label>
                    ))}
                </div>
                <FormErrorMessage message={error?.categoryMealId} />
            </div>

            <div className="drawer-buttons-form">
                <Button variant="cancel" asChild>
                    <Link href="/meals">Revenir en arrière</Link>
                </Button>
                <FormSubmitButton
                    loadingText="Création du repas en cours..."
                    defaultText="Valider le repas"
                    isPending={isLoading}
                />
            </div>
        </form>
    );
};

export default CreateMeal;

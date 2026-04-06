"use client";

import { SubmitEvent, useEffect, useState } from "react";

import { Season } from "@prisma/client";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import { IngredientFormType } from "@/lib/types/forms_interfaces";
import { CreateIngredientProps } from "@/lib/types/props_interfaces";

import { ingredientConstraints } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { translatedSeason, ucFirst } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { getCategoriesIngredient } from "@/lib/services/data_fetcher";
import { createIngredientAPI } from "@/lib/services/ingredients_service";

const CreateIngredient: React.FC<CreateIngredientProps> = ({ onSubmit, onClose }) => {
    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);
    const [selectedSeason, setSelectedSeason] = useState<string | undefined>(undefined);

    const { error, setError, submit, isLoading } = useCrudForm<IngredientFormType>(
        ingredientConstraints,
        ["name", "season", "categoryIngredientId"]
    );

    useEffect(() => {
        getCategoriesIngredient()
            .then(setCategories)
            .catch(() => setError({ general: "Erreur lors de la récupération des catégories." }));
    }, [setError]);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await submit({
            form: {
                name: formData.get("name") as string,
                season: (formData.get("season") as string) === "" ? undefined : (formData.get("season") as Season),
                categoryIngredientId: formData.get("categoryIngredientId") as string,
            },
            apiCall: createIngredientAPI,
            onSuccess: onSubmit,
            successMessage: "Ingrédient créé avec succès",
            errorMessage: "Erreur lors de la création de l'ingrédient.",
            onClose,
        });
    };

    return (
        <form className="drawer-form" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="drawer-label-input">
                <label htmlFor="name">Nom de l&apos;ingrédient</label>
                <input
                    className="input-text-select"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tomate, Poulet, etc."
                    autoComplete="off"
                    required
                />
                <FormErrorMessage message={error?.name} />
            </div>

            <div className="drawer-label-input">
                <label htmlFor="categoryIngredientId">Catégorie de l&apos;ingrédient</label>
                <select
                    className="input-text-select"
                    name="categoryIngredientId"
                    id="categoryIngredientId"
                    defaultValue=""
                    required
                >
                    <option value="">-- Choisir une catégorie --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {ucFirst(category.name)}
                        </option>
                    ))}
                </select>
                <FormErrorMessage message={error?.categoryIngredientId} />
            </div>

            <div className="drawer-label-input">
                <label>Saison (optionnel)</label>
                <div className="flex flex-col gap-2">
                    <input type="hidden" name="season" value={selectedSeason ?? ""} />
                    {Object.values(Season).map((season) => (
                        <button
                            key={season}
                            type="button"
                            onClick={() => setSelectedSeason(selectedSeason === season ? undefined : season)}
                            className={`label-filter ${selectedSeason === season ? "sticker-bg-white" : "sticker-bg-black"}`}
                        >
                            {translatedSeason(season)}
                        </button>
                    ))}
                </div>
                <FormErrorMessage message={error?.season} />
            </div>

            <div className="drawer-buttons-form">
                <Button variant="cancel" onClick={onClose}>Annuler</Button>
                <FormSubmitButton isPending={isLoading} />
            </div>
        </form>
    );
};

export default CreateIngredient;

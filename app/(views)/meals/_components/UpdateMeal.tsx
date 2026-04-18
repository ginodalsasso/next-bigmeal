import { useEffect, useState, SubmitEvent } from "react";

import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import { UpdateMealProps } from "@/lib/types/props_interfaces";

import { mealConstraints, MealFormData } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { ucFirst } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { getCategoriesMeal } from "@/lib/services/data_fetcher";
import { updateMealAPI } from "@/lib/services/meal_service";

const UpdateMeal: React.FC<UpdateMealProps> = ({ meal, onSubmit, onClose }) => {
    const [categories, setCategories] = useState<CategoryMealType[]>([]);

    const { error, setError, submit, isLoading } = useCrudForm<MealFormData>(
        mealConstraints,
        ["id", "name", "description", "categoryMealId"]
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
                id: meal.id,
                name: formData.get("mealName") as string,
                description: (formData.get("mealDescription") as string) === "" ? undefined : (formData.get("mealDescription") as string),
                categoryMealId: formData.get("categoryMealId") as string,
            },
            apiCall: updateMealAPI,
            onSuccess: onSubmit,
            successMessage: "Repas mis à jour avec succès",
            errorMessage: "Erreur lors de la mise à jour du repas.",
            onClose,
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
                    placeholder="Carbonara"
                    defaultValue={meal.name}
                    autoComplete="off"
                    required
                />
                <FormErrorMessage message={error?.name} />
            </div>

            <div className="drawer-label-input">
                <label htmlFor="categoryMealId">Catégorie du repas</label>
                <select
                    className="input-text-select"
                    name="categoryMealId"
                    id="categoryMealId"
                    value={meal.categoryMealId}
                    required
                >
                    <option value="">-- Choisir une catégorie --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {ucFirst(category.name)}
                        </option>
                    ))}
                </select>
                <FormErrorMessage message={error?.categoryMealId} />
            </div>

            <div className="drawer-label-input">
                <label htmlFor="mealDescription">Description du repas (optionnelle)</label>
                <textarea
                    className="input-text-select"
                    id="mealDescription"
                    name="mealDescription"
                    placeholder="Quelque chose à ajouter ?"
                    defaultValue={meal.description ?? ""}
                />
                <FormErrorMessage message={error?.description} />
            </div>

            <div className="drawer-buttons-form">
                <Button variant="cancel" onClick={onClose}>Annuler</Button>
                <FormSubmitButton isPending={isLoading} />
            </div>
        </form>
    );
};

export default UpdateMeal;

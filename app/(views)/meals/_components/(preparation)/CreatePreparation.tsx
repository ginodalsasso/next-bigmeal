"use client";

import { SubmitEvent } from "react";
import { PreparationFormType } from "@/lib/types/forms_interfaces";
import { CreatePreparationProps } from "@/lib/types/props_interfaces";

import { preparationConstraints } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { createPreparationAPI } from "@/lib/services/preparation_service";

const CreatePreparation: React.FC<CreatePreparationProps> = ({ mealId, onSubmit }) => {
    const { error, submit, isLoading } = useCrudForm<PreparationFormType>(
        preparationConstraints,
        ["prepTime", "cookTime"]
    );

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await submit({
            form: {
                mealId,
                prepTime: formData.get("prepTime") ? Number(formData.get("prepTime")) : undefined,
                cookTime: formData.get("cookTime") ? Number(formData.get("cookTime")) : undefined,
            },
            apiCall: createPreparationAPI,
            onSuccess: onSubmit,
            successMessage: "Préparation créée avec succès",
            errorMessage: "Erreur lors de la création de la préparation.",
        });
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
                <div>
                    <label htmlFor="prepTime" className="text-sm font-medium text-warm-primary">
                        Temps de préparation en minutes (optionnel)
                    </label>
                    <input
                        className="input-text-select"
                        id="prepTime"
                        name="prepTime"
                        type="number"
                        placeholder="60"
                        autoComplete="off"
                        min={0}
                    />
                </div>

                <div>
                    <label htmlFor="cookTime" className="text-sm font-medium text-warm-primary">
                        Temps de cuisson en minutes (optionnel)
                    </label>
                    <input
                        className="input-text-select"
                        id="cookTime"
                        name="cookTime"
                        type="number"
                        placeholder="30"
                        autoComplete="off"
                        min={0}
                    />
                </div>
            </div>
            <FormErrorMessage message={error?.prepTime} />
            <FormErrorMessage message={error?.cookTime} />

            <div className="flex flex-col-reverse gap-2 lg:justify-end">
                <FormSubmitButton
                    defaultText="Valider la préparation"
                    loadingText="Création de la préparation en cours..."
                    isPending={isLoading}
                />
            </div>
        </form>
    );
};

export default CreatePreparation;

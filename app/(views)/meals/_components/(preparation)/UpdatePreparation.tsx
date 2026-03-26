"use client";

import { SubmitEvent } from "react";
import { UpdatePreparationProps } from "@/lib/types/props_interfaces";

import { updatePreparationConstraints } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { updatePreparationAPI } from "@/lib/services/preparation_service";

type UpdatePreparationFormType = { id: string; prepTime?: number; cookTime?: number };

const UpdatePreparation: React.FC<UpdatePreparationProps> = ({ initialPreparation: preparation, onSubmit, onClose }) => {
    const { error, submit, isLoading } = useCrudForm<UpdatePreparationFormType>(
        updatePreparationConstraints,
        ["prepTime", "cookTime"]
    );

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await submit({
            form: {
                id: preparation.id,
                prepTime: formData.get("prepTime") ? Number(formData.get("prepTime")) : undefined,
                cookTime: formData.get("cookTime") ? Number(formData.get("cookTime")) : undefined,
            },
            apiCall: updatePreparationAPI,
            onSuccess: onSubmit,
            successMessage: "Préparation mise à jour avec succès",
            errorMessage: "Erreur lors de la mise à jour de la préparation.",
            onClose,
        });
    };

    return (
        <form className="drawer-form" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="drawer-label-input">
                <label htmlFor="prepTime">Temps de préparation (minutes)</label>
                <input
                    className="input-text-select"
                    id="prepTime"
                    name="prepTime"
                    type="number"
                    placeholder="60"
                    defaultValue={preparation.prepTime ?? ""}
                    autoComplete="off"
                    min={0}
                />
                <FormErrorMessage message={error?.prepTime} />
            </div>

            <div className="drawer-label-input">
                <label htmlFor="cookTime">Temps de cuisson (minutes)</label>
                <input
                    className="input-text-select"
                    id="cookTime"
                    name="cookTime"
                    type="number"
                    placeholder="30"
                    defaultValue={preparation.cookTime ?? ""}
                    autoComplete="off"
                    min={0}
                />
                <FormErrorMessage message={error?.cookTime} />
            </div>

            <div className="drawer-buttons-form">
                <Button variant="cancel" onClick={onClose}>Annuler</Button>
                <FormSubmitButton isPending={isLoading} />
            </div>
        </form>
    );
};

export default UpdatePreparation;

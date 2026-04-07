"use client";

import { SubmitEvent, useState } from "react";

import { StepType } from "@/lib/types/schemas_interfaces";
import { UpdateStepProps } from "@/lib/types/props_interfaces";

import { updateStepConstraints, UpdateStepFormData } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { updateStepAPI } from "@/lib/services/step_service";

const UpdateStep: React.FC<UpdateStepProps> = ({ initialStep, onSubmit, onClose }) => {
    const [step, setStep] = useState<StepType>(initialStep);

    const { error, submit, isLoading } = useCrudForm<UpdateStepFormData>(
        updateStepConstraints,
        ["description"]
    );

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await submit({
            form: {
                id: step.id,
                preparationId: step.preparationId,
                stepNumber: step.stepNumber,
                description: formData.get("description") as string,
            },
            apiCall: updateStepAPI,
            onSuccess: onSubmit,
            successMessage: "Étape mise à jour avec succès",
            errorMessage: "Erreur lors de la mise à jour de l'étape.",
            onClose,
        });
    };

    return (
        <form className="drawer-form" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="drawer-label-input">
                <label className="text-sm font-medium text-warm-primary" htmlFor="description">
                    Description de l&apos;étape
                </label>
                <textarea
                    id="description"
                    name="description"
                    onChange={(e) => setStep({ ...step, description: e.target.value })}
                    placeholder="Ajouter les condiments..."
                    value={step.description}
                    className="input-text-select"
                    required
                />
                <FormErrorMessage message={error?.description} />
            </div>

            <div className="drawer-buttons-form">
                <Button variant="secondary" onClick={onClose}>Annuler</Button>
                <FormSubmitButton isPending={isLoading} />
            </div>
        </form>
    );
};

export default UpdateStep;

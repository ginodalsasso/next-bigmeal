"use client";

import { useState } from "react";

import { CreateStepProps } from "@/lib/types/props_interfaces";

import { newStepConstraints, StepFormData, StepFormError } from "@/lib/constraints/forms_constraints";
import { submitWithCsrf } from "@/app/hooks/useCrudForm";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";

import { createStepAPI } from "@/lib/services/step_service";
import { X } from "lucide-react";

const CreateStep: React.FC<CreateStepProps> = ({ preparationId, onSubmit }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<StepFormData[]>([
        { preparationId, stepNumber: 1, description: "", imageUrl: null },
    ]);
    const [error, setError] = useState<{ general: string } & Record<number, Partial<StepFormError>>>({ general: "" });

    const addNewLine = () => {
        setForm((prev) => {
            const maxStepNumber = prev.length > 0 ? Math.max(...prev.map((s) => s.stepNumber)) : 0;
            return [...prev, { preparationId, stepNumber: maxStepNumber + 1, description: "", imageUrl: "" }];
        });
    };

    const removeLine = (index: number) => {
        setForm((prev) =>
            prev
                .filter((_, i) => i !== index)
                .map((step, i) => ({ ...step, stepNumber: i + 1 }))
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({ general: "" });

        const validationResult = newStepConstraints.safeParse(form);

        if (!validationResult.success) {
            const formattedErrors: Record<number, StepFormError> = {};
            validationResult.error.errors.forEach((err) => {
                const index = err.path[0] as number;
                const key = err.path[1] as keyof StepFormError;
                if (!formattedErrors[index]) formattedErrors[index] = {};
                formattedErrors[index][key] = err.message;
            });
            setError({ general: "", ...formattedErrors });
            setIsLoading(false);
            return;
        }

        try {
            await submitWithCsrf({
                apiCall: (csrf) => createStepAPI(form, csrf),
                onSuccess: onSubmit,
                onError: (msg) => setError((prev) => ({ ...prev, general: msg })),
                successMessage: "Étapes créées avec succès",
                errorMessage: "Erreur lors de l'ajout des étapes",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <FormErrorMessage message={error.general} />

            {form.map((step, index) => (
                <div key={index} className="flex flex-col gap-3 pb-4">
                    <div className="flex items-center justify-between">
                        <strong className="text-sm font-semibold text-warm-primary">Étape {step.stepNumber}</strong>
                        <Button
                            variant="delete"
                            className="self-end"
                            title="Supprimer"
                            onClick={() => removeLine(index)}
                            disabled={form.length === 1}
                        >
                            <X /> Supprimer l&apos;étape
                        </Button>
                    </div>

                    <div>
                        <label htmlFor="description" className="text-sm font-medium text-warm-primary">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Ajouter les condiments..."
                            value={step.description}
                            onChange={(e) =>
                                setForm((prev) =>
                                    prev.map((s, i) => (i === index ? { ...s, description: e.target.value } : s))
                                )
                            }
                            className="input-text-select"
                            required
                        />
                    </div>

                    <FormErrorMessage message={error[index]?.stepNumber} />
                    <FormErrorMessage message={error[index]?.description} />

                    {form.length > 1 && <hr className="border-warm-border" />}
                </div>
            ))}

            <Button variant="secondary" type="button" onClick={addNewLine}>
                Ajouter une étape
            </Button>

            <Button type="submit" variant="default" disabled={isLoading || form.length === 0}>
                {isLoading ? "Création des étapes en cours..." : "Valider les étapes"}
            </Button>
        </form>
    );
};

export default CreateStep;

"use client";

import React, { useState } from "react";

import { CompositionFormErrorType, CompositionFormType } from "@/lib/types/forms_interfaces";
import { IngredientUnit } from "@/lib/types/enums";
import { CreateCompositionProps } from "@/lib/types/props_interfaces";

import { newCompositionConstraints } from "@/lib/constraints/forms_constraints";
import { submitWithCsrf } from "@/app/hooks/useCrudForm";

import { translatedUnit } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import { IngredientSearchInput } from "@/components/search/IngredientSearchInput";

import { createCompositionAPI } from "@/lib/services/composition_service";
import { X } from "lucide-react";

const CreateComposition: React.FC<CreateCompositionProps> = ({ mealId, onSubmit }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<CompositionFormType[]>([
        { ingredientId: "", mealId, quantity: 0, unit: IngredientUnit.GRAM },
    ]);
    const [error, setError] = useState<{ general: string } & Record<number, CompositionFormErrorType>>({ general: "" });

    const addNewLine = () => {
        setForm((prev) => [...prev, { ingredientId: "", mealId, quantity: 0, unit: IngredientUnit.GRAM }]);
    };

    const removeLine = (index: number) => {
        setForm((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({ general: "" });

        const validationResult = newCompositionConstraints.safeParse(form);

        if (!validationResult.success) {
            const formattedErrors: Record<number, CompositionFormErrorType> = {};
            validationResult.error.errors.forEach((err) => {
                const index = err.path[0] as number;
                const key = err.path[1] as keyof CompositionFormErrorType;
                if (!formattedErrors[index]) formattedErrors[index] = {};
                formattedErrors[index][key] = err.message;
            });
            setError({ general: "", ...formattedErrors });
            setIsLoading(false);
            return;
        }

        try {
            await submitWithCsrf({
                apiCall: (csrf) => createCompositionAPI(form, csrf),
                onSuccess: onSubmit,
                onError: (msg) => setError((prev) => ({ ...prev, general: msg })),
                successMessage: "Compositions créées avec succès",
                errorMessage: "Erreur lors de l'ajout des compositions",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isFormInvalid = form.some((comp) => !comp.ingredientId || !comp.quantity || !comp.unit) || isLoading;

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <FormErrorMessage message={error.general} />

            {form.map((composition, index) => (
                <div key={index} className="flex flex-col gap-3">
                    <IngredientSearchInput
                        value={composition.ingredientId}
                        onSelect={(ingredient) =>
                            setForm((prev) =>
                                prev.map((comp, i) =>
                                    i === index ? { ...comp, ingredientId: ingredient.id } : comp
                                )
                            )
                        }
                    />
                    <div className="flex gap-3">
                        <div>
                            <label htmlFor="quantity" className="text-sm font-medium text-warm-primary">Quantité</label>
                            <input
                                id="quantity"
                                type="number"
                                step="0.1"
                                placeholder="Quantité"
                                value={composition.quantity || ""}
                                onChange={(e) =>
                                    setForm((prev) =>
                                        prev.map((comp, i) =>
                                            i === index ? { ...comp, quantity: parseFloat(e.target.value) } : comp
                                        )
                                    )
                                }
                                className="input-text-select"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="unit" className="text-sm font-medium text-warm-primary">Unité</label>
                            <select
                                id="unit"
                                value={composition.unit}
                                onChange={(e) =>
                                    setForm((prev) =>
                                        prev.map((comp, i) =>
                                            i === index ? { ...comp, unit: e.target.value as IngredientUnit } : comp
                                        )
                                    )
                                }
                                className="input-text-select"
                                required
                            >
                                <option value="">-- Choisir une unité --</option>
                                {Object.values(IngredientUnit).map((unit) => (
                                    <option key={unit} value={unit}>
                                        {translatedUnit(unit)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Button
                        variant="delete"
                        className="w-full self-end"
                        title="Supprimer la composition"
                        onClick={() => removeLine(index)}
                        disabled={form.length === 1}
                    >
                        <X /> Supprimer la composition
                    </Button>

                    <FormErrorMessage message={error[index]?.ingredientId} />
                    <FormErrorMessage message={error[index]?.quantity} />
                    <FormErrorMessage message={error[index]?.unit} />

                    {form.length > 1 && <hr className="border-warm-border" />}
                </div>
            ))}

            <Button variant="default" className="mb-4" type="button" onClick={addNewLine} disabled={isFormInvalid}>
                Ajouter une autre composition
            </Button>
            <Button type="submit" variant="default" disabled={isFormInvalid}>
                {isLoading ? "Création de la composition en cours..." : "Valider la composition"}
            </Button>
        </form>
    );
};

export default CreateComposition;

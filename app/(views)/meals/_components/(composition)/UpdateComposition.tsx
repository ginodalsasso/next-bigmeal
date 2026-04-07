"use client";

import { SubmitEvent } from "react";
import { Unit } from "@prisma/client";
import { UpdateCompositionProps } from "@/lib/types/props_interfaces";

import { updateCompositionConstraints, UpdateCompositionFormData } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { translatedUnit } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { updateCompositionAPI } from "@/lib/services/composition_service";

const UpdateComposition: React.FC<UpdateCompositionProps> = ({ initialComposition, onSubmit, onClose }) => {
    const { error, submit, isLoading } = useCrudForm<UpdateCompositionFormData>(
        updateCompositionConstraints,
        ["quantity", "unit"]
    );

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await submit({
            form: {
                id: initialComposition.id,
                quantity: formData.get("quantity") ? Number(formData.get("quantity")) : 0,
                unit: formData.get("unit") as Unit,
            },
            apiCall: updateCompositionAPI,
            onSuccess: onSubmit,
            successMessage: "Composition mise à jour avec succès",
            errorMessage: "Erreur lors de la mise à jour de la composition.",
            onClose,
        });
    };

    return (
        <form className="drawer-form" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="drawer-label-input">
                <label htmlFor="quantity" className="text-sm font-medium text-warm-primary">Quantité</label>
                <input
                    className="input-text-select"
                    type="number"
                    id="quantity"
                    name="quantity"
                    defaultValue={initialComposition.quantity}
                    step="0.1"
                    placeholder="Quantité"
                    required
                />
                <FormErrorMessage message={error?.quantity} />
            </div>

            <div className="drawer-label-input">
                <label htmlFor="unit" className="text-sm font-medium text-warm-primary">Unité</label>
                <select
                    className="input-text-select"
                    id="unit"
                    name="unit"
                    defaultValue={initialComposition.unit}
                    required
                >
                    <option value="">-- Choisir une unité --</option>
                    {Object.values(Unit).map((unit) => (
                        <option key={unit} value={unit}>
                            {translatedUnit(unit)}
                        </option>
                    ))}
                </select>
                <FormErrorMessage message={error?.unit} />
            </div>

            <div className="drawer-buttons-form">
                <Button variant="cancel" onClick={onClose}>Annuler</Button>
                <FormSubmitButton isPending={isLoading} />
            </div>
        </form>
    );
};

export default UpdateComposition;

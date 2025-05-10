"use client";

import React, { useState } from "react";
import { PreparationType, StepType } from "@/lib/types/schemas_interfaces";
import IsAdmin from "@/components/isAdmin";
import EditItem from "@/components/layout/EditItemDrawer";
import UpdatePreparation from "./UpdatePreparation";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import StepItem from "./(step)/StepItem";
import { PreparationItemProps } from "@/lib/types/props_interfaces";

// _________________________ COMPOSANT _________________________
const PreparationItem = ({ fetchedPreparation, onUpdate, onDelete }: PreparationItemProps) => {

    const [preparation, setPreparation] = useState<PreparationType>(fetchedPreparation);

    const updatePreparation = async (updatedPreparation: PreparationType) => {
        setPreparation(updatedPreparation); // Mettre à jour l'état local avec la préparation mise à jour
        await onUpdate(updatedPreparation); // Appeler onUpdate pour le parent MealItem
    }

    const updateStep = (updatedStep: StepType) => {
        setPreparation((prevPreparation) => { 
            if (!prevPreparation) return prevPreparation;

            const updatedSteps = prevPreparation.steps.map((step) =>
                step.id === updatedStep.id
                    ? { ...step, ...updatedStep }
                    : step
            );

            return { ...prevPreparation, steps: updatedSteps };
        });
    }

    const deleteStep = (id: string) => {
        setPreparation((prevPreparation) => {
            if (!prevPreparation) return prevPreparation;
            return {
                ...prevPreparation,
                steps: prevPreparation.steps.filter((step) => step.id !== id)
            };
        });
    }

    // _________________________ RENDU _________________________
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="mt-2">
                    <p>Préparation: {preparation.prepTime} minutes</p>
                    <p>Cuisson: {preparation.cookTime} minutes</p>
                </div>
                <div>
                    <IsAdmin>
                        <EditItem
                            renderEditForm={(onClose) => (
                                <UpdatePreparation
                                    initialPreparation={preparation}
                                    onSubmit={updatePreparation}
                                    onClose={onClose}
                                />
                            )}
                        />
                        <DeleteItem 
                            apiUrl="/api/preparation" 
                            id={preparation.id} 
                            onSubmit={onDelete} 
                        />
                    </IsAdmin>
                </div>
            </div>
                <ol className="mt-3 space-y-3">
                    {preparation.steps && preparation.steps.map((step) => (
                        <li key={step.id} className="pl-2">
                            <StepItem
                                key={step.id}
                                step={step}
                                onUpdate={updateStep}
                                onDelete={deleteStep}
                            />
                        </li>
                    ))}
                </ol>
        </>
    );
}

export default PreparationItem;
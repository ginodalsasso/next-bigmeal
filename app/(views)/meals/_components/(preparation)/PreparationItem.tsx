"use client";

import React, { useState } from "react";
import { PreparationType, StepType } from "@/lib/types/schemas_interfaces";
import IsAdmin from "@/components/isAdmin";
import EditItem from "@/components/layout/EditItemDrawer";
import UpdatePreparation from "./UpdatePreparation";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import StepItem from "./(step)/StepItem";

// _________________________ COMPOSANT _________________________
const PreparationItem = ({ fetchedPreparation, onUpdate, onDelete }: {
    fetchedPreparation: PreparationType 
    onUpdate: (updatedPreparation: PreparationType) => Promise<void>; 
    onDelete: (id: string) => void; 
}) => {

    const [preparation, setPreparation] = useState<PreparationType>(fetchedPreparation);

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
            <li>
                <p>Temps de préparation: {preparation.prepTime}</p>
                <p>Temps de cuisson: {preparation.cookTime}</p>
                <ul>
                    {preparation.steps.map((step) => (
                        <li key={step.id}>
                            <StepItem
                                key={step.id}
                                step={step}
                                onUpdate={updateStep}
                                onDelete={deleteStep}
                            />
                        </li>
                    ))}
                </ul>
            </li>
            <div>

                <IsAdmin>
                    <EditItem
                        renderEditForm={(onClose) => (
                            <UpdatePreparation
                                initialPreparation={preparation}
                                onSubmit={onUpdate}
                                onClose={onClose}
                            />
                        )}
                    />
                    <DeleteItem apiUrl="/api/preparation" id={preparation.id} onSubmit={onDelete} />
                </IsAdmin>
            </div>
        </>
    );
}

export default PreparationItem;
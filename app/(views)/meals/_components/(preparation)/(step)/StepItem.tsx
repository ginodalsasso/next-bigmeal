"use client";

import React from "react";
import { StepType } from "@/lib/types/schemas_interfaces";
import IsAdmin from "@/components/isAdmin";
import EditItem from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import UpdateStep from "./UpdateStep";

// _________________________ COMPOSANT _________________________
const StepItem = ({ step, onUpdate, onDelete }: {
    step: StepType 
    onUpdate: (updatedStep: StepType) => void; 
    onDelete: (id: string) => void; 
}) => {

    // _________________________ RENDU _________________________
    return (
        <>
            {step.stepNumber}. {step.description}
            <div>
                <IsAdmin>
                    <EditItem
                        renderEditForm={(onClose) => (
                            <UpdateStep
                                initialStep={step}
                                onSubmit={onUpdate}
                                onClose={onClose}
                            />
                        )}
                    />
                    <DeleteItem apiUrl="/api/step" id={step.id} onSubmit={onDelete} />
                </IsAdmin>
            </div>
        </>
    );
}

export default StepItem;
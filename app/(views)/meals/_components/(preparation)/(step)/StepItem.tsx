"use client";

import React from "react";
import IsAdmin from "@/components/isAdmin";
import EditItem from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import UpdateStep from "./UpdateStep";
import { StepItemProps } from "@/lib/types/props_interfaces";

// _________________________ COMPOSANT _________________________
const StepItem = ({ step, onUpdate, onDelete }: StepItemProps) => {

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
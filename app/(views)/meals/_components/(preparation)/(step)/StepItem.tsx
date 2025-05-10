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
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Étape {step.stepNumber}: </span>
                    <p>{step.description}</p>
                </div>
                <div className="ml-auto  items-center gap-2">
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
            </div>
        </>
    );
}

export default StepItem;
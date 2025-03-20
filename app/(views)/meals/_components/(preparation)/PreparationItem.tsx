"use client";

import React from "react";
import { PreparationType } from "@/lib/types/schemas_interfaces";
import IsAdmin from "@/components/isAdmin";
import EditItem from "@/components/layout/EditItemDrawer";
import UpdatePreparation from "./UpdatePreparation";

// _________________________ COMPOSANT _________________________
const PreparationItem = ({  preparation, onUpdate }: { //onDelete
    preparation: PreparationType 
    onUpdate: (updatedPreparation: PreparationType) => Promise<void>; 
    // onDelete: (id: string) => void; 
}) => {

    // _________________________ RENDU _________________________
    return (
        <>
            <li>
                <p>Temps de préparation: {preparation.prepTime}</p>
                <p>Temps de cuisson: {preparation.cookTime}</p>
                <ul>
                    {preparation.steps.map((step) => (
                        <li key={step.id}>
                            {step.stepNumber}. {step.description}
                        </li>
                    ))}
                </ul>
            </li>
            <div>

                <IsAdmin>
                    <EditItem
                        renderEditForm={(onClose) => (
                            <UpdatePreparation
                                preparation={preparation}
                                onSubmit={onUpdate}
                                onClose={onClose}
                            />
                        )}
                    />
                    {/* <DeleteItem apiUrl="/api/preparation" id={preparation.id} onSubmit={onDelete} /> */}
                </IsAdmin>
            </div>
        </>
    );
}

export default PreparationItem;
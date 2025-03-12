"use client";

import React from "react";
import { PreparationType } from "@/lib/types/schemas_interfaces";

// _________________________ COMPOSANT _________________________
const PreparationItem = ({ preparation }: { preparation: PreparationType }) => {

    // _________________________ RENDU _________________________
    return (
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
    );
}

export default PreparationItem;
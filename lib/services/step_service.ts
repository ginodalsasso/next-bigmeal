import API_ROUTES from "../constants/api_routes";
import { StepFormType } from "../types/forms_interfaces";
import { StepType } from "../types/schemas_interfaces";

export async function createStepAPI(stepData: StepFormType[], csrfToken: string): Promise<StepType[]> {
    try {
        const response = await fetch(API_ROUTES.step, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify(stepData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erreur lors de la création des étapes");
        }

        return data;
    } catch (error) {
        console.error("[API_ERROR] createStepAPI", error);
        throw error;
    }
}

export async function updateStepAPI(stepData: StepFormType, csrfToken: string): Promise<StepType> {
    try {
        const response = await fetch( API_ROUTES.step, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify(stepData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur inconnue");
        }

        return data;
    } catch (error) {
        console.error("[API_ERROR] updateStepAPI", error);
        throw error;
    }
}

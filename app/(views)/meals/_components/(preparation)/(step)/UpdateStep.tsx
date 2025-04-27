"use client";

// Bibliothèques tierces
import { useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { StepType } from "@/lib/types/schemas_interfaces";
import { UpdateStepProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { updateStepConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { updateStepAPI } from "@/lib/services/step_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import { StepFormType } from "@/lib/types/forms_interfaces";


// _________________________ COMPOSANT _________________________
const UpdateStep: React.FC<UpdateStepProps> = ({
    initialStep,
    onSubmit,
    onClose,
}) => {
    // _________________________ HOOKS _________________________
    const [step, setStep] = useState<StepType>(initialStep);

    // Hook de validation
    const { error, setError, validate  } = useFormValidation<StepFormType>(
        updateStepConstraints,
        ["description"]
    );

    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (formData: FormData) => {
        const form = {
            id: step.id,
            preparationId: step.preparationId,
            stepNumber: step.stepNumber,
            description: formData.get("description") as string,
        };

        // Validation des données avec le hook
        if (!validate(form)) {
            console.error("[VALIDATION_ERROR]", error);
            return;
        }
        
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                setError({ general: "Problème de sécurité, veuillez réessayer." });
                return;
            }
            const updatedStep = await updateStepAPI(form, csrfToken);
            // Mettre à jour l'état parent via le callback
            onSubmit(updatedStep);
            toast.success("Etape mise à jour avec succès !");
            onClose(); // Fermer le Popover après la mise à jour
        } catch (error) {
            console.error("[UPDATE_STEP_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de l'étape." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="drawer-form" action={handleSubmit}>
            <FormErrorMessage message={error?.general} />
            
            {/* Champ pour la description de l'étape */}
            <div className="drawer-label-input">
                <label className="text-sm font-semibold" htmlFor="description">
                    Description de l&apos;étape
                </label>
                <textarea
                    id="description"
                    name="description"
                    onChange={(e) => setStep({ ...step, description: e.target.value })}
                    placeholder="Ajouter les condiments..."
                    value={step.description}
                    className="input-text-select"

                    required
                />
                <FormErrorMessage message={error?.description} />
            </div>

            <div className="drawer-buttons-form">
                <Button 
                    variant="secondary"     
                    onClick={onClose} 
                >
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default UpdateStep;

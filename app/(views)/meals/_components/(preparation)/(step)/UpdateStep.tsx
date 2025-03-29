"use client";

// Bibliothèques tierces
import { useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { StepType } from "@/lib/types/schemas_interfaces";
import { UpdateStepProps } from "@/lib/types/props_interfaces";
import { StepFormType } from "@/lib/types/forms_interfaces";

// Contraintes et validation
import { updateStepConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { updateStepAPI } from "@/lib/services/step_service";
import { getCsrfToken } from "next-auth/react";


// _________________________ COMPOSANT _________________________
const UpdateStep: React.FC<UpdateStepProps> = ({
    initialStep,
    onSubmit,
    onClose,
}) => {
    // _________________________ HOOKS _________________________
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [step, setStep] = useState<StepType>(initialStep);

    // Hook de validation
    const { error, setError, validate  } = useFormValidation<StepFormType>(
        updateStepConstraints,
        ["description"]
    );

    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation des données avec le hook
        if (!validate(step)) {
            return;
        }

        setIsLoading(true);
        
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        
        try {
            const updatedStep = await updateStepAPI(step, csrfToken);
            // Mettre à jour l'état parent via le callback
            onSubmit(updatedStep);

            toast.success("Etape mise à jour avec succès !");
            onClose(); // Fermer le Popover après la mise à jour
        } catch (error) {
            console.error("[UPDATE_STEP_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de l'étape." });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
            <FormErrorMessage message={error?.general} />
            
            <div className="flex flex-col gap-3 border-b pb-4">
                {/* Champ pour la description de l'étape */}
                <label className="text-sm font-semibold" htmlFor="description">
                    Description de l&apos;étape
                </label>
                <textarea
                    placeholder="Ajouter les condiments..."
                    value={step.description}
                    onChange={(e) =>
                        setStep({ ...step, description: e.target.value })
                    }
                    className="input-text-select"
                    required
                    disabled={isLoading}
                />
                <FormErrorMessage message={error?.description} />

            </div>

            <div className="flex gap-2">
                <Button 
                    variant="secondary"     
                    onClick={onClose} 
                    className="w-full"
                    disabled={isLoading}
                >
                    Annuler
                </Button>
                <Button 
                    type="submit" 
                    variant="success" 
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Mise à jour en cours..." : "Mettre à jour"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateStep;

"use client";

// Bibliothèques tierces
import React, { useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { StepFormType } from "@/lib/types/forms_interfaces";
import { CreateStepProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { newStepConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { createStepAPI } from "@/lib/services/step_service";


// _________________________ COMPOSANT _________________________
const CreatePreparation: React.FC<CreateStepProps> = ({
    preparationId,
    onSubmit,
}) => {
    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<StepFormType>({
        preparationId,
        stepNumber: 1,
        description: "",
        imageUrl: "",
    });

    // Hook de validation
    const { error, setError, validate } = useFormValidation<StepFormType>(
        newStepConstraints,
        [
            "preparationId", 
            "stepNumber", 
            "description", 
            "imageUrl"
        ]
        
    );

    // _________________________ LOGIQUE _________________________

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Réinitialise les erreurs existantes

        // // Valider les données du formulaire
        if (!validate(form)) {
            setIsLoading(false);
            return;
        }

        // Créer l'ingrédient avec les données du formulaire
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const createdStep = await createStepAPI(form, csrfToken);
            onSubmit(createdStep);

            toast("Etape créé avec succès");
        } catch (error) {
            console.error("[CREATE_STEP_ERROR]", error);
            setError({ general: "Erreur lors de la création de l'étape de préparation." });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            {/* Champ pour le temps de numéro de l'étape */}
            <label htmlFor="stepNumber">
                Numéro de l&apos;étape
            </label>
            <input
                type="number"
                value={form.stepNumber}
                onChange={(e) => setForm({ ...form, stepNumber: parseInt(e.target.value) })}
                className="input-text-select"
                required
            />
            <FormErrorMessage message={error?.stepNumber} />

            {/* Champ pour la description de l'étape */}
            <label htmlFor="description">
                Description de l&apos;étape
            </label>
            <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="input-text-select"
                required
            />
            <FormErrorMessage message={error?.description} />

            {/* Champ pour l'url de l'image
            <label htmlFor="imageUrl">
                URL de l&apos;image
            </label>
            <input
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="input-text-select"
            />
            <FormErrorMessage message={error?.imageUrl} /> */}


            {/* Bouton de soumission */}
            <div className="flex flex-col-reverse gap-2 lg:justify-end">
                <Button variant="cancel">
                    Annuler
                </Button>
                <Button type="submit" variant="success" disabled={isLoading}>
                    {isLoading ? "Ajout en cours..." : "Ajouter"}
                </Button>
            </div>
        </form>
    );
};

export default CreatePreparation;

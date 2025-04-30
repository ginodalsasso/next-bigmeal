"use client";

// Bibliothèques tierces
import React, { useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { StepFormErrorType, StepFormType } from "@/lib/types/forms_interfaces";
import { CreateStepProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { newStepConstraints } from "@/lib/constraints/forms_constraints";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { createStepAPI } from "@/lib/services/step_service";
import { getCsrfToken } from "next-auth/react";
import { X } from "lucide-react";

// _________________________ COMPOSANT _________________________
const CreatePreparation: React.FC<CreateStepProps> = ({ 
    preparationId, 
    onSubmit 
}) => {

    // _________________________ HOOKS _________________________

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<StepFormType[]>([
        {
            preparationId,
            stepNumber: 1,
            description: "",
            imageUrl: null,
        },
    ]);
    
    const [error, setError] = useState<{ general: string } & Record<number, Partial<StepFormErrorType>>>({ general: "" });

    // _________________________ LOGIQUE _________________________

    // Ajouter une nouvelle ligne d'étape
    const addNewLine = () => {
        setForm((prev) => {
            const maxStepNumber = prev.length > 0 // si le formulaire contient des étapes
                ? Math.max(...prev.map((step) => step.stepNumber)) // Récupère le numéro de l'étape le plus élevé
                : 0; // Sinon, initialise à 0


            return [
            ...prev, // Ajoute les étapes existantes
                { preparationId, stepNumber: maxStepNumber + 1, description: "", imageUrl: "" } // Ajoute une nouvelle étape avec le numéro suivant
            ];
        });
    };

    // Supprimer une ligne d'étape par son index
    const removeLine = (index: number) => {
        setForm((prev) => 
            prev
                .filter((_, i) => i !== index) // Filtre les étapes pour ne pas inclure celle à supprimer
                .map((step, i) => ({ ...step, stepNumber: i + 1 })) // Recalcule les numéros d'étape
        );
    };
    

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({ general: "" });

        // Validation du formulaire
        const validationResult = newStepConstraints.safeParse(form);

        if (!validationResult.success) {
            // Formatage des erreurs pour les afficher Record<number, CompositionFormErrorType> = {index: {champ: message}}
            const formattedErrors: Record<number, StepFormErrorType> = {};

            validationResult.error.errors.forEach((err) => { // Pour chaque erreur dans le tableau d'erreurs
                const index = err.path[0] as number; // Récupère l'index de l'erreur
                const key = err.path[1] as keyof StepFormErrorType; // Récupère le champ concerné

                if (!formattedErrors[index]) { // Si l'index n'existe pas
                    formattedErrors[index] = {}; // Initialise l'objet si besoin
                }

                formattedErrors[index][key] = err.message; // Ajoute le message d'erreur
            });
        
            setError({ general: "", ...formattedErrors }); // Met à jour les erreurs pour chaque index
            setIsLoading(false);
            return;
        }

        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }

            const response = await createStepAPI(form, csrfToken);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("[CREATE_STEP_ERROR]", errorData.error);
                setError({ general: errorData.error });
                return;
            }
            const createdSteps = await response.json();
            onSubmit(createdSteps);

            toast("Étapes créées avec succès");
        } catch (error) {
            console.error("[CREATE_STEP_ERROR]", error);
            setError({ general: "Erreur lors de l'ajout des étapes" });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <FormErrorMessage message={error.general} />

            {form.map((step, index) => (
                <div key={index} className="flex flex-col gap-3 pb-4">
                    {/* Champ pour le numéro de l'étape */}
                    <div className="flex items-center justify-between">    
                        <strong>Étape {step.stepNumber}</strong>

                    {/* Bouton pour supprimer une ligne */}
                    <Button 
                        variant="delete" 
                        className="self-end" 
                        title="Supprimer" 
                        onClick={() => removeLine(index)}
                        disabled={form.length === 1}>
                        <X /> Supprimer l&apos;étape
                    </Button>   
                    </div>

                    {/* Champ pour la description de l'étape */}
                    <div>
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Ajouter les condiments..."
                            value={step.description}
                            onChange={(e) =>
                                setForm((prev) => // 
                                prev.map((step, i) => // s = step, i = index
                                // Si l'index de l'étape est égal à l'index de l'itération
                                i === index ? { ...step, description: e.target.value } : step 
                            )
                        )
                    }
                            className="input-text-select"
                            required
                        />
                    </div>
                    <FormErrorMessage message={error[index]?.stepNumber} />
                    <FormErrorMessage message={error[index]?.description} />
                    {form.length > 1 && <hr className="border-neutral-500" />}
                </div>
            ))}

            {/* Bouton pour ajouter une nouvelle ligne */}
            <Button 
                variant="secondary" 
                type="button" 
                onClick={addNewLine}
            >
                Ajouter une étape
            </Button>

            {/* Bouton de soumission */}
            <Button 
                type="submit" 
                variant="success" 
                disabled={isLoading || form.length === 0}
            >
                {isLoading ? "Ajout en cours..." : "Ajouter"}
            </Button>
        </form>
    );
};

export default CreatePreparation;

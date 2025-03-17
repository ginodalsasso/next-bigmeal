"use client";

// Bibliothèques tierces
import React, { useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { StepFormErrorType, StepFormType } from "@/lib/types/forms_interfaces";
import { CreateStepProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { newStepConstraints } from "@/lib/constraints/forms_constraints";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { createStepAPI } from "@/lib/services/step_service";
import Image from "next/image";

// _________________________ COMPOSANT _________________________
const CreatePreparation: React.FC<CreateStepProps> = ({ preparationId, onSubmit }) => {
    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<StepFormType[]>([
        {
            preparationId,
            stepNumber: 1,
            description: "",
            imageUrl: undefined,
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

        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }

        try {
            const createdSteps = await createStepAPI(form, csrfToken);
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
                <div key={index} className="flex gap-3 border-b pb-4">
                    {/* Champ pour le numéro de l'étape */}
                    <div>    
                        <label htmlFor="stepNumber">
                            Numéro de l&apos;étape
                        </label>
                        <input
                            type="number"
                            value={step.stepNumber}
                            className="input-text-select"
                            readOnly
                        />
                    </div>

                    {/* Champ pour la description de l'étape */}
                    <div>
                        <label htmlFor="description">
                            Description de l&apos;étape
                        </label>
                        <textarea
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

                    {/* Bouton pour supprimer une ligne */}
                    <Button 
                        variant="delete" 
                        className="w-auto self-end" 
                        title="Supprimer" 
                        onClick={() => removeLine(index)}
                        disabled={form.length === 1}>
                        <Image src={"/img/trash.svg"} width={18} height={18} alt="Icône de suppression" />
                    </Button>   
                </div>
            ))}

            {/* Bouton pour ajouter une nouvelle ligne */}
            <Button variant="secondary" type="button" onClick={addNewLine}>
                Ajouter une étape
            </Button>

            {/* Bouton de soumission */}
            <Button type="submit" variant="success" disabled={isLoading || form.length === 0}>
                {isLoading ? "Ajout en cours..." : "Ajouter"}
            </Button>
        </form>
    );
};

export default CreatePreparation;

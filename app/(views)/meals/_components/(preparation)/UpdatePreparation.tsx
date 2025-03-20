"use client";

// Bibliothèques tierces
import React, { useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { PreparationFormType } from "@/lib/types/forms_interfaces";
import { UpdatePreparationProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { updatePreparationConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { updatePreparationAPI } from "@/lib/services/preparation_service";

// _________________________ TYPE _________________________
type UpdatePreparationFormType = Omit<PreparationFormType, "mealId">;


// _________________________ COMPOSANT _________________________
const UpdatePreparation: React.FC<UpdatePreparationProps> = ({
    preparation,
    onSubmit,
    onClose
}) => {
    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<UpdatePreparationFormType>({
        id: preparation.id,
        prepTime: preparation.prepTime || undefined,
        cookTime: preparation.cookTime || undefined,
    });

    // Hook de validation
    const { error, setError, validate } = useFormValidation<UpdatePreparationFormType>(
        updatePreparationConstraints,
        ["prepTime", "cookTime"]
    );

    // _________________________ LOGIQUE _________________________
    // Gestion des changements de champs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value ? parseInt(e.target.value) : undefined,
        }));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Réinitialise les erreurs existantes

        // Valider les données du formulaire
        if (!validate(form)) {
            setIsLoading(false);
            return;
        }

        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const updatedPreparation = await updatePreparationAPI(form, csrfToken);
            onSubmit(updatedPreparation);
            toast("Préparation mise à jour avec succès");
            onClose();
        } catch (error) {
            console.error("[UPDATE_PREPARATION_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de la préparation." });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
                {/* Champ pour le temps de préparation du plat */}
                <div>
                    <label htmlFor="prepTime">Temps de préparation (minutes)</label>
                    <input
                        id="prepTime"
                        name="prepTime"
                        type="number"
                        placeholder="60"
                        value={form.prepTime || ""}
                        onChange={handleChange}
                        className="input-text-select"
                        disabled={isLoading}
                    />
                    <FormErrorMessage message={error?.prepTime} />
                </div>

                {/* Champ pour le temps de cuisson du plat */}
                <div>
                    <label htmlFor="cookTime">Temps de cuisson (minutes)</label>
                    <input
                        id="cookTime"
                        name="cookTime"
                        type="number"
                        placeholder="30"
                        value={form.cookTime || ""}
                        onChange={handleChange}
                        className="input-text-select"
                        disabled={isLoading}
                    />
                    <FormErrorMessage message={error?.cookTime} />
                </div>
            </div>
            <FormErrorMessage message={error?.general} />

            {/* Boutons d'action */}
            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onClose}
                    variant="cancel"
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
                    {isLoading ? "Mise à jour..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdatePreparation;
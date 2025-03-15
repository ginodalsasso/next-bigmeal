"use client";

// Bibliothèques tierces
import React, { useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { PreparationFormType } from "@/lib/types/forms_interfaces";
import { CreatePreparationProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { newPreparationConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Utils

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { createPreparationAPI } from "@/lib/services/preparation_service";

// Services


// _________________________ COMPOSANT _________________________
const CreatePreparation: React.FC<CreatePreparationProps> = ({
    mealId,
    onSubmit,
}) => {
    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<PreparationFormType>({
        mealId,
        prepTime: undefined,
        cookTime: undefined,
    });

    // Hook de validation
    const { error, setError, validate } = useFormValidation<PreparationFormType>(
        newPreparationConstraints,
        [
            "prepTime", 
            "cookTime", 
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
            const createdPrepatation = await createPreparationAPI(form, csrfToken);
            onSubmit(createdPrepatation);

            toast("Préparation créé avec succès");
        } catch (error) {
            console.error("[CREATE_PREPARATION_ERROR]", error);
            setError({ general: "Erreur lors de la création de la préparation." });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            {/* Champ pour le temps de préparation du plat */}
            <label htmlFor="prepTime">
                Temps de préparation (en minutes)
            </label>
            <input
                type="number"
                value={form.prepTime || ""}
                onChange={(e) => setForm({ ...form, prepTime: parseInt(e.target.value) })}
                className="input-text-select"
                required
            />
            <FormErrorMessage message={error?.prepTime} />

            {/* Champ pour le temps de cuisson du plat */}
            <label htmlFor="cookTime">
                Temps de cuisson (en minutes)
            </label>
            <input
                type="number"
                value={form.cookTime || ""}
                onChange={(e) => setForm({ ...form, cookTime: parseInt(e.target.value) })}
                className="input-text-select"
                required
            />
            <FormErrorMessage message={error?.cookTime} />

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

"use client";

// Bibliothèques tierces
import { toast } from "sonner";

// Types et énumérations
import { PreparationFormType } from "@/lib/types/forms_interfaces";
import { UpdatePreparationProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { updatePreparationConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";


// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { updatePreparationAPI } from "@/lib/services/preparation_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";

// _________________________ TYPE _________________________
type UpdatePreparationFormType = Omit<PreparationFormType, "mealId">;

// _________________________ COMPOSANT _________________________
const UpdatePreparation: React.FC<UpdatePreparationProps> = ({
    initialPreparation: preparation,
    onSubmit,
    onClose
}) => {

    // _________________________ HOOKS _________________________
    // Hook de validation
    const { error, setError, validate } = useFormValidation<UpdatePreparationFormType>(
        updatePreparationConstraints,
        [
            "prepTime", 
            "cookTime"
        ]
    );

    // _________________________ LOGIQUE _________________________
    // Gestion de la soumission du formulaire
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form = {
            id: preparation.id,
            prepTime: formData.get("prepTime") ? Number(formData.get("prepTime")) : undefined,
            cookTime: formData.get("cookTime") ? Number(formData.get("cookTime")) : undefined,
        };

        // Valider les données du formulaire
        if (!validate(form)) {
            return;
        }
        
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            const updatedPreparation = await updatePreparationAPI(form, csrfToken);
            
            onSubmit(updatedPreparation);
            toast("Préparation mise à jour avec succès");
            onClose();
        } catch (error) {
            console.error("[UPDATE_PREPARATION_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de la préparation." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="space-y-4" action={handleSubmit}>
            <div className="flex gap-4">
                {/* Champ pour le temps de préparation du plat */}
                <div>
                    <label htmlFor="prepTime">Temps de préparation (minutes)</label>
                    <input
                        className="input-text-select"
                        id="prepTime"
                        name="prepTime"
                        type="number"
                        placeholder="60"
                        defaultValue={preparation.prepTime || ""}
                        autoComplete="off"
                        min={0}
                    />
                    <FormErrorMessage message={error?.prepTime} />
                </div>

                {/* Champ pour le temps de cuisson du plat */}
                <div>
                    <label htmlFor="cookTime">Temps de cuisson (minutes)</label>
                    <input
                        className="input-text-select"
                        id="cookTime"
                        name="cookTime"
                        type="number"
                        placeholder="30"
                        defaultValue={preparation.cookTime || ""}
                        autoComplete="off"
                        min={0}
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
                >
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default UpdatePreparation;
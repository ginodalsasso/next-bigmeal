"use client";

// Bibliothèques tierces
import { toast } from "sonner";

// Types et énumérations
import { PreparationFormType } from "@/lib/types/forms_interfaces";
import { CreatePreparationProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { preparationConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { createPreparationAPI } from "@/lib/services/preparation_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";

// Services


// _________________________ COMPOSANT _________________________
const CreatePreparation: React.FC<CreatePreparationProps> = ({
    mealId,
    onSubmit,
}) => {
    // _________________________ HOOKS _________________________
    // Hook de validation
    const { error, setError, validate } = useFormValidation<PreparationFormType>(
        preparationConstraints,
        [
            "prepTime", 
            "cookTime", 
        ]
    );

    // _________________________ LOGIQUE _________________________

    // Gestion de la soumission du formulaire
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form = {
            mealId,
            id: formData.get("id") as string,
            prepTime: formData.get("prepTime") ? Number(formData.get("prepTime")) : undefined,
            cookTime: formData.get("cookTime") ? Number(formData.get("cookTime")) : undefined,
        };

        // // Valider les données du formulaire
        if (!validate(form)) {
            return;
        }

        try {
            const csrfToken = await getCsrfToken();
        
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            const createdPrepatation = await createPreparationAPI(form, csrfToken);
            onSubmit(createdPrepatation);

            toast("Préparation créé avec succès");
        } catch (error) {
            console.error("[CREATE_PREPARATION_ERROR]", error);
            setError({ general: "Erreur lors de la création de la préparation." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-4" action={handleSubmit}>
            <div className="flex gap-4">
                {/* Champ pour le temps de préparation du plat */}
                <div>
                    <label htmlFor="prepTime">
                        Temps de préparation en minutes (optionnel)
                    </label>
                    <input
                        className="input-text-select"
                        id="prepTime"
                        type="number"
                        placeholder="60"
                        autoComplete="off"
                    />
                </div>

                {/* Champ pour le temps de cuisson du plat */}
                <div>
                    <label htmlFor="cookTime">
                        Temps de cuisson en minutes (optionnel)
                    </label>
                    <input
                        className="input-text-select"
                        id="cookTime"
                        type="number"
                        placeholder="30"
                        autoComplete="off"
                    />
                </div>
            </div>
            <FormErrorMessage message={error?.prepTime} />
            <FormErrorMessage message={error?.cookTime} />

            {/* Bouton de soumission */}
            <div className="flex flex-col-reverse gap-2 lg:justify-end">
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default CreatePreparation;

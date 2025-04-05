"use client";

// Bibliothèques tierces
import { toast } from "sonner";

// Types et énumérations
import { IngredientUnit } from "@/lib/types/enums";
import { UpdateCompositionProps } from "@/lib/types/props_interfaces";
import { UpdateCompositionFormType } from "@/lib/types/forms_interfaces";

// Contraintes et validation
import { updateCompositionConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Utils
import { translatedUnit } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { updateCompositionAPI } from "@/lib/services/composition_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";


// _________________________ COMPOSANT _________________________
const UpdateComposition: React.FC<UpdateCompositionProps> = ({
    initialComposition,
    onSubmit,
    onClose,
}) => {
    // _________________________ HOOKS _________________________

    // Hook de validation
    const { error, setError, validate  } = useFormValidation<UpdateCompositionFormType>(
        updateCompositionConstraints,
        ["quantity", "unit"]
    );

    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form: UpdateCompositionFormType = {
            id: initialComposition.id,
            quantity: formData.get("quantity") ? Number(formData.get("quantity")) : 0, // Valeur par défaut 0 si non spécifiée
            unit: formData.get("unit") as IngredientUnit,
        };

        // Validation des données avec le hook
        if (!validate(form)) {
            return;
        }

        
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            const updatedComposition = await updateCompositionAPI(
                form, 
                csrfToken
            );
            // Mettre à jour l'état parent via le callback
            onSubmit(updatedComposition);

            toast.success("Composition mise à jour avec succès !");
            onClose(); // Fermer le Popover après la mise à jour
        } catch (error) {
            console.error("[UPDATE_COMPOSITION_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de la composition." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form action={handleSubmit} className="flex flex-col gap-5 p-5">
            <FormErrorMessage message={error?.general} />
            
            <div className="flex flex-col gap-3 border-b pb-4">
                {/* Champ pour la quantité */}
                <label htmlFor="quantity" className="text-sm font-semibold">
                    Quantité
                </label>
                <input
                    className="input-text-select"
                    type="number"
                    id="quantity"
                    name="quantity"
                    defaultValue={initialComposition.quantity}
                    step="0.1"
                    placeholder="Quantité"
                    required
                />
                <FormErrorMessage message={error?.quantity} />

                {/* Sélecteur pour l'unité */}
                <label htmlFor="unit" className="text-sm font-semibold">
                    Unité
                </label>
                <select
                    className="input-text-select"
                    id="unit"
                    name="unit"
                    defaultValue={initialComposition.unit}
                    required
                >
                    <option value="">-- Choisir une unité --</option>
                    {Object.values(IngredientUnit).map((unit) => (
                        <option key={unit} value={unit}>
                            {translatedUnit(unit)}
                        </option>
                    ))}
                </select>
                <FormErrorMessage message={error?.unit} />
            </div>

            <div className="flex gap-2">
                <Button 
                    variant="secondary"     
                    onClick={onClose} 
                    className="w-full"
                >
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default UpdateComposition;

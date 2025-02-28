"use client";

// Bibliothèques tierces
import { useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { CompositionType } from "@/lib/types/schemas_interfaces";
import { IngredientUnit } from "@/lib/types/enums";
import { UpdateCompositionProps } from "@/lib/types/props_interfaces";
import { UpdateCompositionFormType } from "@/lib/types/forms_interfaces";

// Contraintes et validation
import { updateCompositionConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Utils
import { translatedUnit } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { updateCompositionAPI } from "@/lib/services/composition_service";


// _________________________ COMPOSANT _________________________
const UpdateComposition: React.FC<UpdateCompositionProps> = ({
    initialComposition,
    onCompositionUpdated,
    onClose,
}) => {
    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [composition, setComposition] = useState<CompositionType>(initialComposition);

    // Hook de validation
    const { error, setError, validate  } = useFormValidation<UpdateCompositionFormType>(
        updateCompositionConstraints,
        ["quantity", "unit"]
    );

    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation des données avec le hook
        if (!validate(composition)) {
            return;
        }

        setIsLoading(true);
        
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        
        try {
            const updatedComposition = await updateCompositionAPI(composition, csrfToken);
            // Mettre à jour l'état parent via le callback
            onCompositionUpdated(updatedComposition);

            toast.success("Composition mise à jour avec succès !");
            onClose(); // Fermer le Popover après la mise à jour
        } catch (error) {
            console.error("[UPDATE_COMPOSITION_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de la composition." });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
            <FormErrorMessage message={error?.general} />
            
            <div className="flex flex-col gap-3 border-b pb-4">
                {/* Champ pour la quantité */}
                <input
                    type="number"
                    step="0.1"
                    placeholder="Quantité"
                    value={composition.quantity || ""}
                    onChange={(e) =>
                        setComposition({ ...composition, quantity: parseFloat(e.target.value) })
                    }
                    className="input-text-select"
                    required
                    disabled={isLoading}
                />
                <FormErrorMessage message={error?.quantity} />

                {/* Sélecteur pour l'unité */}
                <select
                    value={composition.unit}
                    onChange={(e) =>
                        setComposition({ ...composition, unit: e.target.value as IngredientUnit })
                    }
                    className="input-text-select"
                    required
                    disabled={isLoading}
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

export default UpdateComposition;

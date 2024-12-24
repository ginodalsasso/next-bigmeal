"use client";

import { useState } from "react";
import { CompositionType } from "@/lib/types/schemas_interfaces";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IngredientUnit } from "@/lib/types/enums";
import { translatedUnit } from "@/lib/utils";

import { updateCompositionConstraints } from "@/lib/constraints/forms_constraints";
import { CompositionFormErrorType } from "@/lib/types/forms_interfaces";
import { UpdateCompositionProps } from "@/lib/types/props_interfaces";


// _________________________ COMPOSANT _________________________
const UpdateComposition: React.FC<UpdateCompositionProps> = ({
    initialComposition,
    onCompositionUpdated,
    onClose,
}) => {

    // _________________________ HOOKS _________________________
    const [composition, setComposition] = useState(initialComposition);
    const [error, setError] = useState<CompositionFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);


    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({}); 
    
        // Validation des données avec Zod
        const validationResult = updateCompositionConstraints.safeParse(composition);
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            setError({
                quantity: formattedErrors.quantity?.[0], 
                unit: formattedErrors.unit?.[0], 
            });
            return;
        }
        setIsLoading(true);
    
        try {
            const response = await fetch("/api/compositions", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(composition),
            });
    
            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de la composition");
            }
    
            const updatedComposition: CompositionType = await response.json();
    
            // Mettre à jour l'état parent via le callback
            onCompositionUpdated(updatedComposition);
            toast.success("Composition mise à jour avec succès !");
            onClose(); // Fermer le Popover après la mise à jour
        } catch (error) {
            console.error("[UPDATE_COMPOSITION_ERROR]", error);
            toast.error("Erreur lors de la mise à jour de la composition");
        } finally {
            setIsLoading(false);
        }
    };
    

    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
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
                    className="border border-gray-300 p-2 rounded text-black"
                    required
                />
                {error.quantity && <p className="text-red-500 text-sm">{error.quantity}</p>}

                {/* Sélecteur pour l'unité */}
                <select
                    value={composition.unit}
                    onChange={(e) =>
                        setComposition({ ...composition, unit: e.target.value as IngredientUnit })
                    }
                    className="border border-gray-300 p-2 rounded text-black"
                    required
                >
                    <option value="">-- Choisir une unité --</option>
                    {Object.values(IngredientUnit).map((unit) => (
                        <option key={unit} value={unit}>
                            {translatedUnit(unit)}
                        </option>
                    ))}
                </select>
                {error.unit && <p className="text-red-500 text-sm">{error.unit}</p>}
            </div>

            <Button type="submit" variant="success" disabled={isLoading}>
                {isLoading ? "Mise à jour en cours..." : "Mettre à jour"}
            </Button>
        </form>
    );
};

export default UpdateComposition;

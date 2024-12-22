"use client";

import React, { useState } from "react";
import { CompositionType } from "@/lib/types/schemas_interfaces";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IngredientUnit } from "@/lib/types/enums";
import { translatedUnit } from "@/lib/utils";

const UpdateComposition = ({
    initialComposition,
    onCompositionUpdated,
    onClose,
}: {
    initialComposition: CompositionType;
    onCompositionUpdated: (updatedComposition: CompositionType) => void;
    onClose: () => void;
}) => {
    const [composition, setComposition] = useState(initialComposition);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`/api/compositions/${composition.id}`, {
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
            
            onClose(); // Fermer le Popover après la mise à jour
        } catch (error) {
            console.error("[UPDATE_COMPOSITION_ERROR]", error);
            toast.error("Erreur lors de la mise à jour de la composition");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-3 border-b pb-4">
                <input
                    type="number"
                    step="0.1"
                    placeholder="Quantité"
                    value={composition.quantity}
                    onChange={(e) =>
                        setComposition({ ...composition, quantity: parseFloat(e.target.value) })
                    }
                    className="border border-gray-300 p-2 rounded text-black"
                    required
                />

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
            </div>

            <Button type="submit" variant="success" disabled={isLoading}>
                {isLoading ? "Mise à jour en cours..." : "Mettre à jour"}
            </Button>
        </form>
    );
};

export default UpdateComposition;

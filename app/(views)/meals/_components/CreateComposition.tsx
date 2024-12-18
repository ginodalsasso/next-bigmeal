"use client";

import React, { useEffect, useState } from "react";

import { CompositionFormType } from "@/lib/types/forms_interfaces";
import { CompositionType, IngredientType } from "@/lib/types/schemas_interfaces";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IngredientUnit } from "@/lib/types/enums";
import { translatedUnit } from "@/lib/utils";

const CreateComposition = ({
    mealId,
    onCompositionCreated,
    onClose,
}: {
    mealId: string;
    onCompositionCreated: (compositions: CompositionType[]) => void;
    onClose: () => void;
}) => {
    // _________________________ ETATS _________________________
    const [ingredients, setIngredients] = useState<IngredientType[]>([]); // Liste des ingrédients disponibles
    const [isLoading, setIsLoading] = useState(false); // Indique si l'action est en cours
    const [form, setForm] = useState<CompositionFormType[]>([
        {
            ingredientId: "",
            mealId,
            quantity: 0,
            unit: IngredientUnit.GRAM,
        },
    ]);

    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les ingrédients
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch("/api/ingredients");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des ingrédients");
                }
                const data: IngredientType[] = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("[FETCH_INGREDIENTS_ERROR]", error);
            }
        };

        fetchIngredients();
    }, []);

    // Ajouter une nouvelle ligne de composition
    const addNewLine = () => {
        setForm((prev) => [
            ...prev,
            { ingredientId: "", mealId, quantity: 0, unit: IngredientUnit.GRAM },
        ]);
    };

    // Supprimer une ligne de composition par son index
    const removeLine = (index: number) => {
        setForm((prev) => prev.filter((_, i) => i !== index));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await fetch("/api/compositions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
    
            if (!response.ok) {
                throw new Error("Erreur lors de la création des compositions");
            }
    
            const createdCompositions: CompositionType[] = await response.json(); // Récupérer les compositions insérées
            onCompositionCreated(createdCompositions); // Ajout à la liste parent
            toast("Compositions créées avec succès");
            onClose(); // Fermer le dialogue
        } catch (error) {
            console.error("[CREATE_COMPOSITION_ERROR]", error);
            toast.error("Erreur lors de l'ajout des compositions");
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            {form.map((composition, index) => (
                <div key={index} className="flex flex-col gap-3 border-b pb-4">
                    {/* Sélection de l'ingrédient */}
                    <select
                        value={composition.ingredientId}
                        onChange={(e) =>
                            setForm((prev) =>
                                prev.map((comp, i) =>
                                    i === index
                                        ? { ...comp, ingredientId: e.target.value }
                                        : comp
                                )
                            )
                        }
                        className="border border-gray-300 p-2 rounded text-black"
                        required
                    >
                        <option value="">-- Choisir un ingrédient --</option>
                        {ingredients.map((ingredient) => (
                            <option key={ingredient.id} value={ingredient.id}>
                                {ingredient.name}
                            </option>
                        ))}
                    </select>

                    {/* Champ pour la quantité */}
                    <input
                        type="number"
                        step="0.1"
                        placeholder="Quantité"
                        value={composition.quantity}
                        onChange={(e) =>
                            setForm((prev) =>
                                prev.map((comp, i) =>
                                    i === index
                                        ? { ...comp, quantity: parseFloat(e.target.value) }
                                        : comp
                                )
                            )
                        }
                        className="border border-gray-300 p-2 rounded text-black"
                        required
                    />

                    {/* Sélection de l'unité */}
                    <select
                        value={composition.unit}
                        onChange={(e) =>
                            setForm((prev) =>
                                prev.map((comp, i) =>
                                    i === index
                                        ? { ...comp, unit: e.target.value as IngredientUnit }
                                        : comp
                                )
                            )
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

                    {/* Bouton pour supprimer une ligne */}
                    <Button
                        variant="destructive"
                        onClick={() => removeLine(index)}
                        disabled={form.length === 1}
                    >
                        Supprimer
                    </Button>
                </div>
            ))}

            {/* Bouton pour ajouter une nouvelle ligne */}
            <Button variant="secondary" type="button" onClick={addNewLine}>
                Ajouter un ingrédient
            </Button>

            {/* Bouton de soumission */}
            <Button type="submit" variant="success" disabled={isLoading || form.length === 0}>
                {isLoading ? "Ajout en cours..." : "Ajouter"}
            </Button>
        </form>
    );
};

export default CreateComposition;

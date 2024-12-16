"use client";

import React, { useEffect, useState } from "react";

import { CompositionType, IngredientType, MealType } from "@/lib/types/schemas_interfaces";
import { CompositionFormType } from "@/lib/types/forms_interfaces";
// import { compositionConstraints } from "@/lib/constraints/forms_constraints";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IngredientUnit } from "@/lib/types/enums";

const CreateComposition = ({ mealId, onCompositionCreated, onClose }: { mealId: string; onCompositionCreated: (composition: CompositionType) => void, onClose: () => void }) => {
    
    // _________________________ HOOKS _________________________
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [meals, setMeals] = useState<MealType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<CompositionFormErrorType>({});
    const [form, setForm] = useState<CompositionFormType>({
        ingredientId: "",
        mealId,
        quantity: 0,
        unit: "GRAM",
    });

    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les ingrédients
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch("/api/ingredients");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des ingrédients");
                }
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("[FETCH_INGREDIENTS_ERROR]", error);
            }
        };

        const fetchMeals = async () => {
            try {
                const response = await fetch("/api/meals");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des repas");
                }
                const data = await response.json();
                setMeals(data);
            } catch (error) {
                console.error("[FETCH_MEALS_ERROR]", error);
            }
        };

        fetchIngredients();
        fetchMeals();
    }, []);

    // Appel API pour créer une composition
    const createComposition = async (data: CompositionFormType) => {
        try {
            const response = await fetch("/api/compositions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création de la composition");
            }
            return JSON.parse(await response.text());
        } catch (error) {
            console.error("[CREATE_COMPOSITION_API_ERROR]", error);
            throw error;
        }
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // setError({});

        // Valider les données du formulaire
        // const validationResult = compositionConstraints.safeParse(form);
        // if (!validationResult.success) {
        //     const formattedErrors = validationResult.error.flatten();
        //     setError({
        //         ingredientId: formattedErrors.fieldErrors.ingredientId?.[0],
        //         mealId: formattedErrors.fieldErrors.mealId?.[0],
        //         quantity: formattedErrors.fieldErrors.quantity?.[0],
        //         unit: formattedErrors.fieldErrors.unit?.[0],
        //     });
        //     setIsLoading(false);
        //     return;
        // }

        // Créer la composition avec les données du formulaire
        try {
            const createdComposition = await createComposition(form);
            onCompositionCreated(createdComposition); // Ajout à la liste parent
            toast("Composition créée avec succès");
        } catch (error) {
            console.error("[CREATE_COMPOSITION]", error);
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            {/* Sélection de l'ingrédient */}
            <select
                value={form.ingredientId}
                onChange={(e) => setForm({ ...form, ingredientId: e.target.value })}
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
            {/* {error.ingredientId && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.ingredientId}</p>
            )} */}

            {/* Sélection du repas */}
            <select
                value={form.mealId}
                onChange={(e) => setForm({ ...form, mealId: e.target.value })}
                className="border border-gray-300 p-2 rounded text-black"
                required
            >
                <option value="">-- Choisir un repas --</option>
                {meals.map((meal) => (
                    <option key={meal.id} value={meal.id}>
                        {meal.name}
                    </option>
                ))}
            </select>
            {/* {error.mealId && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.mealId}</p>
            )} */}

            {/* Champ pour la quantité */}
            <input
                type="number"
                step="0.1"
                placeholder="Quantité"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseFloat(e.target.value) || 0 })}
                className="border border-gray-300 p-2 rounded text-black"
                required
            />
            {/* {error.quantity && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.quantity}</p>
            )} */}

            {/* Sélection de l'unité */}
            <select
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value as IngredientUnit })}
                className="border border-gray-300 p-2 rounded text-black"
                required
            >
                {Object.values(IngredientUnit).map((unit) => (
                    <option key={unit} value={unit}>
                        {unit}
                    </option>
                ))}
            </select>
            {/* {error.unit && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.unit}</p>
            )} */}

            {/* Bouton de soumission */}
            <div className="flex flex-col-reverse gap-2 lg:justify-end">
                <Button variant="cancel" onClick={onClose}>
                    Annuler
                </Button>
                <Button type="submit" variant="success" disabled={isLoading}>
                    {isLoading ? "Ajout en cours..." : "Ajouter"}
                </Button>
            </div>
        </form>
    );
};

export default CreateComposition;

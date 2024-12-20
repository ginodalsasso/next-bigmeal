"use client";

import React, { useEffect, useState } from "react";

import { CompositionFormErrorType, CompositionFormType } from "@/lib/types/forms_interfaces";
import { CompositionType, IngredientType } from "@/lib/types/schemas_interfaces";
import { compositionConstraints } from "@/lib/constraints/forms_constraints";


import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IngredientUnit } from "@/lib/types/enums";
import { translatedUnit } from "@/lib/utils";

const CreateComposition = ({
    mealId,
    onCompositionCreated,
    onClose,
}: {
    mealId: string; // ID du repas parent de la composition
    onCompositionCreated: (compositions: CompositionType[]) => void; // Callback pour ajouter les compositions
    onClose: () => void; // Callback pour fermer le dialogue
}) => {
    // _________________________ ETATS _________________________
    const [ingredients, setIngredients] = useState<IngredientType[]>([]); // Liste des ingrédients disponibles

    const [isLoading, setIsLoading] = useState(false); // Indique si l'action est en cours
    const [error, setError] = useState<Record<number, CompositionFormErrorType>>({});
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
            // Ajouter une  nouvelle ligne avec les valeurs par défaut ...prev = copie des lignes existantes
            ...prev,
            { ingredientId: "", mealId, quantity: 0, unit: IngredientUnit.GRAM },
        ]);
    };

    // Supprimer une ligne de composition par son index (position dans le tableau)
    const removeLine = (index: number) => {
        // Filtrer les lignes pour ne pas inclure celle à supprimer
        setForm((prev) => prev.filter((_, i) => i !== index));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});
        
        // Valider les données du formulaire
        const validationResult = compositionConstraints.safeParse(form); // Déclarez ici

        if (!validationResult.success) {
            const formattedErrors: Record<number, CompositionFormErrorType> = {};
        
            validationResult.error.errors.forEach((err) => {
                const [index, key] = err.path; // `path` contient l'index et le champ (ex. [0, "ingredientId"])
                if (typeof index === "number" && typeof key === "string") {
                    // si l'index n'existe pas, on crée un objet vide
                    if (!formattedErrors[index]) {
                        // et on ajoute le message d'erreur
                        formattedErrors[index] = {}; 
                    }
                    // On ajoute le message d'erreur pour le champ ex: formattedErrors[0].ingredientId = "Veuillez sélectionner un ingrédient"
                    (formattedErrors[index][key as keyof CompositionFormErrorType] as unknown as string) = err.message;
                }
            });
        
            setError(formattedErrors); // Met à jour les erreurs pour chaque index
            setIsLoading(false);
            return;
        }
        
        
    
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
                                    i === index // Si c'est la ligne en cours, mettre à jour l'ingrédient   
                                        ? { ...comp, ingredientId: e.target.value } // ...comp = copie de la ligne
                                        : comp // Sinon, ne rien changer
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
                    {error[index]?.ingredientId && (
                        <p className="text-red-500 text-sm">{error[index].ingredientId}</p>
                    )}

                    {/* Champ pour la quantité */}
                    <input
                        type="number"
                        step="0.1"
                        placeholder="Quantité"
                        value={composition.quantity}
                        onChange={(e) =>
                            setForm((prev) =>
                                prev.map((comp, i) =>
                                    i === index // Si c'est la ligne en cours, mettre à jour la quantité
                                        ? { ...comp, quantity: parseFloat(e.target.value) } // ...comp = copie de la ligne
                                        : comp // Sinon, ne rien changer
                                )
                            )
                        }
                        className="border border-gray-300 p-2 rounded text-black"
                        required
                    />
                    {error[index]?.quantity && (
                        <p className="text-red-500 text-sm">{error[index].quantity}</p>
                    )}

                    {/* Sélection de l'unité */}
                    <select
                        value={composition.unit}
                        onChange={(e) =>
                            setForm((prev) =>
                                prev.map((comp, i) =>
                                    i === index // Si c'est la ligne en cours, mettre à jour l'unité
                                        ? { ...comp, unit: e.target.value as IngredientUnit } // ...comp = copie de la ligne
                                        : comp // Sinon, ne rien changer
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
                    {error[index]?.unit && (
                        <p className="text-red-500 text-sm">{error[index].unit}</p>
                    )}

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

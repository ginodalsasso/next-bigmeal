"use client";

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { CompositionFormErrorType, CompositionFormType } from "@/lib/types/forms_interfaces";
import { CompositionType, IngredientType } from "@/lib/types/schemas_interfaces";
import { IngredientUnit } from "@/lib/types/enums";
import { CreateCompositionProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { newCompositionConstraints } from "@/lib/constraints/forms_constraints";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Utils
import { translatedUnit } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { getIngredients } from "@/lib/services/data_fetcher";
import { createCompositionAPI } from "@/lib/services/composition_service";


// _________________________ COMPONENT _________________________
const CreateComposition: React.FC<CreateCompositionProps>= ({
    mealId,
    onSubmit,
    onClose,
}) => {

    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
    const [ingredients, setIngredients] = useState<IngredientType[]>([]); // Liste des ingrédients disponibles

    const [isLoading, setIsLoading] = useState<boolean>(false); // Indique si l'action est en cours
    const [error, setError] = useState<{general: string} & Record<number, CompositionFormErrorType>>({ general: "" });
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
                const data: IngredientType[] = await getIngredients(); 
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
        setForm((prev) => 
            prev.filter((_, i) => i !== index)
        );
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({ general: "" });

        // Validation du formulaire
        const validationResult = newCompositionConstraints.safeParse(form);

        if (!validationResult.success) {
            // Formatage des erreurs pour les afficher Record<number, CompositionFormErrorType> = {index: {champ: message}}
            const formattedErrors: Record<number, CompositionFormErrorType> = {};

            validationResult.error.errors.forEach((err) => { // Pour chaque erreur dans le tableau d'erreurs
                const index = err.path[0] as number; // Récupère l'index de l'erreur
                const key = err.path[1] as keyof CompositionFormErrorType; // Récupère le champ concerné

                if (!formattedErrors[index]) { // Si l'index n'existe pas
                    formattedErrors[index] = {}; // Initialise l'objet si besoin
                }

                formattedErrors[index][key] = err.message; // Ajoute le message d'erreur
            });
        
            setError({ general: "", ...formattedErrors }); // Met à jour les erreurs pour chaque index
            setIsLoading(false);
            return;
        }
        
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }

        try {
            const createdCompositions = await createCompositionAPI(form, csrfToken);
            onSubmit(createdCompositions); // Ajout à la liste parent
            
            toast("Compositions créées avec succès");
            onClose(); // Fermer le dialogue
        } catch (error) {
            console.error("[CREATE_COMPOSITION_ERROR]", error);
            setError({ general: "Erreur lors de l'ajout des compositions" });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            <FormErrorMessage message={error.general} />

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
                        className="input-text-select"
                        required
                    >
                        <option value="">-- Choisir un ingrédient --</option>
                        {ingredients.map((ingredient) => (
                            <option 
                                key={ingredient.id} 
                                value={ingredient.id}
                                disabled= {form.some((comp) => comp.ingredientId === ingredient.id)}
                            >
                                {ingredient.name}
                            </option>
                        ))}
                    </select>
                    <FormErrorMessage message={error[index]?.ingredientId} />

                    {/* Champ pour la quantité */}
                    <input
                        type="number"
                        step="0.1"
                        placeholder="Quantité"
                        value={composition.quantity || ""}
                        onChange={(e) =>
                            setForm((prev) =>
                                prev.map((comp, i) =>
                                    i === index // Si c'est la ligne en cours, mettre à jour la quantité
                                        ? { ...comp, quantity: parseFloat(e.target.value) } // ...comp = copie de la ligne
                                        : comp // Sinon, ne rien changer
                                )
                            )
                        }
                        className="input-text-select"
                        required
                    />
                    <FormErrorMessage message={error[index]?.quantity} />

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
                        className="input-text-select"
                        required
                    >
                        <option value="">-- Choisir une unité --</option>
                        {Object.values(IngredientUnit).map((unit) => (
                            <option key={unit} value={unit}>
                                {translatedUnit(unit)}
                            </option>
                        ))}
                    </select>
                    <FormErrorMessage message={error[index]?.unit} />

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

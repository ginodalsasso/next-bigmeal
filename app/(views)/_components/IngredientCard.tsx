import React, { useState } from "react";

import ItemView from "./ItemView";
import UpdateIngredient from "./(formsComponents)/UpdateIngredient";

import { ingredientConstraints } from "@/lib/types/forms_constraints";
import { IngredientType } from "@/lib/types/schemas_interfaces";
import { ucFirst } from "@/lib/utils";

// _________________________ TYPES _________________________
type IngredientCardProps<T extends IngredientType> = {
    ingredient: T;
    onUpdateIngredient: (id: string, newName: string, newCategory: string, newSeason: string) => Promise<void>;
    onDeleteIngredient: (id: string) => Promise<void>;
};

// _________________________ COMPOSANT _________________________
const IngredientCard = <T extends IngredientType>({
    ingredient,
    onUpdateIngredient,
    onDeleteIngredient,
}: IngredientCardProps<T>) => {

    // _________________________ ETATS _________________________
    const [isEditing, setIsEditing] = useState(false); // État pour basculer entre lecture et édition

    const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement pour la mise à jour
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs

    // _________________________ LOGIQUE _________________________
    // Gestion de la soumission du formulaire d'édition d'ingrédient
    const handleEdit = async (newName: string, newCategory: string, newSeason: string) => {
        setIsLoading(true);
        setError(null);
    
        // Valider les données du formulaire
        const validationResult = ingredientConstraints.safeParse({ name: newName, categoryIngredientId: newCategory, season: newSeason });
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.format();
            setError(formattedErrors.name?._errors[0] || 'Erreur inconnue');
            setIsLoading(false);
            return;
        }

        try {
            await onUpdateIngredient(ingredient.id, newName, newCategory, newSeason);
            setIsEditing(false);
        } catch (error) {
            console.error("[UPDATE_INGREDIENT]", error);
            setError("Erreur lors de la mise à jour.");
        } finally {
            setIsLoading(false);
        }
    };


    // _________________________ RENDU _________________________
    return (
        <div
            key={ingredient.id}
            className="card"
        >
            {!isEditing ? (
                <ItemView
                    title= {ucFirst(ingredient.name)}
                    details={{
                        category: ingredient.categoryIngredient?.name,
                        season: ingredient.season,
                    }}
                    onEdit={() => setIsEditing(true)}
                    onDelete={() => onDeleteIngredient(ingredient.id)} // Passe la suppression comme prop
                    isDeleting={false}
                />
            ) : (
                <UpdateIngredient
                    initialName={ingredient.name}
                    initialCategory={ingredient.categoryIngredient?.name}
                    initialSeason={ingredient.season || ""}
                    onSubmit={handleEdit}
                    onCancel={() => setIsEditing(false)}
                    isLoading={isLoading}
                    error={error}
                />
            )}
            
        </div>
    );
};

export default IngredientCard;

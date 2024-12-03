import React, { useState } from "react";
import { IngredientType } from "@/lib/types/schemas_interfaces";
import IngredientEditForm from "./IngredientEditForm";
import { ingredientConstraints } from "@/lib/types/forms_constraints";
import ItemView from "@/app/(views)/_components/ItemView";

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
    const [isDeleting, setIsDeleting] = useState(false); // Indicateur de chasrgement pour la suppression

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


    // Gestion de la suppression de l'ingredient
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet ingrédient ?");
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            await onDeleteIngredient(ingredient.id);
        } catch (error) {
            console.error("[DELETE_Ingredient]", error);
            alert("Erreur lors de la suppression de l'ingrédient.");
        } finally {
            setIsDeleting(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <div
            key={ingredient.id}
            className="border border-gray-500 p-6 rounded-xl"
        >
            {!isEditing ? (
                <ItemView
                    title= {ingredient.name}
                    details={{
                        category: ingredient.categoryIngredient?.name,
                        season: ingredient.season,
                    }}
                    onEdit={() => setIsEditing(true)}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                />
            ) : (
                <IngredientEditForm
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

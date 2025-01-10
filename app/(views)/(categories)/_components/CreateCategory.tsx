import React, { useState } from "react";
import { useFormValidation } from "@/app/hooks/useFormValidation";
import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { Button } from "@/components/ui/button";
import { CreateCategoryProps } from "@/lib/types/props_interfaces";

type CategoryFormType = { name: string }; // Définir le type pour le formulaire

const CreateCategory: React.FC<CreateCategoryProps> = ({ onAddCategory }) => {
    // _________________________ ETATS __________________
    const [newCategoryName, setNewCategoryName] = useState(''); // Gestion du champ de formulaire

    // Hook de validation
    const { error, isLoading, setIsLoading, validate } = useFormValidation<CategoryFormType>(
        categoriesConstraints,
        ["name"] // Champs à valider
    );

    // _________________________ LOGIQUE _________________________
    // Gestion de la soumission du formulaire de création de catégorie
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Valider les données du formulaire avec le hook
        if (!validate({ name: newCategoryName })) {
            setIsLoading(false);
            return;
        }

        // Si la validation réussit, effectuer l'ajout
        try {
            await onAddCategory(newCategoryName);
            setNewCategoryName(''); // Réinitialiser le champ après ajout
        } catch (error) {
            console.error("[CREATE_CATEGORY]", error);
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <>
            <h2 className="mb-2 text-lg font-bold">Nouvelle catégorie:</h2>
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nom de la catégorie"
                    className="input-text-select"
                    required
                />
                {error?.name && (
                    <p className="error-form">{error.name}</p>
                )}
                <Button
                    onClick={handleSubmit}
                    variant="success"
                    disabled={isLoading}
                >
                    {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                </Button>
            </div>
        </>
    );
};

export default CreateCategory;

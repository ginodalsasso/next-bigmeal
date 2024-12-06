import React, { useState } from "react";
import { CategoryFormErrorType } from "@/lib/types/forms_interfaces";
import { categoriesConstraints } from "@/lib/types/forms_constraints";
import { Button } from "@/components/ui/button";

// _________________________ TYPES _________________________
type CategoryFormProps = { 
    onAddCategory: (name: string) => Promise<void>; 
};

// _________________________ COMPOSANT _________________________
const CategoryForm: React.FC<CategoryFormProps> = ({ onAddCategory }) => {

    // _________________________ ETATS __________________
    const [newCategoryName, setNewCategoryName] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement
    const [error, setError] = useState<CategoryFormErrorType>({ name: '' }); // Gestion des erreurs


    // _________________________ LOGIQUE _________________________
    // Gestion de la soumission du formulaire de creation de catégorie
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({ name: '' });

        // Valider les données du formulaire
        const validationResult = categoriesConstraints.safeParse({ name: newCategoryName });
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.format();
            setError({
                name: formattedErrors.name?._errors[0] || 'Erreur inconnue', // Récupère le premier message d'erreur
            });
            setIsLoading(false);
            return;
        }

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
                    className="border p-2 rounded-lg text-black"
                    required
                />
                {error.name && (
                    <p className="text-red-500 text-sm mb-4">{error.name}</p>
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

export default CategoryForm;

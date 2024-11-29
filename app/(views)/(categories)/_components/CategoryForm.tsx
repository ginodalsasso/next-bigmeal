import { CategoryFormErrorType } from "@/lib/types/forms_interfaces";
import React, { useState } from "react";

import { categoriesConstraints } from "@/lib/types/forms_constraints";


type CategoryFormProps = { onAddCategory: (name: string) => Promise<void>; };

const CategoryForm: React.FC<CategoryFormProps> = ({ onAddCategory }) => {
    const [newCategoryName, setNewCategoryName] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement
    const [error, setError] = useState<CategoryFormErrorType>({ name: '' }); // Gestion des erreurs

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
        await onAddCategory(newCategoryName.trim());
        setNewCategoryName(''); // Réinitialiser le champ après ajout
    } catch (error) {
        console.error("[CREATE_CATEGORY]", error);
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="mt-4 p-4 border rounded-lg">
            <h2>Ajouter une nouvelle catégorie</h2>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nom de la catégorie"
                    className="border p-2 rounded-lg text-black"
                />
                {error.name && (
                    <p className="text-red-500 text-sm mb-4 mx-auto w-[90%]">{error.name}</p>
                )}
                <button
                    onClick={handleSubmit}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
                    disabled={isLoading}
                >
                    {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                </button>
            </div>
        </div>
    );
};

export default CategoryForm;

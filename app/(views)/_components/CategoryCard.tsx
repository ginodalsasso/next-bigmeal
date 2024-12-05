import { useState } from "react";
import ItemView from "@/app/(views)/_components/ItemView";
import CategoryEditForm from "./CategoryEditForm";

import { CategoryType } from "@/lib/types/schemas_interfaces";
import { categoriesConstraints } from "@/lib/types/forms_constraints";


// _________________________ TYPES _________________________
type CategoryCardProps<T extends CategoryType> = {
    category: T;
    onUpdateCategory: (id: string, newName: string) => Promise<void>;
    onDeleteCategory: (id: string) => Promise<void>;
};


// _________________________ COMPOSANT _________________________
const CategoryCard = <T extends CategoryType>({
    category,
    onUpdateCategory,
    onDeleteCategory,
}: CategoryCardProps<T>) => {

    // _________________________ ETATS _________________________
    const [isEditing, setIsEditing] = useState(false); // État pour basculer entre lecture et édition

    const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement pour la mise à jour
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs


    // _________________________ LOGIQUE _________________________
    // Gestion de la soumission du formulaire d'édition de catégorie
    const handleEdit = async (newName: string) => {
        setIsLoading(true);
        setError(null);
        // Valider les données du formulaire
        const validationResult = categoriesConstraints.safeParse({ name: newName });
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.format();
            setError(formattedErrors.name?._errors[0] || 'Erreur inconnue');
            setIsLoading(false);
            return;
        }

        try {
            await onUpdateCategory(category.id, newName);
            setIsEditing(false);
        } catch (error) {
            console.error("[UPDATE_CATEGORY]", error);
            setError("Erreur lors de la mise à jour.");
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <div className="card">
            {!isEditing ? (
                <ItemView
                    title={category.name}
                    details={{}}
                    onEdit={() => setIsEditing(true)}
                    onDelete={() => onDeleteCategory(category.id)} // Passe la suppression comme prop
                    isDeleting={false}
                />
            ) : (
                <CategoryEditForm
                    initialName={category.name}
                    onSubmit={handleEdit}
                    onCancel={() => setIsEditing(false)}
                    isLoading={isLoading}
                    error={error}
                />
            )}
        </div>
    );
};

export default CategoryCard;

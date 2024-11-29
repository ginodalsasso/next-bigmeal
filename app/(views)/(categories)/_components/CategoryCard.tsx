import { useState } from "react";
import CategoryEditForm from "./CategoryEditForm";
import CategoryView from "./CategoryView";
import { CategoryType } from "@/lib/types/schemas_interfaces";

type CategoryCardProps<T extends CategoryType> = {
    category: T;
    onUpdateCategory: (id: string, newName: string) => Promise<void>;
    onDeleteCategory: (id: string) => Promise<void>;
};

const CategoryCard = <T extends CategoryType>({
    category,
    onUpdateCategory,
    onDeleteCategory,
}: CategoryCardProps<T>) => {
    const [isEditing, setIsEditing] = useState(false); // État pour basculer entre lecture et édition
    const [isDeleting, setIsDeleting] = useState(false); // Indicateur de chargement pour la suppression
    
    const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement pour la mise à jour
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs

    // Gestion de la soumission du formulaire d'édition de catégorie
    const handleEditSubmit = async (newName: string) => {
        setIsLoading(true);
        setError(null);

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

    // Gestion de la suppression de la catégorie
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            await onDeleteCategory(category.id);
        } catch (error) {
            console.error("[DELETE_CATEGORY]", error);
            alert("Erreur lors de la suppression de la catégorie.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="border border-gray-500 p-6 rounded-xl">
            {!isEditing ? (
                <CategoryView
                    categoryName={category.name}
                    onEdit={() => setIsEditing(true)}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                />
            ) : (
                <CategoryEditForm
                    initialName={category.name}
                    onSubmit={handleEditSubmit}
                    onCancel={() => setIsEditing(false)}
                    isLoading={isLoading}
                    error={error}
                />
            )}
        </div>
    );
};

export default CategoryCard;
import { useState } from "react";
import { useFormValidation } from "@/app/hooks/useFormValidation";
import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { Button } from "@/components/ui/button";
import { UpdateCategoryProps } from "@/lib/types/props_interfaces";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

type CategoryFormType = { name: string }; // Définir le type du formulaire

// _________________________ COMPOSANT _________________________
const UpdateCategory: React.FC<UpdateCategoryProps> = ({
    initialName,
    onSubmit,
    onCancel,
    isLoading: parentLoading,
}) => {
    // _________________________ ETATS _________________________
    const [name, setName] = useState<string>(initialName);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Hook de validation
    const { error, setError, validate } = useFormValidation<CategoryFormType>(
        categoriesConstraints,
        ["name"] // Champs à valider
    );

    // _________________________ LOGIQUE _________________________
    // Gestion de la soumission du formulaire d'édition de catégorie
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Réinitialise les erreurs existantes

        if (!validate({ name })) {
            setIsLoading(false);
            return;
        }

        try {
            await onSubmit(name);
        } catch (error) {
            console.error("[UPDATE_CATEGORY_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de la catégorie." });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <FormErrorMessage message={error?.general} />

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau nom"
                className="input-text-select"
                disabled={isLoading || parentLoading}
            />
            <FormErrorMessage message={error?.name} />
            
            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="secondary"
                    className="w-full"
                    disabled={isLoading || parentLoading}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="success"
                    className="w-full"
                    disabled={isLoading || parentLoading}
                >
                    {isLoading || parentLoading ? "En cours..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateCategory;

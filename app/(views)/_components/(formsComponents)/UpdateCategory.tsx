import { useState } from "react";
import { CategoryFormErrorType, UpdateCategoryProps } from "@/lib/types/forms_interfaces";
import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { Button } from "@/components/ui/button";

// _________________________ COMPOSANT _________________________
const UpdateCategory: React.FC<UpdateCategoryProps> = ({
    initialName,
    onSubmit,
    onCancel,
    isLoading,
}) => {

    // _________________________ ETATS _________________________
    const [name, setName] = useState(initialName);
    const [error, setError] = useState<CategoryFormErrorType>({});
    

    
    // _________________________ LOGIQUE _________________________
    // Gestion de la soumission du formulaire d'édition de catégorie
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({});
        
        const formData = {
            name,
        };

        const validationResult = categoriesConstraints.safeParse(formData);
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            setError({
                name: formattedErrors.name?.[0],
            });
            return;
        }

        await onSubmit(name);
    };


    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau nom"
                className="border p-2 rounded-lg w-full text-black"
                disabled={isLoading}
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="cancel"
                    disabled={isLoading}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="success"
                    disabled={isLoading}
                >
                    {isLoading ? "En cours..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateCategory;
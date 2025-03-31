// Bibliothèques tierces
import { useState } from "react";
import { toast } from "sonner";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Contraintes et services
import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { updateCategoryAPI } from "@/lib/services/categories_service";
import { UpdateCategoryProps } from "@/lib/types/props_interfaces";
import { getCsrfToken } from "next-auth/react";


type CategoryFormType = { name: string };


// _________________________ COMPONENT _________________________
const UpdateCategory = <T extends { id: string; name: string }>({
    apiUrl,
    category,
    onSubmit,
    onCancel
}: UpdateCategoryProps<T>) => {

    // _________________________ ETATS _________________________
    const [name, setName] = useState(category.name);
    const [isLoading, setIsLoading] = useState(false);

    const { error, setError, validate } = useFormValidation<CategoryFormType>(
        categoriesConstraints,
        ["name"]
    );

    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            console.error("CSRF token invalide");
            setError({ general: "Problème de sécurité, veuillez réessayer." });
            setIsLoading(false);
            return;
        }

        if (!validate({ name })) {
            setIsLoading(false);
            return;
        }

        try {
            const updatedCategory = updateCategoryAPI(category.id, name, csrfToken, apiUrl);
            
            onSubmit(await updatedCategory);
            toast("Catégorie mise à jour avec succès");
            onCancel(); // Fermer la modale ou le formulaire après succès
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

            <label htmlFor="CategoryName" className="mb-2 text-lg font-bold">
                Nouveau nom de catégorie:
            </label>
            <input
                className="input-text-select"
                type="text"
                id="CategoryName"
                name="CategoryName"
                placeholder="Dessert, Plat principal..."
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
            />
            <FormErrorMessage message={error?.name} />

            <div className="flex gap-2">
                <Button type="button" onClick={onCancel} variant="secondary" className="w-full" disabled={isLoading}>
                    Annuler
                </Button>
                <Button type="submit" variant="success" className="w-full" disabled={isLoading}>
                    {isLoading ? "En cours..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateCategory;

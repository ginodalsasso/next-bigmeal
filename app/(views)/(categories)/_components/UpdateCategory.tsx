import { useState } from "react";
import { useFormValidation } from "@/app/hooks/useFormValidation";
import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { toast } from "sonner";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

type CategoryFormType = { name: string };

interface UpdateCategoryProps<T> {
    apiUrl: string; // URL de l'API (ex: "/api/categories-meal" ou "/api/categories-ingredient")
    category: T; // La catégorie à mettre à jour
    onSubmit: (updatedCategory: T) => void; // Callback après mise à jour
    onCancel: () => void;
}

const UpdateCategory = <T extends { id: string; name: string }>({
    apiUrl,
    category,
    onSubmit,
    onCancel
}: UpdateCategoryProps<T>) => {

    // _________________________ ETATS _________________________
    const [name, setName] = useState(category.name);
    const [isLoading, setIsLoading] = useState(false);
    const csrfToken = useCsrfToken();

    const { error, setError, validate } = useFormValidation<CategoryFormType>(
        categoriesConstraints,
        ["name"]
    );

    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

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
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ id: category.id, name }),
            });
            if (!response.ok) throw new Error("Erreur lors de la mise à jour de la catégorie");

            const updatedCategory: T = await response.json();
            onSubmit(updatedCategory);
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

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau nom"
                className="input-text-select"
                disabled={isLoading}
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

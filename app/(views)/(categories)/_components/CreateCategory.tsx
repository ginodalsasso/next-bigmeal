import React, { useState } from "react";
import { useFormValidation } from "@/app/hooks/useFormValidation";
import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { toast } from "sonner";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";
import { CreateCategoryProps } from "@/lib/types/props_interfaces";

type CategoryFormType = { name: string };

/**
 * <T,> est un type générique qui permet de définir le type de la nouvelle catégorie
 * en props: - apiUrl est l'URL de l'API pour créer une nouvelle catégorie
 *           - onCategoryCreated est une fonction qui met à jour la liste des catégories dans le parent 
**/
const CreateCategory = <T,>({ apiUrl, onCategoryCreated }: CreateCategoryProps<T>) => {
    
    // _________________________ ETATS __________________
    const [newCategoryName, setNewCategoryName] = useState('');
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

        if (!validate({ name: newCategoryName })) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken
                },
                body: JSON.stringify({ name: newCategoryName }),
            });
            if (!response.ok) throw new Error("Erreur lors de l'ajout de la catégorie");

            const newCategory = await response.json();
            onCategoryCreated(newCategory); // 🔄 Met à jour la liste dans le parent
            setNewCategoryName('');
            toast("Catégorie créée avec succès");
        } catch (error) {
            console.error("[CREATE_CATEGORY]", error);
            setError({ general: "Erreur lors de l'ajout de la catégorie." });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <>
            <h2 className="mb-2 text-lg font-bold">Nouvelle catégorie:</h2>
            <div className="flex flex-col gap-2">
                <form onSubmit={handleSubmit} className="space-y-2">
                    <FormErrorMessage message={error?.general} />

                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Nom de la catégorie"
                        className="input-text-select"
                        required
                    />
                    <FormErrorMessage message={error?.name} />

                    <Button type="submit" variant="success" disabled={isLoading}>
                        {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default CreateCategory;

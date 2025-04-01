// Bibliothèques tierces
import React, { useState } from "react";
import { toast } from "sonner";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import FormSubmitButton from "./FormSubmitButton";

// Contraintes et services
import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { createCategoryAPI } from "@/lib/services/categories_service";

// Types et interfaces
import { CreateCategoryProps } from "@/lib/types/props_interfaces";
import { getCsrfToken } from "next-auth/react";


// _________________________ TYPE _________________________
type CategoryFormType = { name: string };


/**
 * <T,> est un type générique qui permet de définir le type de la nouvelle catégorie
 * en props: - apiUrl est l'URL de l'API pour créer une nouvelle catégorie
 *           - onSubmit est une fonction qui met à jour la liste des catégories dans le parent 
**/
const CreateCategory = <T,>({ apiUrl, onSubmit }: CreateCategoryProps<T>) => {
    
    
    // _________________________ ETATS __________________
    const [newCategoryName, setNewCategoryName] = useState('');

    const { error, setError, validate } = useFormValidation<CategoryFormType>(
        categoriesConstraints,
        ["name"]
    );

    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            console.error("CSRF token invalide");
            setError({ general: "Problème de sécurité, veuillez réessayer." });
            return;
        }

        if (!validate({ name: newCategoryName })) {
            return;
        }

        try {
            const newCategory = createCategoryAPI(newCategoryName, csrfToken, apiUrl);

            onSubmit(await newCategory); 
            setNewCategoryName('');
            toast("Catégorie créée avec succès");
        } catch (error) {
            console.error("[CREATE_CATEGORY]", error);
            setError({ general: "Erreur lors de l'ajout de la catégorie." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <>
            <div className="flex flex-col gap-2">
                <form onSubmit={handleSubmit} className="space-y-2">
                    <FormErrorMessage message={error?.general} />
                    <label htmlFor="CategoryName" className="mb-2 text-lg font-bold">
                        Nouvelle catégorie:
                    </label>
                    <input
                        className="input-text-select"
                        type="text"
                        id="CategoryName"
                        name="CategoryName"
                        placeholder="Dessert, Plat principal..."
                        autoComplete="off"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        required
                    />
                    <FormErrorMessage message={error?.name} />
                    <FormSubmitButton />
                </form>
            </div>
        </>
    );
};

export default CreateCategory;

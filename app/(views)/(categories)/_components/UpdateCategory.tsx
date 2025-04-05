// Bibliothèques tierces
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
import FormSubmitButton from "@/components/forms/FormSubmitButton";


type CategoryFormType = { name: string };


// _________________________ COMPONENT _________________________
const UpdateCategory = <T extends { id: string; name: string }>({
    apiUrl,
    category,
    onSubmit,
    onCancel
}: UpdateCategoryProps<T>) => {

    // _________________________ ETATS _________________________
    const { error, setError, validate } = useFormValidation<CategoryFormType>(
        categoriesConstraints,
        ["name"]
    );

    // _________________________ LOGIQUE _________________________
    const handleSubmit = async (formData: FormData) => {
        const categoryName = formData.get('CategoryName') as string;
        
        if (!validate({ name: categoryName })) {
            return;
        }
        
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                setError({ general: "Problème de sécurité, veuillez réessayer." });
                return;
            }
            const updatedCategory = updateCategoryAPI(
                category.id, 
                categoryName, 
                csrfToken, 
                apiUrl
            );
            
            onSubmit(await updatedCategory);
            toast("Catégorie mise à jour avec succès");
            onCancel(); // Fermer la modale ou le formulaire après succès
        } catch (error) {
            console.error("[UPDATE_CATEGORY_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de la catégorie." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form action={handleSubmit} className="space-y-2">
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
                defaultValue={category.name}
                required
            />
            <FormErrorMessage message={error?.name} />

            <div className="flex gap-2">
                <Button type="button" onClick={onCancel} variant="secondary" className="w-full">
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default UpdateCategory;

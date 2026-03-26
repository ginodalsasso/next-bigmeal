import { SubmitEvent } from "react";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { updateCategoryAPI } from "@/lib/services/categories_service";
import { UpdateCategoryProps } from "@/lib/types/props_interfaces";

type CategoryFormType = { name: string };

const UpdateCategory = <T extends { id: string; name: string }>({
    apiUrl,
    category,
    onSubmit,
    onCancel,
}: UpdateCategoryProps<T>) => {
    const { error, submit, isLoading } = useCrudForm<CategoryFormType>(
        categoriesConstraints,
        ["name"]
    );

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("CategoryName") as string;
        await submit({
            form: { name },
            apiCall: (_form, csrf) => updateCategoryAPI(category.id, name, csrf, apiUrl),
            onSuccess: onSubmit,
            successMessage: "Catégorie mise à jour avec succès",
            errorMessage: "Erreur lors de la mise à jour de la catégorie.",
            onClose: onCancel,
        });
    };

    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <label htmlFor="CategoryName" className="text-sm font-medium text-warm-primary">
                Nouveau nom de catégorie
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
                <FormSubmitButton isPending={isLoading} />
            </div>
        </form>
    );
};

export default UpdateCategory;

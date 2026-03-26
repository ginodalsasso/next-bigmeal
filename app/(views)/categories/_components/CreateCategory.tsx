import { SubmitEvent } from "react";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { categoriesConstraints } from "@/lib/constraints/forms_constraints";
import { createCategoryAPI } from "@/lib/services/categories_service";

import { CreateCategoryProps } from "@/lib/types/props_interfaces";

type CategoryFormType = { name: string };

const CreateCategory = <T,>({ apiUrl, onSubmit }: CreateCategoryProps<T>) => {
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
            apiCall: (_form, csrf) => createCategoryAPI(name, csrf, apiUrl),
            onSuccess: onSubmit,
            successMessage: "Catégorie créée avec succès",
            errorMessage: "Erreur lors de l'ajout de la catégorie.",
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <form className="space-y-2" onSubmit={handleSubmit}>
                <FormErrorMessage message={error?.general} />
                <label htmlFor="CategoryName" className="text-sm font-medium text-warm-primary">
                    Nouvelle catégorie
                </label>
                <input
                    className="input-text-select"
                    type="text"
                    id="CategoryName"
                    name="CategoryName"
                    placeholder="Dessert, Plat principal..."
                    autoComplete="off"
                    required
                />
                <FormErrorMessage message={error?.name} />
                <FormSubmitButton isPending={isLoading} />
            </form>
        </div>
    );
};

export default CreateCategory;

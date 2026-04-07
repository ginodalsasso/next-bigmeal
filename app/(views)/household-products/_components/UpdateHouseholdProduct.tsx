import { useEffect, useState, SubmitEvent } from "react";

import { CategoryHouseholdProductType } from "@/lib/types/schemas_interfaces";
import { UpdateHouseholdProductProps } from "@/lib/types/props_interfaces";

import { householdProductConstraints, HouseholdProductFormData } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { ucFirst } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { getCategoriesHouseholdProduct } from "@/lib/services/data_fetcher";
import { updateHouseholdProductAPI } from "@/lib/services/household_product_service";

const UpdateHouseholdProduct: React.FC<UpdateHouseholdProductProps> = ({ householdProduct, onSubmit, onCancel }) => {
    const [categories, setCategories] = useState<CategoryHouseholdProductType[]>([]);

    const { error, setError, submit, isLoading } = useCrudForm<HouseholdProductFormData>(
        householdProductConstraints,
        ["name", "categoryHouseholdProductId"]
    );

    useEffect(() => {
        getCategoriesHouseholdProduct()
            .then(setCategories)
            .catch(() => setError({ general: "Erreur lors de la récupération des catégories." }));
    }, [setError]);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await submit({
            form: {
                id: householdProduct.id,
                name: formData.get("name") as string,
                categoryHouseholdProductId: formData.get("categoryHouseholdProductId") as string,
            },
            apiCall: updateHouseholdProductAPI,
            onSuccess: onSubmit,
            successMessage: "Produit modifié avec succès",
            errorMessage: "Erreur lors de la mise à jour du produit.",
            onClose: onCancel,
        });
    };

    return (
        <form className="drawer-form" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="drawer-label-input">
                <label htmlFor="name">Nom du produit</label>
                <input
                    className="input-text-select"
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={householdProduct.name}
                    placeholder="Papier toilette, savon, etc."
                    autoComplete="off"
                    required
                />
                <FormErrorMessage message={error?.name} />
            </div>

            <div className="drawer-label-input">
                <label htmlFor="categoryHouseholdProductId">Catégorie du produit</label>
                <select
                    className="input-text-select"
                    name="categoryHouseholdProductId"
                    id="categoryHouseholdProductId"
                    defaultValue={householdProduct.categoryHouseholdProductId}
                    required
                >
                    <option value="">-- Choisir une catégorie --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {ucFirst(category.name)}
                        </option>
                    ))}
                </select>
                <FormErrorMessage message={error?.categoryHouseholdProductId} />
            </div>

            <div className="drawer-buttons-form">
                <Button variant="cancel" onClick={onCancel}>Annuler</Button>
                <FormSubmitButton isPending={isLoading} />
            </div>
        </form>
    );
};

export default UpdateHouseholdProduct;

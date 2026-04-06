"use client";

import { useEffect, useState, SubmitEvent } from "react";

import { CategoryHouseholdProductType } from "@/lib/types/schemas_interfaces";
import { HouseholdProductFormType } from "@/lib/types/forms_interfaces";
import { CreateHouseholdProductProps } from "@/lib/types/props_interfaces";

import { householdProductConstraints } from "@/lib/constraints/forms_constraints";
import { useCrudForm } from "@/app/hooks/useCrudForm";

import { ucFirst } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";

import { getCategoriesHouseholdProduct } from "@/lib/services/data_fetcher";
import { createHouseholdProductAPI } from "@/lib/services/household_product_service";

const CreateHouseholdProduct: React.FC<CreateHouseholdProductProps> = ({ onSubmit, onClose }) => {
    const [categories, setCategories] = useState<CategoryHouseholdProductType[]>([]);

    const { error, setError, submit, isLoading } = useCrudForm<HouseholdProductFormType>(
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
                name: formData.get("name") as string,
                categoryHouseholdProductId: formData.get("categoryHouseholdProductId") as string,
            },
            apiCall: createHouseholdProductAPI,
            onSuccess: onSubmit,
            successMessage: "Produit créé avec succès",
            errorMessage: "Erreur lors de la création du produit.",
            onClose,
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
                    defaultValue=""
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
                <Button variant="cancel" onClick={onClose}>Annuler</Button>
                <FormSubmitButton isPending={isLoading} />
            </div>
        </form>
    );
};

export default CreateHouseholdProduct;

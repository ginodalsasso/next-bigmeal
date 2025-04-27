"use client";

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { CategoryHouseholdProductType } from "@/lib/types/schemas_interfaces";
import { HouseholdProductFormType } from "@/lib/types/forms_interfaces";
import { CreateHouseholdProductProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { householdProductConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Utils
import { ucFirst } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { getCategoriesHouseholdProduct } from "@/lib/services/data_fetcher";
import { createHouseholdProductAPI } from "@/lib/services/household_product_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";


// _________________________ COMPOSANT _________________________
const CreateHouseholdProduct: React.FC<CreateHouseholdProductProps> = ({
    onSubmit,
    onClose,
}) => {
    // _________________________ HOOKS _________________________
    const [categories, setCategories] = useState<CategoryHouseholdProductType[]>([]);

    // Hook de validation
    const { error, setError, validate } = useFormValidation<HouseholdProductFormType>(
        householdProductConstraints,
        [
            "name", 
            "categoryHouseholdProductId"
        ]
    );

    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les catégories de produits
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data: CategoryHouseholdProductType[] = await getCategoriesHouseholdProduct();
                setCategories(data); 

            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
                setError({ general: "Erreur lors de la récupération des catégories." });
            }
        };

        fetchCategories();
    }, [setError]);



    // Gestion de la soumission du formulaire
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form: HouseholdProductFormType = {
            name: formData.get("name") as string,
            categoryHouseholdProductId: formData.get("categoryHouseholdProductId") as string,
        };

        // Valider les données du formulaire
        if (!validate(form)) {
            console.error("Validation échouée", error, form);
            return;
        }

        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                setError({ general: "Problème de sécurité, veuillez réessayer." });
                return;
            }
            const createdHouseholdProduct = await createHouseholdProductAPI(
                form, 
                csrfToken
            );

            onSubmit(createdHouseholdProduct);
            toast("Produit créé avec succès");
            onClose(); // Fermer le dialogue
        } catch (error) {
            console.error("[CREATE_HOUSEHOLDPRODUCT_ERROR]", error);
            setError({ general: "Erreur lors de la création du produit." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="drawer-form" action={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="drawer-label-input">
                {/* Nom du produit */}
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

            {/* Sélection pour la catégorie */}
            <div className="drawer-label-input">
                <label htmlFor="categoryHouseholdProductId">Catégorie du produit</label>
                <div className="flex gap-2 flex-wrap">
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
                </div>
                {/* Message d'erreur pour la catégorie */}
                <FormErrorMessage message={error?.categoryHouseholdProductId} />
            </div>

            {/* Message d'erreur pour le nom du produit */}

            {/* Bouton de soumission */}
            <div className="drawer-buttons-form">
                <Button variant="cancel" onClick={onClose}>
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default CreateHouseholdProduct;

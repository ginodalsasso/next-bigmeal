// Bibliothèques tierces
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { CategoryHouseholdProductType } from "@/lib/types/schemas_interfaces";
import { UpdateHouseholdProductProps } from "@/lib/types/props_interfaces";
import { HouseholdProductFormType } from "@/lib/types/forms_interfaces";

// Contraintes et validation
import { householdProductConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { getCategoriesHouseholdProduct } from "@/lib/services/data_fetcher";
import { updateHouseholdProductAPI } from "@/lib/services/household_product_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import { ucFirst } from "@/lib/utils";

// _________________________ COMPONENT _________________________
const UpdateHouseholdProduct: React.FC<UpdateHouseholdProductProps> = ({
    householdProduct,
    onSubmit,
    onCancel,
}) => {
    // _________________________ ETATS _________________________
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
    // Récupérer les catégories de produits
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

    // Gère la soumission et l'update de l'ingrédient
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form: HouseholdProductFormType = {
            id: householdProduct.id,
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
                return;
            }
            const updatedHouseholdProduct = await updateHouseholdProductAPI(form, csrfToken);

            onSubmit(updatedHouseholdProduct);
            toast("Produit modifié avec succès");
            onCancel();
        } catch (error) {
            console.error("[UPDATE_HOUSEHOLDPRODUCT_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour du produit." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form action={handleSubmit} className="space-y-2 md:w-[50vw]">
            <FormErrorMessage message={error?.general} />

            {/* Champ pour le nom */}
            <input
                className="input-text-select"
                type="text"
                id="name"
                name="name"
                defaultValue={householdProduct.name}
                placeholder="Nom du produit"
                autoComplete="off"
                required
            />
            <FormErrorMessage message={error?.name} />

            {/* Sélection pour la catégorie */}
            <select
                className="input-text-select"
                name="categoryHouseholdProductId"
                id="categoryHouseholdProductId"
                defaultValue={householdProduct.categoryHouseholdProductId}
                required
            >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((category) => (
                    <option 
                        key={category.id} 
                        value={category.id}
                        >
                        {ucFirst(category.name)}
                    </option>
                ))}
            </select>
            <FormErrorMessage message={error?.categoryHouseholdProductId} />


            {/* Boutons de soumission et d'annulation */}
            <div className="flex flex-col gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="secondary"
                >
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default UpdateHouseholdProduct;
